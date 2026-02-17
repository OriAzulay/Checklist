import React from 'react';
import { ChecklistTask, TimeframeType } from '../../../shared/types';
import { ChecklistItem } from './ChecklistItem';

interface ChecklistViewProps {
  tasks: ChecklistTask[];
  timeframe: TimeframeType;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
  layoutAlignment: 'left' | 'right';
}

export const ChecklistView: React.FC<ChecklistViewProps> = ({
  tasks,
  onToggleComplete,
  onDelete,
  isLoading,
  layoutAlignment,
}) => {
  return (
    <div className={`space-y-3 layout-${layoutAlignment}`}>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500 text-base">No tasks yet</p>
          <p className="text-slate-400 text-sm">Create your first task to get started</p>
        </div>
      ) : (
        tasks.map((task) => (
          <ChecklistItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};
