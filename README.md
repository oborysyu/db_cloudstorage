# Destination Builder – Cloud Storage

This project is a small React application that implements a **Third-Party Storage configuration flow** (e.g. AWS S3, Google Cloud Storage) based on a provided Figma design.

The UI allows a user to:
- select a storage provider,
- configure provider-specific connection settings,
- validate inputs and control the save action state,
- submit the configuration and receive a structured **JSON representation of the created asset**.

The solution is designed to be **extensible**: new storage providers can be added with minimal changes by describing their configuration in the `providers` directory.

---

## Key Ideas & Architecture

- **React + TypeScript** for predictable, type-safe UI development
- **Feature-based structure** (or rather, its simplified version) (`destinationBuilder`) to keep related logic, styles, and components together
- **Configuration-driven providers**
  - Each provider (AWS, GCP, etc.) is defined via a configuration object
  - Fields, layout behavior, and UI specifics are derived from this config
  - Adding a new provider usually means adding a new provider description to the `providers` folder
- **Reusable UI primitives**
  - Shared components such as `Input`, `Select`, `Button`, `BaseDropdown`
- **Responsive by available width**
  - Layout adapts based on container width (not viewport)
  - Correctly reacts to surrounding layout changes (e.g. sidebar open/close)
- **Custom fonts**
  - Uses *Basis Grotesque Pro* (Regular / Medium), locally hosted

---

## Adding a New Provider (High Level)

To add a new storage provider:
1. Create a new provider configuration inside the `providers` directory
2. Describe:
   - provider id and label
   - icon (if necessary)
   - required fields
   - layout behavior (e.g. full-width vs split fields)
3. The UI will render automatically based on this configuration

No core UI logic needs to be rewritten.

---

## Submit Result

On successful form submission, the application returns a **JSON object describing the configured storage asset**, including:
- selected provider
- connection parameters
- user-provided field values

This output simulates how the configuration could be passed to a backend or persisted in a real-world system.

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```
or
```bash
yarn
```

### 2. Run the development server
```bash
npm run dev
```
or (depending on setup):
```bash
npm start
```

### 3. Open in browser
http://localhost:5173

(or the port shown in the terminal)

---

## Tech Stack

React

TypeScript

CSS (feature-scoped styles)

Vite / CRA (depending on project setup)

### Notes

This project focuses on UI architecture, extensibility, and design fidelity rather than backend integration.
All provider configurations are mock-based and intended for demonstration purposes.