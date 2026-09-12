import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json({ error: "Email and message are required." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Resend API key is not configured on the server." }, { status: 500 });
    }

    const recipientEmail = process.env.CONTACT_EMAIL || "hwijdcoem@gmail.com"; 

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // Requires verified domain in production, onboarding works for testing
      to: [recipientEmail],
      replyTo: email,
      subject: `New Message from ${email} via HWI JDCOEM Platform`,
      html: `
        <h2>Incoming Transmission</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
