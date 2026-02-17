// import { readFileSync } from 'fs';
// import { join } from 'path';

// This file demonstrates how to integrate with a database.
// Currently, tasks are stored in-memory. Uncomment and implement
// the repository pattern below for production use.

import { ChecklistTask, CreateTaskRequest, UpdateTaskRequest } from '../../shared/types';
import { v4 as uuidv4 } from 'uuid';

// In-memory implementation
class TaskRepository {
  private tasks: Map<string, ChecklistTask> = new Map();

  constructor() {
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const today = new Date().toISOString().split('T')[0];
    const sampleTasks: ChecklistTask[] = [
      {
        id: uuidv4(),
        title: 'Homework',
        description: undefined,
        completed: false,
        timeframe: 'daily',
        dueDate: today,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        title: 'sleep at 21:00',
        description: undefined,
        completed: false,
        timeframe: 'daily',
        dueDate: today,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        title: 'watch',
        description: undefined,
        completed: false,
        timeframe: 'daily',
        dueDate: today,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        title: 'Eat',
        description: undefined,
        completed: true,
        timeframe: 'daily',
        dueDate: today,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    sampleTasks.forEach(task => this.tasks.set(task.id, task));
  }

  async findAll(filters?: { timeframe?: string; date?: string }): Promise<ChecklistTask[]> {
    let result = Array.from(this.tasks.values());

    if (filters?.timeframe) {
      result = result.filter((task) => task.timeframe === filters.timeframe);
    }

    if (filters?.date) {
      const filterDate = new Date(filters.date).toISOString().split('T')[0];
      result = result.filter((task) => {
        const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
        return taskDate === filterDate;
      });
    }

    return result;
  }

  async findById(id: string): Promise<ChecklistTask | null> {
    return this.tasks.get(id) || null;
  }

  async create(data: CreateTaskRequest): Promise<ChecklistTask> {
    const newTask: ChecklistTask = {
      id: uuidv4(),
      ...data,
      completed: false,
      alignment: 'center',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.tasks.set(newTask.id, newTask);
    return newTask;
  }

  async update(id: string, data: UpdateTaskRequest): Promise<ChecklistTask | null> {
    const task = this.tasks.get(id);
    if (!task) return null;

    const updated: ChecklistTask = {
      ...task,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.tasks.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.tasks.delete(id);
  }
}

// Export singleton instance
export const taskRepository = new TaskRepository();
