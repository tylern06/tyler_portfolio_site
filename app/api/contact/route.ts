import { Resend } from 'resend';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  let name: string, email: string, message: string;
  try {
    ({ name, email, message } = await req.json());
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!name || !email || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'tynguyen06@gmail.com',
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return Response.json({ error: 'Failed to send email' }, { status: 500 });
    }
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }

  return Response.json({ success: true });
}
