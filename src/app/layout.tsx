import './globals.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Inter } from 'next/font/google';

import { theme } from '#theme.ts';

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  description: 'Full-stack task management app',
  title: 'Task Manager',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
