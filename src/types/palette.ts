import type { LucideIcon } from "lucide-react";
import type { FieldSchema, FieldType, TextField, TextSubtype } from "./field";

/**
 * Distributive version of Omit that preserves union members.
 * Standard Omit collapses a union to only the shared keys;
 * this applies Omit to each member individually.
 */
export type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

/**
 * Identifies a field configuration using its type and optional subtype
 */
export type FieldConfigIdentifier = {
    type: 'text';         // The core field type
    subtype: TextSubtype; // The specific text input variant
} | {
    type: Exclude<FieldType, 'text'>; // Non-text field types
}

/**
 * Configuration for a single field item in the palette
 */
export type PaletteItemConfig = {
    label: string;                       // Display name in the palette
    icon?: LucideIcon;                   // Optional icon to display next to the label
    fieldConfig: FieldConfigIdentifier;  // Identifier used to instantiate the field
}

/**
 * Configuration for a logical group of fields in the palette
 */
export type PaletteGroupConfig = {
    label: string;                  // Category name (e.g., "Text Inputs", "Choices")
    items: PaletteItemConfig[];     // List of fields available in this category
}

/**
 * Default property templates for all supported field types
 */
export type FieldDefaults = Record<Exclude<FieldType, 'text'>, DistributiveOmit<FieldSchema, 'id'>> & {
    text: Record<TextSubtype, DistributiveOmit<TextField, 'id'>> // Special handling for text subtypes
}


export type FieldIcons = Record<Exclude<FieldType, 'text'>, LucideIcon> & {
  text: Record<TextSubtype, LucideIcon>
}