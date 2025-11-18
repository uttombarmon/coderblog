import emailjs, { EmailJSResponseStatus } from "@emailjs/nodejs";
export default async function SendVerifyEmail(
  fullName: string,
  email: string,
  url: string
) {
  if (
    process.env.SERVICE_ID &&
    process.env.TEMPLATE_ID &&
    process.env.USER_ID &&
    process.env.PRIVATE_KEY
  ) {
    try {
      const response = await emailjs.send(
        process.env.SERVICE_ID,
        process.env.TEMPLATE_ID,
        {
          username: fullName,
          email: email,
          verification_link: url,
        },
        {
          publicKey: process.env.USER_ID,
          privateKey: process.env.PRIVATE_KEY,
        }
      );
      console.log("mail api calling:", response);
    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        console.log("EMAILJS FAILED...", err);
        return;
      }

      console.log("ERROR", err);
    }
  } else {
    console.log("not find env");
  }
  return;
}
