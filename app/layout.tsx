import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const fontSans = FontSans ({
  subsets: ["latin"],
  variable: "--font-sans",
})


export const metadata: Metadata = {
  title: "Get In Together",
  description: "A community-driven platform for social good.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#000",
          fontSize: "16px",
        },
      }}
      >
      <html lang="en" suppressContentEditableWarning>
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable
      )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
