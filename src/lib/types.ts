import type { LucideIcon } from 'lucide-react';

export interface Module {
  id: string;
  title: string;
  icon: LucideIcon;
  imageUrl: string;
  width: number;
  height: number;
  unlocksAt?: number; // Number of modules to complete before this one is unlocked
}
