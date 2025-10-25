import { BookOpen, ClipboardCheck, FlaskConical, Target, TrendingUp } from 'lucide-react';
import type { Module } from '@/lib/types';

export const modules: Module[] = [
  {
    id: 'module-1',
    title: 'Introdução',
    icon: BookOpen,
    imageUrl: 'https://i.imgur.com/mble3SD.png',
    width: 1080,
    height: 1620,
  },
  {
    id: 'module-2',
    title: 'Estratégias',
    icon: Target,
    imageUrl: 'https://i.imgur.com/uhBUeQU.png',
    width: 1080,
    height: 1080,
  },
  {
    id: 'module-3',
    title: 'Implementação',
    icon: ClipboardCheck,
    imageUrl: 'https://i.imgur.com/fCfC4kC.png',
    width: 1080,
    height: 1080,
  },
  {
    id: 'module-4',
    title: 'Testes',
    icon: FlaskConical,
    imageUrl: 'https://i.imgur.com/ZaqEu4o.png',
    width: 1080,
    height: 1080,
  },
  {
    id: 'module-5',
    title: 'Escala',
    icon: TrendingUp,
    imageUrl: 'https://i.imgur.com/QbOBO6V.png',
    width: 1080,
    height: 1080,
  },
];
