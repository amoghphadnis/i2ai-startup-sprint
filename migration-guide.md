 # Migration Guide: Implementing New Folder Structure & Design System

## Overview
This guide will help you migrate from your current structure to the improved architecture with a centralized design system.

## Phase 1: Setup Design System (Start Here)

### Step 1: Create Design System Folder
```bash
mkdir -p src/design-system
```

### Step 2: Create Design System Files
The design system files have already been created:
- `src/design-system/colors.js`
- `src/design-system/spacing.js`
- `src/design-system/typography.js`
- `src/design-system/index.js`

### Step 3: Update Vite Config for Absolute Imports
Update your `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@design-system': path.resolve(__dirname, './src/design-system'),
      '@features': path.resolve(__dirname, './src/features'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
})
```

### Step 4: Create Global CSS with Design System
Create `src/styles/globals.css`:

```css
/* Import design system variables */
@import '../design-system/variables.css';

/* Global styles */
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: var(--font-family-sans);
  background-color: var(--color-background);
  color: var(--color-foreground);
  line-height: var(--line-height-normal);
}

/* Reset default styles */
a {
  color: inherit;
  text-decoration: none;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
}

/* Utility classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}

.section {
  padding: var(--spacing-12) 0;
}

.grid {
  display: grid;
  gap: var(--spacing-6);
}
```

## Phase 2: Create New Folder Structure

### Step 1: Create New Directories
```bash
# Create main folders
mkdir -p src/features
mkdir -p src/layouts
mkdir -p src/modules
mkdir -p src/routes
mkdir -p src/services
mkdir -p src/store
mkdir -p src/styles
mkdir -p src/assets/images
mkdir -p src/assets/icons
mkdir -p src/assets/videos

# Create module subfolders
mkdir -p src/modules/ui
mkdir -p src/modules/common
mkdir -p src/modules/layout

# Create service subfolders
mkdir -p src/services/api
mkdir -p src/store/slices
```

### Step 2: Move Layout Components
```bash
# Move header and footer to modules/layout
mv src/components/header/* src/modules/layout/Header/
mv src/components/footer/* src/modules/layout/Footer/

# Remove old directories
rmdir src/components/header
rmdir src/components/footer
```

### Step 3: Move Common Components
```bash
# Move Loader and PaymentButton to modules/common
mv src/components/Loader/* src/modules/common/Loader/
mv src/components/PaymentButton/* src/modules/common/PaymentButton/

# Remove old directories
rmdir src/components/Loader
rmdir src/components/PaymentButton
```

### Step 4: Create Layout Components
Create `src/layouts/MainLayout.jsx`:

```javascript
import React from 'react';
import Header from '@modules/layout/Header';
import Footer from '@modules/layout/Footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
```

## Phase 3: Extract Features

### Step 1: Create Home Feature
```bash
mkdir -p src/features/home/components
mkdir -p src/features/home/hooks
mkdir -p src/features/home/services
```

Move HomePage components:
```bash
mv src/components/HomePage/* src/features/home/
rmdir src/components/HomePage
```

### Step 2: Create Unicorn Club Feature
```bash
mkdir -p src/features/unicorn-club/components
mkdir -p src/features/unicorn-club/hooks
mkdir -p src/features/unicorn-club/services
mkdir -p src/features/unicorn-club/styles
```

Move UnicornClub components:
```bash
mv src/pages/Unicornclub/* src/features/unicorn-club/
rmdir src/pages/Unicornclub
```

### Step 3: Create About Feature
```bash
mkdir -p src/features/about/components
mkdir -p src/features/about/hooks
mkdir -p src/features/about/styles
```

Move About components:
```bash
mv src/pages/About/* src/features/about/
rmdir src/pages/About
```

## Phase 4: Create Services

### Step 1: Create API Client
Create `src/services/api/client.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
```

### Step 2: Create Feature Services
Create `src/services/unicornService.js`:

```javascript
import { apiClient } from './api/client';

export const unicornService = {
  async getUnicorns() {
    return apiClient.get('/unicorns');
  },

  async getLeaderboard() {
    return apiClient.get('/leaderboard');
  },

  async submitUnicorn(data) {
    return apiClient.post('/unicorns', data);
  },
};
```

## Phase 5: Extract Routes

### Step 1: Create Routes File
Create `src/routes/routes.jsx`:

