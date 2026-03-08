# Feature: Store + Types

> **Note:** `project-info.md` lists field types as `text, email, number, textarea, select, checkbox, radio`. This plan expands to 10 field types with text subtypes. `project-info.md` should be updated separately to reflect this.

## Stack & Libraries

| Technology | Version | Purpose |
|---|---|---|
| TypeScript | ~5.9 | Strict typing for all files |
| Zustand | 5 | Global state management for form schema |
| React | 19 | UI framework (store consumed via hooks) |

---

## Component Structure

This feature has **no UI components**. It provides the foundational data layer that all future features depend on.

```
src/
├── types/
│   └── field.ts              ← All field types, validations, discriminated union
└── store/
    └── formStore.ts          ← Zustand store (state + actions)
```

---

## Data Flow

```
                    ┌─────────────────────────┐
                    │       formStore          │
                    │  (Zustand store)         │
                    │                          │
                    │  state:                  │
                    │    fields: FieldSchema[] │
                    │    selectedFieldId:      │
                    │      string | null       │
                    │                          │
                    │  actions:                │
                    │    addField()            │
                    │    removeField()         │
                    │    updateField()         │
                    │    reorderFields()       │
                    │    selectField()         │
                    │    clearCanvas()         │
                    └──────────┬──────────────┘
                               │
                    Components read via
                    useFormStore(selector)
```

1. **Components call actions** → store updates `fields` array or `selectedFieldId`.
2. **Components subscribe via selectors** → only re-render when their slice changes.
3. **No derived state in the store.** The selected field object is derived in the consuming component via `fields.find(f => f.id === selectedFieldId)`.

---

## Interfaces & Types

### `src/types/field.ts`

#### Field Type Discriminant

```typescript
export type FieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'checkbox-group'
  | 'date'
  | 'file'
  | 'range'
  | 'switch';
```

#### Text Subtypes

```typescript
export type TextSubtype = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
```

#### Options (for select, radio, checkbox-group only)

```typescript
export type FieldOption = {
  label: string;
  value: string;
};
```

#### Validation Types

Each field type has a validation type shaped for its Zod rules. Only types with configurable validations get a named type. Fields with no additional validations beyond `required` use `Record<string, never>` inline.

```typescript
export type TextValidations = {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
};

export type TextareaValidations = {
  minLength?: number;
  maxLength?: number;
};

export type CheckboxGroupValidations = {
  minSelected?: number;
  maxSelected?: number;
};

export type DateValidations = {
  minDate?: string;
  maxDate?: string;
};

export type FileValidations = {
  maxSize?: number;
  accept?: string[];
};

export type RangeValidations = {
  min?: number;
  max?: number;
  step?: number;
};
```

#### Base Field Properties

```typescript
type BaseField = {
  id: string;
  label: string;
  required: boolean;
  placeholder?: string;
};
```

`BaseField` is **not exported**. It exists only as a composition helper inside `field.ts`.

#### Field Variants (Discriminated Union Members)

```typescript
export type TextField = BaseField & {
  type: 'text';
  subtype: TextSubtype;
  validations: TextValidations;
};

export type TextareaField = BaseField & {
  type: 'textarea';
  validations: TextareaValidations;
};

export type SelectField = BaseField & {
  type: 'select';
  options: FieldOption[];
  validations: Record<string, never>;
};

export type RadioField = BaseField & {
  type: 'radio';
  options: FieldOption[];
  validations: Record<string, never>;
};

export type CheckboxField = BaseField & {
  type: 'checkbox';
  validations: Record<string, never>;
};

export type CheckboxGroupField = BaseField & {
  type: 'checkbox-group';
  options: FieldOption[];
  validations: CheckboxGroupValidations;
};

export type DateField = BaseField & {
  type: 'date';
  validations: DateValidations;
};

export type FileField = BaseField & {
  type: 'file';
  validations: FileValidations;
};

export type RangeField = BaseField & {
  type: 'range';
  validations: RangeValidations;
};

export type SwitchField = BaseField & {
  type: 'switch';
  validations: Record<string, never>;
};
```

#### The Discriminated Union

```typescript
export type FieldSchema =
  | TextField
  | TextareaField
  | SelectField
  | RadioField
  | CheckboxField
  | CheckboxGroupField
  | DateField
  | FileField
  | RangeField
  | SwitchField;
```

Discriminated on `type`. Narrowing example: `if (field.type === 'text') { field.subtype; /* accessible */ }`.

---

### `src/store/formStore.ts`

```typescript
export type FormState = {
  fields: FieldSchema[];
  selectedFieldId: string | null;
};

export type FormActions = {
  addField: (type: FieldType) => void;
  removeField: (id: string) => void;
  updateField: <T extends FieldSchema>(id: string, changes: Partial<Omit<T, 'id'>>) => void;
  reorderFields: (fromIndex: number, toIndex: number) => void;
  selectField: (id: string | null) => void;
  clearCanvas: () => void;
};
```

The store type is `FormState & FormActions`. Pass this as the generic to Zustand's `create<FormState & FormActions>()`.

---

## Action Specifications

