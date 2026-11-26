# MangaVerse — Project Instructions for AI Agents

## 1. Project Identity

MangaVerse is an individual academic web development project.

It is a platform for discovering, organizing, tracking, and discussing:
- Manga
- Manhwa
- Manhua
- Light novels
- Web novels

The platform organizes stories and their different adaptations or editions under a unified story identity.

The goal is to build a polished, functional, responsive, accessible, and production-conscious application.

## 2. Technology Stack

Use the following approved stack:

### Frontend
- React
- Vite
- JavaScript (not TypeScript)
- Tailwind CSS v4
- React Router
- Lucide React for icons

### Backend
- Node.js
- Express.js
- JavaScript
- REST API

### Database
- MySQL 8.0+
- mysql2

### Authentication
- bcrypt for password hashing
- JWT or secure sessions, depending on the approved architecture

### Additional tools
- Axios or native Fetch API
- Git and GitHub for version control

Do not introduce another framework, database, language, or major dependency without explaining why and receiving approval.

Avoid unnecessary dependencies.

## 3. Product Requirements

### User accounts
- Public registration using username, email, and password.
- Login and logout.
- User profiles.
- Admin accounts must be created manually.
- Public registration must never allow users to assign themselves administrator privileges.

### Discovery
- Browse and search stories.
- Filter by genres, formats, and other relevant metadata.
- Story detail pages.
- Separate editions and adaptations under their parent story.

### Reading access
- Display chapter listings and external reading sources.
- Redirect users to external reading providers.
- Do not host, scrape, or redistribute copyrighted chapter content.

### Personal library
- Bookmarks and custom lists.
- Reading progress and history.
- Reading statuses such as Currently Reading, Plan to Read, Completed, On Hold, and Dropped.

### Community
- Ratings and reviews.
- Chapter and story discussions.
- Spoiler controls.
- Comments and voting.
- User following.

### Other functionality
- Notifications and notification preferences.
- Recommendations.
- Dark and light themes.
- Responsive layouts.
- Administrative dashboard.
- Content management and moderation.

## 4. Design Direction

The visual identity must be original, modern, polished, and recognizable.

### Design principles
- Strong visual hierarchy.
- Consistent spacing and alignment.
- Excellent typography.
- Readable content.
- Intentional negative space.
- Responsive layouts.
- Accessible contrast.
- Consistent reusable components.
- Meaningful interaction feedback.

Avoid generic dashboard designs, excessive gradients, unnecessary decoration, and inconsistent component styling.

### Theme
- Light theme is the default.
- Full dark theme support is required.
- Both themes must maintain readability and visual consistency.
- Use reusable design tokens and CSS variables.

### Typography
- Manrope for headings.
- Inter for general interface text.
- Use a comfortable, adjustable reading font for novel content.

### Initial design tokens
- Background: #F7F8FC
- Surface: #FFFFFF
- Primary accent: #635BDB
- Primary text: #171923
- Secondary text: #667085
- Borders: #E6E8EF
- Success: #16845B
- Warning: #B7791F
- Error: #D14343
- Info: #3974C6

Treat these as initial design tokens. Maintain a consistent system and explain proposed changes before replacing them.

### Layout
- Desktop content width: approximately 1200–1320px.
- Desktop horizontal padding: 32–40px.
- Tablet padding: approximately 24px.
- Mobile padding: approximately 16px.
- Card radius: approximately 12–16px.
- Inputs and interactive controls should have comfortable touch targets.

### Icons
- Use Lucide icons.
- Do not use emojis anywhere in the application interface.
- Icons must have consistent sizing, stroke weight, and alignment.

## 5. Visual Texture System

The following eight visual treatments are explicitly selected for MangaVerse:

1. Paper texture
2. Halftone
3. Grainy gradients
4. Contour lines
5. ASCII and pixels
6. Blurred photos
7. Dithered images
8. Pixel mosaics

### Intensity
Balanced.

### Application scope
Widespread across the application.

### Usage rules

**Paper texture**
- Use for backgrounds and reading surfaces.
- Keep the texture subtle.

**Halftone**
- Use for manga-inspired promotional sections and decorative accents.

**Grainy gradients**
- Use for hero sections and featured backgrounds.

**Contour lines**
- Use for section backgrounds, decorative surfaces, and empty states.

**ASCII and pixels**
- Use for decorative typography and selected visual accents.
- Never sacrifice readability.

