import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Save to Firestore
    await adminDb.collection("contacts").add({
      name,
      email,
      message,
      createdAt: FieldValue.serverTimestamp(),
    });

    // Send Email Notification
    await resend.emails.send({
      from: "Scalez <onboarding@resend.dev>",
      to: ["rajkshitij876@gmail.com"],
      subject: "🚀 New Contact Form Submission",
      html: `
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
