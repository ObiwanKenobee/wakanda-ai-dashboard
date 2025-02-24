
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messageService } from '@/services/messageService';
import { CreateMessageDTO, UpdateMessageDTO, Message } from '@/types/messages';
import { toast } from '@/hooks/use-toast';

export function useMessages(section: Message['section']) {
  const queryClient = useQueryClient();
  const queryKey = ['messages', section];

  const { data: messages = [], isLoading, error } = useQuery({
    queryKey,
    queryFn: () => messageService.getMessages(section),
  });

  const createMessage = useMutation({
    mutationFn: (newMessage: CreateMessageDTO) => 
      messageService.createMessage(newMessage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast({
        title: "Success",
        description: "Message created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create message",
        variant: "destructive",
      });
      console.error('Create message error:', error);
    },
  });

  const updateMessage = useMutation({
    mutationFn: ({ id, message }: { id: string; message: UpdateMessageDTO }) =>
      messageService.updateMessage(id, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast({
        title: "Success",
        description: "Message updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update message",
        variant: "destructive",
      });
      console.error('Update message error:', error);
    },
  });

  const deleteMessage = useMutation({
    mutationFn: (id: string) => messageService.deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast({
        title: "Success",
        description: "Message deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
      console.error('Delete message error:', error);
    },
  });

  return {
    messages,
    isLoading,
    error,
    createMessage,
    updateMessage,
    deleteMessage,
  };
}
