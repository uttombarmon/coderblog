import { authClient } from "@/lib/auth/auth-clients";

export default async function signInEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await authClient.signIn.email({
    email: email, // required
    password: password, // required
    rememberMe: true,
    callbackURL: "/",
  });
  if (error) {
    console.log("emailSignIn:", error);
    return error;
  }
  return data;
}
