# AI Agent Instructions for Agricultural Store

This document provides essential guidance for AI agents working in this codebase.

## Project Overview

This is a web-based agricultural store built with vanilla JavaScript, HTML, and CSS. The project follows a client-side architecture with local storage for state management.

## Key Architecture Patterns

### State Management
- Shopping cart state is managed in localStorage (see `Product.js` for implementation)
- Cart operations are centralized in utility functions:
  ```javascript
  getCart()         // Retrieves cart from localStorage
  setCart(cart)     // Updates cart in localStorage
  updateCartCount() // Updates UI cart counter
  ```

### Authentication & User Management
- User registration includes client-side validation (`Registration.js`):
  - Username uniqueness check
  - Password strength requirements (8+ chars, mixed case, numbers, symbols)
  - Real-time validation feedback
- Login system is currently client-side mock (`Login.js`)

### UI Patterns
- Responsive design using `responsive-utilities.css`
- Interactive elements use consistent hover/click animations
- Form validation provides immediate user feedback
- Toast notifications for user actions (`Payment.js`)

## File Structure
```
/pages    - HTML pages for each route
/css      - Styles (one CSS file per page)
/js       - JavaScript logic (one JS file per page)
/assets   - Images and media files
```

## Common Operations

### Adding New Products
1. Add product image to `/assets`
2. Update product listing in relevant HTML file
3. Ensure proper cart integration using `addToCart()` function

### Implementing New Forms
1. Add form HTML with required validation attributes
2. Create corresponding CSS file following naming convention
3. Implement JavaScript validation following pattern in `Registration.js`

## Best Practices

1. Keep page-specific logic in dedicated JS files
2. Use `DOMContentLoaded` event for initialization
3. Maintain consistent error handling patterns
4. Follow existing naming conventions for files and functions

## Integration Points

- Cart system integrates across `Product.js`, `Home.js`, and `Payment.js`
- Form validation patterns are shared between `Login.js` and `Registration.js`
- Style utilities and variables are defined in `responsive-utilities.css`