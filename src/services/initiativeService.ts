
import { supabase } from '@/lib/supabase';
import { Initiative, CreateInitiativeDTO, UpdateInitiativeDTO } from '@/types/initiative';

export const initiativeService = {
  async getInitiatives(): Promise<Initiative[]> {
    const { data, error } = await supabase
      .from('strategic_initiatives')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as Initiative[]) || [];
  },

  async getInitiative(id: number): Promise<Initiative | null> {
    const { data, error } = await supabase
      .from('strategic_initiatives')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Initiative;
  },

  async createInitiative(initiative: CreateInitiativeDTO): Promise<Initiative> {
    const { data, error } = await supabase
      .from('strategic_initiatives')
      .insert([initiative])
      .select()
      .single();

    if (error) throw error;
    return data as Initiative;
  },

  async updateInitiative(id: number, initiative: UpdateInitiativeDTO): Promise<Initiative> {
    const { data, error } = await supabase
      .from('strategic_initiatives')
      .update(initiative)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Initiative;
  },

  async deleteInitiative(id: number): Promise<void> {
    const { error } = await supabase
      .from('strategic_initiatives')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
