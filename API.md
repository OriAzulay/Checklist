# API Documentation

Complete REST API reference for the Checklist Master backend.

## Base URL

```
http://localhost:3000/api
```

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Validation error |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Server error |

## Response Format

All responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": { /* resource or array */ }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional details about the error"
}
```

## Endpoints

### 1. Get All Tasks

**Endpoint:** `GET /tasks`

**Description:** Retrieve all tasks with optional filtering

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| timeframe | string | No | Filter by timeframe: 'daily', 'monthly', or 'yearly' |
| date | string | No | Filter by specific date (ISO format: YYYY-MM-DD) |

**Examples:**

Get all tasks:
```bash
curl http://localhost:3000/api/tasks
```

Get only daily tasks:
```bash
curl http://localhost:3000/api/tasks?timeframe=daily
```

Get tasks for a specific date:
```bash
curl http://localhost:3000/api/tasks?date=2024-01-15
```

Get daily tasks for a specific date:
```bash
curl http://localhost:3000/api/tasks?timeframe=daily&date=2024-01-15
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Review project requirements",
      "description": "Check all requirements are met",
      "completed": false,
      "timeframe": "daily",
      "dueDate": "2024-01-15",
      "alignment": "center",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "title": "Complete unit tests",
      "description": null,
      "completed": true,
      "timeframe": "daily",
      "dueDate": "2024-01-15",
      "alignment": "left",
      "createdAt": "2024-01-15T09:00:00.000Z",
      "updatedAt": "2024-01-15T15:45:00.000Z"
    }
  ]
}
```

---

### 2. Get Single Task

**Endpoint:** `GET /tasks/:id`

**Description:** Retrieve a specific task by ID

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Task ID (UUID) |

**Example:**
```bash
curl http://localhost:3000/api/tasks/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Review project requirements",
    "description": "Check all requirements are met",
    "completed": false,
    "timeframe": "daily",
    "dueDate": "2024-01-15",
    "alignment": "center",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (Task not found):**
```json
{
  "success": false,
  "error": "Task not found"
}
```

---

### 3. Create Task

**Endpoint:** `POST /tasks`

**Description:** Create a new task

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Task title (required)",
  "description": "Optional description",
  "timeframe": "daily|monthly|yearly",
  "dueDate": "2024-01-15"
}
```

**Validation Rules:**
- `title`: Required, max 255 characters
- `description`: Optional, max 1000 characters
- `timeframe`: Required, must be 'daily', 'monthly', or 'yearly'
- `dueDate`: Required, valid ISO date format (YYYY-MM-DD)

**Examples:**

Minimal request:
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "timeframe": "daily",
    "dueDate": "2024-01-15"
  }'
```

Full request:
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Review code changes",
    "description": "Review all PRs from the team",
    "timeframe": "daily",
    "dueDate": "2024-01-15"
  }'
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "title": "Review code changes",
    "description": "Review all PRs from the team",
    "completed": false,
    "timeframe": "daily",
    "dueDate": "2024-01-15",
    "alignment": "center",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Validation error",
  "details": "title: Title is required; timeframe: Invalid enum value"
}
```

---

### 4. Update Task

**Endpoint:** `PATCH /tasks/:id`

**Description:** Update an existing task (partial update)

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Task ID (UUID) |

**Headers:**
```
Content-Type: application/json
```

**Request Body:** (All fields optional)
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true,
  "alignment": "left|center|right"
}
```

**Examples:**

Mark task as complete:
```bash
curl -X PATCH http://localhost:3000/api/tasks/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

Change alignment:
```bash
curl -X PATCH http://localhost:3000/api/tasks/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "alignment": "left"
  }'
