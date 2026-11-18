import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/mongoose";
import Contact from "@/lib/db/models/Contact";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

const escapeHtml = (value: string) => value.replace(/[&<>"\']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "\'": "&#39;",
}[character] || character));

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validate input and prevent oversized/untrusted markup from entering email templates.
    if (typeof name !== "string" || typeof email !== "string" || typeof subject !== "string" || typeof message !== "string" || !name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (name.length > 120 || email.length > 254 || subject.length > 180 || message.length > 6000 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeSubject = escapeHtml(subject.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\r?\n/g, "<br>");

    // Connect to database (optional)
    let contactId: string | undefined = undefined;
    if (process.env.MONGODB_URI) {
      await connectDB();
      const contact = await Contact.create({
        name,
        email,
        subject,
        message,
      });
      contactId = contact._id?.toString();
    }

    let emailSent = false;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
            <p><strong>Message:</strong></p>
            <p>${safeMessage}</p>
          `,
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email.trim(),
          subject: "Thanks for reaching out!",
          html: `
            <h2>Hi ${safeName},</h2>
            <p>Thank you for contacting me! I've received your message and will get back to you as soon as possible.</p>
            <p><strong>Your message:</strong></p>
            <p>${safeMessage}</p>
            <br>
            <p>Best regards,</p>
            <p>Pradeepkumar R</p>
          `,
        });
        emailSent = true;
      } catch (e) {
        console.error("Contact email send error:", e);
      }
    }

    if (!emailSent) {
      const EJ_SERVICE = process.env.EMAILJS_SERVICE_ID;
      const EJ_TEMPLATE_ADMIN = process.env.EMAILJS_TEMPLATE_ID_CONTACT;
      const EJ_TEMPLATE_CONFIRM = process.env.EMAILJS_TEMPLATE_ID_CONTACT_CONFIRM;
      const EJ_USER = process.env.EMAILJS_PUBLIC_KEY;

      if (EJ_SERVICE && EJ_TEMPLATE_ADMIN && EJ_USER) {
        try {
          const ejRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              service_id: EJ_SERVICE,
              template_id: EJ_TEMPLATE_ADMIN,
              user_id: EJ_USER,
              template_params: {
                to_email: process.env.ADMIN_EMAIL || process.env.EMAIL_USER || email,
                from_name: name,
                from_email: email,
                subject,
                message,
              },
            }),
          });
          if (ejRes.ok) emailSent = true;
        } catch (e) {
          console.error("EmailJS admin send error:", e);
        }

        if (!emailSent && EJ_TEMPLATE_CONFIRM) {
          try {
            const ejRes2 = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                service_id: EJ_SERVICE,
                template_id: EJ_TEMPLATE_CONFIRM,
                user_id: EJ_USER,
                template_params: {
                  to_email: email,
                  from_name: "Pradeepkumar R",
                  subject: `Thanks for reaching out!`,
                  message,
                },
              }),
            });
            if (ejRes2.ok) emailSent = true;
          } catch (e) {
            console.error("EmailJS confirm send error:", e);
          }
        }
      }
    }

    if (!emailSent && !contactId) {
      return NextResponse.json(
        { error: "The contact service is not configured yet. Please email Pradeep directly." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        message: emailSent
          ? "Message saved and emails sent."
          : "Message saved. Email not sent (email service not configured).",
        id: contactId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json([]);
    }
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

