import { randomUUID } from "crypto";

type LogLevel = "info" | "warn" | "error";
type LogFields = Record<string, unknown>;

function serializeError(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    const extended = error as Error & {
      code?: string;
      errno?: number;
      sqlState?: string;
      sqlMessage?: string;
    };

    return {
      name: extended.name,
      message: extended.message,
      stack: extended.stack,
      code: extended.code,
      errno: extended.errno,
      sqlState: extended.sqlState,
      sqlMessage: extended.sqlMessage,
    };
  }

  return {
    message: typeof error === "string" ? error : "Unknown error",
  };
}

function writeLog(level: LogLevel, event: string, fields: LogFields = {}): void {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    event,
    ...fields,
  };

  const line = JSON.stringify(payload);

  if (level === "error") {
    console.error(line);
    return;
  }

  if (level === "warn") {
    console.warn(line);
    return;
  }

  console.info(line);
}

export function createRequestId(): string {
  return randomUUID();
}

export function maskPhone(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const trimmed = phone.trim();
  if (!trimmed) return null;
  if (trimmed.length <= 4) return "*".repeat(trimmed.length);
  return `${"*".repeat(trimmed.length - 4)}${trimmed.slice(-4)}`;
}

export function logInfo(event: string, fields?: LogFields): void {
  writeLog("info", event, fields);
}

export function logWarn(event: string, fields?: LogFields): void {
  writeLog("warn", event, fields);
}

export function logError(event: string, error: unknown, fields?: LogFields): void {
  writeLog("error", event, {
    ...fields,
    error: serializeError(error),
  });
}
