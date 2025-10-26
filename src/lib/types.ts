import type { LucideIcon } from 'lucide-react';

export interface Module {
  id: string;
  title: string;
  icon: LucideIcon;
  imageUrl: string;
  width: number;
  height: number;
}

export interface Bonus {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  cta: string;
  href: string;
}
