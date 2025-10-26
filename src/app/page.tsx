'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { DashboardHeader } from '@/components/dashboard/header';
import { ModulesGrid } from '@/components/dashboard/modules-grid';
import { FullPageLoader } from '@/components/ui/loader';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return <FullPageLoader />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(119,141,169,0.1),rgba(255,255,255,0))]"></div>
      <DashboardHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 pb-28 md:gap-8 md:p-6 md:pb-32 lg:p-8 lg:pb-32">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-4">
          <h1 className="text-3xl font-semibold">Seu Painel</h1>
        </div>
        <ModulesGrid />
      </main>
    </div>
  );
}
