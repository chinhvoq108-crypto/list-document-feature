const config = require('../config');

class JiraClient {
  constructor() {
    const cfg = config.jira;
    if (!cfg) throw new Error('config.js chưa có mục "jira"');
    for (const k of ['baseUrl', 'user', 'apiToken', 'projectKey']) {
      if (!cfg[k]) throw new Error(`Thiếu cấu hình Jira: ${k} (kiểm tra config.js và .env)`);
    }
    this.baseUrl = cfg.baseUrl.replace(/\/$/, '');
    this.projectKey = cfg.projectKey;
    this.issueType = cfg.issueType || 'Bug';
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

  async createBug({ summary, description = '', labels = [] }) {
    const payload = {
      fields: {
        project: { key: this.projectKey },
        issuetype: { name: this.issueType },
        summary,
        description: this.toADF(description),
        labels,
      },
    };
    const res = await fetch(`${this.baseUrl}/rest/api/3/issue`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(payload),
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