
import { supabase } from '@/lib/supabase';
import { Initiative, CreateInitiativeDTO, UpdateInitiativeDTO } from '@/types/initiative';

export const initiativeService = {
  // Get all initiatives for the current user
  async getInitiatives(): Promise<Initiative[]> {
    const { data, error } = await supabase
      .from('strategic_initiatives')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get a single initiative by ID
  async getInitiative(id: number): Promise<Initiative | null> {
    const { data, error } = await supabase
      .from('strategic_initiatives')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create a new initiative
  async createInitiative(initiative: CreateInitiativeDTO): Promise<Initiative> {
    const { data, error } = await supabase
      .from('strategic_initiatives')
      .insert([initiative])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update an existing initiative
  async updateInitiative(id: number, initiative: UpdateInitiativeDTO): Promise<Initiative> {
    const { data, error } = await supabase
      .from('strategic_initiatives')
      .update(initiative)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete an initiative
  async deleteInitiative(id: number): Promise<void> {
    const { error } = await supabase
      .from('strategic_initiatives')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
