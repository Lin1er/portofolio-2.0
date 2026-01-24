import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { ClientEmail } from "@/components/email-templates/client";
import { personalInfo } from "@/data";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validasi input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <portofolioLin1er@resend.dev>",
      to: personalInfo.email,
      replyTo: email,
      subject: `New message from ${name}`,
      react: ClientEmail({
        clientName: name,
        clientEmail: email,
        message: message,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
