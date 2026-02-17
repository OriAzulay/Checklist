import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { taskAPI } from './lib/api';
import { TimeframeType } from '../../../shared/types';
import { ChecklistView } from './components/ChecklistView';
import './index.css';

function App() {
  const [activeTimeframe, setActiveTimeframe] = useState<TimeframeType>('daily');
  const [newTaskTitle, setNewTaskTitle] = useState('');
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
      setNewTaskTitle('');
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

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => taskAPI.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      await createMutation.mutateAsync(newTaskTitle);
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
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-6">
          {/* Tab Navigation - Accordion Pattern */}
          <div className="details mb-6">
            {(['daily', 'monthly', 'yearly'] as const).map((timeframe) => (
              <details
                key={timeframe}
                className="details__item"
                open={activeTimeframe === timeframe}
                onToggle={(e) => {
                  if ((e.target as HTMLDetailsElement).open) {
                    setActiveTimeframe(timeframe);
                  }
                }}
              >
                <summary className="details__link">
                  {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                </summary>
              </details>
            ))}
          </div>

          {/* Date & Pagination Row */}
          <div className="flex items-center justify-between">
            {/* Left: Pagination Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDateChange('prev')}
                className="p-1.5 hover:bg-slate-100 rounded transition-colors text-slate-600 hover:text-slate-900"
                title="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDateChange('next')}
                className="p-1.5 hover:bg-slate-100 rounded transition-colors text-slate-600 hover:text-slate-900"
                title="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Center: Date Display */}
            <div className="text-base font-medium text-slate-900">
              {formattedDate}
            </div>

            {/* Right: Layout Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLayoutAlignment('left')}
                className={`text-sm font-medium px-3 py-1.5 rounded transition-colors ${
                  layoutAlignment === 'left'
                    ? 'text-slate-900'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                left
              </button>
              <span className="text-slate-400">|</span>
              <button
                onClick={() => setLayoutAlignment('right')}
                className={`text-sm font-medium px-3 py-1.5 rounded transition-colors ${
                  layoutAlignment === 'right'
                    ? 'text-slate-900'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                right
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`max-w-5xl mx-auto px-6 py-8 layout-${layoutAlignment}`}>

        {/* Create Task Form */}
        <div className="mb-8">
          <form onSubmit={handleCreateTask} className="flex gap-3">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder={`Add a new ${activeTimeframe} task...`}
              className="
                flex-1 px-4 py-2.5 border border-slate-200 rounded-lg
                bg-white text-slate-900 placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all
              "
            />
            <button
              type="submit"
              disabled={createMutation.isPending || !newTaskTitle.trim()}
              className={`
                px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2
                transition-all duration-300
                ${
                  createMutation.isPending || !newTaskTitle.trim()
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-sm'
                }
              `}
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </form>
        </div>

        {/* Checklist View */}
        <ChecklistView
          tasks={tasks}
          timeframe={activeTimeframe}
          onToggleComplete={(id, completed) =>
            toggleMutation.mutate({ id, completed })
          }
          onDelete={(id) => deleteMutation.mutate(id)}
          isLoading={isLoading}
          layoutAlignment={layoutAlignment}
        />
      </main>
    </div>
  );
}

export default App;
