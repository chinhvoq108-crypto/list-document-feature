const config = require('../config');

class JiraClient {
  constructor() {
    const cfg = config.jira;
    for (const k of ['baseUrl', 'user', 'apiToken', 'projectKey']) {
      if (!cfg[k]) throw new Error(`Thiếu cấu hình Jira: ${k} (kiểm tra file .env)`);
    }
    this.baseUrl = cfg.baseUrl.replace(/\/$/, '');
    this.projectKey = cfg.projectKey;
    this.issueType = cfg.issueType;
    const token = Buffer.from(`${cfg.user}:${cfg.apiToken}`).toString('base64');
    this.headers = {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  toADF(text = '') {
    const content = String(text)
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => ({ type: 'paragraph', content: [{ type: 'text', text: line }] }));
    return { type: 'doc', version: 1, content };
  }

  /**
   * Tạo bug cho test case fail.
   * @returns {Promise<string>} issue key, vd "KAN-5"
   */
  async createBug({ summary, description = '', labels = [] }) {
    const res = await fetch(`${this.baseUrl}/rest/api/3/issue`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        fields: {
          project: { key: this.projectKey },
          issuetype: { name: this.issueType },
          summary,
          description: this.toADF(description),
          labels,
        },
      }),
    });
    const text = await res.text();
    if (!res.ok) throw new Error(`Jira createBug -> ${res.status}: ${text}`);
    return JSON.parse(text).key;
  }

  getIssueUrl(key) {
    return `${this.baseUrl}/browse/${key}`;
  }
}

module.exports = JiraClient;