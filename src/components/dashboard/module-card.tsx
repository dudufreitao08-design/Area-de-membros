import { CheckCircle2, Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { Module } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  module: Module;
  isCompleted: boolean;
  isLocked?: boolean;
  onToggleComplete?: () => void;
}

export function ModuleCard({
  module,
  isCompleted,
  isLocked = false, // Default to false if not provided
  onToggleComplete,
}: ModuleCardProps) {
  const CardWrapper = ({ children }: { children: React.ReactNode }) =>
    isLocked ? (
      <div className="relative block">{children}</div>
    ) : (
      <Link href={`/modules/${module.id}`} className="block">
        {children}
      </Link>
    );

  return (
    <CardWrapper>
      <Card
        className={cn(
          'group relative flex aspect-[9/16] flex-col overflow-hidden bg-card/50 transition-all duration-300',
          isLocked
            ? 'border-2 border-transparent'
            : 'border-2 border-border/20 shadow-lg hover:border-primary/50 hover:shadow-primary/20'
        )}
        aria-label={isLocked ? `Módulo bloqueado: ${module.title}` : module.title}
      >
        <Image
          src={module.imageUrl}
          alt={module.title}
          fill
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-transform duration-300',
            !isLocked ? 'group-hover:scale-105' : 'opacity-20'
          )}
        />
        {/* Gradients */}
        {!isLocked && isCompleted && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-primary/10 to-transparent"></div>
        )}
        <div
          className={cn(
            'pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent',
            !isLocked && 'transition-opacity group-hover:from-black/90'
          )}
        ></div>
        
        {/* Locked State Overlay */}
        {isLocked && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 p-4 text-center">
            <Lock className="h-10 w-10 text-primary" aria-label="Módulo bloqueado"/>
             <Button disabled className="mt-4 pointer-events-none">
              <Lock className="mr-2 h-4 w-4" />
              Bloqueado
            </Button>
          </div>
        )}

        {/* Unlocked State Content */}
        {!isLocked && (
          <CardContent className="relative z-10 flex flex-1 flex-col justify-end p-6">
            <h3 className="text-xl font-bold text-white drop-shadow-md">
              {module.title}
            </h3>
            
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
              {onToggleComplete && (
                <Button
                  variant={isCompleted ? 'secondary' : 'default'}
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleComplete();
                  }}
                  className="pointer-events-auto font-semibold"
                >
                  {isCompleted ? 'Desmarcar' : 'Concluir'}
                </Button>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </CardWrapper>
  );
}
