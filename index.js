// index.js - Entrypoint: CLI orchestration
//
//   node index.js sync-cases   : tạo section + test case trên TestRail (không tạo trùng)
//   node index.js run          : tạo test run + đẩy kết quả + tạo bug Jira cho case fail
//   node index.js full         : sync-cases rồi run
//
const fs = require('fs');
const path = require('path');

const config = require('./config');
const TestRailClient = require('./api/testrail');
const JiraClient = require('./api/jira');
// TODO(Ngân): hiện chưa biết thư mục managers/ có gì.

const STATUS = TestRailClient.STATUS;

// ============================================================
// LẤY DỮ LIỆU TEST CASE (testcases/ của My)

function loadTestcases() {
  const data = require('./testcases');
  const groups = Array.isArray(data) ? { 'Test cases': data } : data;

  const list = [];
  for (const [groupName, cases] of Object.entries(groups)) {
    cases.forEach((tc, i) => {
      const key = tc.id || `${groupName}#${i + 1}`;
      list.push({ ...tc, key, group: groupName });
    });
  }
  return list;
}

// ============================================================
// MAPPING
// Chưa biết database loại gì, nên tạm lưu file JSON.
const MAPPING_FILE = path.join(__dirname, 'mapping.json');

function loadMapping() {
  if (!fs.existsSync(MAPPING_FILE)) return { sections: {}, cases: {}, bugs: {} };
  const m = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
  return { sections: m.sections || {}, cases: m.cases || {}, bugs: m.bugs || {} };
}

function saveMapping(mapping) {
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2), 'utf8');
}

// ============================================================
// LỆNH sync-cases

const MODULE_NAME = 'Graduation advisory';

async function syncCases() {
  const testrail = new TestRailClient();
  const suiteID = config.testrail.suiteID; // TODO(Ngân): đợi config.js của Chính xác nhận có khóa này
  const mapping = loadMapping();
  const cases = loadTestcases();

  console.log(`Tìm thấy ${cases.length} test case trong code.`);

  // Section gốc (module)
  if (!mapping.sections[MODULE_NAME]) {
    const s = await testrail.addSection(MODULE_NAME, null, suiteID, 'Module: Graduation advisory');
    mapping.sections[MODULE_NAME] = s.id;
    saveMapping(mapping);
    console.log(`+ Section gốc "${MODULE_NAME}" (id ${s.id})`);
  }
  const moduleSectionID = mapping.sections[MODULE_NAME];

  let created = 0;
  let skipped = 0;

  for (const tc of cases) {
    //  Section con theo nhóm
    const groupKey = `${MODULE_NAME}/${tc.group}`;
    if (!mapping.sections[groupKey]) {
      const s = await testrail.addSection(tc.group, moduleSectionID, suiteID);
      mapping.sections[groupKey] = s.id;
      saveMapping(mapping);
      console.log(`+ Section "${tc.group}" (id ${s.id})`);
    }

    // Test case
    if (mapping.cases[tc.key]) {
      skipped++;
      continue;
    }
    const added = await testrail.addCase(mapping.sections[groupKey], {
      title: tc.title,
      preconditions: tc.preconditions || '',
      steps: stepsToText(tc.steps),
      expected: tc.expected || '',
      // Cần kiểm tra lại trên TestRail của nhóm rồi quy đổi.
      priorityId: tc.priorityId || 2,
    });
    mapping.cases[tc.key] = added.id;
    saveMapping(mapping);
    created++;
    console.log(`+ Case "${tc.title}" (id ${added.id})`);
  }

  console.log(`Xong sync-cases: tạo mới ${created}, bỏ qua (đã có) ${skipped}.`);
}

function stepsToText(steps) {
  if (Array.isArray(steps)) return steps.map((s, i) => `${i + 1}. ${s}`).join('\n');
  return steps || '';
}

// ============================================================
// LẤY KẾT QUẢ TEST (pass/fail)
// Tạm đọc từ file results.json, định dạng:
//   {
//     "<key của test case>": { "status": "passed" | "failed" | "blocked", "comment": "..." }
//   }

const RESULTS_FILE = path.join(__dirname, 'results.json');
const STATUS_MAP = {
  passed: STATUS.PASSED,
  failed: STATUS.FAILED,
  blocked: STATUS.BLOCKED,
  retest: STATUS.RETEST,
};

