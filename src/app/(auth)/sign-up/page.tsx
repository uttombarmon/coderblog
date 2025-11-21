import { SignUpCard } from "@/components/custom/auth/SignUpCard";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const page = async() => {
    const session = await auth.api.getSession({ headers: await headers() });
    // console.log(session);
    if (session) {
      redirect("/");
    }
  return (
    <div className=" min-h-screen min-w-screen flex justify-center items-center">
      <SignUpCard />
    </div>
  );
};

export default page;
