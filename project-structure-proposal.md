# Project Structure Refactoring Proposal

## Current Issues
- Mixed responsibilities in components folder
- Inconsistent naming conventions
- Missing standard React/Vite folders
- Routes defined in App.jsx
- Assets not properly organized

## Proposed New Structure

```
startup-sprint/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── assets/           # Static assets served as-is
│       └── vite.svg
│
├── src/
│   ├── assets/           # Images, fonts, raw static files (imported in JS)
│   │   ├── images/       # All image files
│   │   ├── icons/        # Icon files
│   │   └── videos/       # Video files
│   │
│   ├── components/       # Shared, reusable UI components
│   │   ├── ui/          # Base UI components (buttons, inputs, etc.)
│   │   ├── common/      # Shared components (Loader, PaymentButton)
│   │   └── layout/      # Layout components (Header, Footer, Navbar)
│   │
│   ├── features/         # Feature-based structure
│   │   ├── home/        # Home page feature
│   │   │   ├── components/
│   │   │   └── Home.jsx
│   │   ├── unicorn-club/ # Unicorn club feature
│   │   │   ├── components/
│   │   │   ├── Leaderboard.jsx
│   │   │   └── UnicornClub.jsx
│   │   ├── about/       # About page feature
│   │   │   ├── components/
│   │   │   ├── About.jsx
│   │   │   └── InvestorCommunication.jsx
│   │   ├── pricing/     # Pricing feature
│   │   ├── resources/   # Resources feature
│   │   ├── calculator/  # Value calculator feature
│   │   └── auth/        # Registration feature
│   │
│   ├── pages/           # Route-level components (keep for now, migrate gradually)
│   │   ├── About/
│   │   ├── FAQ/
│   │   ├── How-It-Works/
│   │   ├── Pricing/
│   │   ├── Register/
│   │   ├── Resources/
│   │   ├── Startup-In-Action/
│   │   ├── Terms/
│   │   ├── Unicornclub/
│   │   └── ValueCalculator/
│   │
│   ├── layouts/         # Page layouts
│   │   ├── MainLayout.jsx
│   │   ├── AuthLayout.jsx
│   │   └── DashboardLayout.jsx
│   │
│   ├── routes/          # Route definitions
│   │   ├── routes.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── services/        # API service modules
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── unicornService.js
│   │
│   ├── store/           # State management
│   │   ├── slices/
│   │   └── store.js
│   │
│   ├── hooks/           # Custom reusable React hooks
│   │   ├── useMobile.js
│   │   ├── useAuth.js
│   │   └── useUnicornData.js
│   │
│   ├── utils/           # Utility/helper functions
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   └── constants.js
│   │
│   ├── styles/          # Global styles
│   │   ├── globals.css
│   │   └── variables.css
│   │
│   ├── lib/            # Third-party library configurations
│   │   └── utils.js
│   │
│   ├── data/           # Static data files
│   │   ├── unicorns.csv
│   │   └── soonicorns.csv
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── theme.jsx
│
├── .env
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Migration Steps

### Phase 1: Create New Folders
1. Create `src/layouts/`, `src/routes/`, `src/services/`, `src/store/`, `src/utils/`, `src/styles/`
2. Create `src/assets/images/`, `src/assets/icons/`, `src/assets/videos/`

### Phase 2: Move Components
1. Move `src/components/header/` → `src/components/layout/`
2. Move `src/components/footer/` → `src/components/layout/`
3. Move `src/components/Loader/` → `src/components/common/`
4. Move `src/components/PaymentButton/` → `src/components/common/`
5. Keep `src/components/ui/` as is

### Phase 3: Create Features
1. Create `src/features/home/` and move HomePage components
2. Create `src/features/unicorn-club/` and move UnicornClub components
3. Create `src/features/about/` and move About components

### Phase 4: Extract Routes
1. Create `src/routes/routes.jsx` with all route definitions
2. Update `App.jsx` to use imported routes

### Phase 5: Create Services
1. Create API service modules
2. Create authentication service
3. Create unicorn data service

## Benefits of This Structure

1. **Scalability**: Easy to add new features without cluttering existing code
2. **Maintainability**: Clear separation of concerns
3. **Reusability**: Shared components are properly organized
4. **Team Collaboration**: Multiple developers can work on different features
5. **Testing**: Easier to write unit tests for isolated features
6. **Performance**: Better code splitting opportunities

## Naming Conventions

- **Folders**: kebab-case (`unicorn-club/`, `value-calculator/`)
- **Components**: PascalCase (`UnicornClub.jsx`, `ValueCalculator.jsx`)
- **Files**: camelCase for utilities, PascalCase for components
- **Constants**: UPPER_SNAKE_CASE

## Import Paths

Update `vite.config.js` to support absolute imports:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
})
```

This will allow imports like:
```javascript
import { Button } from '@components/ui/button'
import { useAuth } from '@hooks/useAuth'
import { unicornService } from '@services/unicornService'
``` 