### `addField(type: FieldType)`
- Creates a new field variant with `crypto.randomUUID()` as `id`.
- Uses the **Default Field Factory** below to construct the correct discriminated union member.
- Appends the new field to the end of `fields`.
- Auto-selects the newly added field by setting `selectedFieldId` to its `id`.

#### Default Field Factory

| Type | `label` | Extra Properties | `validations` |
|---|---|---|---|
| `text` | `"Text Field"` | `subtype: 'text'` | `{}` |
| `textarea` | `"Textarea Field"` | — | `{}` |
| `select` | `"Select Field"` | `options: []` | `{}` |
| `radio` | `"Radio Field"` | `options: []` | `{}` |
| `checkbox` | `"Checkbox Field"` | — | `{}` |
| `checkbox-group` | `"Checkbox Group"` | `options: []` | `{}` |
| `date` | `"Date Field"` | — | `{}` |
| `file` | `"File Upload"` | — | `{}` |
| `range` | `"Range Field"` | — | `{}` |
| `switch` | `"Switch Field"` | — | `{}` |

All fields default to `required: false`. `placeholder` is not set (undefined) by default. Options for select/radio/checkbox-group are intentionally `[]` — the Properties Panel feature will handle adding/editing options.

### `removeField(id: string)`
- Filters the field with the given `id` from `fields`.
- If the removed field was selected (`selectedFieldId === id`), clears selection to `null`.
- If `id` doesn't match any field, this is a no-op.

### `updateField<T extends FieldSchema>(id: string, changes: Partial<Omit<T, 'id'>>)`
- Uses a generic `T extends FieldSchema` to ensure type-safe updates per field variant at the call site.
- Maps over `fields` and applies `changes` via spread: `{ ...field, ...changes }`.
- `id` is excluded from `changes` — field identity is immutable.
- If `id` doesn't match, no state change occurs.
- **Implementation note:** The generic is erased at runtime. The spread result requires `as FieldSchema` type assertion because TypeScript cannot verify discriminated union integrity through generic spreads. This is expected.

### `reorderFields(fromIndex: number, toIndex: number)`
- Removes the field at `fromIndex` and inserts it at `toIndex`.
- Validates both indices are within bounds. If invalid, this is a no-op.
- Does **not** change `selectedFieldId`.

### `selectField(id: string | null)`
- Sets `selectedFieldId` to the given `id`.
- Passing `null` clears the selection.
- Does **not** validate that `id` exists in `fields`. Validation is the caller's responsibility.

### `clearCanvas()`
- Resets `fields` to `[]`.
- Resets `selectedFieldId` to `null`.

---

## File Structure

```
src/
├── types/
│   └── field.ts          [NEW] — FieldType, TextSubtype, FieldOption, validation types,
│                                  field variants, FieldSchema union
└── store/
    └── formStore.ts      [NEW] — FormState, FormActions, useFormStore
```

**Total new files: 2**

---

## Builder Rules

1. Create `src/types/field.ts` first. The store depends on these types.
2. Create `src/store/formStore.ts` second. Import types using `import type` from `../types/field`.
3. Use `export type` for **all** type definitions. No `export interface`.
4. `BaseField` is the only non-exported type. It is used internally for composition only.
5. Use `crypto.randomUUID()` for ID generation. No external libraries.
6. Store must use Zustand's `create` function. No middleware for this feature.
7. The store type is `FormState & FormActions`. Pass this as the generic to `create<FormState & FormActions>()`.
8. `selectedFieldId` stores the `id` string only, never the field object.
9. Derive the selected field object in consuming components, never in the store.
10. All actions must produce **new array references** (use spread, `filter`, `map`). Never mutate in place. Always pass a new object to `set()`. Never mutate the draft inside `set()`.
11. Export `FormState` and `FormActions` types from `formStore.ts`.
12. Export the store hook as `useFormStore`.
13. The `updateField` implementation requires `as FieldSchema` assertion on the spread result. This is the only permitted type assertion in this feature.
14. Do **not** create any UI components. This feature is data-layer only.
15. Do **not** modify `App.tsx` or any existing file.
16. Every export must be explicitly typed. No implicit `any`.
17. Consuming files must use `import type` when importing types only.

---

## Constraints

- No middleware (immer, temporal, devtools) — those come with future features.
- No localStorage persistence — that comes with Templates feature.
- No derived/computed selectors in the store — consumers derive what they need.
- No UI files. This feature is types + store only.
- Do not install any new packages. `zustand` is already installed.

---

## Verification Plan

### Automated
- Run `npx tsc --noEmit` from the project root to confirm zero TypeScript errors.

### Manual
- After building, import `useFormStore` and the types into a scratch component or the browser console and confirm:
  1. `addField('text')` creates a `TextField` with `subtype: 'text'`, `validations: {}`, auto-selects it.
  2. `addField('select')` creates a `SelectField` with `options: []`, `validations: {}`.
  3. `addField('range')` creates a `RangeField` with `validations: {}`.
  4. `removeField(id)` removes the correct field and clears selection if it was selected.
  5. `updateField(id, { label: 'New' })` updates only the label.
  6. `reorderFields(0, 2)` moves the first field to the third position.
  7. `selectField(null)` clears the selection.
  8. `clearCanvas()` empties everything.
  9. Type narrowing works: after checking `field.type === 'text'`, accessing `field.subtype` compiles.
