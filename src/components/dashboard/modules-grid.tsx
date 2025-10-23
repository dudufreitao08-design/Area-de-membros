'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  doc,
  getDoc,
} from 'firebase/firestore';
import {
  useFirestore, 
  useUser, 
  updateDocumentNonBlocking, 
  setDocumentNonBlocking 
} from '@/firebase';
import { modules } from '@/lib/modules';
import { ModuleCard } from '@/components/dashboard/module-card';
import { Skeleton } from '../ui/skeleton';
import { arrayRemove, arrayUnion } from 'firebase/firestore';


export function ModulesGrid() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      if (!user) return;
      setIsLoading(true);
      const userDocRef = doc(firestore, 'users', user.uid);
      try {
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setCompletedModules(userDoc.data().completedModules || []);
        } else {
          // If user doc doesn't exist, create it with the correct schema
          const userDocData = {
            id: user.uid,
            email: user.email,
            completedModules: [],
          };
          setDocumentNonBlocking(userDocRef, userDocData, { merge: false });
          setCompletedModules([]);
        }
      } catch (error) {
        console.error("Error fetching or creating user document:", error);
        // Optionally handle the error in the UI
      } finally {
        setIsLoading(false);
      }
    }

    fetchProgress();
  }, [user, firestore]);

  const handleToggleComplete = useCallback(async (moduleId: string) => {
    if (!user) return;

    const userDocRef = doc(firestore, 'users', user.uid);
    const isCompleted = completedModules.includes(moduleId);
    const oldCompletedModules = [...completedModules];
    
    // Optimistic update
    setCompletedModules(
      isCompleted
        ? completedModules.filter((id) => id !== moduleId)
        : [...completedModules, moduleId]
    );

    try {
      updateDocumentNonBlocking(userDocRef, {
        completedModules: isCompleted
          ? arrayRemove(moduleId)
          : arrayUnion(moduleId),
      });
    } catch (error) {
      // Revert on failure
      setCompletedModules(oldCompletedModules);
      console.error("Error updating completed modules:", error);
    }
  }, [user, firestore, completedModules]);

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
