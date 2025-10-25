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
    imageUrl: 'https://i.imgur.com/Q85eFe9.png',
    width: 1080,
    height: 1920,
  },
  {
    id: 'module-3',
    title: 'Implementação',
    icon: ClipboardCheck,
    imageUrl: 'https://i.imgur.com/s7yDBcs.png',
    width: 1080,
    height: 1920,
  },
  {
    id: 'module-4',
    title: 'Testes',
    icon: FlaskConical,
    imageUrl: 'https://i.imgur.com/sJ4ziEh.png',
    width: 1080,
    height: 1920,
  },
  {
    id: 'module-5',
    title: 'Escala',
    icon: TrendingUp,
    imageUrl: 'https://i.imgur.com/O8YrCC8.png',
    width: 1080,
    height: 1920,
  },
];
