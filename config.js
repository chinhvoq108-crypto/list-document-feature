require('dotenv').config();

module.exports = {
  jira: {
    baseUrl: process.env.JIRA_BASE_URL,
    email: process.env.JIRA_EMAIL,
    apiToken: process.env.JIRA_API_TOKEN,
    projectKey: process.env.JIRA_PROJECT_KEY,
  },
  testrail: {
    baseUrl: process.env.TESTRAIL_BASE_URL,
    user: process.env.TESTRAIL_USER,
    apiKey: process.env.TESTRAIL_API_KEY,
    projectId: Number(process.env.TESTRAIL_PROJECT_ID),
  },
};