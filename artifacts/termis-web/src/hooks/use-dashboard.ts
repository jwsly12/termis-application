import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Mock Data Interfaces
export interface SystemStatus {
  currentTemp: number;
  setPoint: number;
  aiEfficiency: number;
  loadAdjustment: number;
  comfort: number;
  savings: number;
  energyConsumption: number;
  systemLoad: number;
  projectedSavings: number;
  estimatedEnergySavings: number;
  aiModeEnabled: boolean;
  activeProfile: 'ECONOMIA' | 'CONFORTO_RAPIDO' | 'BRO_MODE' | null;
}

export interface EventLog {
  id: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success';
  message: string;
}

const mockStatus: SystemStatus = {
  currentTemp: 24.5,
  setPoint: 23.0,
  aiEfficiency: 92,
  loadAdjustment: 45,
  comfort: 40,
  savings: 15,
  energyConsumption: 12.5,
  systemLoad: 45,
  projectedSavings: 45.00,
  estimatedEnergySavings: 22,
  aiModeEnabled: true,
  activeProfile: 'ECONOMIA'
};

const mockEvents: EventLog[] = [
  { id: '1', timestamp: '14:23:45', type: 'info', message: 'Ajuste fino de temperatura via IA: +0.5°C' },
  { id: '2', timestamp: '14:15:00', type: 'success', message: 'Modo Economia ativado com sucesso.' },
  { id: '3', timestamp: '13:50:12', type: 'warning', message: 'Pico de calor externo detectado. Pre-resfriamento iniciado.' },
  { id: '4', timestamp: '13:30:00', type: 'info', message: 'Sincronização de dados meteorológicos concluída.' },
];

export function useSystemStatus() {
  return useQuery({
    queryKey: ['system-status'],
    queryFn: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockStatus;
    }
  });
}

export function useEventLogs() {
  return useQuery({
    queryKey: ['event-logs'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockEvents;
    }
  });
}

export function useUpdateControls() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (updates: Partial<SystemStatus>) => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return { ...mockStatus, ...updates };
    },
    onSuccess: (newData) => {
      // In a real app, this would update the server. Here we just update the cache locally.
      queryClient.setQueryData(['system-status'], (old: SystemStatus) => ({
        ...old,
        ...newData
      }));
    }
  });
}
