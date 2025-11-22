"use client";
import { authClient } from "@/lib/auth/auth-clients";
import { Session } from "better-auth";
import Link from "next/link";
import { useEffect, useState } from "react";

function NavBar() {
  const [user, setUser] = useState<Session | null>(null);
  useEffect(() => {
    async function sessionCall() {
      const { data: sessionData } = await authClient.getSession();
      if (sessionData?.session) {
        setUser(sessionData?.session);
      }
    }
    sessionCall();
  }, []);
  return (
    <div className=" px-2 py-1.5 flex justify-between items-center">
      <div>
        <h1 className=" text-green-400 text-2xl font-bold">
          Coder<span className="text-amber-400">Blog</span>
        </h1>
      </div>
      {user ? (
        <div>
          {" "}
          <Link className=" text-blue-800 underline" href={"/dashboard"}>
            Dashboard
          </Link>
        </div>
      ) : (
        <div className=" px-2 font-semibold">
          <Link className=" text-blue-800 underline" href={"/sign-in"}>
            Sign In
          </Link>
          <span className=" mx-4  inline-block">|</span>
          <Link className=" text-blue-800 underline" href={"/sign-up"}>
            Join as author
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;
