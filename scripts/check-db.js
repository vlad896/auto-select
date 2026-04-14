const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const REQUIRED_KEYS = [
  "DATABASE_HOST",
  "DATABASE_PORT",
  "DATABASE_USER",
  "DATABASE_PASSWORD",
  "DATABASE_NAME",
];

const EXPECTED_TABLES = [
  "leads",
  "lead_events",
  "lead_notes",
  "lead_rate_limit_hits",
];

function loadEnvFile(fileName) {
  const filePath = path.join(process.cwd(), fileName);
  if (!fs.existsSync(filePath)) {
    return false;
  }

  const content = fs.readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const equalIndex = line.indexOf("=");
    if (equalIndex === -1) continue;

    const key = line.slice(0, equalIndex).trim();
    let value = line.slice(equalIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }

  return true;
}

function getMissingKeys() {
  return REQUIRED_KEYS.filter((key) => {
    if (key === "DATABASE_PASSWORD") {
      return process.env[key] === undefined;
    }

    return !String(process.env[key] || "").trim();
  });
}

async function main() {
  const loadedFiles = [".env.local", ".env"].filter(loadEnvFile);
  if (loadedFiles.length > 0) {
    console.log(`Loaded env: ${loadedFiles.join(", ")}`);
  } else {
    console.log("Loaded env: none");
  }

  const missingKeys = getMissingKeys();
  if (missingKeys.length > 0) {
    console.error(`Missing DB config: ${missingKeys.join(", ")}`);
    process.exitCode = 1;
    return;
  }

  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST.trim(),
    port: Number(process.env.DATABASE_PORT || 3306),
    user: process.env.DATABASE_USER.trim(),
    password: process.env.DATABASE_PASSWORD ?? "",
    database: process.env.DATABASE_NAME.trim(),
  });

  try {
    const [pingRows] = await connection.query("SELECT 1 AS ok");
    console.log(`Connection OK: ${pingRows[0].ok === 1 ? "yes" : "unexpected response"}`);

    const [tableRows] = await connection.query(
      `SELECT TABLE_NAME
       FROM information_schema.TABLES
       WHERE TABLE_SCHEMA = ?
         AND TABLE_NAME IN (?, ?, ?, ?)
       ORDER BY TABLE_NAME`,
      [process.env.DATABASE_NAME, ...EXPECTED_TABLES]
    );

    const existingTables = new Set(tableRows.map((row) => row.TABLE_NAME));
    const missingTables = EXPECTED_TABLES.filter((table) => !existingTables.has(table));

    console.log(`Tables found: ${Array.from(existingTables).join(", ") || "none"}`);

    if (missingTables.length > 0) {
      console.error(`Missing tables: ${missingTables.join(", ")}`);
      process.exitCode = 1;
      return;
    }

    const [leadCountRows] = await connection.query(
      "SELECT COUNT(*) AS total FROM leads"
    );
    console.log(`Leads rows: ${leadCountRows[0].total}`);
    console.log("DB check passed.");
  } finally {
    await connection.end();
  }
}

main().catch((error) => {
  console.error("DB check failed.");
  console.error(error.message);
  process.exitCode = 1;
});
