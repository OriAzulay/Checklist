import { Router, Request, Response, NextFunction } from 'express';
import { createTaskSchema, updateTaskSchema } from '../schemas/taskSchemas';
import { AppError } from '../middleware/errorHandler';
import { ChecklistTask, CreateTaskRequest, UpdateTaskRequest, TasksResponse, TaskResponse } from '../../shared/types';
import { taskRepository } from '../repositories/taskRepository';

const router = Router();

/**
 * GET /tasks?timeframe=daily&date=2024-01-01
 * Fetch tasks for a specific timeframe and date
 */
router.get('/', async (req: Request, res: Response<TasksResponse>, next: NextFunction) => {
  try {
    const { timeframe, date } = req.query;

    const filteredTasks = await taskRepository.findAll({
      timeframe: timeframe as string | undefined,
      date: date as string | undefined,
    });

    res.json({
      success: true,
      data: filteredTasks,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /tasks/:id
 * Fetch a single task by ID
 */
router.get('/:id', async (req: Request, res: Response<TaskResponse>, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await taskRepository.findById(id);

    if (!task) {
      throw new AppError(404, 'Task not found');
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /tasks
 * Create a new task
 */
router.post('/', async (req: Request, res: Response<TaskResponse>, next: NextFunction) => {
  try {
    const validatedData = createTaskSchema.parse(req.body);

    const newTask = await taskRepository.create(validatedData);

    res.status(201).json({
      success: true,
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH /tasks/:id
 * Update a task
 */
router.patch('/:id', async (req: Request, res: Response<TaskResponse>, next: NextFunction) => {
  try {
    const { id } = req.params;
    const validatedData = updateTaskSchema.parse(req.body);

    const updatedTask = await taskRepository.update(id, validatedData);
    
    if (!updatedTask) {
      throw new AppError(404, 'Task not found');
    }

    res.json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /tasks/:id
 * Delete a task
 */
router.delete('/:id', async (req: Request, res: Response<any>, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await taskRepository.findById(id);

    if (!task) {
      throw new AppError(404, 'Task not found');
    }

    await taskRepository.delete(id);

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
