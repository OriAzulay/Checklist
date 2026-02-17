/**
 * Date utilities for task management
 */

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const today = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const getMonthStart = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getMonthEnd = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const getYearStart = (year: number = new Date().getFullYear()): Date => {
  return new Date(year, 0, 1);
};

export const getYearEnd = (year: number = new Date().getFullYear()): Date => {
  return new Date(year, 11, 31);
};

export const isSameDay = (date1: string | Date, date2: string | Date): boolean => {
  const d1 = new Date(date1).toISOString().split('T')[0];
  const d2 = new Date(date2).toISOString().split('T')[0];
  return d1 === d2;
};

export const isSameMonth = (date1: string | Date, date2: string | Date): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
};

export const isSameYear = (date1: string | Date, date2: string | Date): boolean => {
  return new Date(date1).getFullYear() === new Date(date2).getFullYear();
};

export const isPastDate = (date: string | Date): boolean => {
  const d = new Date(date).toISOString().split('T')[0];
  const t = today();
  return d < t;
};

export const getDayOfWeek = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
};
