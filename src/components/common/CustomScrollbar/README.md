# Custom Scrollbar System

A comprehensive custom scrollbar solution that matches your design system and provides responsive behavior across all devices.

## Features

- **Design System Integration**: Uses your existing color palette and design tokens
- **Responsive Design**: Automatically adapts to different screen sizes
- **Cross-browser Support**: Works on Webkit (Chrome, Safari, Edge) and Firefox
- **Accessibility**: Supports high contrast mode and reduced motion preferences
- **Dark Theme**: Automatically adapts to system dark mode preferences
- **Performance**: Lightweight implementation with CSS variables

## Components

### 1. CustomScrollbar
The main component that applies custom scrollbars globally to your website.

**Usage:**
```jsx
import CustomScrollbar from '@components/common/CustomScrollbar';

// Already integrated in MainLayout - applies to all pages
```

### 2. ScrollableContainer
A wrapper component for specific elements that need custom scrollbars.

**Usage:**
```jsx
import ScrollableContainer from '@components/common/CustomScrollbar/ScrollableContainer';

function MyComponent() {
  return (
    <ScrollableContainer 
      maxHeight="400px" 
      className="my-custom-class"
    >
      {/* Your scrollable content */}
      <div>Long content here...</div>
    </ScrollableContainer>
  );
}
```

## Props for ScrollableContainer

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxHeight` | string | 'auto' | Maximum height before scrolling |
| `maxWidth` | string | 'auto' | Maximum width before scrolling |
| `overflowX` | string | 'auto' | Horizontal overflow behavior |
| `overflowY` | string | 'auto' | Vertical overflow behavior |
| `className` | string | '' | Additional CSS classes |

## Responsive Breakpoints

The scrollbar automatically adapts to different screen sizes:

### Desktop/Laptop (≥1200px)
- Width: 12px
- Border radius: 6px
- Border: 2px solid

### Tablet (768px - 1199px)
- Width: 10px
- Border radius: 5px
- Border: 1.5px solid

### Mobile (≤767px)
- Width: 8px
- Border radius: 4px
- Border: 1px solid

### Small Mobile (≤480px)
- Width: 6px
- Border radius: 3px
- Border: 1px solid

## Design System Integration

The scrollbar uses your existing design tokens:

- **Primary Colors**: `#1e90ff` (blue) and `#6f6cff` (purple)
- **Background**: `rgba(30, 144, 255, 0.1)` for track
- **Gradients**: Linear gradients matching your brand colors
- **Border Radius**: Consistent with your `--border-radius` variable
- **Shadows**: Blue-tinted shadows matching your design

## CSS Variables

The scrollbar system uses CSS custom properties that you can override:

```css
:root {
  --scrollbar-width: 12px;
  --scrollbar-height: 12px;
  --scrollbar-track-bg: rgba(30, 144, 255, 0.1);
  --scrollbar-thumb-bg: linear-gradient(135deg, #1e90ff 0%, #6f6cff 100%);
  --scrollbar-thumb-hover-bg: linear-gradient(135deg, #6f6cff 0%, #1e90ff 100%);
  --scrollbar-thumb-border: 2px solid rgba(0, 18, 32, 0.8);
  --scrollbar-border-radius: 6px;
  --scrollbar-transition: all 0.3s ease;
  --scrollbar-thumb-hover-transform: scale(1.05);
}
```

## Browser Support

- **Chrome/Edge**: Full support with webkit scrollbar styles
- **Firefox**: Full support with scrollbar-width and scrollbar-color
- **Safari**: Full support with webkit scrollbar styles
- **Mobile Browsers**: Responsive sizing and touch-friendly

## Accessibility Features

- **High Contrast Mode**: Automatically adapts to system preferences
- **Reduced Motion**: Respects user's motion preferences
- **Focus States**: Clear visual indicators for keyboard navigation
- **Screen Reader**: Compatible with assistive technologies

## Examples

### Basic Usage
```jsx
// The scrollbar is automatically applied to all pages
// No additional code needed
```

### Custom Container
```jsx
import ScrollableContainer from '@components/common/CustomScrollbar/ScrollableContainer';

function DataTable() {
  return (
    <ScrollableContainer maxHeight="500px">
      <table>
        {/* Your table content */}
      </table>
    </ScrollableContainer>
  );
}
```

### Horizontal Scrolling
```jsx
<ScrollableContainer 
  maxWidth="100%" 
  overflowX="auto" 
  overflowY="hidden"
>
  <div style={{ width: '2000px' }}>
    {/* Wide content */}
  </div>
</ScrollableContainer>
```

### Custom Styling
```jsx
<ScrollableContainer 
  className="my-custom-scrollbar"
  maxHeight="300px"
>
  {/* Content */}
</ScrollableContainer>
```

## Customization

### Override Global Styles
```css
/* In your CSS file */
:root {
  --scrollbar-width: 16px;
  --scrollbar-thumb-bg: linear-gradient(135deg, #fb9824 0%, #2c425c 100%);
}
```

### Element-Specific Styles
```css
.my-custom-scrollbar {
  --scrollbar-track-bg: rgba(251, 152, 36, 0.1);
  --scrollbar-thumb-bg: #fb9824;
}
```

## Performance Notes

- CSS variables are used for optimal performance
- No JavaScript execution during scrolling
- Minimal DOM manipulation
- Efficient event handling

## Troubleshooting

### Scrollbar Not Appearing
1. Ensure `CustomScrollbar` is imported in your layout
2. Check if CSS is properly loaded
3. Verify browser compatibility

### Styling Issues
1. Check CSS variable overrides
2. Ensure proper CSS specificity
3. Verify media query breakpoints

### Mobile Issues
1. Check viewport meta tag
2. Verify touch event handling
3. Test on actual devices

## Future Enhancements

- Smooth scrolling animations
- Custom scrollbar themes
- Touch gesture support
- Scrollbar positioning options
