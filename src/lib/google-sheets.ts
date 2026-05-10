import { readFileSync } from "fs";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

/** Извлекает spreadsheetId из URL вида https://docs.google.com/spreadsheets/d/ID/... */
export function extractSpreadsheetId(documentUrl: string): string | null {
  const match = documentUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match?.[1] ?? null;
}

function escapeSheetNameForRange(tab: string): string {
  if (/^[A-Za-z0-9_]+$/.test(tab)) return tab;
  return `'${tab.replace(/'/g, "''")}'`;
}

function looksLikeHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value.trim());
}

function loadServiceAccountCredentials(): Record<string, unknown> {
  const inline = process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim();
  if (inline) {
    try {
      return JSON.parse(inline) as Record<string, unknown>;
    } catch {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON не является корректным JSON.");
    }
  }

  const path = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  if (path) {
    if (looksLikeHttpUrl(path)) {
      throw new Error(
        "GOOGLE_APPLICATION_CREDENTIALS должен быть путём к локальному JSON-файлу ключа сервисного аккаунта, а не ссылкой на Google Таблицу.",
      );
    }
    try {
      const raw = readFileSync(path, "utf8");
      return JSON.parse(raw) as Record<string, unknown>;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      throw new Error(
        `Не удалось прочитать GOOGLE_APPLICATION_CREDENTIALS (${path}): ${msg}`,
      );
    }
  }

  throw new Error(
    "Не заданы учётные данные: GOOGLE_APPLICATION_CREDENTIALS или GOOGLE_SERVICE_ACCOUNT_JSON.",
  );
}

/**
 * Если задана GOOGLE_SHEETS_DOCUMENT_URL, проверяем остальное окружение.
 * Возвращает текст ошибки или null, если всё в порядке / таблица не используется.
 */
export function validateGoogleSheetsEnvForRequest(): string | null {
  const url = process.env.GOOGLE_SHEETS_DOCUMENT_URL?.trim();
  if (!url) return null;

  if (!extractSpreadsheetId(url)) {
    return "GOOGLE_SHEETS_DOCUMENT_URL: не удалось извлечь ID таблицы (ожидается …/spreadsheets/d/SPREADSHEET_ID/…).";
  }

  const hasCreds =
    Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_JSON?.trim()) ||
    Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim());

  if (!hasCreds) {
    return "Для записи в Google Таблицу задайте GOOGLE_APPLICATION_CREDENTIALS или GOOGLE_SERVICE_ACCOUNT_JSON.";
  }

  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  if (credPath && looksLikeHttpUrl(credPath)) {
    return "GOOGLE_APPLICATION_CREDENTIALS: укажите путь к файлу .json с ключом сервисного аккаунта, не URL таблицы.";
  }

  try {
    loadServiceAccountCredentials();
  } catch (e) {
    return e instanceof Error ? e.message : "Неверные учётные данные Google.";
  }

  return null;
}

export async function appendLeadToGoogleSheet(row: {
  name: string;
  email: string;
  sport: string;
  submittedAt: string;
}): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_DOCUMENT_URL?.trim();
  const spreadsheetId = url ? extractSpreadsheetId(url) : null;
  if (!url || !spreadsheetId) {
    throw new Error("GOOGLE_SHEETS_DOCUMENT_URL не задан или без ID таблицы.");
  }

  const tab = process.env.GOOGLE_SHEETS_TAB_NAME?.trim() || "Sheet1";
  const credentials = loadServiceAccountCredentials();

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: "v4", auth });
  const range = `${escapeSheetNameForRange(tab)}!A:D`;

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[row.name, row.email, row.sport, row.submittedAt]],
    },
  });
}
