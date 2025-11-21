import { SignInCard } from "@/components/custom/auth/SignInCard";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  // console.log(session);
  if (session) {
    redirect("/");
  }
  return (
    <div className=" min-h-screen min-w-screen flex justify-center items-center">
      <SignInCard />
    </div>
  );
};

export default page;