function loadResults() {
  if (!fs.existsSync(RESULTS_FILE)) {
    throw new Error(
      'Không tìm thấy results.json. Tạo file này (xem hướng dẫn trong index.js) hoặc đợi nhóm chốt cách lấy kết quả.'
    );
  }
  return JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));
}

// ============================================================
// 5. LỆNH run

async function run() {
  const testrail = new TestRailClient();
  const jira = new JiraClient();
  const suiteID = config.testrail.suiteID;
  const mapping = loadMapping();
  const cases = loadTestcases();
  const results = loadResults();

  // Chỉ chạy các case đã có trên TestRail và có kết quả
  const toRun = cases.filter((tc) => mapping.cases[tc.key] && results[tc.key]);
  if (toRun.length === 0) {
    throw new Error('Không có case nào để chạy. Hãy chạy "sync-cases" trước và kiểm tra results.json.');
  }
  const missing = cases.filter((tc) => !mapping.cases[tc.key]);
  if (missing.length) {
    console.warn(`Cảnh báo: ${missing.length} case chưa có trên TestRail (chạy sync-cases).`);
  }

  const runName = `${MODULE_NAME} - ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`;
  const testRun = await testrail.addRun(
    runName,
    suiteID,
    toRun.map((tc) => mapping.cases[tc.key])
  );
  console.log(`+ Test run "${runName}" (id ${testRun.id})`);

  let pass = 0;
  let fail = 0;

  for (const tc of toRun) {
    const r = results[tc.key];
    const statusID = STATUS_MAP[String(r.status).toLowerCase()];
    if (!statusID) {
      console.warn(`Bỏ qua "${tc.key}": status không hợp lệ "${r.status}"`);
      continue;
    }

    let bugKey = '';
    if (statusID === STATUS.FAILED) {
      fail++;
      // (jira.js của Nhi chưa có hàm lấy trạng thái).
      if (mapping.bugs[tc.key]) {
        bugKey = mapping.bugs[tc.key];
        console.log(`  = "${tc.title}" fail, dùng lại bug ${bugKey}`);
      } else {
        bugKey = await jira.createBug({
          summary: `[${MODULE_NAME}] ${tc.title}`,
          description: buildBugDescription(tc, r),
          labels: ['testrail', 'list-documents'],
        });
        mapping.bugs[tc.key] = bugKey;
        saveMapping(mapping);
        console.log(`  ! "${tc.title}" fail -> bug ${bugKey} (${jira.getIssueUrl(bugKey)})`);
      }
    } else if (statusID === STATUS.PASSED) {
      pass++;
    }

    await testrail.addResult(testRun.id, mapping.cases[tc.key], statusID, r.comment || '', bugKey);
  }

  console.log(`Xong run: passed ${pass}, failed ${fail}, tổng ${toRun.length}.`);
}

function buildBugDescription(tc, r) {
  return [
    `Test case: ${tc.title}`,
    tc.preconditions ? `Preconditions: ${tc.preconditions}` : '',
    `Steps:\n${stepsToText(tc.steps)}`,
    `Expected: ${tc.expected || ''}`,
    `Actual / comment: ${r.comment || '(chưa ghi)'}`,
  ]
    .filter(Boolean)
    .join('\n');
}

// ============================================================
//  CLI

const COMMANDS = {
  'sync-cases': syncCases,
  run,
  full: async () => {
    await syncCases();
    await run();
  },
};

function printUsage() {
  console.log(`Cách dùng: node index.js <lệnh>

  sync-cases   Tạo section + test case trên TestRail
  run          Tạo test run, đẩy kết quả, tạo bug Jira cho case fail
  full         sync-cases rồi run`);
}

async function main() {
  const cmd = process.argv[2];
  if (!cmd || !COMMANDS[cmd]) {
    if (cmd) console.error(`Lệnh không hợp lệ: "${cmd}"\n`);
    printUsage();
    process.exitCode = cmd ? 1 : 0;
    return;
  }
  try {
    await COMMANDS[cmd]();
  } catch (err) {
    console.error(`Lỗi: ${err.message}`);
    process.exitCode = 1;
  }
}

main();