"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-card border-slate-200">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>Enter your email to receive recovery instructions</CardDescription>
        </CardHeader>

        {submitted ? (
          <CardContent className="space-y-4 text-center py-6">
            <div className="rounded-full bg-emerald-100 text-emerald-600 p-3 w-12 h-12 mx-auto flex items-center justify-center">
              ✓
            </div>
            <p className="text-sm text-slate-700">Password reset instructions have been sent to your email.</p>
            <Link href="/login" className="inline-block text-xs font-semibold text-slate-900 hover:underline pt-2">
              Return to Login
            </Link>
          </CardContent>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Work Email</label>
                <Input type="email" placeholder="architect@acme.com" required />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
              <Link href="/login" className="text-center text-xs text-slate-500 hover:underline">
                Back to Sign In
              </Link>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
