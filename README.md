# Checklist Master

A professional, high-quality checklist web application with responsive design and intelligent task management. Features daily, monthly, and yearly task views with automatic task rollover for uncompleted items.

## 🎯 Features

- **Multi-timeframe views**: Daily, Monthly, and Yearly task management
- **Smart task rollover**: Uncompleted tasks automatically carry forward to the next period
- **Responsive design**: Beautiful, professional UI built with Tailwind CSS
- **Task alignment**: Organize tasks with left/center/right alignment with visual feedback
- **Transparent feedback**: Completed tasks fade with reduced opacity
- **Real-time updates**: Powered by TanStack Query for efficient data management
- **Type-safe**: Full TypeScript support across client and server

## 🏗️ Architecture

```
checklist/
├── client/           # React 19 + Vite frontend
├── server/           # Node.js + Express backend
├── shared/           # Shared TypeScript types
└── docker-compose.yml
```

### Tech Stack

**Frontend:**

- React 19
- Vite
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- TanStack Query (React Query)

**Backend:**

- Node.js
- Express
- TypeScript
- Zod (validation)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Docker & Docker Compose (optional)

### Local Development

1. **Install all dependencies:**

   ```bash
   npm run install-all
   ```

2. **Start both services:**

   ```bash
   npm run dev
   ```

   Or run individually:

   ```bash
   npm run server  # Terminal 1
   npm run client  # Terminal 2
   ```

3. **Access the app:**
   - Frontend: http://localhost:5173
   - API: http://localhost:3000/api

### Using Docker Compose

```bash
docker-compose up
```

This starts:

- Frontend on port 5173
- Backend on port 3000

## 📁 Project Structure

### `/server` - Backend API

```
server/
├── src/
│   ├── index.ts           # Express app entry point
│   ├── routes/
│   │   └── tasks.ts       # Task CRUD endpoints
│   ├── middleware/
│   │   └── errorHandler.ts # Global error handling
│   └── schemas/
│       └── taskSchemas.ts  # Zod validation schemas
├── package.json
├── tsconfig.json
└── .env.example
```

**API Endpoints:**

- `GET /api/tasks` - List tasks (with optional filters)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /health` - Health check

### `/client` - Frontend UI

```
client/
├── src/
│   ├── App.tsx                           # Main component
│   ├── main.tsx                          # Entry point
│   ├── components/
│   │   ├── ChecklistItem.tsx             # Task item component
│   │   └── ChecklistView.tsx             # View component
│   ├── lib/
│   │   └── api.ts                        # API client
│   └── index.css                         # Tailwind styles
├── vite.config.ts
├── tailwind.config.js
├── package.json
└── .env.example
```

### `/shared` - Shared Types

TypeScript interfaces used by both client and server:

- `ChecklistTask`
- `CreateTaskRequest`
- `UpdateTaskRequest`
- `TimeframeType` ('daily' | 'monthly' | 'yearly')
- `AlignmentType` ('left' | 'center' | 'right')

## 🎨 Design Features

### Visual Feedback for Completed Tasks

- Text becomes transparent (opacity-60)
- Background fades (opacity-70)
- Strikethrough text styling
- Smooth transitions

### Task Alignment

- **Left align**: Collapse to the left with reduced width
- **Center align**: Default centered position
- **Right align**: Expand to the right with reduced visual prominence
- Hover to reveal alignment controls

## 🔄 Task Management Logic

### Daily Tasks

- Each day, the date is automatically updated
- Uncompleted tasks from previous days carry forward
- Completed tasks remain visible but faded

### Monthly Tasks

- Monthly view groups all tasks for the calendar month
- Same rollover logic applies
- Progress tracking shows completion percentage

### Yearly Tasks

- Full year view with date-based organization
- Persistent carry-forward for uncompleted items

## 🛠️ Development

### Build

```bash
npm run build
```

### Type Checking

```bash
npm run typecheck
```

### Environment Variables

**Server (.env):**

```env
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

**Client (.env):**

```env
VITE_API_URL=http://localhost:3000/api
```

## 📦 API Request/Response Examples

### Create Task

```bash
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive docs",
  "timeframe": "daily",
  "dueDate": "2024-01-15"
}
```

### Update Task

```bash
PATCH /api/tasks/:id
Content-Type: application/json

{
  "completed": true,
  "alignment": "left"
}
```

## 🐛 Error Handling

All endpoints return consistent response formats:

**Success:**

```json
{
  "success": true,
  "data": {...}
}
```

**Error:**

```json
{
  "success": false,
  "error": "Validation error",
  "details": "title: Title is required"
}
```

## 🔐 Data Validation

All requests are validated using Zod schemas:

- Task title: Required, max 255 characters
- Description: Optional, max 1000 characters
- Timeframe: Must be 'daily', 'monthly', or 'yearly'
- Due date: Valid ISO date format

## 📝 Notes for Future Enhancement

1. **Database Integration**: Replace in-memory store with PostgreSQL/MongoDB
2. **Authentication**: Add user authentication and authorization
3. **Persistence**: Add task syncing and local storage fallback
4. **Notifications**: Task reminders and push notifications
5. **Export**: PDF/CSV export functionality
6. **Collaboration**: Multi-user support with sharing
7. **Analytics**: Task completion insights and trends

## 📄 License

MIT

---

Built with ❤️ for professional task management
