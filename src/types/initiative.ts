
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

export type CreateInitiativeDTO = Omit<Initiative, 'id' | 'created_at' | 'updated_at' | 'user_id'>;
export type UpdateInitiativeDTO = Partial<CreateInitiativeDTO>;
