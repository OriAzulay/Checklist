// Shared TypeScript interfaces between client and server

export type TimeframeType = 'daily' | 'monthly' | 'yearly';

export interface ChecklistTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  timeframe: TimeframeType;
  dueDate: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  timeframe: TimeframeType;
  dueDate: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface TasksResponse {
  success: boolean;
  data: ChecklistTask[];
  message?: string;
}

export interface TaskResponse {
  success: boolean;
  data: ChecklistTask;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  details?: string;
}
