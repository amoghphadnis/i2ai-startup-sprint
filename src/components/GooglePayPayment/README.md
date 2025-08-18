# GooglePayPayment Component

A fully dynamic and responsive Google Pay payment component for React applications.

## Features

- **Dynamic Amount**: Accepts `amount` prop to display different payment amounts
- **Customizable Text**: Accepts `displayText` prop for custom headings and subheadings
- **Responsive Design**: Optimized for mobile, tablet, and desktop screens
- **QR Code Generation**: Automatically generates UPI QR codes
- **Google Pay Integration**: Direct integration with Google Pay app
- **Form Handling**: Complete registration form with validation
- **Accessibility**: Built with accessibility best practices

## Props

### `amount` (number, optional)
- The payment amount in rupees
- Default: `99`
- Example: `999`, `99`, `199`

### `displayText` (object, optional)
- Custom text for the component header
- Properties:
  - `heading`: Main heading text
  - `subheading`: Subheading/description text
- Default: Auto-generated based on amount

## Usage Examples

### Basic Usage (with defaults)
```jsx
import GooglePayPayment from './components/GooglePayPayment/GooglePayPayment';

<GooglePayPayment />
```

### With Custom Amount
```jsx
<GooglePayPayment amount={999} />
```

### With Custom Text
```jsx
<GooglePayPayment 
  amount={99} 
  displayText={{
    heading: "🚀 Register for Professional Zone – ₹99 Only",
    subheading: "Limited time offer for professional members."
  }} 
/>
```

### Home Page Example
```jsx
<GooglePayPayment 
  amount={999} 
  displayText={{
    heading: "🚀 Join i2u.ai – ₹999 Today, Unlock Premium Benefits",
    subheading: "Your one-time fee of ₹999 gives you lifetime access to our premium resources."
  }} 
/>
```

### Professional Zone Example
```jsx
<GooglePayPayment 
  amount={99} 
  displayText={{
    heading: "🚀 Register for Professional Zone – ₹99 Only",
    subheading: "Limited time offer for professional members. Secure your spot in the Professional Zone with this exclusive pricing."
  }} 
/>
```

## Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## Features

### Payment Methods
- Google Pay deep link integration
- UPI QR code generation
- UPI ID copy functionality
- QR code download

### Form Fields
- Full Name
- Email ID
- Phone Number
- Transaction ID

### Validation
- Required field validation
- Form submission handling
- Success/error messaging
- Loading states

### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader compatibility

## Dependencies

- `qrcode`: For QR code generation
- React hooks: `useState`, `useEffect`, `useRef`

## Browser Support

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Desktop browsers (Chrome, Firefox, Safari, Edge)

## Notes

- The component automatically generates UPI QR codes based on the amount prop
- All payment amounts are displayed in Indian Rupees (₹)
- The component stores registration data in localStorage for demo purposes
- In production, form data should be sent to your backend API
