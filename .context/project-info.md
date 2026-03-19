# Project: Form Builder

## One Line Description

A visual drag-and-drop form builder for developers that generates production-ready React Hook Form code with Zod validation.

## Problem It Solves

React developers waste time writing repetitive form code, validation schemas, and input bindings. This tool lets them design forms visually and export the complete code instantly — eliminating boilerplate and reducing form development time from minutes to seconds.

## Target User

React developers who build forms regularly and want to eliminate repetitive boilerplate code. They know React, TypeScript, and React Hook Form. They want a productivity tool, not a form submission service.

## Why This Over Alternatives

Most form builders generate submission forms for end users. This generates developer code — making it a productivity tool for engineers, not a form submission tool.

---

## Features

### MVP Features

#### 1. Field Palette

- **What it does:** Left panel containing clickable field type buttons. Clicking a button adds that field type to the canvas.
- **Field types:** text (subtypes: text, email, password, number, tel, url), textarea, select, radio, checkbox, checkbox-group, date, file, range, switch
- **Why it exists:** Provides a fast, visual way to add fields without typing code.
- **Status:** [ ] not started

#### 2. Form Canvas

- **What it does:** Central visual representation of the form. Displays all added fields. Supports drag-and-drop reordering via dnd-kit.
- **Why it exists:** Gives developers a spatial, interactive way to design form layout.
- **Status:** [ ] not started

#### 3. Properties Panel

- **What it does:** Right panel for editing the selected field. Allows changing label, placeholder, required toggle, options (for select/radio/checkbox-group fields), and per-type validation settings.
- **Why it exists:** Enables fine-grained control over each field without editing code.
- **Status:** [ ] not started

#### 4. Undo/Redo System

- **What it does:** Full undo and redo of all schema changes. Keyboard shortcuts: `Ctrl+Z` (undo), `Ctrl+Shift+Z` (redo).
- **Why it exists:** Users expect non-destructive editing. Mistakes must be reversible.
- **Status:** [ ] not started

#### 5. Code Generation

- **What it does:** Generates complete React Hook Form + Zod code from the current schema. Output includes form initialization, input bindings, validation schema, error handling, and submit handler.
- **Why it exists:** This is the core value — turning visual design into production code.
- **Status:** [ ] not started

#### 6. Live Preview

- **What it does:** Renders a working version of the form using the same schema and validation logic as the code generator.
- **Why it exists:** Lets developers see exactly how the generated form will behave before exporting.
- **Status:** [ ] not started

#### 7. Templates

- **What it does:** Pre-built templates (Login, Signup, Contact, Checkout) that populate the canvas instantly. Users can also save their current canvas as a named custom template for reuse. All templates stored in localStorage.
- **Why it exists:** Speeds up common form creation and adds a personal library feature.
- **Build order:** Last, after all other features are complete.
- **Status:** [ ] not started

### Future Features

None planned. MVP scope is final.

### Cut Features

- **Shareable forms:** Requires backend, out of scope.
- **Backend of any kind:** This is frontend only.
- **Authentication:** Out of scope.
- **Database:** Out of scope.

---

## Tech Stack

| Layer         | Technology      | Version | Why Chosen                                              |
| ------------- | --------------- | ------- | ------------------------------------------------------- |
| Framework     | React           | 19      | Industry standard, target user's primary framework      |
| Language      | TypeScript      | latest  | Type safety, portfolio quality, industry expectation    |
| Styling       | Tailwind CSS    | 4       | Utility-first, fast iteration, no CSS files needed      |
| State         | Zustand         | 5       | Minimal boilerplate, schema-driven store fits perfectly |
| Validation    | Zod             | latest  | TypeScript-first schema validation, pairs with RHF      |
| Forms         | React Hook Form | latest  | Output target — generated code uses RHF                 |
| Drag and Drop | dnd-kit         | latest  | Modern, accessible, React-native DnD solution           |
| Build         | Vite            | 7       | Fast dev server, fast builds, modern defaults           |

