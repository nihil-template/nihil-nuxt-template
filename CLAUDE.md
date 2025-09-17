# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CRITICAL

**ALL RESPONSES MUST BE IN KOREAN LANGUAGE ONLY**

- Every answer, explanation, and communication must be written in Korean
- Code comments should be in Korean when possible
- Documentation and explanations must use Korean language
- This is a mandatory requirement for all interactions with this codebase

## Commands

### Development

- `pnpm dev` - Start development server on port 3000
- `pnpm build` - Build for production
- `pnpm generate` - Generate static site
- `pnpm preview` - Preview production build

### Code Quality

- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues automatically
- `pnpm check-types` - Run TypeScript type checking

### Package Management

- `pnpm install` - Install dependencies (project uses pnpm)
- `pnpm postinstall` - Runs automatically after install (nuxt prepare)

## Architecture Overview

This is a **Nuxt 4** application with an **entity-based architecture** using automatic imports. The codebase is structured around domain entities with co-located stores, composables, and schemas.

### Entity-Based Structure

```
app/entities/
├── auth/           # Authentication domain
├── users/          # User management domain
├── admin/          # Admin functionality domain
└── common/         # Shared utilities and types
```

Each entity contains:

- **Stores**: Pinia stores for state management (`*.store.ts`)
- **Composables**: Reusable composition functions in `composables/`
- **Schemas**: Zod validation schemas in `schemas/`
- **Components**: Entity-specific components in `components/`

### Automatic Imports Configuration

The project uses Nuxt's auto-import system extensively:

```typescript
// nuxt.config.ts
imports: {
  dirs: [
    'composables/**',
    'composables/**/*',
    'entities/*/*.store',
  ],
  global: true,
}
```

**Key implications:**

- All stores, composables, and utilities are auto-imported
- No need for explicit import statements in Vue components
- Use camelCase naming for consistency with auto-import

### State Management Architecture

**Cache-First Approach**: Uses a dual-layer caching system

- **Primary**: `useCacheStore()` for in-memory caching with TTL
- **Secondary**: Pinia persistence for localStorage backup

**Authentication Flow**:

1. Login stores session in both cache store (60min TTL) and auth store
2. Session restoration checks cache first, then localStorage
3. Logout invalidates both cache and localStorage

**Key Stores**:

- `useAuthStore()` - Authentication and session management
- `useCacheStore()` - In-memory caching with TTL support
- `useAdminStore()`, `useUsersStore()` - Domain-specific state

### Form Validation

Uses **Zod schemas** for type-safe validation:

- Defined in `app/schemas/` directory
- Integrated with `vee-validate` for form handling
- Exports both schemas and TypeScript types

Example: `user.schema.ts` provides `UserInfoType`, `SignInType`, etc.

### UI Component Strategy

- **Nuxt UI 3.x** as the primary component library
- **Reka UI** for advanced components (requires transpilation in Nuxt config)
- **Custom components** in entity-specific folders following the pattern:
  ```
  components/[entity]/[ComponentName].vue
  ```

### API Integration

- Uses **TanStack Query (Vue Query)** for server state management
- Composables pattern: `useGet*`, `usePost*`, `usePut*`, `useDelete*`
- Centralized API configuration in `app/config/config.ts`

## Important Configuration Notes

### TypeScript & Vue 3.5+ Compatibility

The project includes fixes for Vue 3.5 + Reka UI compatibility issues:

```typescript
// nuxt.config.ts
build: {
  transpile: ['@vue/devtools-api', 'reka-ui'],
},
typescript: {
  typeCheck: false, // Relaxed for Reka UI compatibility
}
```

### Path Resolution

Uses Nuxt's `~` alias for app directory:

```typescript
// tsconfig.json paths
"~/*": ["./app/*"]
```

### Development Considerations

**Entity Structure**: When adding new features, follow the entity pattern:

1. Create entity folder in `app/entities/[domain]/`
2. Add store, composables, and schemas as needed
3. Components go in `app/components/[domain]/`
4. Pages use grouped routing: `app/pages/([domain])/`

**Auto-imports**: Remember that stores and composables are automatically available. Check existing patterns before creating new utilities.

**Caching Strategy**: Use the cache store for temporary data with TTL. For persistent user data, use the entity-specific stores with Pinia persistence.

**Form Handling**: Always use Zod schemas for validation. Create reusable schemas in the `schemas/` directory and export TypeScript types.

**API Calls**: Use the existing composable patterns (`useGet*`, `usePost*`) rather than direct axios calls. These integrate with the caching system and error handling.
