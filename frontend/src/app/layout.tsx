import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "MONITRIACH CORE | Autonomous AI Sales Operating System",
  description: "Enterprise Autonomous AI Sales Operating System foundation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-slate-50 antialiased selection:bg-slate-900 selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