```javascript
import Home from '@features/home/Home';
import UnicornClub from '@features/unicorn-club/UnicornClub';
import Leaderboard from '@features/unicorn-club/Leaderboard';
import About from '@features/about/About';
import InvestorCommunication from '@features/about/InvestorCommunication';
import Pricing from '@features/pricing/Pricing';
import Resources from '@features/resources/Resources';
import FAQ from '@features/shared/components/FAQ/FAQ';
import Register from '@features/auth/Register';
import ValueCalculator from '@features/calculator/ValueCalculator';
import Terms from '@features/shared/components/Terms/Terms';
import TermsAndPrivacy from '@features/shared/components/WebContentFetcher/TermsAndPrivacy';
import HowItWorks from '@features/shared/pages/How-It-Works/HowItWorks';
import StartupInAction from '@features/shared/pages/Startup-In-Action/StartupInAction';

export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/Unicorns',
    element: <UnicornClub />,
  },
  {
    path: '/Leaderboard',
    element: <Leaderboard />,
  },
  {
    path: '/About',
    element: <About />,
  },
  {
    path: '/Investor-Communication',
    element: <InvestorCommunication />,
  },
  {
    path: '/Pricing',
    element: <Pricing />,
  },
  {
    path: '/Resources',
    element: <Resources />,
  },
  {
    path: '/Faq',
    element: <FAQ />,
  },
  {
    path: '/Register',
    element: <Register />,
  },
  {
    path: '/ValueCalculator',
    element: <ValueCalculator />,
  },
  {
    path: '/Terms',
    element: <Terms />,
  },
  {
    path: '/terms-and-privacy',
    element: <TermsAndPrivacy />,
  },
  {
    path: '/How-It-Works',
    element: <HowItWorks />,
  },
  {
    path: '/Startup-In-Action',
    element: <StartupInAction />,
  },
];
```

### Step 2: Update App.jsx
Update `src/App.jsx`:

```javascript
import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import { routes } from "@routes/routes";
import "@styles/globals.css";

function App() {
  return (
    <MainLayout>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </MainLayout>
  );
}

export default App;
```

## Phase 6: Update Import Paths

### Step 1: Find All Imports
```bash
# Find all relative imports
grep -r "import.*from.*'\./" src/
```

### Step 2: Update Imports Systematically
Replace relative imports with absolute imports:

```javascript
// Before
import { Button } from '../../components/ui/button';
import './About.css';

// After
import { Button } from '@modules/ui/Button';
import '@features/about/styles/About.css';
```

### Step 3: Update Component Imports
Update all component files to use new import paths:

```javascript
// Example: src/features/home/Home.jsx
import React from 'react';
import { Button } from '@modules/ui/Button';
import { Loader } from '@modules/common/Loader';
import { colors, spacing } from '@design-system';
import './Home.css';
```

## Phase 7: Update CSS to Use Design System

### Step 1: Update CSS Variables
Replace hardcoded values with design system variables:

```css
/* Before */
.hero-section {
  background-color: #001220;
  padding: 24px;
  font-size: 18px;
}

/* After */
.hero-section {
  background-color: var(--color-dark-bg);
  padding: var(--spacing-6);
  font-size: var(--font-size-lg);
}
```

### Step 2: Create Component-Specific Styles
Create `src/features/home/styles/Home.css`:

```css
.hero-section {
  background-color: var(--color-dark-bg);
  color: var(--color-secondary);
  padding: var(--spacing-12) 0;
}

.hero-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-bottom: var(--spacing-6);
}

.hero-description {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-8);
}
```

## Phase 8: Test Everything

### Step 1: Run Development Server
```bash
npm run dev
```

### Step 2: Check for Errors
- Look for import errors in the console
- Fix any broken import paths
- Ensure all components render correctly

### Step 3: Test All Routes
- Navigate to each page
- Ensure all functionality works
- Check that styles are applied correctly

## Phase 9: Clean Up

### Step 1: Remove Empty Directories
```bash
# Remove any empty directories
find src -type d -empty -delete
```

### Step 2: Update Documentation
- Update README.md with new structure
- Document design system usage
- Update any team documentation

## Benefits After Migration

1. **Centralized Design System**: All design tokens in one place
2. **Better Organization**: Clear separation of concerns
3. **Easier Maintenance**: Consistent patterns across the app
4. **Improved Scalability**: Easy to add new features
5. **Better Performance**: Optimized imports and code splitting
6. **Team Collaboration**: Multiple developers can work independently

## Next Steps

1. **Add TypeScript**: Consider migrating to TypeScript for better type safety
2. **Add Testing**: Set up unit tests for components and features
3. **Add Storybook**: Create component documentation
4. **Add ESLint**: Configure linting rules for consistent code
5. **Add Prettier**: Configure code formatting

This migration will give you a solid foundation for a scalable, maintainable React application with a consistent design system.