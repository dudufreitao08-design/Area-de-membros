'use client';

import { createContext, useEffect, useState, useMemo } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { FullPageLoader } from '@/components/ui/loader';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({ user, loading }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {loading ? <FullPageLoader /> : children}
    </AuthContext.Provider>
  );
}
