import { create, type StateCreator } from "zustand";
import { temporal } from "zundo";

import type { FieldSchema } from "../types/field";

export type FormStore = {
  // state
  fields: FieldSchema[];
  selectedId: string | null;

  // actions
  addField: (field: FieldSchema) => void;
  removeField: (id: string) => void;
  // 'id' excluded — mutating it would orphan selectedId and break lookups.
  // 'type' excluded — changing the discriminant without supplying the matching.
  updateField: (id: string, changes: Partial<Omit<FieldSchema, 'id' | 'type'>>) => void;
  reorderFields: (fromIndex: number, toIndex: number) => void;
  setSelectedField: (id: string | null) => void;
  clearFields: () => void;
}

const createFormStore: StateCreator<FormStore> = (set) => ({
  fields: [],
  selectedId: null,

  addField: (field) => set((state) => ({ fields: [...state.fields, field] })),

  removeField: (id) => set((state) => {
    if (!state.fields.some((field) => field.id === id)) {
      return state;
    }
    return ({
      fields: state.fields.filter((field) => field.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId
    })
  }),

  updateField: (id, changes) => set((state) => {
    if (!state.fields.some((field) => field.id === id)) {
      return state;
    }
    return {
      fields: state.fields.map((field) => {
        if (field.id === id) {
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

export const useFormStore = create<FormStore>()(temporal(createFormStore, {
  // selectedId is intentionally excluded — undo/redo only tracks field additions,
  // removals, and reorders. Selection state is transient UI state, not document state.
  partialize: (state) => ({ fields: state.fields }),
}));