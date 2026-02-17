# Code Review & Simplification - Implementation Plan

**Date**: February 16, 2026  
**Status**: Ready for Simplification  
**Decisions Made**:
- ✅ Alignment feature: **DELETE**
- ✅ Unused utilities: **KEEP** (planned for monthly/yearly views)
- ✅ TanStack Query: **SIMPLIFY** (remove over-engineering)

## Summary

Removing ~120 lines of unused/over-engineered code. Complexity: **7/10 → 5/10**. Estimated time: **20 minutes**.

---

## 🔴 Critical Issues - Delete (Phase 1)

### Alignment Feature - DELETE Completely ✂️

**Status**: Infrastructure exists but not used in UI  
**Impact**: 5 files/80+ lines of code  

**Files to Update**:

1. **shared/types.ts** - Remove alignment type and field
   ```typescript
   // DELETE:
   export type AlignmentType = 'left' | 'center' | 'right';
   
   // FROM ChecklistTask, DELETE:
   alignment?: AlignmentType;
   ```

2. **server/src/repositories/taskRepository.ts** - Remove alignment initialization
   ```typescript
   // DELETE alignment field from sample data initialization
   alignment: 'center',  // ← DELETE THIS
   ```

3. **server/src/routes/tasks.ts** - Response already filters correctly (no changes needed)

4. **client/src/hooks/useTasks.ts** - Delete alignment hook
   ```typescript
   // DELETE entire function:
   export const useUpdateAlignment = () => { ... };
   ```

5. **client/src/components/ChecklistItem.tsx** - Remove unused prop
   ```typescript
   // DELETE from interface:
   onAlignmentChange: (id: string, alignment: AlignmentType) => void;
   
   // DELETE from component parameters (destructure)
   ```

6. **client/src/components/ChecklistView.tsx** - Remove alignment parameter
   ```typescript
   // DELETE from interface:
   onAlignmentChange: (id: string, alignment: 'left' | 'center' | 'right') => void;
   
   // DELETE from component call:
   onAlignmentChange={() => {}}
   ```

7. **client/src/App.tsx** - Remove alignment mutation
   ```typescript
   // DELETE mutation:
   const alignmentMutation = useMutation({ ... });
   
   // DELETE from component prop:
   onAlignmentChange={(id, alignment) =>
     alignmentMutation.mutate({ id, alignment })
   }
   ```

**Result**: -80 lines, cleaner codebase

---

## 🟡 Over-Engineered - Simplify (Phase 2)

### TanStack React Query - Simplify Hooks ⚙️

**Status**: 5 redundant hooks doing similar things  
**Problem**: 60 lines with 90% duplication  

**Current Structure (REMOVE)**:
```typescript
export const useCreateTask = () => { ... };      // ~10 lines
export const useUpdateTask = () => { ... };      // ~10 lines
export const useToggleTask = () => { ... };      // ~10 lines
export const useDeleteTask = () => { ... };      // ~10 lines
export const useUpdateAlignment = () => { ... }; // ~10 lines ← ALSO DELETE
// Total: ~50 lines
```

**New Structure (REPLACE WITH)**:
```typescript
// Single generic mutation hook
export const useTaskMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

// Usage in App.tsx:
const createMutation = useTaskMutation();
const toggleMutation = useTaskMutation();
const deleteMutation = useTaskMutation();

// Then pass API functions directly:
createMutation.mutate(taskAPI.createTask(data));
```

**File**: `client/src/hooks/useTasks.ts`  
**Result**: -40 lines, clearer intent

**File Changes**:
- `useTasks.ts` - Keep only generic hook
- `App.tsx` - Use new hook pattern

---

## ✅ Keep As-Is (No Changes)

### Utilities - Keep for Future Features

**Files** (NOT DELETING):
- `client/src/lib/dateUtils.ts` - Already used + planned for monthly/yearly
- `client/src/lib/taskUtils.ts` - Planned for future filtering
- `shared/types.ts` - TimeframeType structure
- All documentation files

**Why**: These will be used when monthly/yearly views are implemented.

---

## ✅ What's Good (No Changes Needed)

✅ TypeScript strict mode  
✅ Monorepo structure  
✅ API design  
✅ Error handling  
✅ Component design  
✅ New accordion tabs design  

---

## 📋 Implementation Checklist

### Phase 1: Delete Alignment Feature (10 min)
```
[ ] client/src/App.tsx - Remove alignmentMutation, onAlignmentChange prop
[ ] client/src/components/ChecklistItem.tsx - Remove onAlignmentChange prop
[ ] client/src/components/ChecklistView.tsx - Remove onAlignmentChange prop & parameter
[ ] client/src/hooks/useTasks.ts - Remove useUpdateAlignment() function
[ ] shared/types.ts - Remove AlignmentType, alignment field from ChecklistTask
[ ] server/src/repositories/taskRepository.ts - Remove alignment from sample data
```

### Phase 2: Simplify React Query Hooks (10 min)
```
[ ] client/src/hooks/useTasks.ts - Replace 5 hooks with 1 generic useTaskMutation()
[ ] client/src/App.tsx - Update to use new hook pattern
```

### Verification
```
[ ] npm run typecheck (no errors)
[ ] npm run dev (app loads)
[ ] Test create task
[ ] Test toggle complete
[ ] Test delete task
```

---

## Expected Results

| Before | After | Change |
|--------|-------|--------|
| `useTasks.ts`: 60 lines | `useTasks.ts`: 20 lines | -40 lines |
| 5 hooks | 1 hook | -4 LOC |
| Alignment everywhere | Alignment deleted | -80 lines |
| **Total**: 440 lines | **Total**: 320 lines | **-120 lines (-27%)** |

---

## ⚡ Quick Reference

### Files Modified (Phase 1 & 2)

1. **client/src/App.tsx** - Remove alignment mutation, simplify hook usage
2. **client/src/components/ChecklistItem.tsx** - Remove onAlignmentChange prop
3. **client/src/components/ChecklistView.tsx** - Remove onAlignmentChange prop
4. **client/src/hooks/useTasks.ts** - Replace 5 hooks with 1 generic hook
5. **shared/types.ts** - Remove AlignmentType and alignment field
6. **server/src/repositories/taskRepository.ts** - Remove alignment from sample data

### Files Kept (No Changes)

- `client/src/lib/dateUtils.ts` - Keep (for future monthly/yearly)
- `client/src/lib/taskUtils.ts` - Keep (for future filtering)
- `client/src/components/ChecklistItem.tsx` - Keep component structure
- `client/src/components/ChecklistView.tsx` - Keep component structure
- `server/src/` - All server files kept as-is

---

## 🚀 Ready to Implement?

All changes listed above with file names and line references. Time estimate: **20 minutes** total.
