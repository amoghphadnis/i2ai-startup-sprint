# Implementation Plan for Project Refactoring

## Phase 1: Setup New Folder Structure (Start Here)

### Step 1: Create New Directories
```bash
# Create new folder structure
mkdir -p src/layouts
mkdir -p src/routes
mkdir -p src/services
mkdir -p src/store
mkdir -p src/utils
mkdir -p src/styles
mkdir -p src/assets/images
mkdir -p src/assets/icons
mkdir -p src/assets/videos
mkdir -p src/components/common
mkdir -p src/components/layout
mkdir -p src/features/home
mkdir -p src/features/unicorn-club
mkdir -p src/features/about
mkdir -p src/features/pricing
mkdir -p src/features/resources
mkdir -p src/features/calculator
mkdir -p src/features/auth
```

### Step 2: Update Vite Config for Absolute Imports
Update `vite.config.js`:

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
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@routes': path.resolve(__dirname, './src/routes'),
    },
  },
})
```

## Phase 2: Move Layout Components

### Step 1: Move Header and Footer
```bash
# Move header components
mv src/components/header/* src/components/layout/
rmdir src/components/header

# Move footer components  
mv src/components/footer/* src/components/layout/
rmdir src/components/footer
```

### Step 2: Move Common Components
```bash
# Move Loader and PaymentButton
mv src/components/Loader/* src/components/common/
rmdir src/components/Loader

mv src/components/PaymentButton/* src/components/common/
rmdir src/components/PaymentButton
```

### Step 3: Update Import Paths
Update all files that import these components:

```javascript
// Old imports
import Navbar from './components/header/Navbar';
import Footer from './components/footer/Footer';
import Loader from './components/Loader/Loader';
import PaymentButton from './components/PaymentButton/PaymentButton';

// New imports
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';
import Loader from '@components/common/Loader';
import PaymentButton from '@components/common/PaymentButton';
```

## Phase 3: Create Layout Components

### Step 1: Create MainLayout.jsx
```javascript
// src/layouts/MainLayout.jsx
import React from 'react';
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
```

### Step 2: Update App.jsx
```javascript
// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import Home from "@features/home/Home";
// ... other imports

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* ... other routes */}
      </Routes>
    </MainLayout>
  );
}
```

## Phase 4: Extract Routes

### Step 1: Create routes.jsx
```javascript
// src/routes/routes.jsx
import Home from '@features/home/Home';
import UnicornClub from '@features/unicorn-club/UnicornClub';
import About from '@features/about/About';
// ... other imports

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
    path: '/About',
    element: <About />,
  },
  // ... other routes
];
```

### Step 2: Update App.jsx
```javascript
// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import { routes } from "@routes/routes";

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
```

## Phase 5: Create Feature Folders

### Step 1: Move Home Feature
```bash
# Move HomePage components
mv src/components/HomePage/* src/features/home/
rmdir src/components/HomePage
```

### Step 2: Move Unicorn Club Feature
```bash
# Move UnicornClub components
mv src/pages/Unicornclub/* src/features/unicorn-club/
rmdir src/pages/Unicornclub
```

### Step 3: Move About Feature
```bash
# Move About components
mv src/pages/About/* src/features/about/
rmdir src/pages/About
```

## Phase 6: Create Services

### Step 1: Create API Service
```javascript
// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const api = {
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
  },
  
  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
```

### Step 2: Create Unicorn Service
```javascript
// src/services/unicornService.js
import { api } from './api';

export const unicornService = {
  async getUnicorns() {
    return api.get('/unicorns');
  },
  
  async getLeaderboard() {
    return api.get('/leaderboard');
  },
  
  async submitUnicorn(data) {
    return api.post('/unicorns', data);
  },
};
```

## Phase 7: Create Utils

### Step 1: Create Formatters
```javascript
// src/utils/formatters.js
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatPercentage = (value) => {
  return `${(value * 100).toFixed(1)}%`;
};
```

### Step 2: Create Validators
```javascript
// src/utils/validators.js
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};
```

## Phase 8: Update All Import Paths

### Step 1: Create a script to find all imports
```bash
# Find all import statements
grep -r "import.*from.*'\./" src/
```

### Step 2: Update imports systematically
Replace relative imports with absolute imports:

```javascript
// Before
import { Button } from '../../components/ui/button';
import './About.css';

// After
import { Button } from '@components/ui/button';
import '@features/about/About.css';
```

## Phase 9: Test Everything

### Step 1: Run the development server
```bash
npm run dev
```

### Step 2: Check for errors
- Look for import errors in the console
- Fix any broken import paths
- Ensure all components render correctly

### Step 3: Test all routes
- Navigate to each page
- Ensure all functionality works
- Check that styles are applied correctly

## Phase 10: Clean Up

### Step 1: Remove empty directories
```bash
# Remove any empty directories
find src -type d -empty -delete
```

### Step 2: Update documentation
- Update README.md with new structure
- Document any new conventions
- Update any team documentation

## Benefits After Refactoring

1. **Better Organization**: Clear separation of concerns
2. **Easier Navigation**: Intuitive folder structure
3. **Scalability**: Easy to add new features
4. **Maintainability**: Easier to find and modify code
5. **Team Collaboration**: Multiple developers can work independently
6. **Testing**: Better isolation for unit tests
7. **Performance**: Better code splitting opportunities

## Next Steps

1. Implement the refactoring phase by phase
2. Test thoroughly after each phase
3. Consider adding TypeScript for better type safety
4. Add ESLint rules for consistent imports
5. Consider adding Storybook for component documentation 