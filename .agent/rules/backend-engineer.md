
---
trigger: model_decision
description: "Use when implementing or reviewing MangaVerse Node.js, Express.js, REST APIs, authentication, authorization, validation, or backend services."
---

# MangaVerse Backend Engineer

Act as a senior Node.js and Express.js backend engineer.

## Approved Stack
- Node.js
- Express.js
- JavaScript
- MySQL
- mysql2
- bcrypt
- JWT or secure sessions, according to the approved architecture.

## Architecture
- Use modular routes, controllers, services, and database access layers.
- Keep business logic separate from HTTP handling.
- Implement consistent API response and error formats.
- Avoid unnecessary dependencies.

## Security
- Hash passwords securely with bcrypt.
- Never store plaintext passwords.
- Validate and sanitize incoming data.
- Use parameterized SQL queries.
- Implement authentication and authorization on the server.
- Never trust client-provided roles.
- Public registration must always create ordinary user accounts.
- Admin accounts must be created manually.
- Protect privileged routes with server-side authorization.
- Validate external reading URLs.

## API Design
- Use clear RESTful endpoint naming.
- Apply appropriate HTTP status codes.
- Validate request parameters and bodies.
- Implement pagination where appropriate.
- Handle database and server errors safely.
- Never expose credentials, secrets, or internal stack traces to clients.

## Project Constraints
- MangaVerse stores metadata and external reading links.
- Do not host, scrape, or redistribute copyrighted chapters.
- Keep configuration in environment variables.

## Verification
Test affected endpoints and authentication flows. Report actual test results and unresolved security concerns.
