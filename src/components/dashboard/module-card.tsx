import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

import type { Module } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ModuleCardProps {
  module: Module;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export function ModuleCard({ module, isCompleted, onToggleComplete }: ModuleCardProps) {
  const Icon = module.icon;
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden border-2 border-transparent bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 z-10">
        <CardTitle className="text-lg font-medium">{module.title}</CardTitle>
        <Icon className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between pt-0 z-10">
        <div className="flex-grow"></div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isCompleted && (
              <>
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">Concluído</span>
              </>
            )}
          </div>
          <Button
            variant={isCompleted ? 'secondary' : 'default'}
            size="sm"
            onClick={onToggleComplete}
          >
            {isCompleted ? 'Desmarcar' : 'Concluir'}
          </Button>
        </div>
      </CardContent>
      <Image
        src={module.imageUrl}
        alt={module.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {isCompleted && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent z-10"></div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 transition-opacity group-hover:from-black/70 z-0"></div>
    </Card>
  );
}