```

Update multiple fields:
```bash
curl -X PATCH http://localhost:3000/api/tasks/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated title",
    "completed": true,
    "alignment": "right"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Updated title",
    "description": "Original description",
    "completed": true,
    "timeframe": "daily",
    "dueDate": "2024-01-15",
    "alignment": "right",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T16:45:00.000Z"
  }
}
```

---

### 5. Delete Task

**Endpoint:** `DELETE /tasks/:id`

**Description:** Delete a task permanently

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Task ID (UUID) |

**Example:**
```bash
curl -X DELETE http://localhost:3000/api/tasks/550e8400-e29b-41d4-a716-446655440000
```

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Error Response (Task not found):**
```json
{
  "success": false,
  "error": "Task not found"
}
```

---

### 6. Health Check

**Endpoint:** `GET /health`

**Description:** Check if the server is running

**Example:**
```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## Data Types

### ChecklistTask Object

```typescript
{
  id: string;              // UUID
  title: string;           // Task title (1-255 chars)
  description?: string;    // Optional (max 1000 chars)
  completed: boolean;      // Whether task is done
  timeframe: string;       // 'daily', 'monthly', or 'yearly'
  dueDate: string;        // ISO date string
  alignment?: string;      // 'left', 'center', or 'right'
  createdAt: string;      // ISO timestamp
  updatedAt: string;      // ISO timestamp
}
```

### Timeframe Values

| Value | Description |
|-------|-------------|
| `daily` | Task for a single day |
| `monthly` | Task for the entire month |
| `yearly` | Task for the entire year |

### Alignment Values

| Value | Description |
|-------|-------------|
| `left` | Align to the left |
| `center` | Center alignment (default) |
| `right` | Align to the right |

---

## Common API Patterns

### Get Today's Daily Tasks
```bash
curl "http://localhost:3000/api/tasks?timeframe=daily&date=$(date -u +%Y-%m-%d)"
```

### Get All Completed Tasks for a Date
```bash
curl http://localhost:3000/api/tasks?date=2024-01-15
# Then filter in client for completed === true
```

### Toggle Task Completion
```bash
# First get current state
CURRENT=$(curl http://localhost:3000/api/tasks/YOUR_ID | grep completed)

# Then update with opposite value
curl -X PATCH http://localhost:3000/api/tasks/YOUR_ID \
  -H "Content-Type: application/json" \
  -d '{"completed": false}'
```

---

## Error Codes & Messages

### Validation Errors (400)

**Empty Title:**
```json
{
  "success": false,
  "error": "Validation error",
  "details": "title: Title is required"
}
```

**Invalid Timeframe:**
```json
{
  "success": false,
  "error": "Validation error",
  "details": "timeframe: Invalid enum value"
}
```

**Invalid Date Format:**
```json
{
  "success": false,
  "error": "Validation error",
  "details": "dueDate: Invalid date"
}
```

### Not Found Errors (404)

```json
{
  "success": false,
  "error": "Task not found"
}
```

### Server Errors (500)

```json
{
  "success": false,
  "error": "Internal server error",
  "details": "Error message (development only)"
}
```

---

## Testing with cURL

### 1. Create a task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test task",
    "timeframe": "daily",
    "dueDate": "2024-01-15"
  }' | jq .
```

### 2. List all tasks
```bash
curl http://localhost:3000/api/tasks | jq .
```

### 3. Get a specific task (replace ID)
```bash
curl http://localhost:3000/api/tasks/550e8400-e29b-41d4-a716-446655440000 | jq .
```

### 4. Update the task
```bash
curl -X PATCH http://localhost:3000/api/tasks/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}' | jq .
```

### 5. Delete the task
```bash
curl -X DELETE http://localhost:3000/api/tasks/550e8400-e29b-41d4-a716-446655440000 | jq .
```

---

## Testing with Postman

1. Import as new environment variable:
   - `BASE_URL`: `http://localhost:3000/api`

2. For each request, use:
   - `GET {{BASE_URL}}/tasks`
   - `POST {{BASE_URL}}/tasks`
   - etc.

3. Set Headers:
   - `Content-Type: application/json`

---

## Future Enhancements

- [ ] Pagination for task lists
- [ ] Search/filter capabilities
- [ ] Sort options
- [ ] Bulk operations
- [ ] Task history/audit log
- [ ] User authentication
- [ ] Rate limiting
- [ ] API versioning (v1, v2, etc.)

---

**Last Updated:** January 2024  
**Version:** 1.0.0
