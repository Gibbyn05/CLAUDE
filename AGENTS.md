# AGENTS.md

> Source: https://github.com/remotion-dev/remotion/blob/main/AGENTS.md

This file provides setup and contribution guidelines for the Remotion project.

## Setup Commands

Uses **Bun** as the package manager:

```sh
bun install                        # Install dependencies
bunx turbo run make                # Build all packages
bunx turbo run lint test           # Lint and test
bun run clean                      # Remove build artifacts
bunx turbo run make --filter=<pkg> # Build a specific package
```

## Key Notes

- Use `bunx` instead of `npx` for running binaries
- Version is located in `packages/core/src/version.ts`
- Patch versions should increment by 1 for releases

## Pull Request Format

```
`@remotion/player`: Add new feature
```

## Pre-Commit Checklist

1. Run `bun run build` — validate all packages compile
2. Run `bun run stylecheck` — confirm CI compatibility
3. Commit `bun.lock` if dependencies were updated
