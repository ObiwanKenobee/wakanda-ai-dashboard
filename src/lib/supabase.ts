
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = 'https://jklewwlnrlzomkaetjjo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprbGV3d2xucmx6b21rYWV0ampvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0MTIxNDEsImV4cCI6MjA1MTk4ODE0MX0.8VjOmAuOnX3L6qYBWm5sUSxxu2jA-V-79g60LeFs5dE';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
