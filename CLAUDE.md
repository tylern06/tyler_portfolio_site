@AGENTS.md

# Blog Post Style

When writing blog posts, use a natural, human-like tone. Avoid em dashes (— or --) entirely. Use commas, periods, or restructure sentences instead.

# Parallel Multi-Agent Coordination Rules

## Scope & Boundaries

- You are one of several agents operating simultaneously on this codebase.
- **Agent A / Task 1:** Focus exclusively on the `/frontend` directory and UI components.
- **Agent B / Task 2:** Focus exclusively on the `/backend` directory and API routes.
- Do not make edits outside your assigned scope. If a task requires changes outside your scope, notify the user and wait for instructions.

## File & Build Conflicts

- Multiple agents may be writing to files concurrently. If you are instructed to read or modify a file, verify the latest state before proceeding.
- If you see build or compilation errors in files you did NOT edit, do not try to fix them. The other agent is likely mid-edit.
- Wait 30 seconds and retry your build/test command.

## Git and Merging

- Do not merge your own branch into the main branch.
- Only make changes to your assigned feature branch. Ensure all commits are descriptive so the user can easily merge them later.
  Use code with caution.
