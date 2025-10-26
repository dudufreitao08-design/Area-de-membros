'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import {
  User,
  Info,
  ShieldCheck,
  ChevronRight,
  LogOut,
  Settings as SettingsIcon,
} from 'lucide-react';

import { useAuth } from '@/firebase';
import { DashboardHeader } from '@/components/dashboard/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const settingsItems = [
  { icon: User, title: 'Perfil', description: 'Veja e edite seus dados' },
  { icon: ShieldCheck, title: 'Segurança', description: 'Altere sua senha' },
];

export default function SettingsPage() {
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      <main className="flex flex-1 flex-col items-center bg-gradient-to-b from-[#0b132b] to-[#1c2541] p-4 pt-12 md:p-6 lg:p-8">
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

          <Card className="border-none bg-[#16213e]/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                {settingsItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex cursor-pointer items-center rounded-lg p-4 transition-colors hover:bg-white/5"
                  >
                    <item.icon className="mr-4 h-6 w-6 text-accent" />
                    <div className="flex-grow">
                      <p className="font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Information Block */}
          <Card className="mt-8 border-none bg-[#16213e]/50 backdrop-blur-sm">
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
