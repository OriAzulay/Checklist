/**
 * Server configuration and constants
 */

export const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(','),
};

export const API_ROUTES = {
  TASKS: '/tasks',
  TASK_BY_ID: (id: string) => `/tasks/${id}`,
  HEALTH: '/health',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};
