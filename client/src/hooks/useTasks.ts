import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskAPI } from './api';
import { TimeframeType } from '../../../shared/types';

export const useTasks = (timeframe: TimeframeType, date: string) => {
  return useQuery({
    queryKey: ['tasks', timeframe, date],
    queryFn: () => taskAPI.getTasks(timeframe, date),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskAPI.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: Parameters<typeof taskAPI.updateTask>[0] extends string ? { id: string; data: any } : never) => {
      return taskAPI.updateTask(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useToggleTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      return taskAPI.updateTask(id, { completed });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskAPI.deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
