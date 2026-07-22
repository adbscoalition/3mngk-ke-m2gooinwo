import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Charlotte Star Calculator",
  description:
    "A web-ready Charlotteverse star calculator shell prepared for deployment.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
