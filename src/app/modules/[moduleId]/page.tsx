'use client';

import { useParams } from 'next/navigation';
import { DashboardHeader } from '@/components/dashboard/header';
import { modules } from '@/lib/modules';
import { FullPageLoader } from '@/components/ui/loader';

export default function ModulePage() {
  const params = useParams();
  const moduleId = params.moduleId as string;

  const module = modules.find((m) => m.id === moduleId);

  if (!module) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <p>Módulo não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(119,141,169,0.1),rgba(255,255,255,0))]"></div>
      <DashboardHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
          <h1 className="text-4xl font-bold">{module.title}</h1>
          <p className="text-lg text-muted-foreground">
            Conteúdo da aula aqui...
          </p>
        </div>
      </main>
    </div>
  );
}
