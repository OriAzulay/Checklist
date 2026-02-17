# Implementation Guide

This document outlines how to implement the advanced features of the Checklist Master application.

## Task Rollover Logic

### Daily Rollover (Currently Planned)

When a user accesses the daily view:

1. **Date Update Check**
   ```typescript
   // Check if a new day has passed
   const lastAccessedDate = localStorage.getItem('lastAccessedDate');
   const today = new Date().toISOString().split('T')[0];
   
   if (lastAccessedDate !== today) {
     // New day detected, trigger rollover
     await performDailyRollover();
   }
   ```

2. **Unchecked Task Rollover**
   ```typescript
   async function performDailyRollover() {
     const yesterday = getYesterdayDate();
     const uncheckedTasks = await taskAPI.getTasks('daily', yesterday)
       .then(tasks => tasks.filter(t => !t.completed));
     
     for (const task of uncheckedTasks) {
       // Clone task to today's date
       await taskAPI.createTask({
         title: task.title,
         description: task.description,
         timeframe: 'daily',
         dueDate: today(),
       });
     }
   }
   ```

### Monthly Rollover

Similar logic but applied monthly:
- Check if month has changed
- Roll over unchecked tasks to the new month

### Yearly Rollover

- Check if year has changed
- Roll over unchecked tasks to the new year

## Design Implementation Details

### Transparency Effect for Checked Items

The checked state is implemented using CSS classes and inline styles:

```typescript
// In ChecklistItem.tsx
<div className={`
  group relative rounded-lg border border-slate-200 p-4 
  transition-all duration-300
  ${task.completed ? 'bg-slate-100 opacity-70' : 'bg-white'}
`}>
```

When a task is checked:
- Container opacity becomes 0.7 (70% transparent)
- Text opacity becomes 0.6 (60% transparent)
- Font style includes strikethrough
- Border becomes less prominent

### Alignment Controls

Three alignment positions:
- **Left**: Tasks align to the left, previous positions smaller
- **Center**: Default centered position (normal flow)
- **Right**: Tasks align to the right, previous positions smaller

Implementation:
```typescript
const alignmentClasses: Record<AlignmentType, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};
```

When non-center aligned:
- The opposing side becomes transparent (opacity-50)
- Controls become visible and highlight the active alignment

### Hover State

The `group` and `group-hover:` Tailwind utilities provide:
- Alignment buttons visible only on hover
- Delete button visible only on hover
- Smooth opacity transitions

## Frontend Implementation Checklist

- [ ] Implement daily rollover on app load (check last accessed date)
- [ ] Add localStorage integration for last accessed date
- [ ] Create rollover service in `services/rolloverService.ts`
- [ ] Add notifications/toast for rolled-over tasks
- [ ] Implement month/year selection for past views
- [ ] Add task filtering by completion status
- [ ] Add sorting options (by date, by completion, custom)
- [ ] Implement drag-and-drop task reordering
- [ ] Add search/filter functionality

## Backend Enhancement Checklist

- [ ] Migrate from in-memory to database (PostgreSQL/MongoDB)
- [ ] Add authentication/authorization middleware
- [ ] Implement user-specific task storage
- [ ] Add task recurrence logic (repeating tasks)
- [ ] Create background job for automatic rollover
- [ ] Add soft delete (archive) functionality
- [ ] Implement task history/audit logging
- [ ] Add API rate limiting
- [ ] Implement caching layer (Redis)

## Database Schema (When Migrating)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  timeframe VARCHAR(20) NOT NULL,
  due_date DATE NOT NULL,
  alignment VARCHAR(20) DEFAULT 'center',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_tasks_user_timeframe ON tasks(user_id, timeframe);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_completed ON tasks(completed);
```

## Testing Strategy

### Unit Tests
- Task utility functions (grouping, filtering, sorting)
- Date utility functions
- Validation schemas (Zod)

### Integration Tests
- API endpoint behavior
- Error handling
- Request validation

### E2E Tests
- Daily workflow (create task, complete, navigate)
- Task rollover scenarios
- Alignment changes and persistence

## Performance Optimization

1. **Query Optimization**
   - Lazy load tasks (infinite scroll or pagination)
   - Implement server-side filtering
   - Use database indexes

2. **Client-Side Caching**
   - TanStack Query is already configured
   - Consider adding service worker for offline support

3. **Bundle Size**
   - Monitor bundle size with vite build analysis
   - Tree-shake unused code
   - Consider code splitting by route

## Security Considerations

1. **API Security**
   - Input validation (Zod is already implemented)
   - CORS configuration (already set up)
   - Rate limiting
   - HTTPS in production

2. **Data Protection**
   - Never log sensitive data
   - Use environment variables for secrets
   - Implement CSRF protection when adding forms

3. **Client Security**
   - XSS prevention (React escapes by default)
   - Content Security Policy headers
   - Regular dependency updates

## Monitoring & Logging

1. **Server Logging**
   - Request/response logging
   - Error tracking (consider Sentry)
   - Performance metrics

2. **Client Monitoring**
   - Error boundary for crash handling
   - User analytics (optional)
   - Performance monitoring

## Deployment

### Environment Setup
```bash
# Build from source
npm run build

# Deploy using Docker
docker-compose -f docker-compose.yml up

# Or deploy to cloud platforms
# Vercel for frontend
# Railway/Heroku for backend
```

### Environment Variables (Production)
```env
# Backend
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-secret-key
REDIS_URL=redis://localhost:6379

# Frontend
VITE_API_URL=https://api.yourdomain.com
```

---

For detailed implementation of specific features, refer to inline code comments and the README.
