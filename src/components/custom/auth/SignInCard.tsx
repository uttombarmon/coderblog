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
import { toast } from "sonner";
import { Mail, Lock, ArrowRight, Github, Loader2 } from "lucide-react";
import { useTransition } from "react";

export function SignInCard() {
  const [isPending, startTransition] = useTransition();
  const handleSignUp = async (e: React.FormEvent) => {
    startTransition(async () => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries()) as {
        fullName: string;
        email: string;
        password: string;
        username: string;
      };
      const response = await signInEmail(data);
      if (
        response &&
        response !== null &&
        "user" in response &&
        response.user
      ) {
        redirect("/");
        toast.success("Sign In Successful");
      }
      console.log("Sign In Attempted", response);
    });
    // console.log("Sign In Attempted");
  };

  return (
    <Card className="w-full max-w-md border-none shadow-2xl bg-background/60 backdrop-blur-xl">
      <CardHeader className="space-y-1 text-center pb-8">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-base">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSignUp}>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                className="pl-10 h-11 bg-muted/50 border-muted-foreground/20 focus:border-primary transition-colors"
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                className="pl-10 h-11 bg-muted/50 border-muted-foreground/20 focus:border-primary transition-colors"
                required
              />
            </div>
          </div>

          <Button
            disabled={isPending}
            className="w-full h-11 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
          >
            Sign In {isPending && <Loader2 className="ml-2 h-4 w-4" />}{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button variant="outline" type="button" className="w-full h-11">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 mt-2">
          <p className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
