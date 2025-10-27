import { BookOpen, ClipboardCheck, FlaskConical, Target, TrendingUp } from 'lucide-react';
import type { Module } from '@/lib/types';

export const modules: Module[] = [
  {
    id: 'module-1',
    title: 'Introdução',
    icon: BookOpen,
    imageUrl: 'https://i.imgur.com/it732Id.jpeg',
    width: 1080,
    height: 1620,
  },
  {
    id: 'module-2',
    title: 'Estratégias',
    icon: Target,
    imageUrl: 'https://i.imgur.com/n9bbvWL.jpeg',
    width: 1080,
    height: 1920,
  },
  {
    id: 'module-3',
    title: 'Implementação',
    icon: ClipboardCheck,
    imageUrl: 'https://i.imgur.com/FkV4O1s.jpeg',
    width: 1080,
    height: 1920,
  },
  {
    id: 'module-4',
    title: 'Testes',
    icon: FlaskConical,
    imageUrl: 'https://i.imgur.com/VCBs7FJ.jpeg',
    width: 1080,
    height: 1920,
  },
  {
    id: 'module-5',
    title: 'Escala',
    icon: TrendingUp,
    imageUrl: 'https://i.imgur.com/SATpqQV.jpeg',
    width: 1080,
    height: 1920,
    unlocksAt: 4, // This module unlocks after 4 modules are completed
  },
];
