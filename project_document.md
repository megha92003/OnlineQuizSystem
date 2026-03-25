# OnlineQuizSystem - Project Document

This document tracks all the finalized steps and decisions made during the development of the Online Quiz System.

## Architecture
- **Frontend**: Next.js (Vercel) using HTML/CSS principles where possible.
- **Backend**: FastAPI (Render)
- **Database**: PostgreSQL (Neon)

## Finalized Steps Track Record
1. **[DONE]** Initialize project repositories and base directory structure (`frontend`, `backend`, `db`).
2. **[DONE]** Configure individual environment profiles (Skills) for Frontend, Backend, and Database.
3. **[DONE]** Initialize FastAPI Backend and Database schema placeholder.
4. **[DONE]** Initialize Next.js frontend application structure.
5. **[DONE]** Provisioned Neon Postgres Database (`OnlineQuizSystem`) and successfully verified the connection string.
6. **[DONE]** Updated Neon DB schema with `password_hash` and `display_name` for user profiles.
7. **[DONE]** Implemented FastAPI authentication endpoints (`/api/signup`, `/api/signin`) and CORS.
8. **[DONE]** Created premium landing page with interactive Sign In/Sign Up modals.
9. **[DONE]** Deployed and linked Backend to Render (`online-quiz-system-backend`) with GitHub auto-deploy via `render.yaml`.
10. **[DONE]** Configured Frontend for Vercel auto-deployment via `vercel.json`.
11. **[DONE]** Successfully interlinked GitHub, Neon, Render, and Vercel with all API tokens documented.
