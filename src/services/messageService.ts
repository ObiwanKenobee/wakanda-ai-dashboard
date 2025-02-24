
import { supabase } from '@/lib/supabase';
import { Message, CreateMessageDTO, UpdateMessageDTO } from '@/types/messages';

export const messageService = {
  // Get all messages for a specific section
  async getMessages(section: Message['section']): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('section', section)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get a single message by ID
  async getMessage(id: number): Promise<Message | null> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create a new message
  async createMessage(message: CreateMessageDTO): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update an existing message
  async updateMessage(id: number, message: UpdateMessageDTO): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .update(message)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a message (soft delete)
  async deleteMessage(id: number): Promise<void> {
    const { error } = await supabase
      .from('messages')
      .update({ status: 'deleted' })
      .eq('id', id);

    if (error) throw error;
  },

  // Archive a message
  async archiveMessage(id: number): Promise<void> {
    const { error } = await supabase
      .from('messages')
      .update({ status: 'archived' })
      .eq('id', id);

    if (error) throw error;
  }
};
