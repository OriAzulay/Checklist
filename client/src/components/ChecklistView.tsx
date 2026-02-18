import { FC } from 'react';
import { ChecklistTask, UpdateTaskRequest } from '../../../shared/types';
import { ChecklistItem } from './ChecklistItem';

interface ChecklistViewProps {
  tasks: ChecklistTask[];
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, data: UpdateTaskRequest) => void;
  isLoading: boolean;
}

export const ChecklistView: FC<ChecklistViewProps> = ({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
  isLoading,
}) => {
  return (
    <div className="task-list">
      {isLoading ? (
        <div className="task-list__loader">
          <div className="task-list__spinner" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="task-list__empty">
          <p className="task-list__empty-title">No tasks yet</p>
          <p className="task-list__empty-subtitle">Create your first task to get started</p>
        </div>
      ) : (
        tasks.map((task) => (
          <ChecklistItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};
