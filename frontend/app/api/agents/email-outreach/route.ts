import { NextResponse } from "next/server";

export const runtime = "nodejs"; // 🔥 IMPORTANT

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      "http://localhost:5000/api/agents/email-outreach",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const text = await res.text();

    // Forward exact response
    return new NextResponse(text, {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("NEXT API ERROR:", err);
    return NextResponse.json(
      { error: "Email outreach failed", details: err.message },
      { status: 500 }
    );
  }
}
