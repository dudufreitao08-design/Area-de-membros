'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import {
  LogOut,
  User as UserIcon,
  Moon,
  MessageSquare,
  Settings,
  Menu,
  CheckSquare,
  Gift,
} from 'lucide-react';

import { useAuth, useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { href: '/', label: 'Principal', icon: Moon },
  { href: '/completed', label: 'Concluidos', icon: CheckSquare },
  { href: '/bonus', label: 'Bônus', icon: Gift },
  { href: '/community', label: 'Comunidade', icon: MessageSquare },
  { href: '/settings', label: 'Configurações', icon: Settings },
];

export function DashboardHeader() {
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const getInitials = (email: string | null | undefined) => {
    return email ? email.charAt(0).toUpperCase() : <UserIcon className="h-4 w-4" />;
  };

  const NavLink = ({
    item,
    isMobile = false,
  }: {
    item: (typeof navItems)[0];
    isMobile?: boolean;
  }) => {
    const Icon = item.icon;
    const isActive = pathname === item.href;
    return (
      <Link
        href={item.href}
        className={`flex ${isMobile ? 'flex-row items-center gap-4 text-lg' : 'flex-col items-center gap-1.5'} group transition-colors duration-200`}
      >
        <Icon
          className={`h-6 w-6 stroke-[1.5] ${
            isActive
              ? 'text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]'
              : 'text-blue-400 group-hover:text-accent'
          }`}
          style={{ color: isActive ? '#00cfff' : '#00aaff' }}
        />
        <span
          className={`text-xs font-medium ${
            isActive
              ? 'text-white'
              : 'text-secondary group-hover:text-white'
          }`}
        >
          {item.label}
        </span>
      </Link>
    );
  };

  return (
    <header className="fixed bottom-0 z-30 flex h-auto w-full flex-col justify-start">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-[-1] bg-gradient-to-t from-[#0b132b] to-[#1c2541]"></div>
      {/* Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 z-[-1] h-1/2 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-t from-blue-900/20 to-transparent opacity-50 blur-3xl"></div>

      {/* Desktop Navigation */}
      <nav className="relative hidden w-full items-center justify-center border-t border-white/5 bg-transparent px-4 py-2 md:flex">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="flex w-full max-w-4xl items-center justify-between">
          <Link
            href="/"
            className="mr-auto text-xl font-bold tracking-tight text-white"
          >
            🌙 Código Do Sono
          </Link>

          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-12">
            {navItems.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </div>

          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9 border-2 border-transparent group-hover:border-primary">
                    <AvatarImage
                      src={user?.photoURL || ''}
                      alt="User avatar"
                    />
                    <AvatarFallback className="bg-primary/20 font-bold text-primary">
                      {getInitials(user?.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-foreground">
                      Minha Conta
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="flex items-center justify-between p-4 md:hidden">
        <div className="flex flex-grow items-center justify-around">
          {navItems.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="p-0">
                <Menu className="h-6 w-6 text-blue-400" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto rounded-t-2xl border-none bg-[#0b132b] p-6">
              <div className="flex flex-col gap-4 pt-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex w-full items-center justify-start gap-3 p-2 text-left"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={user?.photoURL || ''}
                          alt="User avatar"
                        />
                        <AvatarFallback className="bg-primary/20 font-bold text-primary">
                          {getInitials(user?.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium leading-none text-foreground">
                          Minha Conta
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