**Blurred photos**
- Use as separate atmospheric background imagery.
- Never blur actual manga covers.

**Dithered images**
- Use selectively for promotional artwork.
- Preserve original source images.

**Pixel mosaics**
- Use for decorative sections, transitions, and dividers.

### Texture implementation rules
- Build reusable components or utilities.
- Prefer efficient CSS, SVG, and optimized static assets.
- Avoid expensive runtime effects.
- Support both light and dark themes.
- Respect reduced-motion preferences.
- Maintain text contrast and accessibility.
- Do not apply every texture to every component.
- Do not apply textures indiscriminately to repeated cards or lists.
- Never alter actual manga cover artwork unless explicitly authorized.

## 6. Development Standards

- Write clean, maintainable, modular JavaScript.
- Use reusable React components.
- Separate presentation, business logic, and data access.
- Keep frontend and backend responsibilities clear.
- Use environment variables for sensitive configuration.
- Validate user input on the backend.
- Use parameterized database queries.
- Handle errors consistently.
- Implement loading, empty, error, success, and disabled states.
- Use semantic HTML and accessible controls.
- Make layouts responsive across mobile, tablet, and desktop.
- Avoid duplicated logic and unnecessary abstraction.

## 7. Security Standards

- Never store plaintext passwords.
- Never expose secrets or credentials in frontend code.
- Validate and sanitize incoming data.
- Use parameterized SQL queries.
- Enforce authorization on protected backend routes.
- Never trust client-provided role information.
- Validate external URLs and reading providers.
- Configure production CORS restrictions and HTTPS.
- Use secure authentication practices.
- Protect administrative functionality.

## 8. GitHub and Version Control

This is an individual academic project.

GitHub repository:
https://github.com/josiahsandajan/MangaVerse

Rules:
- Preserve the existing GitHub repository.
- Commit meaningful changes regularly.
- Use descriptive commit messages.
- Do not overwrite or delete existing work without authorization.
- Use feature branches for substantial implementations.
- Never merge into `main` without explicit approval.
- Review changes before pushing.
- Keep the repository organized and maintainable.

## 9. AI Agent Operating Rules

You are assisting with a real academic software project.

Before starting substantial tasks:

1. Inspect the existing repository and its structure.
2. Read this file and all applicable project instructions.
3. Identify relevant installed skills, tools, and capabilities.
4. Inspect existing implementations before modifying anything.
5. Identify dependencies and potential conflicts.
6. Present a concise implementation plan when the task requires significant changes.

### Implementation behavior
- Follow the user's explicitly approved scope.
- Do not independently expand the project scope.
- Do not replace approved technologies.
- Do not rewrite working implementations unnecessarily.
- Do not create placeholder functionality and describe it as complete.
- Do not claim tests passed unless they were actually executed.
- Explain important architectural decisions.
- Ask for approval before destructive or major architectural changes.

### Quality assurance
After implementation:
- Run the relevant build and tests.
- Check browser console errors.
- Inspect responsive behavior.
- Check accessibility and contrast.
- Verify interactions.
- Report any remaining issues.

### Reporting
At the end of each substantial task, report:
- What changed.
- Files created or modified.
- Dependencies added or removed.
- Tools and skills used.
- Tests and commands executed.
- Actual verification results.
- Remaining issues.
- Git branch and commit status.

## 10. Most Important Rule

**Do not prioritize implementation speed over correctness, maintainability, usability, and visual quality.**

MangaVerse should feel like a carefully designed, cohesive product rather than a collection of generated pages.

Preserve the approved project direction and work incrementally. The user makes the final decisions.


## 11. Specialist Rule Activation and Workflow

Before every substantial task:

1. Identify which specialist rule files apply.
2. Read and follow all relevant rules.
3. If multiple disciplines are involved, combine their requirements.
4. Do not claim that a specialist rule was activated unless it was actually consulted.

### Required Workflow

- Inspect before editing.
- Plan before substantial implementation.
- Explain scope and affected files.
- Wait for approval when the task requires substantial or potentially destructive changes.
- Implement incrementally.
- Verify with actual tests and builds.
- Report results honestly.

### Git Safety

- Never commit, push, merge, or switch branches without explicit approval.
- Never overwrite uncommitted user work.
- Preserve the existing repository history.

### Project Scope

The user controls all architectural and product decisions. Never independently expand the approved MangaVerse scope or change its technology stack.
