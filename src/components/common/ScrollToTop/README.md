# ScrollToTop Component

A reusable React component that provides a smooth scroll-to-top functionality with a beautiful animated button.

## Features

- **Auto-hide/show**: Button appears when user scrolls down more than 300px
- **Smooth scrolling**: Uses native smooth scrolling behavior
- **Responsive design**: Adapts to different screen sizes
- **Accessibility**: Includes proper ARIA labels and titles
- **Modern styling**: Gradient background with hover effects and animations
- **High z-index**: Ensures button is always visible above other content

## Usage

### Basic Implementation

The component is already integrated into the `MainLayout` component, so it will appear on all pages automatically.

### Manual Implementation

If you want to use it in a specific component:

```jsx
import ScrollToTop from '@components/common/ScrollToTop';

function MyComponent() {
  return (
    <div>
      {/* Your content */}
      <ScrollToTop />
    </div>
  );
}
```

## Props

This component doesn't accept any props - it's fully self-contained.

## Styling

The component includes:
- Fixed positioning (bottom-right corner)
- Gradient background with hover effects
- Smooth animations and transitions
- Responsive breakpoints for mobile devices
- Custom CSS animations

## Customization

To customize the appearance, modify the `ScrollToTop.css` file:

- Change colors by modifying the gradient values
- Adjust positioning by changing the `bottom` and `right` values
- Modify the scroll threshold by changing the `300` value in the component
- Adjust button size and spacing for different screen sizes

## Browser Support

- Modern browsers with ES6+ support
- Smooth scrolling behavior (falls back gracefully on older browsers)
- CSS animations and transitions

## Dependencies

- React 16.8+ (uses hooks)
- No external dependencies required
