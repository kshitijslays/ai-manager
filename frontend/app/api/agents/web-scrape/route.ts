import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const backendRes = await fetch(
      "http://localhost:5000/api/agents/web-scrape",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await backendRes.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Web scraper proxy failed" },
      { status: 500 }
    );
  }
}
