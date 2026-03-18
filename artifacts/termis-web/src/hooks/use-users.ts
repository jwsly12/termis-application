import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Usuário' | 'Dev';
  status: 'Ativo' | 'Inativo';
  lastLogin: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'Wesley', email: 'dev@termis.com', role: 'Dev', status: 'Ativo', lastLogin: 'Hoje, 10:23' },
  { id: '2', name: 'Ana Carla', email: 'vea.ruim@termis.com', role: 'Admin', status: 'Ativo', lastLogin: 'Ontem, 14:45' },
  { id: '3', name: 'Will', email: 'admin@termis.com', role: 'Admin', status: 'Inativo', lastLogin: 'Há 5 dias' },
];

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockUsers;
    }
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return id;
    },
    onSuccess: () => {
      // Usually queryClient.invalidateQueries({ queryKey: ['users'] })
      // For mock, we'd need a local store, but invalidation triggers refetch (which returns static mock)
      console.log("User deleted");
    }
  });
}
