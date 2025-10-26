'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Bonus } from '@/lib/types';

interface BonusCardProps {
  bonus: Bonus;
}

export function BonusCard({ bonus }: BonusCardProps) {
  const Icon = bonus.icon;

  return (
    <Card className="flex h-full flex-col border-none bg-card/80 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-primary/10">
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-xl leading-tight">{bonus.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription>{bonus.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={bonus.href}>
            {bonus.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
