import { create, type StateCreator } from "zustand";
import { temporal } from "zundo";

import type { FieldSchema } from "../types/field";

/**
 * Represents the state and actions for the form builder store.
 *
 * State holds the ordered list of fields and the currently selected field ID.
 * Actions provide immutable updates to add, remove, update, reorder, and
 * select fields on the canvas.
 */
export type FormStore = {
  // ── State ──────────────────────────────────────────────
  fields: FieldSchema[];     // Ordered list of fields on the canvas
  selectedId: string | null; // ID of the field currently selected for editing

  // ── Actions ────────────────────────────────────────────

  /**
   * Appends a new field to the end of the canvas.
   * @param {FieldSchema} field - Fully constructed field to add
   */
  addField: (field: FieldSchema) => void;

  /**
   * Removes a field by ID. Clears `selectedId` if the removed
   * field was selected.
   * @param {string} id - ID of the field to remove
   */
  removeField: (id: string) => void;

  /**
   * Shallow-merges partial changes into an existing field.
   *
   * `id` and `type` are excluded from the changeset:
   * - `id`   — mutating it would orphan `selectedId` and break lookups.
   * - `type` — changing the discriminant without supplying the matching
   *            variant shape would break the discriminated union.
   *
   * @param {string} id - ID of the field to update
   * @param {Partial<Omit<FieldSchema, 'id' | 'type'>>} changes - Properties to merge
   */
  updateField: (id: string, changes: Partial<Omit<FieldSchema, 'id' | 'type'>>) => void;

  /**
   * Moves a field from one position to another using splice-based reorder.
   * No-ops when indices are equal or out of bounds.
   * @param {number} fromIndex - Current index of the field
   * @param {number} toIndex - Target index to move the field to
   */
  reorderFields: (fromIndex: number, toIndex: number) => void;

  /**
   * Sets the currently selected field for the properties panel.
   * Pass `null` to deselect.
   * @param {string | null} id - ID of the field to select, or null
   */
  setSelectedField: (id: string | null) => void;

  /**
   * Removes all fields and clears the selection.
   * Used when the user resets the canvas.
   */
  clearFields: () => void;
}

/**
 * Zustand state creator for the form store.
 * Defines initial state and all action implementations.
 */
const createFormStore: StateCreator<FormStore> = (set) => ({
  fields: [],
  selectedId: null,

  addField: (field) => set((state) => ({ fields: [...state.fields, field] })),

  removeField: (id) => set((state) => {
    // No-op when the ID doesn't exist — avoids unnecessary re-renders
    if (!state.fields.some((field) => field.id === id)) {
      return state;
    }
    return ({
      fields: state.fields.filter((field) => field.id !== id),
      // Clear selection when the selected field is the one being removed
      selectedId: state.selectedId === id ? null : state.selectedId
    })
  }),

  updateField: (id, changes) => set((state) => {
    // No-op when the ID doesn't exist — avoids unnecessary re-renders
    if (!state.fields.some((field) => field.id === id)) {
      return state;
    }
    return {
      fields: state.fields.map((field) => {
        if (field.id === id) {
          // Cast needed because Partial<Omit<…>> widens the union
          return { ...field, ...changes } as FieldSchema;
        }
        return field;
      })
    }
  }),

  reorderFields: (fromIndex, toIndex) => set(
    (state) => {
      if (fromIndex === toIndex) {
        return state;
      }
      // Bounds check — silently no-op for invalid indices
      if (fromIndex < 0 || toIndex < 0 || fromIndex >= state.fields.length || toIndex >= state.fields.length) {
        return state;
      }
      const newFields = [...state.fields];
      const [movedField] = newFields.splice(fromIndex, 1);
      newFields.splice(toIndex, 0, movedField);
      return { fields: newFields };
    }
  ),

  setSelectedField: (id) => set({ selectedId: id }),

  clearFields: () => set({ fields: [], selectedId: null }),
});

/**
 * Main form store hook with undo/redo support via `zundo`.
 *
 * `partialize` limits the temporal history to `fields` only —
 * `selectedId` is transient UI state that should not be tracked
 * in the undo/redo stack.
 */
export const useFormStore = create<FormStore>()(temporal(createFormStore, {
  partialize: (state) => ({ fields: state.fields }),
}));