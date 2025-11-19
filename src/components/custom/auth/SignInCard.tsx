"use client";

import signInEmail from "@/clientApis/auth/signInEmail";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { redirect } from "next/navigation";

export function SignInCard() {
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const response = await signInEmail(data);
    if (response?.user) {
      redirect("/");
    }
    console.log("Sign In Attempted");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Welcome Back to CoderBlog</CardTitle>
        <CardDescription>
          Enter your email and a password below to browse and write blog posts.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSignUp}>
        <CardContent className="grid gap-4">
          {/* Email Input Field */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="example@mail.com"
              required
            />
          </div>

          {/* Password Input Field */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Min 8 characters"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4 my-2">
          <Button
            variant={"secondary"}
            type="submit"
            className="w-full bg-slate-200 text-slate-800"
          >
            Sign Up
          </Button>

          {/* Link to Sign In */}
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-primary font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
