'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import {
  User as UserIcon,
  Info,
  LogOut,
  Settings as SettingsIcon,
} from 'lucide-react';

import { useAuth, useUser } from '@/firebase';
import { DashboardHeader } from '@/components/dashboard/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  const auth = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      <main className="flex flex-1 flex-col items-center bg-gradient-to-b from-[#0b132b] to-[#1c2541] p-4 pt-12 pb-28 md:p-6 md:pb-32 lg:p-8 lg:pb-32">
        <div className="w-full max-w-2xl">
          <div className="mb-8 flex flex-col items-center text-center">
            <SettingsIcon className="mb-4 h-12 w-12 text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.6)]" />
            <h1 className="text-4xl font-bold text-foreground">
              Configurações
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Gerencie suas preferências e configurações
            </p>
          </div>

          {/* Profile Card */}
          <Card className="mb-8 border-none bg-[#16213e]/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                  <UserIcon className="h-6 w-6 text-accent" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Perfil</h2>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Usuário Logado</p>
                  <p className="font-medium text-foreground">{user?.email}</p>
                </div>
                <Separator className="bg-border/50" />
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Situação</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#00ff85]"></div>
                    <p className="font-medium text-[#00ff85]">Conectado</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Information Block */}
          <Card className="border-none bg-[#16213e]/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                  <Info className="h-6 w-6 text-accent" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Informações</h2>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Versão do aplicativo</p>
                  <p className="font-medium text-accent">1.0.0</p>
                </div>
                <Separator className="bg-border/50" />
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">Última atualização</p>
                  <p className="font-medium text-accent">Hoje</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <Button
              onClick={handleLogout}
              className="w-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/20 hover:text-yellow-300"
              variant="outline"
              size="lg"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sair da Conta
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
