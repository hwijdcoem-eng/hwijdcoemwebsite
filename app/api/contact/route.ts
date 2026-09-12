import { NextResponse } from "next/server";
import { Resend } from "resend";
import { logger } from "../../../utils/logger";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis if env vars are present
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

// Create a new ratelimiter, that allows 3 requests per 30 minutes
const ratelimit = redis ? new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "30 m"),
  analytics: true,
}) : null;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // Get IP for rate limiting
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    
    // Apply Rate Limiting
    if (ratelimit) {
      const { success, limit, reset, remaining } = await ratelimit.limit(ip);
      if (!success) {
        logger.warn("Rate limit exceeded on contact form", { ip, remaining, reset });
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { 
            status: 429,
            headers: {
              "X-RateLimit-Limit": limit.toString(),
              "X-RateLimit-Remaining": remaining.toString(),
              "X-RateLimit-Reset": reset.toString()
            }
          }
        );
      }
    }

    const { email, message } = await req.json();

    if (!email || !message) {
      logger.warn("Contact form missing required fields", { ip, emailProvided: !!email, messageProvided: !!message });
      return NextResponse.json({ error: "Email and message are required." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      logger.error("Resend API key is not configured on the server", { ip });
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
      logger.error("Failed to send email via Resend", { ip, email, error });
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    logger.info("Email sent successfully via Resend", { ip, email });
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    logger.error("Unhandled error in contact API route", { error: error.message });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
