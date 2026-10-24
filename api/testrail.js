// testrail.js
// Quy ước theo SRS BMTWeb:
//   Section   = module  (Graduation advisory, Teaching materials, Meetings & seminars, Task assignments)
//   Test Case = use-case (vd 3.1.1 List documents)
const config = require('../config');

// TestRail status_id
const STATUS = {
  PASSED: 1,
  BLOCKED: 2,
  UNTESTED: 3,
  RETEST: 4,
  FAILED: 5,
};

class TestRailClient {
  constructor(cfg = config.testrail) {
    for (const k of ['baseUrl', 'user', 'apiKey', 'projectId']) {
      if (!cfg[k]) throw new Error(`Thiếu cấu hình TestRail: ${k} (kiểm tra file .env)`);
    }
    this.baseUrl = cfg.baseUrl.replace(/\/$/, '');
    this.projectId = cfg.projectId;
    const token = Buffer.from(`${cfg.user}:${cfg.apiKey}`).toString('base64');
    this.headers = {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    };
  }

  async request(method, endpoint, body) {
    const res = await fetch(`${this.baseUrl}/index.php?/api/v2/${endpoint}`, {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    const text = await res.text();
    if (!res.ok) throw new Error(`TestRail ${method} ${endpoint} -> ${res.status}: ${text}`);
    return text ? JSON.parse(text) : {};
  }

  // ===== SECTION =====
  // parentID = null nếu là section gốc (module). Trả về object có .id
  async addSection(name, parentID = null, suiteID, description = '') {
    const body = { name, description };
    if (suiteID) body.suite_id = suiteID;
    if (parentID) body.parent_id = parentID;
    return this.request('POST', `add_section/${this.projectId}`, body);
  }

  // ===== TEST CASE =====
  async addCase(sectionID, { title, preconditions = '', steps = '', expected = '', priorityId = 2 }) {
    return this.request('POST', `add_case/${sectionID}`, {
      title,
      priority_id: priorityId,
      custom_preconds: preconditions,
      custom_steps: steps,
      custom_expected: expected,
    });
  }

  // ===== TEST RUN =====
  // caseIDs rỗng thì chạy tất cả case trong suite
  async addRun(name, suiteID, caseIDs = []) {
    const body = { name, suite_id: suiteID, include_all: caseIDs.length === 0 };
    if (caseIDs.length) body.case_ids = caseIDs;
    return this.request('POST', `add_run/${this.projectId}`, body);
  }

  // ===== RESULT =====
  // defects: issue key Jira trả về từ JiraClient.createBug, vd "KAN-5"
  async addResult(runID, caseID, statusID, comment = '', defects = '') {
    return this.request('POST', `add_result_for_case/${runID}/${caseID}`, {
      status_id: statusID,
      comment,
      defects,
    });
  }

  // ===== status_id =====
  static get STATUS() {
    return STATUS;
  }
}

module.exports = TestRailClient;