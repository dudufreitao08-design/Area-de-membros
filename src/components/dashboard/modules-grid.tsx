'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import {
  BookOpen,
  ClipboardCheck,
  FlaskConical,
  Target,
  TrendingUp,
} from 'lucide-react';

import { db } from '@/lib/firebase';
import type { Module } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { ModuleCard } from '@/components/dashboard/module-card';
import { Skeleton } from '../ui/skeleton';

const modules: Module[] = [
  { id: 'module-1', title: 'Introdução', icon: BookOpen },
  { id: 'module-2', title: 'Estratégias', icon: Target },
  { id: 'module-3', title: 'Implementação', icon: ClipboardCheck },
  { id: 'module-4', title: 'Testes', icon: FlaskConical },
  { id: 'module-5', title: 'Escala', icon: TrendingUp },
];

export function ModulesGrid() {
  const { user } = useAuth();
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      if (!user) return;
      setIsLoading(true);
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setCompletedModules(userDoc.data().completedModules || []);
      } else {
        // If user doc doesn't exist, create it
        await setDoc(userDocRef, {
          email: user.email,
          uid: user.uid,
          completedModules: [],
        });
        setCompletedModules([]);
      }
      setIsLoading(false);
    }

    fetchProgress();
  }, [user]);

  const handleToggleComplete = useCallback(async (moduleId: string) => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);
    const isCompleted = completedModules.includes(moduleId);
    const oldCompletedModules = [...completedModules];
    
    // Optimistic update
    setCompletedModules(
      isCompleted
        ? completedModules.filter((id) => id !== moduleId)
        : [...completedModules, moduleId]
    );

    try {
      await updateDoc(userDocRef, {
        completedModules: isCompleted
          ? arrayRemove(moduleId)
          : arrayUnion(moduleId),
      });
    } catch (error) {
      console.error("Failed to update progress:", error);
      // Revert on failure
      setCompletedModules(oldCompletedModules);
    }
  }, [user, completedModules]);

  if (isLoading) {
    return (
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-48 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
      {modules.map((module) => (
        <ModuleCard
          key={module.id}
          module={module}
          isCompleted={completedModules.includes(module.id)}
          onToggleComplete={() => handleToggleComplete(module.id)}
        />
      ))}
    </div>
  );
}
