import axios from 'axios';
import { ChecklistTask, CreateTaskRequest, UpdateTaskRequest } from '../../../shared/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskAPI = {
  // Fetch tasks with optional filters
  getTasks: async (timeframe?: string, date?: string) => {
    const params = new URLSearchParams();
    if (timeframe) params.append('timeframe', timeframe);
    if (date) params.append('date', date);

    const response = await apiClient.get<any>(`/tasks?${params.toString()}`);
    return response.data.data as ChecklistTask[];
  },

  // Fetch single task
  getTask: async (id: string) => {
    const response = await apiClient.get<any>(`/tasks/${id}`);
    return response.data.data as ChecklistTask;
  },

  // Create task
  createTask: async (data: CreateTaskRequest) => {
    const response = await apiClient.post<any>('/tasks', data);
    return response.data.data as ChecklistTask;
  },

  // Update task
  updateTask: async (id: string, data: UpdateTaskRequest) => {
    const response = await apiClient.patch<any>(`/tasks/${id}`, data);
    return response.data.data as ChecklistTask;
  },

  // Delete task
  deleteTask: async (id: string) => {
    await apiClient.delete(`/tasks/${id}`);
  },
};
