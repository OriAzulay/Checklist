# Quick Start Guide

Get the Checklist Master application running in under 5 minutes!

## 🚀 Fastest Start (Local Development)

### Step 1: Install Dependencies
```bash
cd c:\Users\ori\projects\checklist
npm run install-all
```
This installs dependencies for root, server, and client.

### Step 2: Start Development Servers
```bash
npm run dev
```

**What happens:**
- Backend API starts on http://localhost:3000
- Frontend app starts on http://localhost:5173
- Both run concurrently with hot reload

### Step 3: Open Your Browser
Navigate to **http://localhost:5173** 

You should see:
- Title: "✓ Checklist Master"
- Three tabs: Daily, Monthly, Yearly
- A date picker and task creation form
- Empty state message

## ✅ First Task Workflow

1. **Click the "Daily" tab** (should be active by default)
2. **Type a task** in the input field: "Review project requirements"
3. **Click "Add Task"** button
4. Task appears in the list with:
   - Checkbox (unchecked)
   - Your task title
   - Due date (today's date)
5. **Check the box** to mark as complete
6. **Notice the effect**:
   - Task becomes transparent (70% opacity)
   - Text fades (60% opacity)
   - Text gets strikethrough
7. **Hover over task** to see additional controls:
   - Alignment buttons (left/center/right)
   - Delete button
8. **Click alignment buttons** to see task position change

## 🎯 Tab Navigation

- **Daily Tab**: Single-day tasks
  - Change date with the date picker
  - Tasks from other dates don't appear
  
- **Monthly Tab**: Entire month view
  - Shows all tasks created for that month
  - Date picker filters by month/year
  
- **Yearly Tab**: Full year view
  - All tasks for the selected year
  - Date picker shows year selection

## 🔧 Development Commands

```bash
# Start everything (from root folder)
npm run dev

# Run just the server
npm run server

# Run just the client
npm run client

# Type checking
npm run typecheck

# Build for production
npm run build
```

## 📂 Key Files to Know

### Main Components
- **[client/src/App.tsx](./client/src/App.tsx)**: Main app component with tabs and form
- **[client/src/components/ChecklistItem.tsx](./client/src/components/ChecklistItem.tsx)**: Single task component
- **[server/src/index.ts](./server/src/index.ts)**: Express server entry point

### API Endpoints
- **[server/src/routes/tasks.ts](./server/src/routes/tasks.ts)**: All task endpoints

### Styles
- **[client/src/index.css](./client/src/index.css)**: Tailwind CSS setup
- **[client/tailwind.config.js](./client/tailwind.config.js)**: Tailwind configuration

### Data Types
- **[shared/types.ts](./shared/types.ts)**: All TypeScript interfaces

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (server)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on port 5173 (client)
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Dependencies Not Installing
```bash
# Clean and reinstall
rm -r node_modules server/node_modules client/node_modules package-lock.json
npm run install-all
```

### Module Not Found Error
Make sure you're in the correct directory:
```bash
cd c:\Users\ori\projects\checklist
npm run dev
```

### API Connection Failed
Check that both servers are running:
```bash
# Test server health
curl http://localhost:3000/health

# Test client is running
# Browse http://localhost:5173
```

## 🐳 Docker Alternative (One Command!)

If you prefer containers:

```bash
docker-compose up
```

Then open http://localhost:5173

**Advantages:**
- No local Node.js installation needed
- Isolated environment
- Production-like setup

**Stop containers:**
```bash
docker-compose down
```

## 📚 Next Steps

1. **Explore the code**:
   - Look at [REQUIREMENTS.md](./REQUIREMENTS.md) for feature specs
   - Check [IMPLEMENTATION.md](./IMPLEMENTATION.md) for advanced topics
   - Review [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for file details

2. **Add more tasks**:
   - Create daily/monthly/yearly tasks
   - Test the alignment buttons
   - Try marking tasks complete

3. **Make your first change**:
   - Edit colors in [client/tailwind.config.js](./client/tailwind.config.js)
   - Change placeholder text in [client/src/App.tsx](./client/src/App.tsx)
   - Add a new API field in [shared/types.ts](./shared/types.ts)

4. **Set up your environment**:
   ```bash
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```
   Edit these files as needed

5. **Implement task rollover** (future feature):
   - See [IMPLEMENTATION.md](./IMPLEMENTATION.md#task-rollover-logic) for guidance
   - Add service to handle daily/monthly/yearly rollover
   - Test with past dates

## 🎨 Design Features Currently Implemented

✅ **Completed Tasks Transparency**
- Checked tasks fade to 70% opacity
- Text fades to 60% opacity
- Strikethrough styling

✅ **Task Alignment**
- Three alignment options (left/center/right)
- Visible on hover
- Persists when updated
- Visual feedback for active alignment

✅ **Responsive Layout**
- Works on mobile, tablet, desktop
- Touch-friendly controls
- Full-width on small screens

✅ **Modern UI**
- Tailwind CSS styling
- Smooth transitions
- Lucide React icons
- Progress tracking

## 🚨 Error Handling

The app includes:
- **API errors**: Displays validation messages
- **Network errors**: Shows error state
- **Form validation**: Real-time feedback
- **Loading states**: Spinner during operations

Try creating a task with:
- Empty title (validation error)
- Very long title (shows character limit)
- Past date (allowed, for testing rollover)

## 💡 Tips

- **Date picker** supports any past or future date
- **Progress bar** updates in real-time
- **Hover effects** are smooth 300ms transitions
- **Check console** (F12) for any errors
- **Try all three tabs** to see different views

## 🎯 Common Tasks

### Change the API URL
Edit [client/.env](./client/.env.example):
```env
VITE_API_URL=http://your-api.com/api
```

### Change server port
Edit [server/.env](./server/.env.example):
```env
PORT=3001
```
Then update client API URL to match.

### Add a field to tasks
1. Type in [shared/types.ts](./shared/types.ts)
2. Update schema in [server/src/schemas](./server/src/schemas/taskSchemas.ts)
3. Update component in [client/src/components](./client/src/components/ChecklistItem.tsx)

## 📖 Full Documentation

- **[README.md](./README.md)**: Complete feature overview
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)**: Detailed file guide
- **[REQUIREMENTS.md](./REQUIREMENTS.md)**: All specs and requirements
- **[IMPLEMENTATION.md](./IMPLEMENTATION.md)**: How to implement features
- **[CONTRIBUTING.md](./CONTRIBUTING.md)**: Contribution guidelines

## 🆘 Need Help?

1. Check the README sections
2. Review source code comments
3. Check browser console (F12) for errors
4. Check terminal for server logs
5. Verify both servers are running (`npm run dev`)

---

**Happy task managing!** 🎉

Once everything is working, start creating tasks and exploring the features. Then check out IMPLEMENTATION.md for how to add task rollover and other advanced features.
