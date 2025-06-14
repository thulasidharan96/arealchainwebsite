import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

interface SendEmailRequestBody {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

interface SendEmailResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SendEmailResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { to, subject, text, html } = req.body as SendEmailRequestBody;

    // Configure your email transporter
    const transporter = nodemailer.createTransport({
      // Your email configuration
      service: "gmail", // or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
}
