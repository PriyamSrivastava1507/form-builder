import type { LucideIcon } from "lucide-react";
import type { FieldSchema, FieldType, TextField, TextSubtype } from "./field";

/**
 * Distributive version of Omit that preserves union members.
 * Standard Omit collapses a union to only the shared keys;
 * this applies Omit to each member individually.
 */
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

export type FieldConfigIdentifier = {
    type: 'text';
    subtype: TextSubtype;
} | {
    type: Exclude<FieldType, 'text'>;
}

export type PaletteItemConfig = {
    label: string;
    icon?: LucideIcon;
    fieldConfig: FieldConfigIdentifier;
}

export type PaletteGroupConfig = {
    label: string;
    items: PaletteItemConfig[];
}

export type FieldDefaults = Record<Exclude<FieldType, 'text'>, DistributiveOmit<FieldSchema, 'id'>> & {
    text: Record<TextSubtype, DistributiveOmit<TextField, 'id'>>
}