export default async function SendVerifyEmail(
  fullName: string,
  email: string,
  url: string
) {
  const response = await fetch("/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullName, email, url }),
  });

  return response.json();
}
