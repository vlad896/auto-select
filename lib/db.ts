import mysql from "mysql2/promise";

export type LeadSource = "contact" | "quiz";

export type SaveLeadResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "db_error" };

let sharedPool: mysql.Pool | undefined;

function isDbConfigured(): boolean {
  const host = process.env.DATABASE_HOST?.trim();
  const user = process.env.DATABASE_USER?.trim();
  const database = process.env.DATABASE_NAME?.trim();
  return Boolean(host && user && database && process.env.DATABASE_PASSWORD !== undefined);
}

function getPool(): mysql.Pool | null {
  if (!isDbConfigured()) {
    return null;
  }

  if (!sharedPool) {
    const host = process.env.DATABASE_HOST!.trim();
    const user = process.env.DATABASE_USER!.trim();
    const password = process.env.DATABASE_PASSWORD ?? "";
    const database = process.env.DATABASE_NAME!.trim();
    const port = Number(process.env.DATABASE_PORT || 3306);

    sharedPool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60_000,
      enableKeepAlive: true,
    });
  }

  return sharedPool;
}

export async function saveLead(input: {
  source: LeadSource;
  name: string | null;
  phone: string;
  answers?: Record<string, string> | null;
  userAgent?: string | null;
  pageUrl?: string | null;
}): Promise<SaveLeadResult> {
  const pool = getPool();
  if (!pool) {
    return { ok: false, reason: "not_configured" };
  }

  const answersJson =
    input.answers && Object.keys(input.answers).length > 0
      ? JSON.stringify(input.answers)
      : null;

  const userAgent =
    input.userAgent != null && input.userAgent !== ""
      ? input.userAgent.slice(0, 512)
      : null;
  const pageUrl =
    input.pageUrl != null && input.pageUrl !== ""
      ? input.pageUrl.slice(0, 2048)
      : null;

  try {
    await pool.execute(
      `INSERT INTO leads (source, name, phone, answers_json, user_agent, page_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        input.source,
        input.name,
        input.phone,
        answersJson,
        userAgent,
        pageUrl,
      ]
    );
    return { ok: true };
  } catch (err) {
    console.error("[leads] insert failed", err);
    return { ok: false, reason: "db_error" };
  }
}
