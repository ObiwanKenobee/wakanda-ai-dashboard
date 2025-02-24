
import { Database } from '@/integrations/supabase/types';

// Define the base message type from the database
export interface Message {
  id: string;
  content: string;
  attachment_url: string;
  created_at: string;
  sender_id: string;
  thread_id: string;
  read: boolean;
  section: 'index' | 'wakandan-council' | 'bast-investment' | 'shuri-learning';
}

export type CreateMessageDTO = Omit<Message, 'id' | 'created_at'>;
export type UpdateMessageDTO = Partial<Omit<Message, 'id' | 'created_at'>>;

export const isValidSection = (section: string): section is Message['section'] => {
  return ['index', 'wakandan-council', 'bast-investment', 'shuri-learning'].includes(section);
};
