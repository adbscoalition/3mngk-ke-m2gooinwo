import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Charlotte Star Calculator",
  description: "Calculate Charlotteverse stellar profiles from CLT and legal surname inputs.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
