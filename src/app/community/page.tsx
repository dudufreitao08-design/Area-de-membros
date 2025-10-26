'use client';

import React from 'react';
import { Hourglass, Users } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/header';

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      <main className="flex flex-1 flex-col items-center bg-gradient-to-b from-[#0b132b] to-[#1c2541] p-4 pt-12 pb-28 md:p-6 md:pb-32 lg:p-8 lg:pb-32">
        <div className="w-full max-w-2xl">
          <div className="mb-8 flex flex-col items-center text-center">
            <Users className="mb-4 h-12 w-12 text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.6)]" />
            <h1 className="text-4xl font-bold text-foreground">Comunidade</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Nosso ponto de encontro para aprendizado e troca de ideias.
            </p>
          </div>

          <div className="relative flex flex-col items-center justify-center rounded-xl bg-black/20 p-8 text-center backdrop-blur-sm md:p-16">
            <Hourglass
              className="mb-6 animate-[pulse-glow_4s_ease-in-out_infinite] text-primary"
              size={48}
              style={{
                filter: 'drop-shadow(0 0 10px hsl(var(--primary) / 0.6))',
              }}
            />
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Estamos preparando algo
              <span className="text-primary"> incrível </span>
              para você!
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Em breve, você poderá se conectar, tirar dúvidas e compartilhar experiências.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}