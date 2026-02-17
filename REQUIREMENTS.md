# Project Requirements & Specifications

## Overview

Checklist Master is a professional task management web application designed with a focus on multi-timeframe task organization (daily, monthly, yearly) with intelligent task persistence and beautiful UI/UX.

## Functional Requirements

### 1. Task Management

#### 1.1 Task Creation
- Users can create tasks for a specific timeframe (daily, monthly, yearly)
- Each task requires:
  - Title (required, max 255 characters)
  - Description (optional, max 1000 characters)
  - Timeframe type
  - Due date
- Created tasks should be immediately visible in the UI
- Validation errors should be displayed to the user

#### 1.2 Task Viewing
- Tasks are organized by timeframe in separate tabs
- Users can view tasks for a specific date within each timeframe
- Date navigation allows viewing past and future dates
- Tasks display the following information:
  - Title and description
  - Completion status
  - Due date
  - Alignment position

#### 1.3 Task Updates
- Mark tasks as complete/incomplete with a checkbox
- Delete tasks with confirmation
- Edit task alignment (left, center, right)
- All changes sync immediately with the server

#### 1.4 Task Completion Feedback

When a task is marked as complete:
- **Visual Transparency**: Opacity reduced to 70% (background) and 60% (text)
- **Text Styling**: Add strikethrough to task title
- **Border**: Reduce border prominence
- **Smooth Transition**: CSS transition over 300ms
- Task remains visible but de-emphasized

### 2. Task Rollover Logic (Future Implementation)

#### 2.1 Daily Rollover
- Each day at application load, check if a new day has occurred
- Find all unchecked tasks from the previous day
- Clone unchecked tasks to today's date
- Display notification of rolled-over tasks
- Mark original tasks with a "rolled over" indicator (optional)

#### 2.2 Monthly Rollover
- When entering a new calendar month, check for unchecked monthly tasks
- Roll over unchecked tasks to the new month
- Similar notification system

#### 2.3 Yearly Rollover
- When entering a new year, check for unchecked yearly tasks
- Roll over unchecked tasks to the new year

### 3. Task Alignment Feature

#### 3.1 Alignment Options
- **Left**: Task aligns to the left side of its container
- **Center**: Task centers in container (default)
- **Right**: Task aligns to the right side

#### 3.2 Visual Behavior
- Alignment buttons visible only on hover (opacity-0 → opacity-100)
- Active alignment button highlighted in primary color
- Inactive alignments reduced opacity and smaller size
- Smooth transitions between alignment states
- Opposite alignment positions become transparent (50% opacity)

#### 3.3 Alignment Impact
- Affects task positioning in the list
- Persists when task is updated
- Affects visual weight in the view (left-aligned feel heavier, right-aligned lighter)

### 4. User Interface

#### 4.1 Navigation
- Three prominent tabs for Daily/Monthly/Yearly views
- Active tab highlighted in primary color
- Quick switching between timeframes

#### 4.2 Date Selection
- For Daily: Individual date picker
- For Monthly: Month/year selector
- For Yearly: Year selector

#### 4.3 Task Creation Form
- Input field with placeholder based on selected timeframe
- Submit button (only enabled when title is provided)
- Clear on successful submission

#### 4.4 Progress Tracking
- Progress bar showing completion percentage
- Counter showing "X/Y tasks completed"
- Progress percentage displayed
- Smooth animation when progress updates

#### 4.5 Empty States
- Clear messaging when no tasks exist for a timeframe
- Icon representation
- Call-to-action to create first task

#### 4.6 Loading States
- Spinner animation while loading tasks
- Disabled interactions during mutations
- Clear user feedback for pending actions

### 5. Responsive Design

#### 5.1 Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

#### 5.2 Mobile Optimizations
- Stack layout for all controls
- Larger touch targets (48px minimum)
- Full-width inputs and buttons
- Collapsible sections if needed

#### 5.3 Desktop Optimizations
- Multi-column layouts where beneficial
- Hover states and tooltips
- Efficient use of screen space

