import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'login page',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
