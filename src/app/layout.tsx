import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "./providers";

export const metadata: Metadata = {
  title: "FundR Dashboard",
  description: "Financial dashboard for FundR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
