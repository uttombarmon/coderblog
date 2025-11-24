"use client";

import signUpEmail from "@/clientApis/auth/signupEmail";
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
import { User, Mail, Lock, AtSign, ArrowRight, Github } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export function SignUpCard() {
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
      const response = await signUpEmail(data);
      if (
        response &&
        response !== null &&
        "user" in response &&
        response.user
      ) {
        toast.success("Account created successfully");
        redirect(`/verify?e=${response.user.email}`);
      }
      console.log("Sign Up Attempted", response);
    });
  };

  return (
    <Card className="w-full max-w-md border-none shadow-2xl bg-background/60 backdrop-blur-xl">
      <CardHeader className="space-y-1 text-center pb-8">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Create Account
        </CardTitle>
        <CardDescription className="text-base">
          Join our community of developers and writers
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSignUp}>
        <CardContent className="grid gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  name="userName"
                  type="text"
                  placeholder="jdoe"
                  className="pl-10 h-11 bg-muted/50 border-muted-foreground/20 focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10 h-11 bg-muted/50 border-muted-foreground/20 focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>
          </div>

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
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Min 8 characters"
                className="pl-10 h-11 bg-muted/50 border-muted-foreground/20 focus:border-primary transition-colors"
                required
              />
            </div>
          </div>

          <Button
            disabled={isPending}
            className="w-full h-11 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all mt-2"
          >
            Create Account <ArrowRight className="ml-2 h-4 w-4" />
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
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-primary font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
