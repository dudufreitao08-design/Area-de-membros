import { BookOpen, ClipboardCheck, FlaskConical, Target, TrendingUp } from 'lucide-react';
import type { Module } from '@/lib/types';

export const modules: Module[] = [
  {
    id: 'module-1',
    title: 'Introdução',
    icon: BookOpen,
    imageUrl: 'https://i.imgur.com/5LBLDT3.jpg',
  },
  {
    id: 'module-2',
    title: 'Estratégias',
    icon: Target,
    imageUrl: 'https://i.imgur.com/uhBUeQU.png',
  },
  {
    id: 'module-3',
    title: 'Implementação',
    icon: ClipboardCheck,
    imageUrl: 'https://i.imgur.com/fCfC4kC.png',
  },
  {
    id: 'module-4',
    title: 'Testes',
    icon: FlaskConical,
    imageUrl: 'https://i.imgur.com/ZaqEu4o.png',
  },
  {
    id: 'module-5',
    title: 'Escala',
    icon: TrendingUp,
    imageUrl: 'https://i.imgur.com/QbOBO6V.png',
  },
];
