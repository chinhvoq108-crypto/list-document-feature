const config = require('../config');

const STATUS = {
  PASSED: 1,
  BLOCKED: 2,
  UNTESTED: 3,
  RETEST: 4,
  FAILED: 5,
};

class TestRailClient {
  constructor() {
    const cfg = config.testrail;
    if (!cfg) throw new Error('config.js chưa có mục "testrail"');
    for (const k of ['baseUrl', 'user', 'apiKey', 'projectId']) {
      if (!cfg[k]) throw new Error(`Thiếu cấu hình TestRail: ${k} (kiểm tra config.js và .env)`);
    }
    this.baseUrl = cfg.baseUrl.replace(/\/$/, '');
    this.projectId = cfg.projectId;
    this.testrun = config.testrun || {}; // không bắt buộc: { suiteId, name }
    const token = Buffer.from(`${cfg.user}:${cfg.apiKey}`).toString('base64');
    this.headers = {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    };
  }

  async request(method, endpoint, payload) {
    const res = await fetch(`${this.baseUrl}/index.php?/api/v2/${endpoint}`, {
      method,
      headers: this.headers,
      body: payload ? JSON.stringify(payload) : undefined,
    });
    const text = await res.text();
    if (!res.ok) throw new Error(`TestRail ${method} ${endpoint} -> ${res.status}: ${text}`);
    return text ? JSON.parse(text) : {};
  }

  async addSection(name, parentID = null, suiteID, description = '') {
    const payload = {
      name,
      description,
      suite_id: suiteID || undefined,
      parent_id: parentID || undefined,
    };
    return this.request('POST', `add_section/${this.projectId}`, payload);
  }

  async addCase(sectionID, { title, preconditions = '', steps = '', expected = '', priorityId = 2 }) {
    const payload = {
      title,
      priority_id: priorityId,
      custom_preconds: preconditions,
      custom_steps: steps,
      custom_expected: expected,
    };
    return this.request('POST', `add_case/${sectionID}`, payload);
  }

  async addRun(name = this.testrun.name || 'BMTWeb Test Run', suiteID = this.testrun.suiteId, caseIDs = []) {
    if (!suiteID) throw new Error('Thiếu suiteID: truyền vào addRun hoặc khai báo config.testrun.suiteId');
    const payload = {
      name,
      suite_id: suiteID,
      include_all: caseIDs.length === 0,
      case_ids: caseIDs.length ? caseIDs : undefined,
    };
    return this.request('POST', `add_run/${this.projectId}`, payload);
  }

  async addResult(runID, caseID, statusID, comment = '', defects = '') {
    const payload = {
      status_id: statusID,
      comment,
      defects,
    };
    return this.request('POST', `add_result_for_case/${runID}/${caseID}`, payload);
  }

  static get STATUS() {
    return STATUS;
  }
}

module.exports = TestRailClient;