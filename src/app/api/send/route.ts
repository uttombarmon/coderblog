import { NextRequest, NextResponse } from "next/server";
import { EmailTemplate } from "@/components/send/EmailTamplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest, res: NextResponse) {
  const bodyData = await req.json();
  const { fullName, email, url } = bodyData;

  try {
    const { data, error } = await resend.emails.send({
      from: "CoderBlog <onboarding@coderblog.dev>",
      to: [email],
      subject: "Verify Email",
      react: EmailTemplate({ firstName: fullName.split(" ")[0], url }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
