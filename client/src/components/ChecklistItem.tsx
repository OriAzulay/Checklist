import React from 'react';
import { ChecklistTask } from '../../../shared/types';
import { X } from 'lucide-react';

interface ChecklistItemProps {
  task: ChecklistTask;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
}) => {
  return (
    <div className={`task-card ${task.completed ? 'task-card--completed' : ''}`}>
      {/* Custom Checkbox */}
      <label className="task-checkbox">
        <input
          type="checkbox"
          className="task-checkbox__input"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id, !task.completed)}
          aria-label="Toggle task completion"
        />
      </label>

      {/* Task Content */}
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-description">{task.description}</p>}
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(task.id)}
        className="task-delete"
        title="Delete task"
        aria-label="Delete task"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
