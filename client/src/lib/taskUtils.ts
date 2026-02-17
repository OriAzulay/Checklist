import { ChecklistTask } from '../../../shared/types';

export const groupTasksByDate = (tasks: ChecklistTask[]): Record<string, ChecklistTask[]> => {
  return tasks.reduce(
    (acc, task) => {
      const date = task.dueDate.split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(task);
      return acc;
    },
    {} as Record<string, ChecklistTask[]>
  );
};

export const filterCompletedTasks = (tasks: ChecklistTask[]): ChecklistTask[] => {
  return tasks.filter((task) => task.completed);
};

export const filterPendingTasks = (tasks: ChecklistTask[]): ChecklistTask[] => {
  return tasks.filter((task) => !task.completed);
};

export const sortTasksByDate = (tasks: ChecklistTask[], order: 'asc' | 'desc' = 'asc'): ChecklistTask[] => {
  return [...tasks].sort((a, b) => {
    const dateA = new Date(a.dueDate).getTime();
    const dateB = new Date(b.dueDate).getTime();
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
};

export const sortTasksByCompletion = (tasks: ChecklistTask[]): ChecklistTask[] => {
  return [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });
};

export const calculateProgress = (tasks: ChecklistTask[]): { completed: number; total: number; percentage: number } => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
};
