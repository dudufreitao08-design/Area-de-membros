'use client';

import React from 'react';
import { Hourglass } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/header';
import { FloatingIcons } from '@/components/community/floating-icons';

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      <main className="flex flex-1 items-center justify-center bg-gradient-to-b from-[#0b132b] to-[#1c2541] p-4 pb-28 md:pb-32 lg:pb-32">
        <div className="relative w-full max-w-4xl text-center">
          <FloatingIcons />

          <div className="relative z-10 flex flex-col items-center justify-center rounded-xl bg-black/20 p-8 backdrop-blur-sm md:p-16">
            <Hourglass
              className="mb-6 animate-[pulse-glow_4s_ease-in-out_infinite] text-primary"
              size={48}
              style={{
                filter: 'drop-shadow(0 0 10px hsl(var(--primary) / 0.6))',
              }}
            />
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              Estamos preparando algo
              <span className="text-primary"> incrível </span>
              para você!
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              A área da Comunidade está em desenvolvimento e será o nosso ponto de encontro. Em breve, você poderá se conectar, tirar dúvidas e compartilhar experiências.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
