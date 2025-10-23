import type { ReactNode } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(119,141,169,0.3),rgba(255,255,255,0))]"></div>
      <div className="mb-8 flex flex-col items-center">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            🌙 Código Do Sono
          </h1>
        </Link>
      </div>
      {children}
    </main>
  );
}
