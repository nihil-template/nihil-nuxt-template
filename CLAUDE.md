# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Mandatory Requirements

- **CRITICAL** Always respond in Korean
- Expose the process of handling in Korean
- **CRITICAL** Before performing ANY file operations (read, write, edit, delete, create) in a subdirectory, you MUST FIRST automatically read any `CLAUDE.md` file present in that target directory. This is a mandatory first step, not optional. If a `CLAUDE.md` exists in the subdirectory, read it immediately before processing the requested file operation to understand the context-specific instructions and information.
- **Tailwind CSS Custom Class Verification**
  - Before using any Tailwind CSS class, verify it exists in the custom configuration
  - Check `app/assets/styles/tailwind.css` for custom classes and theme definitions
  - Do not assume standard Tailwind classes exist without verification
  - The project uses custom breakpoints, spacing, typography, and color systems
  - Always reference the actual CSS file to confirm class availability before usage
  - **Available Custom Classes**:
    - **Typography**: `text-xs`, `text-sm`, `text-md`, `text-lg`, `text-h1` through `text-h6`
    - **Fonts**: `font-sans` (Noto Sans KR), `font-fa` (Font Awesome), `font-code` (Cascadia Code)
    - **Breakpoints**: `mo-sm:` (480px), `mo-md:` (768px), `mo-lg:` (1024px)
    - **Animations**: `animate-spin-2`, `animate-spin-3`, `animate-accordion-down`, `animate-accordion-up`
    - **Radius**: `radius-sm`, `radius-md`, `radius-lg`, `radius-xl`
    - **Custom variants**: `dark:` variant for dark mode
- **Architecture Components**
  - **Stores**: Pinia stores for state management (`*.store.ts`) located in `app/entities/`
  - **Composables**: Reusable composition functions in `app/composables/`
- **PrimeVue Configuration**
  - Uses Lara preset theme with 'p' prefix
  - Dark mode selector: `.dark`
  - Combine PrimeVue components with custom TailwindCSS classes
- **Form Handling Pattern**
  - Use `VeeForm`, `VeeField`, `VeeErrorMessage` from @vee-validate/nuxt
  - Integrate with Zod schemas using `@vee-validate/zod`

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
├── auth/           # Authentication domain (auth.store.ts, auth-card.store.ts)
├── users/          # User management domain (users.store.ts)
├── admin/          # Admin functionality domain (admin.store.ts)
└── common/         # Shared utilities and types (cache.store.ts, types, declarations)
```

**Current entities structure**:

- **Stores**: Pinia stores for state management (`*.store.ts`) located in `app/entities/`
- **Composables**: Reusable composition functions in `app/composables/`
- **Schemas**: Zod validation schemas in `app/schemas/`
- **Components**: Entity-specific components in `app/components/`

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

- **PrimeVue 4.x** as the primary component library (Lara theme with TailwindCSS integration)
- **TailwindCSS 4.x** with custom configuration for styling
- **Custom components** in entity-specific folders following the pattern:
  ```
  components/[entity]/[ComponentName].vue
  ```

**PrimeVue Configuration**:

- Uses Lara preset theme with 'p' prefix
- Dark mode selector: `.dark`
- Auto-imports all components except Chart and Editor
- Integrated with custom TailwindCSS theme

### API Integration

- Uses **TanStack Query (Vue Query)** for server state management
- Composables pattern: `useGet*`, `usePost*`, `usePut*`, `useDelete*`
- Axios for HTTP client with centralized configuration
- Custom API utilities in `app/composables/common/api/` directory

## Important Configuration Notes

### TypeScript & Vue 3.5+ Compatibility

The project includes PrimeVue and Vue DevTools compatibility configurations:

```typescript
// nuxt.config.ts
build: {
  transpile: ['@vue/devtools-api', 'primevue'],
},
vite: {
  optimizeDeps: {
    exclude: ['@vue/devtools-api'],
  },
  ssr: {
    noExternal: ['primevue'],
  },
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

1. Add stores to `app/entities/[domain]/[domain].store.ts`
2. Add composables to `app/composables/[domain]/`
3. Add schemas to `app/schemas/[domain].schema.ts`
4. Components go in `app/components/[domain]/`
5. Pages use grouped routing: `app/pages/([domain])/`

**Auto-imports**: Remember that stores and composables are automatically available. Check existing patterns before creating new utilities.

**Caching Strategy**: Use the cache store for temporary data with TTL. For persistent user data, use the entity-specific stores with Pinia persistence.

**Form Handling**: Always use Zod schemas for validation. Create reusable schemas in the `schemas/` directory and export TypeScript types.

**API Calls**: Use the existing composable patterns (`useGet*`, `usePost*`) rather than direct axios calls. These integrate with the caching system and error handling.

**Styling Guidelines**:

- Use PrimeVue components with 'p' prefix (e.g., `p-button`, `p-input`)
- Combine PrimeVue components with custom TailwindCSS classes
- Leverage custom color variables: `--p-primary-*`, `--p-surface-*` for PrimeVue themes
- Use semantic color classes: `bg-background`, `text-foreground`, `border-border`

**Form Handling Pattern**:

- Use `VeeForm`, `VeeField`, `VeeErrorMessage` from @vee-validate/nuxt
- Integrate with Zod schemas using `@vee-validate/zod`
- Follow existing patterns in auth/admin composables for consistent validation
