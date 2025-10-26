'use client';

import { Users, Wifi, MessageCircle } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/header';

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      <main className="flex flex-1 items-center justify-center bg-gradient-to-b from-[#0b132b] to-[#1c2541] p-4">
        <div className="relative w-full max-w-4xl text-center">
          <div className="absolute inset-0 z-0 opacity-10">
            {[...Array(5)].map((_, i) => (
              <>
                <Users
                  key={`users-${i}`}
                  className="absolute text-blue-400/50"
                  size={(i + 1) * 30}
                  style={{
                    top: `${Math.random() * 80}%`,
                    left: `${Math.random() * 80}%`,
                    animation: `float ${(Math.random() + 3) * 2}s ease-in-out infinite`,
                  }}
                />
                <MessageCircle
                  key={`msg-${i}`}
                  className="absolute text-blue-400/50"
                  size={(i + 1) * 25}
                  style={{
                    top: `${Math.random() * 80}%`,
                    left: `${Math.random() * 80}%`,
                    animation: `float ${(Math.random() + 3) * 2}s ease-in-out infinite alternate`,
                  }}
                />
                 <Wifi
                  key={`wifi-${i}`}
                  className="absolute text-accent/50"
                  size={(i + 1) * 20}
                  style={{
                    top: `${Math.random() * 80}%`,
                    left: `${Math.random() * 80}%`,
                    animation: `float ${(Math.random() + 3) * 2}s ease-in-out infinite`,
                  }}
                />
              </>
            ))}
            <style jsx>{`
              @keyframes float {
                0% {
                  transform: translateY(0px) rotate(0deg);
                }
                50% {
                  transform: translateY(-20px) rotate(5deg);
                }
                100% {
                  transform: translateY(0px) rotate(0deg);
                }
              }
            `}</style>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center rounded-xl bg-black/20 p-8 backdrop-blur-sm md:p-16">
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              Estamos preparando algo
              <span className="text-primary"> incrível </span>
              para você!
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              A área da Comunidade está em desenvolvimento e será o nosso ponto de encontro. Em breve, você poderá se conectar, tirar dúvidas e compartilhar experiências.
            </p>
            <div className="mt-8 h-1 w-24 rounded-full bg-primary"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
