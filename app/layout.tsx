import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Javascript Code Buddy",
  description: "",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
