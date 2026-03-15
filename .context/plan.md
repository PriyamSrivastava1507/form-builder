# Feature: Field Palette

## Stack & Libraries

React 19, TypeScript ~5.9, Tailwind CSS 4, Zustand 5, crypto.randomUUID()

## Component Structure

```
src/
├── pages/
│   └── FormBuilderPage.tsx      (Layout Container, connects to Zustand store)
└── components/
    └── FieldPalette/
        ├── FieldPalette.tsx       (maps FIELD_PALETTE_CONFIG into groups)
        ├── FieldPaletteGroup.tsx  (renders a section label and its items)
        └── FieldPaletteItem.tsx   (clickable button representing a field)
```

## Data Flow

1. `FormBuilderPage` is the only component that calls `useFormStore(state => state.addField)`.
2. `FormBuilderPage` passes `addField` as a prop down to `FieldPalette`.
3. `FieldPalette` maps `FIELD_PALETTE_CONFIG` into sections, rendering `FieldPaletteGroup`.
4. `FieldPaletteGroup` maps its items, rendering `FieldPaletteItem`.
5. `FieldPaletteItem` receives `label`, `fieldConfig`, and the `addField` callback as props.
6. `FieldPaletteItem` click handler:
   - Evaluates `fieldConfig` to do a map lookup inside `FIELD_DEFAULTS`.
   - Generates a new unique `id` using `crypto.randomUUID()`.
   - Merges the `id` with the returned schema object.
   - Calls the `addField` prop with the fully constructed `FieldSchema`.

There are NO store imports inside `FieldPalette` or `FieldPaletteItem`.

## Interfaces & Types

These types should be co-located or put into `src/types/palette.ts`:

```typescript
import type { FieldType, TextSubtype, FieldSchema } from "./field";

// Allows locating the default field schema in the FIELD_DEFAULTS map
export type FieldConfigIdentifier =
  | { type: "text"; subtype: TextSubtype }
  | { type: Exclude<FieldType, "text"> };

export type PaletteItemConfig = {
  label: string; // Displayed in UI
  icon?: string; // Inline SVG or Emoji
  fieldConfig: FieldConfigIdentifier; // passed to FieldPaletteItem for lookup
};

export type PaletteGroupConfig = {
  label: string; // E.g., "Text Inputs", "Choices"
  items: PaletteItemConfig[];
};
```

## File Structure

````
src/
├── types/
│   └── palette.ts               ← Contains Palette Types for config shape and default matching
├── constants/
│   └── fieldPalette.ts          ← Contains FIELD_PALETTE_CONFIG and FIELD_DEFAULTS
├── pages/
│   └── FormBuilderPage.tsx      ← Connects to store
```├── components/
│   └── FieldPalette/
│       ├── index.ts               ← Exports the FieldPalette component
│       ├── FieldPalette.tsx       ← Group mapping
│       ├── FieldPaletteGroup.tsx  ← Section header and items mapping
│       └── FieldPaletteItem.tsx   ← Buttons doing map lookup and calling addField
````

## Builder Rules

1. **Separation of Concerns:** Keep all constants (`FIELD_PALETTE_CONFIG`, `FIELD_DEFAULTS`) out of the components. Put them strictly in `src/constants/fieldPalette.ts`.
2. **Prop Drilling:** Pass `addField` downwards from `FormBuilderPage`. Do not use `useFormStore` inside `FieldPalette` components.
3. **FormBuilderPage Scope:** The page must ONLY render the `FieldPalette` on the left and two empty placeholder `<div>`s for the future Canvas and Properties Panel. Do not attempt to build out the center and right panels yet.
4. **FieldPalette Sizing:** The palette must have a fixed width of `w-64`, stretch to full height, be vertically scrollable, and include a right border to visually separate it from the empty canvas area.
5. **FIELD_PALETTE_CONFIG Groups:** Must be exactly these groups and order:
   - "Text Inputs": Text, Number, Email, Password, Tel, URL, Textarea
   - "Choices": Select, Radio, Checkbox, Checkbox Group
   - "Date": Date
   - "File": File
   - "Advanced": Range, Switch
6. **FIELD_DEFAULTS Values:** Every field must strictly contain: `required: false`, an empty `validations: {}` object, and a human-readable `label` (e.g. "Text Field", "Number Input"). Type-specific defaults: `select`, `radio`, and `checkbox-group` MUST have `options: []`. No field should have a `defaultValue` set here. Ensure this provides the exact nesting required (e.g., `FIELD_DEFAULTS.text.email`).
7. **Id Generation:** Every newly added field must contain a unique `id` generated via `crypto.randomUUID()` within the `FieldPaletteItem` or `FieldPalette` click handler before calling `addField`.
8. **Styling:** Use Tailwind CSS perfectly aligning with Google Forms aesthetics (minimalist, functional, clear).
9. **Type Completeness:** Ensure TypeScript handles the discriminated union in the map lookup cleanly.
10. **Components:** All components must be pure functional React components. No classes. No any types. Single responsibility strictly enforced.

## Constraints

- Do NOT use plain JavaScript, CSS-in-JS, or `.css` files.
- Do NOT rewrite or mix up the store behavior; align with `src/store/form.store.ts` `FormStore.addField` returning nothing and taking a full `FieldSchema`.
- Follow the defined schema properties for every default `FieldSchema` generated (from `src/types/field.ts`).
