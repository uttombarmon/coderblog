import { authClient } from "@/lib/auth/auth-clients";

export default async function signUpEmail({
  fullName,
  email,
  password,
  username,
}: {
  fullName: string;
  email: string;
  password: string;
  username: string;
}) {
  const { data, error } = await authClient.signUp.email({
    name: fullName, // required
    username: username, // required
    email: email, // required
    password: password, // required
    callbackURL: "/sign-in",
  });
  if (error) {
    console.log("emailSignUp:", error);
    return error;
  }
  return data;
}
