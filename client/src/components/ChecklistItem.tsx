import { useState, useEffect, FC, KeyboardEvent } from 'react';
import { ChecklistTask, UpdateTaskRequest } from '../../../shared/types';
import { X } from 'lucide-react';

interface ChecklistItemProps {
  task: ChecklistTask;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, data: UpdateTaskRequest) => void;
}

export const ChecklistItem: FC<ChecklistItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  useEffect(() => {
    if (!task.completed && task.title.trim() === '') {
      setEditMode(true);
      setEditTitle('');
    }
  }, [task.completed, task.title]);

  const handleDoubleClick = () => {
    if (!task.completed) {
      setEditMode(true);
      setEditTitle(task.title);
    }
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(task.id, {
        title: editTitle.trim(),
      });
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditTitle(task.title);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (editMode) {
    return (
      <div className="task-card task-card--edit">
        <input
          type="checkbox"
          id={`task-${task.id}-edit`}
          className="task-checkbox"
          disabled
          aria-label="Cannot toggle while editing"
        />
        <label htmlFor={`task-${task.id}-edit`} className="task-checkbox-label task-checkbox--disabled">
          <div className="task-checkbox-box">
            <div className="task-checkbox-fill" />
            <div className="task-checkbox-checkmark">
              <svg viewBox="0 0 24 24" className="task-checkbox-icon">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
            <div className="task-checkbox-ripple" />
          </div>
        </label>

        {/* Edit Form */}
        <div className="task-edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            placeholder="Task title"
            className="task-edit-input task-edit-input--title"
            autoFocus
          />
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(task.id)}
          className="task-delete"
          title="Delete task"
          aria-label="Delete task"
        >
          <X className="task-delete__icon" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`task-card ${task.completed ? 'task-card--completed' : ''}`}
      onDoubleClick={handleDoubleClick}
      title={task.completed ? 'Cannot edit completed tasks' : 'Double-click to edit'}
    >
      <input
        type="checkbox"
        id={`task-${task.id}`}
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id, !task.completed)}
        aria-label="Toggle task completion"
      />
      <label htmlFor={`task-${task.id}`} className="task-checkbox-label">
        <div className="task-checkbox-box">
          <div className="task-checkbox-fill" />
          <div className="task-checkbox-checkmark">
            <svg viewBox="0 0 24 24" className="task-checkbox-icon">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </div>
          <div className="task-checkbox-ripple" />
        </div>
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
        <X className="task-delete__icon" />
      </button>
    </div>
  );
};
