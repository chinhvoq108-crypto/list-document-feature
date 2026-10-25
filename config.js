"use strict";

const path = require("node:path");

// Tu dong nap .env nam cung thu muc voi config.js, ke ca khi chay tu thu muc khac.
require("dotenv").config({ path: path.join(__dirname, ".env"), quiet: true });

function readEnv(key, fallback = "") {
  const value = process.env[key];
  return value === undefined ? fallback : value.trim();
}

function readPositiveInt(key, fallback = null) {
  const raw = readEnv(key);
  if (!raw) return fallback;

  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`${key} phai la so nguyen duong (hien tai: ${raw}).`);
  }
  return value;
}

function stripTrailingSlash(value) {
  return value.replace(/\/+$/, "");
}

const config = {
  nodeEnv: readEnv("NODE_ENV", "development"),

  jira: {
    // Giu dung ten thuoc tinh Nhi dang dung trong config.js: baseUrl, user.
    baseUrl: stripTrailingSlash(readEnv("JIRA_BASE_URL")),
    user: readEnv("JIRA_USER"),
    apiToken: readEnv("JIRA_API_TOKEN"),
    projectKey: readEnv("JIRA_PROJECT_KEY"),
    issueType: readEnv("JIRA_ISSUE_TYPE", "Bug"),
  },

  testrail: {
    baseUrl: stripTrailingSlash(readEnv("TESTRAIL_BASE_URL")),
    user: readEnv("TESTRAIL_USER"),
    apiKey: readEnv("TESTRAIL_API_KEY"),
    projectId: readPositiveInt("TESTRAIL_PROJECT_ID"),
    // Ngân goi config.testrail.suiteID trong index.js.
    suiteID: readPositiveInt("TESTRAIL_SUITE_ID"),
  },
};

/**
 * Kiem tra du thong tin cho lenh, khong bao gio in API token ra log.
 * sync-cases: tao section + testcases tren TestRail.
 * run/full: them Jira de tao bug khi test case fail.
 */
function validateConfigFor(command = "sync-cases") {
  if (!["sync-cases", "run", "full"].includes(command)) {
    throw new Error(`Lenh khong ho tro: ${command}`);
  }

  const required = {
    TESTRAIL_BASE_URL: config.testrail.baseUrl,
    TESTRAIL_USER: config.testrail.user,
    TESTRAIL_API_KEY: config.testrail.apiKey,
    TESTRAIL_PROJECT_ID: config.testrail.projectId,
    TESTRAIL_SUITE_ID: config.testrail.suiteID,
  };

  if (command !== "sync-cases") {
    Object.assign(required, {
      JIRA_BASE_URL: config.jira.baseUrl,
      JIRA_USER: config.jira.user,
      JIRA_API_TOKEN: config.jira.apiToken,
      JIRA_PROJECT_KEY: config.jira.projectKey,
    });
  }

  const missing = Object.entries(required)
    .filter(([, value]) => value === "" || value === null)
    .map(([name]) => name);

  if (missing.length > 0) {
    throw new Error(`Thieu cau hinh trong .env: ${missing.join(", ")}`);
  }

  for (const [name, url] of [
    ["TESTRAIL_BASE_URL", config.testrail.baseUrl],
    ...(command !== "sync-cases" ? [["JIRA_BASE_URL", config.jira.baseUrl]] : []),
  ]) {
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "https:" && parsed.hostname !== "localhost") {
        throw new Error("HTTPS required");
      }
    } catch {
      throw new Error(`${name} phai la URL HTTPS hop le.`);
    }
  }

  return true;
}

// Cho cac thanh vien khac: const config = require("./config");
// Ho van truy cap truc tiep config.testrail.suiteID nhu trong anh phan cong.
Object.defineProperty(config, "validateConfigFor", {
  value: validateConfigFor,
  enumerable: false,
});

module.exports = config;

// Cho phep tu kiem tra cau hinh ma khong goi API Jira/TestRail.
if (require.main === module) {
  try {
    const command = process.argv[2] || "sync-cases";
    validateConfigFor(command);
    console.log(`Cau hinh ${command} hop le. (Chua ket noi API)`);
  } catch (error) {
    console.error(`Loi cau hinh: ${error.message}`);
    process.exitCode = 1;
  }
}
