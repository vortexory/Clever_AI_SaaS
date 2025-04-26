import { createClient } from '@supabase/supabase-js';
import { apiRequest } from './queryClient';

// Create a default client that will be initialized once we fetch the config
let supabase: ReturnType<typeof createClient>;

// Function to initialize Supabase client
export async function initSupabase() {
  try {
    const response = await fetch('/api/config');
    const { supabaseUrl, supabaseAnonKey } = await response.json();
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase configuration');
    }
    
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    return supabase;
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    throw error;
  }
}

// Initialize on load
initSupabase().catch(err => {
  console.error('Failed initial Supabase setup:', err);
});

// Export the supabase client getter
export function getSupabase() {
  if (!supabase) {
    throw new Error('Supabase client not initialized. Call initSupabase() first.');
  }
  return supabase;
}

export type SupabaseUser = {
  id: string;
  email?: string;
  username?: string;
};