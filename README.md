# The Wild Oasis

A modern hotel management dashboard for a boutique resort, built with React, TypeScript, and Supabase. The application is structured as an internal admin tool for managing cabins, property rules, and operational settings while providing the foundation for a larger booking and guest management system.

## Overview

This project follows a layered architecture:

- UI and navigation are built in the `src/ui` layer.
- Feature-specific logic lives under `src/features`.
- Data access is centralized in `src/services` through Supabase client calls.
- React Query handles remote state, caching, and mutation flows.
- Routing is configured in `src/App.tsx` with nested layout structure.

The current implementation focuses on cabin operations and hotel settings management, while the project also includes routing placeholders for dashboard, bookings, users, and account-related sections.

## Key Features

### Cabin management

- View all cabins in a structured table
- Add new cabin entries with validation
- Edit existing cabin details
- Delete cabins
- Upload cabin images to Supabase storage
- Use React Query for efficient list/data synchronization

### Hotel settings management

- Update business rules such as:
  - minimum booking length
  - maximum booking length
  - maximum guests per booking
  - breakfast pricing
- Settings are loaded from and persisted in the Supabase `settings` table

### App framework

- Nested application layout with sidebar and header
- Route-based page structure
- Toast notifications for success and error states
- Reusable UI components for forms, buttons, modals, tables, and navigation

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- React Query (TanStack Query)
- Supabase JavaScript client
- Styled Components
- React Hook Form
- Heroicons
- React Hot Toast

## Project Structure

```text
src/
├── App.tsx
├── main.tsx
├── features/
│   ├── cabins/
│   │   ├── AddCabin.tsx
│   │   ├── CabinRow.tsx
│   │   ├── CabinTable.tsx
│   │   ├── CreateCabinForm.tsx
│   │   ├── useCabins.ts
│   │   ├── useCreateCabin.ts
│   │   ├── useDeleteCabin.ts
│   │   └── useUpdateCabine.ts
│   ├── settings/
│   │   ├── UpdateSettingsForm.tsx
│   │   ├── useSettings.ts
│   │   └── useUpdateSetting.ts
│   └── ...
├── pages/
│   ├── Dashboard.tsx
│   ├── Bookings.tsx
│   ├── Cabins.tsx
│   ├── Settings.tsx
│   ├── Login.tsx
│   ├── Users.tsx
│   └── PageNotFound.tsx
├── services/
│   ├── apiCabins.ts
│   ├── apiSettings.ts
│   ├── supabase.ts
│   └── apiBookings.js
├── ui/
│   ├── AppLayout.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── MainNav.tsx
│   └── ...
├── utils/
│   └── types.ts
├── styles/
│   └── GlobalStyles.ts
└── hooks/
```

## Data and Backend Integration

The app uses Supabase as its backend and persistence layer. The client is initialized in `src/services/supabase.ts` and the project expects these environment variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

The app is designed around these Supabase concepts:

- `cabins` table for cabin records
- `settings` table for property configuration
- `cabin-images` storage bucket for uploaded photos

## Setup Instructions

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root and add the Supabase variables listed above.
4. Start the app in development mode:

```bash
npm run dev
```

5. Open the local Vite URL shown in the terminal.

## Available Scripts

```bash
npm run dev      # starts the Vite development server
npm run build    # performs TypeScript build and production bundle
npm run preview  # serves the built project locally
npm run lint     # runs ESLint validation
```

## Application Flow

The app follows a clean feature-based pattern:

1. `App.tsx` defines routes and global providers.
2. Route pages such as `Cabins` and `Settings` render feature components.
3. Feature hooks call backend service functions using React Query.
4. Service modules interact with Supabase tables and storage.
5. Results are rendered through reusable UI primitives and styled layouts.

## Current Status

This project is in active development and already includes a solid foundation for hotel administration. The most complete operational areas are:

- cabin listing and CRUD workflows
- hotel settings updates
- structured React Query + Supabase data access patterns

Sections such as dashboard, bookings, users, and authentication are scaffolded and ready for further feature expansion.

## Notes

This project is a strong example of a feature-oriented React application using modern client-side patterns, remote data management, and maintainable UI composition. It is particularly well-suited for extension into a full resort management system with booking workflows, guest records, and dashboards.

## License

This project is currently for educational and portfolio use unless otherwise specified by the repository owner.
