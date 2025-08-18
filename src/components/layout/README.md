# ContentPage Design System

## Overview

The ContentPage design system provides a unified, consistent layout and design language for all resource pages (Startups, Mentors, Investors, Enablers, Influencers, Facilitators). This system ensures consistency, maintainability, and scalability across all pages while preserving the unique content and functionality of each.

## Architecture

### Core Components

- **`ContentPage.jsx`** - Main template component that composes all UI elements
- **`PageContainer.jsx`** - Centralized page layout with responsive padding
- **`Hero.jsx`** - Consistent hero section with title, subtitle, badges, and CTAs
- **`Section.jsx`** - Wrapper for content sections with consistent styling
- **`PlansGrid.jsx`** - 3-column grid layout for subscription plans
- **`PlanCard.jsx`** - Individual plan card with consistent styling
- **`CTABand.jsx`** - Full-width call-to-action band
- **`FAQAccordion.jsx`** - Accessible FAQ accordion component

### Design Tokens

All components use centralized CSS variables defined in `src/styles/design-tokens.css` for:
- Colors (brand, surface, text, accents)
- Spacing (xs, sm, md, lg, xl, 2xl)
- Typography (font sizes, weights, families)
- Border radius, shadows, transitions
- Z-index values

## Usage

### Basic Implementation

```jsx
import React from 'react';
import ContentPage from '@/components/layout/ContentPage';
import { yourPlans } from './yourPlans';
import { yourFAQ } from './yourFAQ';

export default function YourPage() {
  const hero = {
    title: "Your Hero Title",
    subtitle: "Your hero subtitle",
    badges: [
      { icon: "🚀", text: "Feature 1" },
      { icon: "💡", text: "Feature 2" }
    ],
    ctas: [
      {
        label: "Primary CTA",
        onClick: () => {/* your action */},
        variant: "default"
      }
    ]
  };

  const sections = [
    {
      title: "Section Title",
      intro: "Section introduction text",
      content: (
        <div>Your custom content here</div>
      )
    }
  ];

  const payment = {
    amount: 101,
    displayText: {
      heading: "Your payment heading",
      subheading: "Your payment subheading"
    }
  };

  return (
    <ContentPage
      hero={hero}
      sections={sections}
      plans={yourPlans}
      payment={payment}
      faq={yourFAQ}
    />
  );
}
```

### Props Structure

#### `hero` Object
- `title` - Main H1 heading
- `subtitle` - Hero subtitle text
- `badges` - Array of badge objects with `icon` and `text`
- `ctas` - Array of CTA objects with `label`, `onClick`, and `variant`

#### `sections` Array
Each section object contains:
- `title` - Section H2 heading
- `intro` - Section introduction text
- `content` - JSX content for the section
- `id` - Optional section ID
- `aria-label` - Optional ARIA label

#### `plans` Array
Array of plan objects for the subscription plans section.

#### `payment` Object
- `amount` - Payment amount
- `displayText` - Object with `heading` and `subheading`

#### `faq` Object
- `questions` - Array of FAQ objects with `q` (question) and `a` (answer)

## Benefits

### 1. Consistency
- All pages share the same visual language
- Consistent spacing, typography, and component behavior
- Unified user experience across the platform

### 2. Maintainability
- Single source of truth for common UI patterns
- Easy to update design system-wide
- Reduced code duplication

### 3. Scalability
- Easy to add new resource pages
- Consistent structure for content teams
- Modular component system

### 4. SEO & Accessibility
- Consistent heading structure
- ARIA attributes and semantic HTML
- FAQ JSON-LD structured data ready
- Meta tags can be managed via Vite's built-in head management or page-level meta

### 5. Performance
- Shared component library
- Optimized CSS with design tokens
- Efficient re-rendering

## Customization

### Adding Custom Sections

```jsx
const sections = [
  // ... existing sections
  {
    title: "Custom Section",
    intro: "Custom section description",
    content: (
      <div className="custom-content">
        {/* Your custom JSX */}
      </div>
    )
  }
];
```

### Custom Styling

Use the existing CSS classes or add custom ones:

```css
.custom-content {
  /* Your custom styles using design tokens */
  padding: var(--space-lg);
  background: var(--card);
  border-radius: var(--radius-md);
}
```

### Extending Components

All UI components are modular and can be extended or modified as needed while maintaining the design system.

## Migration Guide

### From Old Pages

1. **Extract Content**: Move static content to separate data files
2. **Structure Data**: Organize content into the required props structure
3. **Replace JSX**: Replace the old JSX with ContentPage component
4. **Test**: Verify all functionality works correctly
5. **Clean Up**: Remove old CSS files and unused imports

### Example Migration

**Before:**
```jsx
<div className="old-page">
  <div className="hero">
    <h1>Title</h1>
    <p>Subtitle</p>
  </div>
  {/* ... more JSX */}
</div>
```

**After:**
```jsx
const hero = {
  title: "Title",
  subtitle: "Subtitle"
};

return <ContentPage hero={hero} />;
```

## Best Practices

### 1. Content Organization
- Keep content in separate data files
- Use descriptive variable names
- Structure content logically

### 2. SEO
- Always provide meta tags
- Use descriptive titles and descriptions
- Include canonical URLs

### 3. Accessibility
- Provide meaningful alt text for images
- Use semantic HTML structure
- Ensure proper heading hierarchy

### 4. Performance
- Optimize images and assets
- Use lazy loading where appropriate
- Minimize bundle size

## Troubleshooting

### Common Issues

1. **Styling Issues**: Check that design tokens are properly imported
2. **Component Errors**: Verify all required props are passed
3. **SEO Issues**: Meta tags can be managed via Vite's built-in head management or page-level meta

### Debug Mode

Enable debug mode by adding `debug={true}` to ContentPage:

```jsx
<ContentPage
  debug={true}
  // ... other props
/>
```

## Future Enhancements

- [ ] Dark/light theme support
- [ ] Additional component variants
- [ ] Animation and interaction enhancements
- [ ] Advanced customization options
- [ ] Performance optimizations
- [ ] A/B testing framework integration

## Support

For questions or issues with the ContentPage system:
1. Check this documentation
2. Review existing implementations
3. Check component prop types
4. Consult the design system team
