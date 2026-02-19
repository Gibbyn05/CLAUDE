# CLAUDE.md

This file provides guidance for AI assistants (Claude and others) working with this repository.

## Repository Status

This is a newly initialized repository with no source code yet. This file will be updated as the project evolves.

---

## General Development Principles

### Code Quality
- Prefer clarity over cleverness. Write code that is easy to read and reason about.
- Keep functions small and focused on a single responsibility.
- Avoid premature abstraction — introduce abstractions only when a clear pattern repeats.
- Delete dead code rather than commenting it out.

### Commits
- Write short, imperative commit messages (e.g., `Add user authentication`, not `Added user authentication`).
- Each commit should represent a single logical change.
- Do not commit secrets, credentials, or environment-specific configuration files.

### Branching
- Feature branches follow the pattern: `feature/<short-description>`
- Bug fix branches: `fix/<short-description>`
- Claude-managed branches: `claude/<task-id>`
- Never push directly to `main` or `master`.

---

## Working with AI Assistants

### Before Making Changes
1. Read the files you intend to modify before editing.
2. Understand the existing patterns in the codebase before introducing new ones.
3. Search for related code before creating new utilities or helpers.

### Change Discipline
- Only make changes that are directly requested or clearly necessary for the task.
- Do not refactor surrounding code, add comments, or clean up style in files you didn't intentionally change.
- Do not add features, error handling, or configuration for hypothetical future requirements.

### Security
- Never introduce SQL injection, command injection, XSS, or other OWASP Top 10 vulnerabilities.
- Validate input at system boundaries (user input, external APIs). Trust internal code.
- Never commit credentials, API keys, or secrets to the repository.

---

## Project Setup (To Be Updated)

As the project grows, document the following here:

### Prerequisites
> List required tools, runtime versions, and environment setup steps.

### Installation
```sh
# Example — update when project structure is established
```

### Running the Project
```sh
# Example — update when project structure is established
```

### Running Tests
```sh
# Example — update when test suite is added
```

### Linting and Formatting
```sh
# Example — update when linting tools are configured
```

### Building
```sh
# Example — update when build system is defined
```

---

## Project Structure (To Be Updated)

Once source files are added, document the directory layout here:

```
/
├── src/          # Source code (update with actual structure)
├── tests/        # Test files
├── docs/         # Documentation
└── CLAUDE.md     # This file
```

---

## Key Conventions (To Be Updated)

As the codebase grows, record important conventions here:

- **Language/runtime version**: TBD
- **Framework**: TBD
- **Test framework**: TBD
- **Linter/formatter**: TBD
- **Package manager**: TBD

---

## CI/CD (To Be Updated)

Document CI/CD pipelines, required checks, and deployment workflows here once they are established.

---

## Updating This File

When the project structure becomes established, update this file with:
1. Accurate directory structure and description of key files
2. Actual install, run, test, lint, and build commands
3. Language/framework-specific conventions
4. Any domain knowledge important for understanding the codebase
