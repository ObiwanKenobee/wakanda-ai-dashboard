
export interface Initiative {
  id: number;
  name: string;
  progress: number;
  status: 'Active' | 'Pending' | 'Completed';
  impact: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export type CreateInitiativeDTO = {
  name: string;
  progress: number;
  status: 'Active' | 'Pending' | 'Completed';
  impact: number;
  user_id: string;
};

export type UpdateInitiativeDTO = Partial<Omit<CreateInitiativeDTO, 'user_id'>>;
