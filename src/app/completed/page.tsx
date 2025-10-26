'use client';

import { useUser, useFirestore } from '@/firebase';
import { modules } from '@/lib/modules';
import { DashboardHeader } from '@/components/dashboard/header';
import { ModuleCard } from '@/components/dashboard/module-card';
import { FullPageLoader } from '@/components/ui/loader';
import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, arrayRemove, arrayUnion, updateDoc, setDoc } from 'firebase/firestore';
import { CheckCircle2 } from 'lucide-react';

export default function CompletedPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      if (!user) {
        if (!isUserLoading) {
           setIsDataLoading(false);
        }
        return;
      };
      
      const userDocRef = doc(firestore, 'users', user.uid);
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setCompletedModules(userDoc.data().completedModules || []);
        }
      } catch (error) {
        console.error("Error fetching user's completed modules:", error);
      } finally {
        setIsDataLoading(false);
      }
    }

    fetchProgress();
  }, [user, isUserLoading, firestore]);

  const handleToggleComplete = useCallback(async (moduleId: string) => {
    if (!user) return;

    const userDocRef = doc(firestore, 'users', user.uid);
    const isCompleted = completedModules.includes(moduleId);

    const updatedModules = isCompleted
      ? completedModules.filter((id) => id !== moduleId)
      : [...completedModules, moduleId];
    
    setCompletedModules(updatedModules);

    try {
      await updateDoc(userDocRef, {
        completedModules: isCompleted
          ? arrayRemove(moduleId)
          : arrayUnion(moduleId),
      });
    } catch (error) {
      console.error("Error updating completed modules:", error);
      // Revert optimistic update on failure
      setCompletedModules(completedModules);
    }
  }, [user, firestore, completedModules]);
  
  const filteredModules = modules.filter(module => completedModules.includes(module.id));

  if (isUserLoading || isDataLoading) {
    return <FullPageLoader />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(119,141,169,0.1),rgba(255,255,255,0))]"></div>
      <DashboardHeader />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-4">
          <div className="flex items-center gap-3">
             <CheckCircle2 className="h-8 w-8 text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.6)]"/>
             <h1 className="text-3xl font-semibold">Aulas Concluídas</h1>
          </div>
          <p className="text-muted-foreground">
            Você concluiu {filteredModules.length} de {modules.length} aulas.
          </p>
        </div>
        
        {filteredModules.length > 0 ? (
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 items-start gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {filteredModules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                isCompleted={true}
                onToggleComplete={() => handleToggleComplete(module.id)}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/20 py-24 text-center">
            <h2 className="text-xl font-semibold text-foreground">Nenhuma aula concluída ainda</h2>
            <p className="mt-2 text-muted-foreground">
              Volte para a aba "Principal" e comece sua jornada de aprendizado.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
