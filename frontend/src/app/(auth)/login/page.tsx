"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-card border-slate-200">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-xl shadow-sm mb-2">
            M
          </div>
          <CardTitle className="text-2xl">MONITRIACH CORE</CardTitle>
          <CardDescription>Enter your credentials to access the Autonomous Sales OS</CardDescription>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Work Email</label>
              <Input type="email" placeholder="architect@monitriach.ai" required defaultValue="architect@monitriach.ai" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <Link href="/forgot-password" className="text-xs font-medium text-slate-900 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input type="password" placeholder="••••••••" required defaultValue="password123" />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Sign In to Cockpit
            </Button>
            <p className="text-center text-xs text-slate-500">
              Don&apos;t have an organization yet?{" "}
              <Link href="/register" className="font-semibold text-slate-900 hover:underline">
                Create Organization
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
