import { BookOpen, FileText, Video } from 'lucide-react';
import type { Module } from '@/lib/types';

// Agora `bonuses` usa a mesma estrutura de `Module` para consistência visual.
export const bonuses: Module[] = [
  {
    id: 'bonus-1',
    title: 'E-book: A Ciência do Sono',
    icon: FileText,
    imageUrl: 'https://i.imgur.com/ruddfzX.png',
    width: 1080,
    height: 1620,
  },
  {
    id: 'bonus-2',
    title: 'Vídeo: Meditação Guiada',
    icon: Video,
    imageUrl: 'https://i.imgur.com/gw22k4v.png',
    width: 1080,
    height: 1920,
  },
];
