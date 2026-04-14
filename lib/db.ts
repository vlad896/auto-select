import mysql from "mysql2/promise";
import { logError, logWarn, maskPhone } from "@/lib/logger";

export type LeadSource = "contact" | "quiz";
export type LeadStatus = "new" | "in_progress" | "won" | "lost";

export type SaveLeadResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "db_error" };

type DbLeadRow = mysql.RowDataPacket & {
  id: number;
  source: LeadSource;
  status: LeadStatus;
  assignee: string | null;
  name: string | null;
  phone: string;
  answers_json: string | null;
  user_agent: string | null;
  page_url: string | null;
  created_at: Date;
};

type DbLeadEventRow = mysql.RowDataPacket & {
  id: number;
  lead_id: number;
  event_type: "created" | "status_changed" | "note_added" | "assigned";
  event_data: string | null;
  actor: string | null;
  created_at: Date;
};

type DbLeadNoteRow = mysql.RowDataPacket & {
  id: number;
  lead_id: number;
  note: string;
  author: string | null;
  created_at: Date;
};

export type LeadListItem = {
  id: number;
  source: LeadSource;
  status: LeadStatus;
  assignee: string | null;
  name: string | null;
  phone: string;
  createdAt: string;
};

export type LeadDetails = LeadListItem & {
  answers: Record<string, string> | null;
  userAgent: string | null;
  pageUrl: string | null;
  events: Array<{
    id: number;
    eventType: DbLeadEventRow["event_type"];
    actor: string | null;
    createdAt: string;
    data: Record<string, unknown> | null;
  }>;
  notes: Array<{
    id: number;
    note: string;
    author: string | null;
    createdAt: string;
  }>;
};

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
  requestId?: string;
}): Promise<SaveLeadResult> {
  const pool = getPool();
  if (!pool) {
    logWarn("lead.db.not_configured", {
      requestId: input.requestId,
      source: input.source,
      phone: maskPhone(input.phone),
      hasAnswers: Boolean(input.answers && Object.keys(input.answers).length > 0),
    });
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
    const [result] = await pool.execute<mysql.ResultSetHeader>(
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
    const leadId = result.insertId;
    await pool.execute(
      `INSERT INTO lead_events (lead_id, event_type, event_data, actor)
       VALUES (?, 'created', ?, 'system')`,
      [
        leadId,
        JSON.stringify({
          source: input.source,
          phone: input.phone,
        }),
      ]
    );
    return { ok: true };
  } catch (err) {
    logError("lead.db.insert_failed", err, {
      requestId: input.requestId,
      source: input.source,
      phone: maskPhone(input.phone),
      hasAnswers: Boolean(input.answers && Object.keys(input.answers).length > 0),
      hasUserAgent: Boolean(userAgent),
      pageUrl,
    });
    return { ok: false, reason: "db_error" };
  }
}

function parseJsonObject(value: string | null): Record<string, unknown> | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

function toIso(value: Date): string {
  return value.toISOString();
}

export async function listLeads(limit = 100): Promise<LeadListItem[]> {
  const pool = getPool();
  if (!pool) return [];

  try {
    const [rows] = await pool.query<DbLeadRow[]>(
      `SELECT id, source, status, assignee, name, phone, created_at
       FROM leads
       ORDER BY created_at DESC
       LIMIT ?`,
      [limit]
    );

    return rows.map((row) => ({
      id: row.id,
      source: row.source,
      status: row.status,
      assignee: row.assignee,
      name: row.name,
      phone: row.phone,
      createdAt: toIso(row.created_at),
    }));
  } catch (err) {
    logError("lead.db.list_failed", err, { limit });
    return [];
  }
}

export async function getLeadById(leadId: number): Promise<LeadDetails | null> {
  const pool = getPool();
  if (!pool) return null;

  try {
    const [leadRows] = await pool.query<DbLeadRow[]>(
      `SELECT id, source, status, assignee, name, phone, answers_json, user_agent, page_url, created_at
       FROM leads
       WHERE id = ?
       LIMIT 1`,
      [leadId]
    );
    const lead = leadRows[0];
    if (!lead) return null;

    const [eventRows] = await pool.query<DbLeadEventRow[]>(
      `SELECT id, lead_id, event_type, event_data, actor, created_at
       FROM lead_events
       WHERE lead_id = ?
       ORDER BY created_at DESC, id DESC`,
      [leadId]
    );

    const [noteRows] = await pool.query<DbLeadNoteRow[]>(
      `SELECT id, lead_id, note, author, created_at
       FROM lead_notes
       WHERE lead_id = ?
       ORDER BY created_at DESC, id DESC`,
      [leadId]
    );

    return {
      id: lead.id,
      source: lead.source,
      status: lead.status,
      assignee: lead.assignee,
      name: lead.name,
      phone: lead.phone,
      createdAt: toIso(lead.created_at),
      answers: (parseJsonObject(lead.answers_json) as Record<string, string> | null),
      userAgent: lead.user_agent,
      pageUrl: lead.page_url,
      events: eventRows.map((row) => ({
        id: row.id,
        eventType: row.event_type,
        actor: row.actor,
        createdAt: toIso(row.created_at),
        data: parseJsonObject(row.event_data),
      })),
      notes: noteRows.map((row) => ({
        id: row.id,
        note: row.note,
        author: row.author,
        createdAt: toIso(row.created_at),
      })),
    };
  } catch (err) {
    logError("lead.db.details_failed", err, { leadId });
    return null;
  }
}

export async function updateLeadStatus(input: {
  leadId: number;
  status: LeadStatus;
  actor?: string | null;
}): Promise<boolean> {
  const pool = getPool();
  if (!pool) return false;

  try {
    await pool.execute(
      `UPDATE leads
       SET status = ?
       WHERE id = ?`,
      [input.status, input.leadId]
    );
    await pool.execute(
      `INSERT INTO lead_events (lead_id, event_type, event_data, actor)
       VALUES (?, 'status_changed', ?, ?)`,
      [
        input.leadId,
        JSON.stringify({ status: input.status }),
        input.actor ?? "admin",
      ]
    );
    return true;
  } catch (err) {
    logError("lead.db.update_status_failed", err, {
      leadId: input.leadId,
      status: input.status,
      actor: input.actor ?? "admin",
    });
    return false;
  }
}

export async function addLeadNote(input: {
  leadId: number;
  note: string;
  author?: string | null;
}): Promise<boolean> {
  const pool = getPool();
  if (!pool) return false;

  const note = input.note.trim();
  if (!note) return false;

  try {
    await pool.execute(
      `INSERT INTO lead_notes (lead_id, note, author)
       VALUES (?, ?, ?)`,
      [input.leadId, note, input.author ?? "admin"]
    );
    await pool.execute(
      `INSERT INTO lead_events (lead_id, event_type, event_data, actor)
       VALUES (?, 'note_added', ?, ?)`,
      [
        input.leadId,
        JSON.stringify({ notePreview: note.slice(0, 120) }),
        input.author ?? "admin",
      ]
    );
    return true;
  } catch (err) {
    logError("lead.db.add_note_failed", err, {
      leadId: input.leadId,
      author: input.author ?? "admin",
    });
    return false;
  }
}

export async function checkAndStoreRateLimitHit(input: {
  clientIp: string;
  windowMs: number;
  maxPerWindow: number;
}): Promise<boolean | null> {
  const pool = getPool();
  if (!pool) return null;

  const windowSeconds = Math.max(1, Math.floor(input.windowMs / 1000));
  type CountRow = mysql.RowDataPacket & { cnt: number };

  try {
    const [rows] = await pool.query<CountRow[]>(
      `SELECT COUNT(*) AS cnt
       FROM lead_rate_limit_hits
       WHERE client_ip = ?
         AND created_at >= (NOW() - INTERVAL ? SECOND)`,
      [input.clientIp, windowSeconds]
    );
    const count = Number(rows[0]?.cnt ?? 0);
    if (count >= input.maxPerWindow) {
      return false;
    }

    await pool.execute(
      `INSERT INTO lead_rate_limit_hits (client_ip)
       VALUES (?)`,
      [input.clientIp]
    );
    await pool.execute(
      `DELETE FROM lead_rate_limit_hits
       WHERE created_at < (NOW() - INTERVAL 7 DAY)`
    );
    return true;
  } catch (err) {
    logError("lead.db.rate_limit_check_failed", err, {
      clientIp: input.clientIp,
      windowMs: input.windowMs,
      maxPerWindow: input.maxPerWindow,
    });
    return null;
  }
}
