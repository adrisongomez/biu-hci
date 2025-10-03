import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a context for the Supabase client
const SupabaseContext = createContext<SupabaseClient | undefined>(undefined);

// Custom hook to use the Supabase client
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};

// Supabase Provider component
export const SupabaseProvider = ({ children }: { children: ReactNode }) => {
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | undefined>(undefined);

  useEffect(() => {
    const client = createClient(
      process.env.EXPO_PUBLIC_SUPABASE_URL!,
      process.env.EXPO_PUBLIC_SUPABASE_KEY!,
      {
        auth: {
          storage: AsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      }
    );
    setSupabaseClient(client);
  }, []); // Empty dependency array means it runs once on mount

  if (!supabaseClient) {
    // Optionally, render a loading state while the client is being initialized
    return null; // Or a loading spinner
  }

  return (
    <SupabaseContext.Provider value={supabaseClient}>
      {children}
    </SupabaseContext.Provider>
  );
};