## Approved Libraries
React, TypeScript, Tailwind CSS, Zustand, Zod, dnd-kit, React Hook Form, Vite, lucide-react, shadcn components

## Forbidden Libraries
- **Any CSS-in-JS library:** Tailwind is the only styling solution.
- **Any external UUID library:** Use `crypto.randomUUID()`.
- **Any backend or server framework:** Frontend only.

---

## Architecture Principles

1. **Schema-driven.** The form schema is the single source of truth. UI renders from schema, code generates from schema, preview renders from schema.
2. **Single responsibility.** Every component does exactly one thing.
3. **No business logic in UI components.** Presentational components never import the store directly.
4. **Unidirectional data flow.** Schema lives in Zustand → components read and render → actions update schema.
5. **Separation of concerns.** Store logic, UI components, code generation, and type definitions live in separate files.

## Project-Wide Coding Standards

1. All files use TypeScript. No exceptions.
2. All components are functional. No class components.
3. All styling uses Tailwind utilities. No CSS files.
4. All shared state lives in Zustand.
5. All IDs use `crypto.randomUUID()`. No external UUID libraries.
6. `FieldButton` and all presentational components must never import the store directly.
7. No component does more than one thing.

---

## UI & Design

### Overall Layout

3-panel horizontal layout:

```
┌──────────┬─────────────────────────┬──────────┐
│  Navbar (full width, theme toggle)            │
├──────────┬─────────────────────────┬──────────┤
│  Field   │                         │ Property │
│  Palette │     Form Canvas         │  Panel   │
│  ~250px  │     (flex-1)            │  ~250px  │
│          │                         │          │
└──────────┴─────────────────────────┴──────────┘
```

- **Left panel:** Field Palette (~250px, narrow, fixed)
- **Center panel:** Form Canvas (flexible width, main working area)
- **Right panel:** Properties Panel (~250px, narrow, fixed)
- **Top:** Navbar with project title and theme toggle button

### Design Principles

- **Theme:** Dark by default, user can toggle to light via navbar button.
- **Minimalistic, clean, low visual noise.**
- **Inspired by Google Forms:** Simple, card-based fields, generous whitespace, clear typography, subtle borders.
- **No heavy gradients, no loud colors.**
- **Functional over decorative.** Every visual element serves a purpose.

### Reference UI

Google Forms — simple card-based layout, clean field representation, minimal chrome.

### Component Patterns

- All components are functional React components.
- All components receive data via props or Zustand selectors.
- Presentational components never import the store.
- Container components connect to the store and pass data down.

---

## Definition of Done

### Project Done

- All 7 MVP features work correctly.
- Deployed on Vercel with a public URL.
- GitHub repo is clean and readable.
- README explains what the project is.
- Code passes hostile `/review` with no critical issues.

### Feature Done

- Works correctly in browser.
- Passes `/review` with no critical issues.
- No TypeScript errors.
- No console errors.

### Code Done

- No `any` types.
- No lint warnings.
- All functions and components fully typed.
- Every component has single responsibility.

---

## Quality Standards

### Performance

- Canvas handles 50+ fields without lag.
- Code generation completes under 100ms.
- No unnecessary re-renders on state changes.

### Accessibility

- Keyboard navigable.
- Semantic HTML throughout.
- WCAG 2.1 AA not required for MVP.

### Browser Support

- Latest Chrome, Firefox, Edge only.
- No IE support.
- No Safari optimization for MVP.

---

## Constraints

### Must Never Do

- Never use a backend or server.
- Never use CSS-in-JS or CSS files.
- Never use class components.
- Never use external UUID libraries.
- Never use `any` type.
- Never mix business logic with UI components.

### Out of Scope

- Any backend functionality.
- Shareable form links.
- Form submission handling (beyond preview).
- User accounts or authentication.
- Database of any kind.

### Hard Technical Limits

- Frontend only — no server, no API, no database.
- localStorage only for persistence (templates).
- No npm packages outside the approved list.

---

## Project Status

Last updated: 2026-03-09
Current phase: MVP Development
Features completed: 0
Features remaining: 7
