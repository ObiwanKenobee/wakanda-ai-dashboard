
import { supabase } from '@/lib/supabase';
import { Message, CreateMessageDTO, UpdateMessageDTO } from '@/types/messages';
import { PostgrestSingleResponse, PostgrestResponse, PostgrestError } from '@supabase/supabase-js';

type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
type DbResultOk<T> = DbResult<T> extends { data: infer U } ? U : never;
type MessageRow = DbResultOk<ReturnType<typeof supabase.from<'messages'>>>;

export const messageService = {
  async getMessages(section: Message['section']): Promise<Message[]> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('section', section)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data || []) as Message[];
  },

  async getMessage(id: string): Promise<Message | null> {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Message | null;
  },

  async createMessage(message: CreateMessageDTO): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('No data returned from insert');
    return data as Message;
  },

  async updateMessage(id: string, message: UpdateMessageDTO): Promise<Message> {
    const { data, error } = await supabase
      .from('messages')
      .update(message)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('No data returned from update');
    return data as Message;
  },

  async deleteMessage(id: string): Promise<void> {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
