import { FileText, Video } from 'lucide-react';
import type { Bonus } from '@/lib/types';

export const bonuses: Bonus[] = [
  {
    id: 'bonus-1',
    title: 'E-book: A Ciência do Sono',
    description:
      'Um guia completo com as mais recentes descobertas científicas sobre o sono e como aplicá-las para melhorar sua qualidade de vida.',
    icon: FileText,
    cta: 'Baixar PDF',
    href: '#',
  },
  {
    id: 'bonus-2',
    title: 'Vídeo: Meditação Guiada',
    description:
      'Uma sessão de meditação guiada de 15 minutos, projetada especificamente para relaxar a mente e preparar o corpo para uma noite de sono profundo.',
    icon: Video,
    cta: 'Assistir Agora',
    href: '#',
  },
];
