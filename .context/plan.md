# Feature: Store + Types

> **Note:** `project-info.md` has been updated to reflect the expanded field types.

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
│   ├── field.ts              ← Field types, discriminated unions, FieldSchema
│   └── fieldValidation.ts    ← Per-type validation shapes
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

### `src/types/fieldValidation.ts`

Validation types live in a separate file. Each type is shaped for its field's Zod rules. Singular naming convention (`TextValidation`, not `TextValidations`).

```typescript
export type TextValidation = {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
};

export type NumberValidation = {
  min?: number;
  max?: number;
};

export type TextareaValidation = {
  minLength?: number;
  maxLength?: number;
};

export type CheckboxGroupValidation = {
  minSelected?: number;
  maxSelected?: number;
};

export type DateValidation = {
  minDate?: string;
  maxDate?: string;
};

export type FileValidation = {
  maxSize?: number;
  accept?: string[];
};

export type RangeValidation = {
  min?: number;
  max?: number;
  step?: number;
};
```

Fields with no additional validations beyond `required` use `Record<string, never>` inline. This includes: `email` subtype (Zod has `.email()`), `url` subtype (Zod has `.url()`), `select`, `radio`, `checkbox`, `switch`.

---

### `src/types/field.ts`

Imports validation types from `./fieldValidation`.

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

#### Base Field Properties

```typescript
type BaseField = {
  id: string;
  label: string;
  required: boolean;
  placeholder?: string;
};
```

`BaseField` is **not exported**. Composition helper only.

#### Text Field — Nested Discriminated Union

`TextField` is itself a discriminated union on `subtype`. Each subtype gets the validation type appropriate for its Zod rules.

```typescript
type TextBaseField = BaseField & {
  type: 'text';
};

export type PlainTextField = TextBaseField & {
  subtype: 'text';
  validations: TextValidation;
};

export type NumberTextField = TextBaseField & {
  subtype: 'number';
  validations: NumberValidation;
};

export type EmailTextField = TextBaseField & {
  subtype: 'email';
  validations: Record<string, never>;
};

export type PasswordTextField = TextBaseField & {
  subtype: 'password';
  validations: TextValidation;
};

export type TelTextField = TextBaseField & {
  subtype: 'tel';
  validations: TextValidation;
};

export type UrlTextField = TextBaseField & {
  subtype: 'url';
  validations: Record<string, never>;
};

export type TextField =
  | PlainTextField
  | NumberTextField
  | EmailTextField
  | PasswordTextField
  | TelTextField
  | UrlTextField;
```

`TextBaseField` is **not exported**. It exists only as a composition helper inside `field.ts`.

**Why `Record<string, never>` for email/url?** Zod has built-in `.email()` and `.url()` — no configurable validation parameters needed from the user.

#### Other Field Variants

```typescript
export type TextareaField = BaseField & {
  type: 'textarea';
  validations: TextareaValidation;
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
  validations: CheckboxGroupValidation;
};

export type DateField = BaseField & {
  type: 'date';
  validations: DateValidation;
};

export type FileField = BaseField & {
  type: 'file';
  validations: FileValidation;
};

export type RangeField = BaseField & {
  type: 'range';
  validations: RangeValidation;
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

Two levels of discrimination:
- First: `field.type` narrows to the field kind.
- Second (text only): `field.subtype` narrows to the specific text variant.

Example: `if (field.type === 'text' && field.subtype === 'number') { field.validations.min; /* accessible */ }`.

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
│   ├── fieldValidation.ts [NEW] — TextValidation, NumberValidation, TextareaValidation,
│   │                              CheckboxGroupValidation, DateValidation, FileValidation,
│   │                              RangeValidation
│   └── field.ts           [NEW] — FieldType, TextSubtype, FieldOption, field variants,
│                                   FieldSchema union
└── store/
    └── formStore.ts       [NEW] — FormState, FormActions, useFormStore
```

**Total new files: 3**

---

## Builder Rules

1. Create `src/types/fieldValidation.ts` first. Field types depend on these.
2. Create `src/types/field.ts` second. Import validation types using `import type` from `./fieldValidation`.
3. Create `src/store/formStore.ts` third. Import types using `import type` from `../types/field`.
4. Use `export type` for **all** type definitions. No `export interface`.
5. `BaseField` and `TextBaseField` are the only non-exported types. They are internal composition helpers.
6. Use `crypto.randomUUID()` for ID generation. No external libraries.
7. Store must use Zustand's `create` function. No middleware for this feature.
8. The store type is `FormState & FormActions`. Pass this as the generic to `create<FormState & FormActions>()`.
9. `selectedFieldId` stores the `id` string only, never the field object.
10. Derive the selected field object in consuming components, never in the store.
11. All actions must produce **new array references** (use spread, `filter`, `map`). Never mutate in place. Always pass a new object to `set()`. Never mutate the draft inside `set()`.
12. Export `FormState` and `FormActions` types from `formStore.ts`.
13. Export the store hook as `useFormStore`.
14. The `updateField` implementation requires `as FieldSchema` assertion on the spread result. This is the only permitted type assertion in this feature.
15. Do **not** create any UI components. This feature is data-layer only.
16. Do **not** modify `App.tsx` or any existing file.
17. Every export must be explicitly typed. No implicit `any`.
18. Consuming files must use `import type` when importing types only.

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
  1. `addField('text')` creates a `PlainTextField` with `subtype: 'text'`, `validations: {}`, auto-selects it.
  2. `addField('select')` creates a `SelectField` with `options: []`, `validations: {}`.
  3. `addField('range')` creates a `RangeField` with `validations: {}`.
  4. `removeField(id)` removes the correct field and clears selection if it was selected.
  5. `updateField(id, { label: 'New' })` updates only the label.
  6. `reorderFields(0, 2)` moves the first field to the third position.
  7. `selectField(null)` clears the selection.
  8. `clearCanvas()` empties everything.
  9. First-level narrowing: `field.type === 'text'` gives access to `field.subtype`.
  10. Second-level narrowing: `field.subtype === 'number'` gives access to `field.validations.min`.
