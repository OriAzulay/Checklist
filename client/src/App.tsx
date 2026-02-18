import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { taskAPI } from './lib/api';
import { TimeframeType } from '../../../shared/types';
import { ChecklistView } from './components/ChecklistView';
import './index.css';

function App() {
  const [activeTimeframe, setActiveTimeframe] = useState<TimeframeType>('daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [layoutAlignment, setLayoutAlignment] = useState<'left' | 'right'>('left');
  const queryClient = useQueryClient();

  // Format date as "Monday, 16/2/2026"
  const formattedDate = useMemo(() => {
    const date = new Date(selectedDate);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${dayName}, ${day}/${month}/${year}`;
  }, [selectedDate]);

  // Fetch tasks
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks', activeTimeframe, selectedDate],
    queryFn: () => taskAPI.getTasks(activeTimeframe, selectedDate),
  });

  // Create task mutation
  const createMutation = useMutation({
    mutationFn: async (title: string) => {
      return taskAPI.createTask({
        title,
        timeframe: activeTimeframe,
        dueDate: selectedDate,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // Toggle complete mutation
  const toggleMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      return taskAPI.updateTask(id, { completed });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // Edit mutation
  const editMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return taskAPI.updateTask(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => taskAPI.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleCreateTask = async () => {
    if (!createMutation.isPending) {
      await createMutation.mutateAsync('');
    }
  };

  const handleDateChange = (direction: 'next' | 'prev') => {
    const currentDate = new Date(selectedDate);
    if (direction === 'next') {
      currentDate.setDate(currentDate.getDate() + 1);
    } else {
      currentDate.setDate(currentDate.getDate() - 1);
    }
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header__inner">
          <div className="tabs">
            {(['daily', 'monthly', 'yearly'] as const).map((timeframe) => (
              <details
                key={timeframe}
                className="tabs__item"
                open={activeTimeframe === timeframe}
                onToggle={(e) => {
                  if ((e.target as HTMLDetailsElement).open) {
                    setActiveTimeframe(timeframe);
                  }
                }}
              >
                <summary className="tabs__link">
                  {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                </summary>
              </details>
            ))}
          </div>

          <div className="toolbar">
            <div className="toolbar__date">
              {formattedDate}
            </div>

            <div className="toolbar__actions">
              <button
                onClick={() => handleDateChange('prev')}
                className="icon-button"
                title="Previous"
              >
                <ChevronLeft className="icon-button__icon" />
              </button>
              <button
                onClick={() => handleDateChange('next')}
                className="icon-button"
                title="Next"
              >
                <ChevronRight className="icon-button__icon" />
              </button>
              <button
                onClick={() => setLayoutAlignment('left')}
                className={`layout-button ${
                  layoutAlignment === 'left' ? 'layout-button--active' : ''
                }`}
                aria-label="Align left"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="layout-button__icon"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 3V21M21 12H7M7 12L14 19M7 12L14 5" />
                </svg>
              </button>
              <span className="toolbar__separator">|</span>
              <button
                onClick={() => setLayoutAlignment('right')}
                className={`layout-button ${
                  layoutAlignment === 'right' ? 'layout-button--active' : ''
                }`}
                aria-label="Align right"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="layout-button__icon"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 21V3M3 12H17M17 12L10 5M17 12L10 19" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleCreateTask}
                disabled={createMutation.isPending}
                className={`add-button ${
                  createMutation.isPending ? 'add-button--disabled' : ''
                }`}
              >
                <Plus className="add-button__icon" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className={`main layout-${layoutAlignment}`}>
        <ChecklistView
          tasks={tasks}
          onToggleComplete={(id, completed) =>
            toggleMutation.mutate({ id, completed })
          }
          onDelete={(id) => deleteMutation.mutate(id)}
          onEdit={(id, data) => editMutation.mutate({ id, data })}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

export default App;
