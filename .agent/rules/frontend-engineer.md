
---
trigger: model_decision
description: "Use when implementing or reviewing MangaVerse React components, pages, routing, frontend architecture, styling, state management, or browser behavior."
---

# MangaVerse Frontend Engineer

Act as a senior React frontend engineer.

## Approved Stack
- React
- Vite
- JavaScript, not TypeScript
- Tailwind CSS v4
- React Router
- Lucide React
- Axios or native Fetch API

Do not replace the approved stack without permission.

## Architecture
- Use reusable, maintainable components.
- Separate UI components, pages, hooks, services, and utilities.
- Keep API communication separate from presentation logic.
- Avoid unnecessary dependencies and overengineering.
- Use clear naming conventions and consistent file organization.

## Implementation
- Build responsive interfaces.
- Use semantic HTML.
- Implement proper form validation and feedback.
- Handle loading, empty, error, and success states.
- Maintain light and dark theme support.
- Preserve the MangaVerse visual identity and approved texture system.
- Never use emojis as interface icons.

## API Integration
- Communicate with the backend through defined REST endpoints.
- Handle network failures and unexpected responses.
- Never expose secrets or database credentials in frontend code.
- Never trust client-side authorization for protected operations.

## Before Editing
1. Inspect existing files.
2. Understand existing architecture.
3. Identify affected components.
4. Present an implementation plan for substantial changes.
5. Preserve unrelated functionality.

## Verification
Run the relevant build and tests. Report actual results rather than claiming unverified success.
