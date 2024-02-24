import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register page',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
