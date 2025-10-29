import { BookOpen, FileText, Video, ClipboardCheck } from 'lucide-react';
import type { Module } from '@/lib/types';

// Agora `bonuses` usa a mesma estrutura de `Module` para consistência visual.
export const bonuses: Module[] = [
  {
    id: 'bonus-1',
    title: 'Planilha Semanal',
    icon: ClipboardCheck,
    imageUrl: 'https://i.imgur.com/3Z3gYwP.png', 
    width: 1080,
    height: 1620,
  },
  {
    id: 'bonus-2',
    title: 'Checklist Diário',
    icon: FileText,
    imageUrl: 'https://i.imgur.com/your-checklist-image.png', // Placeholder
    width: 1080,
    height: 1920,
  },
];
