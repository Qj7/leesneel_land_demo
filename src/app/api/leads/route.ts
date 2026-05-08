import { NextResponse } from "next/server";

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

  console.log("New lead:", {
    name: data.name,
    email: data.email,
    sport: data.sport,
    submittedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
