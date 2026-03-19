# Feature: Form Canvas

## Stack & Libraries
React 19, TypeScript ~5.9, Tailwind CSS 4, Zustand 5, crypto.randomUUID(), @dnd-kit/react, lucide-react, shadcn components

## Component Structure
```
src/
├── pages/
│   └── FormBuilderPage.tsx         (Layout Container, renders FormCanvas in the <main> slot)
└── components/
    └── FormCanvas/
        ├── index.ts                  (Exports FormCanvas)
        ├── FormCanvas.tsx            (Connects to Zustand, sets up DragDropProvider)
        └── FieldCanvasCard.tsx       (Presentational component rendering the field UI + useSortable hook)
```

## Data Flow
1. `FormBuilderPage` allocates the center panel `<main>` to `FormCanvas`.
2. `FormCanvas` connects directly to the Zustand store via `useFormStore` (e.g., `src/store/useFormStore`). It selects `fields`, `selectedId`, `updateField`, `removeField`, `setSelectedId`, `addField`, and `reorderFields`.
3. If `fields` is empty, `FormCanvas` renders the empty state prompt: "Click any field from the left sidebar to add it here".
4. If not empty, `FormCanvas` wraps the list in `@dnd-kit/react` `<DragDropProvider>`.
   - The `onDragEnd` handler receives `{ source, target }` from event data.
   - It converts `source.id` and `target.id` to array indices via `useFormStore.getState().fields.findIndex()`.
   - It then calls `reorderFields(oldIndex, newIndex)`. Do NOT use arrayMove.
5. `FormCanvas` maps over `fields` and renders a `FieldCanvasCard` for each, passing `field` and `index`.
6. `FieldCanvasCard` invokes `useSortable({ id: field.id, index })` from `@dnd-kit/react/sortable`. `ref` goes to the root card element, and `handleRef` goes to the drag handle element only. `isDragging` is used for visual feedback.
7. `FieldCanvasCard` receives:
   - `field` (single FieldSchema)
   - `index` (number)
   - `isSelected` (boolean derived from `field.id === selectedId`)
   - `onSelect`: calls `setSelectedId(field.id)`
   - `onUpdate`: debounced function that calls `updateField(field.id, changes)`
   - `onDelete`: calls `removeField(field.id)`
   - `onDuplicate`: copies field, assigns new `crypto.randomUUID()`, calls `addField(copy)`, then reads `currentIndex` using `useFormStore.getState().fields` and calls `reorderFields(useFormStore.getState().fields.length - 1, currentIndex + 1)`.
8. Store mutations flow back down instantly.

## Interfaces & Types
No new domain types needed. We reuse `FieldSchema` from `src/types/field.ts`. Component props interfaces should be local to their respective files to enforce the boundary.

```tsx
interface FieldCanvasCardProps {
  field: FieldSchema;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (changes: Partial<Omit<FieldSchema, 'id' | 'type'>>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}
```

## File Structure
```
src/
├── pages/
│   └── FormBuilderPage.tsx               ← Update center slot to <FormCanvas />
└── components/
    └── FormCanvas/
        ├── index.ts                      ← export default FormCanvas;
        ├── FormCanvas.tsx                ← Zustand connection + DragDropProvider
        └── FieldCanvasCard.tsx           ← Pure presentational card UI + useSortable
```

## Builder Rules
1. **Separation of Concerns:** `FieldCanvasCard` must NEVER import Zustand or `useFormStore`. It receives purely props. `FormCanvas` is the only component in this folder that connects to the store.
2. **Event Propagation:** Do NOT call `e.stopPropagation()` on inline text inputs (Label, Placeholder). Clicking an input MUST bubble up to the card's `onClick` to set `selectedId` (matching Google Forms selection behavior). `e.stopPropagation()` is ONLY needed on the Delete and Duplicate buttons so they don't trigger context selection.
3. **Selection:** The card is selected by clicking anywhere on it, including its inputs. Focusing inputs via keyboard does NOT set the `selectedId`; selection is driven strictly by the card's `onClick`.
4. **Debouncing:** Label and placeholder inline edits must be debounced before invoking `onUpdate`. Required toggle invokes `onUpdate` immediately. Since external libraries like `lodash` are forbidden, implement your own debounce mechanism (e.g., via `setTimeout` in a custom hook or utility function).
5. **Placeholder Render Condition:** The Placeholder inline input on the card must ONLY be rendered if the `field` object natively supports it (e.g., `'placeholder' in field`). Verify via the FieldSchema discriminated union.
6. **Card Content Strictness:** Do NOT render the `defaultValue` or `validations` on this card. They belong to the Properties Panel. Do NOT render the field `id` anywhere visible to the user.
7. **Type/Subtype Indicator:** Display a read-only plain text label indicating the type and subtype at the top of the card (display only, e.g., "text / email" or "select").
8. **Duplication Implementation:** To avoid a race condition, implement duplication by passing a callback from `FormCanvas` that reads fresh state at call time:
   ```ts
   const copy = { ...field, id: crypto.randomUUID() };
   addField(copy);
   const currentIndex = useFormStore.getState().fields.findIndex(f => f.id === field.id);
   reorderFields(useFormStore.getState().fields.length - 1, currentIndex + 1);
   ```
9. **Empty State:** If `fields.length === 0`, show exactly the text "Click any field from the left sidebar to add it here" centered in the canvas.
10. **Drag Handle:** Use `@dnd-kit/react` hook `useSortable`. The `ref` goes on the root card element. The `handleRef` goes on the drag handle element only. This is critical to prevent dragging when interacting with text inputs.
11. **Config UI Only:** `FieldCanvasCard` renders schema configuration elements only: a text input to edit the `label` string, a text input to edit the `placeholder` string (where applicable), a toggle for the `required` boolean, and the Type/subtype as a plain text label. It does NOT render the actual form input for the field type (no `<input type="date">`, no `<select>`, no calendar). That is the Live Preview's job.
12. **Icons:** Use ONLY `lucide-react` for the Drag Handle, Duplicate, and Delete icons.
13. **Card Layout:** Layout must match the Google Forms aesthetic. Drag handle is centered at the very top. The label input is a prominent borderless heading. The placeholder input (if applicable) sits below it. A footer row contains the duplicate button, delete button, and required toggle aligned to the right. The type/subtype indicator is a subtle plain text label at the top right of the card.
14. **Properties Panel connection:** Ensure `selectedId` is set in the store via `setSelectedId(field.id)`. The Properties Panel itself is out of scope for this task—just maintain the `selectedId` correctness.

## Constraints
- **NO ANY TYPE:** Provide strictly typed interfaces for all props and events.
- **NO CSS-in-JS:** Use Tailwind CSS exclusively for styling.
- **NO EXTERNAL LIBRARIES:** Use `crypto.randomUUID()` for IDs. Use `@dnd-kit/react` (new API). ONLY the predefined `FieldSchema` union can be used. Use `lucide-react` for icons. Shadcn components are allowed. Do NOT use external utility libraries like `lodash` for debouncing.
- **DESKTOP ONLY:** Do not write responsive classes (e.g. `md:`, `lg:`); target desktop layout only.
