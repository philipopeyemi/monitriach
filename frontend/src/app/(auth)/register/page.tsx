"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
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
          <CardTitle className="text-2xl">Create Organization</CardTitle>
          <CardDescription>Setup your MONITRIACH CORE workspace</CardDescription>
        </CardHeader>

        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Organization Name</label>
              <Input type="text" placeholder="Acme Enterprise" required />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Full Name</label>
              <Input type="text" placeholder="Lead Engineer" required />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Work Email</label>
              <Input type="email" placeholder="architect@acme.com" required />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Password</label>
              <Input type="password" placeholder="••••••••" required />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Initialize OS & Create Workspace
            </Button>
            <p className="text-center text-xs text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-slate-900 hover:underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
