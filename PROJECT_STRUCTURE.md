# Project Structure

```
checklist/
├── 📄 README.md                      # Main documentation
├── 📄 REQUIREMENTS.md                # Functional & technical requirements
├── 📄 IMPLEMENTATION.md              # Implementation guide & checklist
├── 📄 CONTRIBUTING.md                # Contribution guidelines
├── 📄 package.json                   # Root monorepo config
├── 📄 .gitignore                     # Git ignore rules
├── 📄 docker-compose.yml             # Docker orchestration
├── 📄 Dockerfile.server              # Server container config
├── 📄 Dockerfile.client              # Client container config
│
├── 📁 shared/                        # Shared TypeScript types
│   └── 📄 types.ts                   # All shared interfaces
│
├── 📁 server/                        # Backend API
│   ├── 📄 package.json               # Dependencies
│   ├── 📄 tsconfig.json              # TypeScript config
│   ├── 📄 .env.example               # Environment template
│   ├── 📄 .eslintrc.json             # Linting rules
│   │
│   └── 📁 src/
│       ├── 📄 index.ts               # Express app entry point
│       ├── 📄 config.ts              # Configuration & constants
│       │
│       ├── 📁 routes/
│       │   └── 📄 tasks.ts           # Task endpoints
│       │
│       ├── 📁 middleware/
│       │   └── 📄 errorHandler.ts    # Error handling middleware
│       │
│       ├── 📁 schemas/
│       │   └── 📄 taskSchemas.ts     # Zod validation schemas
│       │
│       └── 📁 repositories/
│           └── 📄 taskRepository.ts  # In-memory data layer
│
├── 📁 client/                        # Frontend React app
│   ├── 📄 package.json               # Dependencies
│   ├── 📄 tsconfig.json              # TypeScript config
│   ├── 📄 tsconfig.node.json         # Node TS config
│   ├── 📄 vite.config.ts             # Vite bundler config
│   ├── 📄 tailwind.config.js         # Tailwind CSS config
│   ├── 📄 postcss.config.js          # PostCSS config
│   ├── 📄 .env.example               # Environment template
│   ├── 📄 .eslintrc.json             # Linting rules
│   ├── 📄 index.html                 # HTML entry point
│   │
│   └── 📁 src/
│       ├── 📄 main.tsx               # React entry point
│       ├── 📄 App.tsx                # Main App component
│       ├── 📄 index.css              # Global styles
│       │
│       ├── 📁 components/
│       │   ├── 📄 ChecklistItem.tsx  # Task item component
│       │   └── 📄 ChecklistView.tsx  # Timeframe view component
│       │
│       ├── 📁 hooks/
│       │   └── 📄 useTasks.ts        # Custom React Query hooks
│       │
│       └── 📁 lib/
│           ├── 📄 api.ts             # API client (axios)
│           ├── 📄 dateUtils.ts       # Date utility functions
│           └── 📄 taskUtils.ts       # Task manipulation functions
```

## Directory Purposes

### `/shared`
- **Purpose**: TypeScript interfaces used by both client and server
- **Contains**: Type definitions for tasks, requests, responses
- **Benefit**: Single source of truth for types, prevents duplication

### `/server`
- **Purpose**: Node.js/Express backend REST API
- **Key Features**:
  - RESTful endpoints for task CRUD
  - Zod validation on all requests
  - Centralized error handling
  - In-memory data storage (ready for DB migration)

### `/client`
- **Purpose**: React 19 + Vite frontend application
- **Key Features**:
  - Modern component-based architecture
  - TanStack Query for server state
  - Tailwind CSS for styling
  - Environment variable configuration

## File Descriptions

### Core Configuration Files

- **package.json**: Root monorepo configuration with concurrent dev/build scripts
- **docker-compose.yml**: Orchestrates client and server containers
- **Dockerfile.server**: Multi-stage build for optimized server image
- **.gitignore**: Excludes node_modules, build artifacts, env files

### Server Files

- **index.ts**: Entry point, initializes Express, mounts routes
- **errorHandler.ts**: Middleware catches all errors, returns consistent format
- **taskSchemas.ts**: Zod schemas validate all task requests
- **tasks.ts**: All task endpoints (GET, POST, PATCH, DELETE)

### Client Files

- **App.tsx**: Main component with tabs, date selector, task creation form
- **ChecklistItem.tsx**: Individual task row with checkbox, alignment controls
- **ChecklistView.tsx**: Task list with progress bar and empty states
- **api.ts**: Axios instance with all API methods
- **hooks/useTasks.ts**: Custom React Query hooks for task operations
- **lib/dateUtils.ts**: Date manipulation helpers (today, formatting, etc.)
- **lib/taskUtils.ts**: Task manipulation (grouping, filtering, calculations)

## Key Architectural Decisions

### 1. Monorepo Structure
- Easier code sharing (/shared folder)
- Single npm install for development
- Deplorable as separate services
- Clear separation of concerns

### 2. In-Memory Data Layer
- Quick start without database setup
- Repository pattern prepared for migration
- Easy testing without DB dependency
- Reset on server restart (development friendly)

### 3. TanStack Query
- Powerful server state management
- Built-in caching and stale time
- Automatic refetching on focus
- Handles loading/error states
- No Redux complexity needed

### 4. Zod Validation
- Type-safe schema validation
- Automatic TypeScript inference
- Clear error messages
- Server AND client validation ready

### 5. Tailwind CSS
- Utility-first approach
- No custom CSS classes needed
- Consistent spacing/colors
- Responsive design built-in

## Future Directory Additions

When implementing new features:

```
server/src/
├── /services/          # Business logic layer
├── /models/            # Database models
├── /migrations/        # Database migrations
├── /controllers/       # Request handlers
└── /types/             # Additional types

client/src/
├── /pages/             # Page components
├── /context/           # React Context
├── /utils/             # Utility functions
├── /styles/            # Additional CSS
└── /constants/         # Constants
```

## Build Artifacts

After running `npm run build`:

```
server/
└── dist/               # Compiled JavaScript
    ├── index.js
    ├── routes/
    ├── middleware/
    └── ...

client/
└── dist/               # Optimized static files
    ├── index.html
    ├── assets/
    │   ├── *.js
    │   ├── *.css
    │   └── ...
```

---

**Note**: This structure supports both monolithic and microservices deployment. Client and server can be deployed independently.
