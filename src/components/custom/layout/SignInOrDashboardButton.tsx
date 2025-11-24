"use client";
import { Button } from "@/components/ui/button";
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
    <>
      {user ? (
        <Link href={"/dashboard"}>
          <Button className="hidden md:flex rounded-full px-6">
            Dashboard
          </Button>
        </Link>
      ) : (
        <Link href={"/sign-in"}>
          <Button className="hidden md:flex rounded-full px-6">Sign In</Button>
        </Link>
      )}
    </>
  );
}

export default NavBar;
