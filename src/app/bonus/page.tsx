'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { bonuses } from '@/lib/bonuses';
import { ModuleCard } from '@/components/dashboard/module-card';
import { Gift } from 'lucide-react';

export default function BonusPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(119,141,169,0.1),rgba(255,255,255,0))]"></div>
      <DashboardHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 pb-28 md:gap-8 md:p-6 md:pb-32 lg:p-8 lg:pb-32">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-4">
          <div className="flex items-center gap-3">
            <Gift className="h-8 w-8 text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
            <h1 className="text-3xl font-semibold">Conteúdos Extras</h1>
          </div>
          <p className="text-muted-foreground">
            Aproveite os materiais exclusivos que preparamos para você.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 items-start gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bonuses.map((bonus) => (
            <ModuleCard
              key={bonus.id}
              module={bonus}
              isCompleted={false} // Bônus não têm estado de "concluído"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
