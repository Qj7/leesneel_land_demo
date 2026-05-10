import { NextResponse } from "next/server";

import {
  appendLeadToGoogleSheet,
  validateGoogleSheetsEnvForRequest,
} from "@/lib/google-sheets";

export const runtime = "nodejs";

type LeadPayload = {
  name?: string;
  email?: string;
  sport?: string;
};

export async function POST(request: Request) {
  const data = (await request.json()) as LeadPayload;

  if (!data.name || !data.email || !data.sport) {
    return NextResponse.json(
      { ok: false, message: "Missing required fields." },
      { status: 400 },
    );
  }

  const submittedAt = new Date().toISOString();

  console.log("New lead:", {
    name: data.name,
    email: data.email,
    sport: data.sport,
    submittedAt,
  });

  const sheetsConfigError = validateGoogleSheetsEnvForRequest();
  if (sheetsConfigError) {
    return NextResponse.json(
      { ok: false, message: sheetsConfigError },
      { status: 500 },
    );
  }

  const sheetsUrl = process.env.GOOGLE_SHEETS_DOCUMENT_URL?.trim();
  let sheetsOutcome: "skipped" | "written" = "skipped";

  if (sheetsUrl) {
    try {
      await appendLeadToGoogleSheet({
        name: data.name,
        email: data.email,
        sport: data.sport,
        submittedAt,
      });
      sheetsOutcome = "written";
      if (process.env.NODE_ENV === "development") {
        console.info("[api/leads] Google Sheets: строка добавлена.");
      }
    } catch (error) {
      console.error("Google Sheets append failed:", error);
      return NextResponse.json(
        {
          ok: false,
          message:
            "Не удалось сохранить заявку в таблицу. Проверьте доступ сервисного аккаунта к документу и включённый Google Sheets API.",
          ...(process.env.NODE_ENV === "development" && {
            _debug: { sheets: "error" as const },
          }),
        },
        { status: 502 },
      );
    }
  } else if (process.env.NODE_ENV === "development") {
    console.warn(
      "[api/leads] Google Sheets отключён: задайте GOOGLE_SHEETS_DOCUMENT_URL и ключ в .env.local в корне проекта, перезапустите `npm run dev`.",
    );
  }

  return NextResponse.json({
    ok: true,
    ...(process.env.NODE_ENV === "development" && {
      _debug: { sheets: sheetsOutcome },
    }),
  });
}
