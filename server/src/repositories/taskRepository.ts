import db from '../db.js';
import { ChecklistTask, CreateTaskRequest, UpdateTaskRequest } from '../../shared/types';
import { v4 as uuidv4 } from 'uuid';

interface TaskRow {
  id: string;
  title: string;
  description: string | null;
  completed: number;
  timeframe: string;
  due_date: string;
  created_at: string;
  updated_at: string;
}

function rowToTask(row: TaskRow): ChecklistTask {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    completed: row.completed === 1,
    timeframe: row.timeframe as ChecklistTask['timeframe'],
    dueDate: row.due_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

class TaskRepository {
  private stmts = {
    findAll: db.prepare(`SELECT * FROM tasks`),
    findByTimeframe: db.prepare(`SELECT * FROM tasks WHERE timeframe = ?`),
    findByDate: db.prepare(`SELECT * FROM tasks WHERE due_date = ?`),
    findByTimeframeAndDate: db.prepare(`SELECT * FROM tasks WHERE timeframe = ? AND due_date = ?`),
    findById: db.prepare(`SELECT * FROM tasks WHERE id = ?`),
    insert: db.prepare(`
      INSERT INTO tasks (id, title, description, completed, timeframe, due_date, created_at, updated_at)
      VALUES (@id, @title, @description, @completed, @timeframe, @due_date, @created_at, @updated_at)
    `),
    delete: db.prepare(`DELETE FROM tasks WHERE id = ?`),
  };

  async findAll(filters?: { timeframe?: string; date?: string }): Promise<ChecklistTask[]> {
    let rows: TaskRow[];

    if (filters?.timeframe && filters?.date) {
      rows = this.stmts.findByTimeframeAndDate.all(filters.timeframe, filters.date) as TaskRow[];
    } else if (filters?.timeframe) {
      rows = this.stmts.findByTimeframe.all(filters.timeframe) as TaskRow[];
    } else if (filters?.date) {
      rows = this.stmts.findByDate.all(filters.date) as TaskRow[];
    } else {
      rows = this.stmts.findAll.all() as TaskRow[];
    }

    return rows.map(rowToTask);
  }

  async findById(id: string): Promise<ChecklistTask | null> {
    const row = this.stmts.findById.get(id) as TaskRow | undefined;
    return row ? rowToTask(row) : null;
  }

  async create(data: CreateTaskRequest): Promise<ChecklistTask> {
    const now = new Date().toISOString();
    const params = {
      id: uuidv4(),
      title: data.title,
      description: data.description ?? null,
      completed: 0,
      timeframe: data.timeframe,
      due_date: data.dueDate,
      created_at: now,
      updated_at: now,
    };

    this.stmts.insert.run(params);
    return rowToTask(params as unknown as TaskRow);
  }

  async update(id: string, data: UpdateTaskRequest): Promise<ChecklistTask | null> {
    const existing = this.stmts.findById.get(id) as TaskRow | undefined;
    if (!existing) return null;

    const setClauses: string[] = [];
    const values: unknown[] = [];

    if (data.title !== undefined) {
      setClauses.push('title = ?');
      values.push(data.title);
    }
    if (data.description !== undefined) {
      setClauses.push('description = ?');
      values.push(data.description);
    }
    if (data.completed !== undefined) {
      setClauses.push('completed = ?');
      values.push(data.completed ? 1 : 0);
    }

    const now = new Date().toISOString();
    setClauses.push('updated_at = ?');
    values.push(now);
    values.push(id);

    db.prepare(`UPDATE tasks SET ${setClauses.join(', ')} WHERE id = ?`).run(...values);

    const updated = this.stmts.findById.get(id) as TaskRow;
    return rowToTask(updated);
  }

  async delete(id: string): Promise<boolean> {
    const result = this.stmts.delete.run(id);
    return result.changes > 0;
  }
}

export const taskRepository = new TaskRepository();
