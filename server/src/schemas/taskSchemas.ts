import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().max(255, 'Title too long'),
  description: z.string().max(1000).optional(),
  timeframe: z.enum(['daily', 'monthly', 'yearly']),
  dueDate: z.string().datetime().or(z.string().date()),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().max(1000).optional(),
  completed: z.boolean().optional(),
  alignment: z.enum(['left', 'center', 'right']).optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
