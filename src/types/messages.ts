
import { Database } from '@/integrations/supabase/types';

export type Message = Database['public']['Tables']['messages']['Row'];
export type CreateMessageDTO = Omit<Message, 'id' | 'created_at' | 'updated_at' | 'user_id'>;
export type UpdateMessageDTO = Partial<Omit<Message, 'id' | 'created_at' | 'updated_at' | 'user_id'>>;

// Additional type guards and utilities
export const isValidSection = (section: string): section is Message['section'] => {
  return ['index', 'wakandan-council', 'bast-investment', 'shuri-learning'].includes(section);
};
