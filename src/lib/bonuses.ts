import { BookOpen, FileText, Video, ClipboardCheck } from 'lucide-react';
import type { Module } from '@/lib/types';

// Agora `bonuses` usa a mesma estrutura de `Module` para consistência visual.
export const bonuses: Module[] = [
  {
    id: 'bonus-1',
    title: 'Planilha Semanal',
    icon: ClipboardCheck,
    imageUrl: 'https://i.imgur.com/your-spreadsheet-image.png', // Placeholder, a ser substituído
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
