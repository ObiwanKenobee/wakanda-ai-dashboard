
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { initiativeService } from '@/services/initiativeService';
import { CreateInitiativeDTO, UpdateInitiativeDTO } from '@/types/initiative';
import { toast } from '@/hooks/use-toast';

export function useInitiatives() {
  const queryClient = useQueryClient();

  const { data: initiatives = [], isLoading, error } = useQuery({
    queryKey: ['initiatives'],
    queryFn: () => initiativeService.getInitiatives(),
  });

  const createInitiative = useMutation({
    mutationFn: (newInitiative: CreateInitiativeDTO) => 
      initiativeService.createInitiative(newInitiative),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['initiatives'] });
      toast({
        title: "Success",
        description: "Initiative created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create initiative",
        variant: "destructive",
      });
    },
  });

  const updateInitiative = useMutation({
    mutationFn: ({ id, initiative }: { id: number; initiative: UpdateInitiativeDTO }) =>
      initiativeService.updateInitiative(id, initiative),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['initiatives'] });
      toast({
        title: "Success",
        description: "Initiative updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update initiative",
        variant: "destructive",
      });
    },
  });

  const deleteInitiative = useMutation({
    mutationFn: (id: number) => initiativeService.deleteInitiative(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['initiatives'] });
      toast({
        title: "Success",
        description: "Initiative deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete initiative",
        variant: "destructive",
      });
    },
  });

  return {
    initiatives,
    isLoading,
    error,
    createInitiative,
    updateInitiative,
    deleteInitiative,
  };
}