## Technical Requirements

### Frontend

#### 5.1 React Requirements
- React 19 with latest features
- TypeScript strict mode
- Functional components with hooks
- No class components

#### 5.2 Styling
- Tailwind CSS for all styling
- Custom CSS only for animations in `index.css`
- Mobile-first responsive design
- Dark mode support (optional future enhancement)

#### 5.3 State Management
- TanStack Query for server state
- React hooks for local UI state
- No Redux/Zustand needed

#### 5.4 API Integration
- Axios for HTTP requests
- Centralized API client
- Error handling and retry logic
- Loading and error states

#### 5.5 Performance
- Code splitting where beneficial
- Lazy loading of components
- Memoization for expensive computations
- Query caching configuration

### Backend

#### 6.1 Express Setup
- Minimal middleware
- Centralized error handling
- CORS enabled for development
- Health check endpoint

#### 6.2 API Design
- RESTful endpoints
- Consistent response format
- Proper HTTP status codes
- Comprehensive error messages

#### 6.3 Validation
- Zod schema validation on all requests
- Type-safe validation with inferred types
- Clear validation error messages
- Input sanitization

#### 6.4 Error Handling
- Global error handler middleware
- Graceful error messages
- Proper logging
- Stack traces in development only

#### 6.5 Data Storage (Currently)
- In-memory Map for development
- Async repository pattern for future DB migration
- No persistence between server restarts

### Shared

#### 7.1 Type Definitions
- Single source of truth for types
- Exported from `shared/types.ts`
- Used by both frontend and backend
- Full code completion support

#### 7.2 Type Safety
- No `any` types
- Strict TypeScript config
- Type guards where needed

## Non-Functional Requirements

### Performance
- Initial load < 2 seconds
- Task creation < 500ms
- Animation frame rate 60 FPS
- Bundle size < 500KB (gzipped)

### Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- ARIA labels where appropriate
- Color contrast ratios met

### Reliability
- Error boundary for React errors
- Graceful error messages
- Network error handling
- Offline detection (future)

### Maintainability
- Clear code organization
- Comprehensive comments
- Consistent naming conventions
- Reusable component patterns

### Security
- Input validation on all endpoints
- CORS properly configured
- No sensitive data in logs
- Environment variables for secrets

## Installation & Setup

### Prerequisites
- Node.js 18+
- npm 9+
- Optional: Docker 20.10+

### Installation
```bash
npm run install-all
npm run dev
```

### Verification
- Frontend accessible at http://localhost:5173
- Backend API at http://localhost:3000/api
- Health check at http://localhost:3000/health
- No console errors in browser
- No errors in server logs

## Testing Requirements

### Unit Testing
- Utility functions (task filtering, date calculations)
- Validation schemas
- Component rendering

### Integration Testing
- API endpoints
- Error handling
- Request validation

### E2E Testing
- Complete user workflows
- Task CRUD operations
- Navigation flows

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Future Enhancements

1. **User Authentication**
   - User registration/login
   - JWT tokens
   - User-specific tasks

2. **Database Integration**
   - PostgreSQL or MongoDB
   - Migrations
   - Indexes for performance

3. **Advanced Features**
   - Task recurrence/templates
   - Collaborative tasks
   - Task categories/tags
   - Task notes/attachments
   - Reminders and notifications
   - Export to PDF/CSV

4. **Analytics**
   - Completion trends
   - Productivity insights
   - Time tracking

5. **Mobile App**
   - React Native implementation
   - Offline-first sync
   - Push notifications

6. **Integration**
   - Calendar sync (Google Calendar, Outlook)
   - Email reminders
   - Slack notifications
   - API for third-party tools

## Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Docker
```bash
docker-compose up
```

### Cloud Platforms
- Frontend: Vercel, Netlify
- Backend: Railway, Render, Fly.io
- Database: Cloud SQL, MongoDB Atlas

---

**Document Version**: 1.0
**Last Updated**: January 2024
**Status**: In Development
