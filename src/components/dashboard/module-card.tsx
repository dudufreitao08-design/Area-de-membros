import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

import type { Module } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ModuleCardProps {
  module: Module;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export function ModuleCard({
  module,
  isCompleted,
  onToggleComplete,
}: ModuleCardProps) {
  return (
    <Card className="group relative flex h-[420px] flex-col overflow-hidden border-2 border-transparent bg-card/50 shadow-lg transition-all hover:border-primary/50 hover:shadow-primary/20 md:h-[560px]">
      <CardContent className="relative z-10 flex flex-1 flex-col justify-end p-6">
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isCompleted && (
              <>
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Concluído
                </span>
              </>
            )}
          </div>
          <Button
            variant={isCompleted ? 'secondary' : 'default'}
            size="sm"
            onClick={onToggleComplete}
            className="font-semibold"
          >
            {isCompleted ? 'Desmarcar' : 'Concluir'}
          </Button>
        </div>
      </CardContent>
      <Image
        src={module.imageUrl}
        alt={module.title}
        width={module.width}
        height={module.height}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300"
      />
      {isCompleted && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-primary/10 to-transparent"></div>
      )}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity group-hover:from-black/90"></div>
    </Card>
  );
}
