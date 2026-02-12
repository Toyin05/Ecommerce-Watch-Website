# Rolex Watches E-Commerce Website - Technical Documentation

## Overview
A responsive e-commerce website for selling luxury watches, built with vanilla HTML, CSS, and JavaScript. The project features a complete shopping flow from product selection to checkout and payment.

## Tech Stack

### Core Technologies
- **HTML5** - Semantic markup structure
- **CSS3** - Styling with CSS variables, flexbox, and grid
- **JavaScript (ES6+)** - Vanilla JavaScript for interactivity
- **Local Storage** - Client-side data persistence for cart and order management

### External Libraries & Resources

#### CSS Framework / Reset
- **Boxicons** - Icon library (https://boxicons.com)
  - Used for: All icons throughout the site (navigation, buttons, trust badges, payment icons)
  - Classes: `bx bx-menu`, `bx bx-moon`, `bx bx-sun`, `bx bx-shopping-bag`, etc.

#### JavaScript Libraries
- **Sonner Toast** - Toast notifications (https://sonner.emilkowal.ski)
  - Used for: Success, error, and info notifications
  - Integration: CDN links in `<head>` and `<body>`

#### Fonts & Typography
- **Google Fonts - Roboto** (https://fonts.google.com/specimen/Roboto)
  - Import: `@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");`
  - Usage: Primary font family for all text content

#### External Assets
- **Favicon** - `assets/img/favicon.png`
- **Product Images** - Stored in `assets/img/` directory

---

## Project Structure

```
responsive-watches-website-main/
├── index.html          # Home page with product listings
├── checkout.html       # Checkout form with shipping/payment selection
├── payout.html        # Payment confirmation page
├── README.md          # This file
└── assets/
    ├── css/
    │   └── styles.css # Main stylesheet with all CSS variables and responsive rules
    ├── js/
    │   └── main.js    # Main JavaScript file (cart, theme, navigation)
    └── img/
        ├── favicon.png
        └── [product images...]
```

---

## CSS Architecture

### CSS Variables (`:root`)
All colors and design tokens are defined as CSS variables for easy theming and consistency:

```css
:root {
  /* Colors */
  --first-color: hsl(31, 100%, 70%);      /* Bright Orange - Primary brand color */
  --button-color: hsl(0, 0%, 17%);        /* Dark button background */
  --button-color-alt: hsl(0, 0%, 21%);    /* Dark button hover */
  --title-color: hsl(0, 0%, 15%);         /* Heading text color */
  --text-color: hsl(0, 0%, 35%);          /* Body text color */
  --text-color-light: hsl(0, 0%, 55%);    /* Muted text */
  --body-color: hsl(0, 0%, 99%);          /* Light mode background */
  --container-color: #fff;                  /* Card/container background */
  --border-color: hsl(0, 0%, 94%);         /* Border color */
  
  /* Typography */
  --body-font: 'Roboto', sans-serif;
  --biggest-font-size: 2rem;
  --h1-font-size: 1.5rem;
  --h2-font-size: 1.25rem;
  --h3-font-size: 1rem;
  --normal-font-size: .938rem;
  --small-font-size: .813rem;
  --smaller-font-size: .75rem;
  
  /* Spacing */
  --mb-0-5: .5rem;
  --mb-1: 1rem;
  --mb-1-5: 1.5rem;
  --mb-2: 2rem;
  --mb-2-5: 2.5rem;
  --mb-3: 3rem;
  
  /* Z-index layers */
  --z-tooltip: 10;
  --z-fixed: 100;
}
```

### Dark Theme Variables
Dark theme overrides are defined in the `.dark-theme` class:

```css
.dark-theme {
  --first-color: hsl(31, 76%, 74%);        /* Lighter orange for dark backgrounds */
  --button-color: hsl(0, 0%, 24%);
  --button-color-alt: hsl(0, 0%, 28%);
  --title-color: hsl(0, 0%, 95%);
  --text-color: hsl(0, 0%, 75%);
  --body-color: hsl(0, 0%, 12%);
  --container-color: hsl(0, 0%, 16%);
  --border-color: hsl(0, 0%, 20%);
}
```

---

## Responsive Design

### Breakpoints
The site uses three main breakpoints for responsive design:

#### 1. Small Devices (≤ 320px)
```css
@media screen and (max-width: 320px) {
  /* Adjustments for very small screens */
  .container { margin-left: var(--mb-1); margin-right: var(--mb-1); }
  .home__title { font-size: var(--h1-font-size); }
  .products__container { grid-template-columns: repeat(1, 180px); }
}
```

#### 2. Medium Devices (≤ 576px)
```css
@media screen and (max-width: 576px) {
  /* Single column layouts, stacked elements */
  .customer-info-grid { grid-template-columns: 1fr; }
  .card-form__row { grid-template-columns: 1fr; }
  .payout__actions { flex-direction: column; }
}
```

#### 3. Tablet Devices (≤ 767px)
```css
@media screen and (max-width: 767px) {
  /* Navigation changes */
  .nav__toggle, .nav__close { display: none; }
  .nav__list { flex-direction: row; column-gap: 2.5rem; }
  .nav__link { text-transform: initial; font-size: var(--normal-font-size); }
  .nav__btns { margin-left: auto; }
  
  /* Cart sidebar */
  .cart { width: 420px; box-shadow: -2px 0 4px hsla(0, 0%, 15%, .1); }
  
  /* Section padding */
  .section { padding: 8rem 0 1rem; }
}
```

#### 4. Large Tablets/Desktop (≤ 992px)
```css
@media screen and (max-width: 992px) {
  /* Two column layouts */
  .payout__container { grid-template-columns: 1fr; }
  .featured__container { grid-template-columns: repeat(3, 312px); }
  .products__container { grid-template-columns: repeat(3, 200px); }
  
  /* Trust badges responsive */
  .trust-badges { flex-direction: row; flex-wrap: wrap; }
  .trust-badge { flex: 1; min-width: 150px; }
}
```

#### 5. Large Desktop (≥ 1024px)
```css
@media screen and (min-width: 1024px) {
  /* Full width container */
  .container { margin-left: auto; margin-right: auto; }
  
  /* Larger typography */
  --biggest-font-size: 2.5rem;
  --h1-font-size: 2.25rem;
}
```

### Responsive Techniques Used
1. **CSS Grid** - For card layouts (products, trust badges)
2. **CSS Flexbox** - For navigation, button groups, card interiors
3. **CSS Custom Properties** - For theme-aware sizing
4. **Fluid Typography** - Font sizes scale with viewport
5. **Mobile-First Approach** - Base styles for mobile, enhanced for larger screens

---

## Components

### Header / Navigation
```html
<header class="header" id="header">
  <nav class="nav container">
    <a href="index.html" class="nav__logo">
      <i class='bx bxs-watch nav__logo-icon'></i> ROLEX
    </a>
    <div class="nav__menu" id="nav-menu">
      <ul class="nav__list">
        <li class="nav__item"><a href="#home" class="nav__link">Home</a></li>
        <li class="nav__item"><a href="#featured" class="nav__link">Featured</a></li>
        <li class="nav__item"><a href="#products" class="nav__link">Products</a></li>
      </ul>
    </div>
    <div class="nav__btns">
      <i class='bx bx-moon change-theme' id="theme-button"></i>
      <i class='bx bx-shopping-cart nav__shop' id="cart-shop"></i>
    </div>
  </nav>
</header>
```

**Features:**
- Fixed position header with scroll detection
- Dark/light mode toggle button
- Shopping cart icon with item count badge
- Mobile hamburger menu

### Product Cards
```html
<article class="products__card" data-id="1" data-name="..." data-price="..." data-img="...">
  <div class="featured__tag">Sale</div>
  <img src="assets/img/product1.png" alt="Watch Name" class="products__img">
  <h3 class="products__title">Watch Name</h3>
  <span class="products__price">₦150,000</span>
  <button class="button products__button">
    <i class='bx bx-shopping-bag'></i>
  </button>
</article>
```

**Features:**
- Product image with hover effects
- Sale tag overlay (rotated)
- Add to cart button
- Data attributes for JavaScript product info

### Cart Drawer
```html
<div class="cart" id="cart">
  <i class='bx bx-x cart__close' id="cart-close"></i>
  <h2 class="cart__title-center">My Cart</h2>
  <div id="cart-container">
    <!-- Cart items rendered here -->
  </div>
  <div class="cart__prices">
    <span class="cart__prices-item">3 items</span>
    <span class="cart__prices-total">₦450,000</span>
  </div>
  <a href="checkout.html" class="button cart__checkout-btn">
    <i class='bx bx-credit-card'></i> Checkout
  </a>
</div>
```

### Checkout Form
```html
<form class="checkout__form" id="checkout-form">
  <!-- Customer Information -->
  <div class="checkout__group">
    <h3 class="section__title">Shipping Information</h3>
    <input type="text" placeholder="First Name" class="checkout__input" required>
    <input type="text" placeholder="Last Name" class="checkout__input" required>
    <input type="email" placeholder="Email" class="checkout__input" required>
    <input type="tel" placeholder="Phone" class="checkout__input" required>
    <input type="text" placeholder="Address" class="checkout__input" required>
    <input type="text" placeholder="City" class="checkout__input" required>
  </div>
  
  <!-- Payment Method Selection -->
  <div class="checkout__group">
    <h3 class="section__title">Payment Method</h3>
    <div class="payment__options">
      <label class="payment__option">
        <input type="radio" name="payment" value="card" checked>
        <i class='bx bx-credit-card'></i> Credit/Debit Card
      </label>
      <label class="payment__option">
        <input type="radio" name="payment" value="bank">
        <i class='bx bx-building'></i> Bank Transfer
      </label>
    </div>
  </div>
  
  <button type="submit" class="button checkout__btn">
    <i class='bx bx-lock-alt'></i> Proceed to Payment
  </button>
</form>
```

### Payout Page Components

#### Order Summary Card
```html
<div class="payout__order-summary">
  <h3 class="payout__section-title">Order Summary</h3>
  <div id="payout-items">
    <!-- Dynamic items rendered here -->
  </div>
  <div class="payout__summary-totals">
    <div class="payout__summary-row">
      <span>Subtotal</span>
      <span>₦<span id="payout-subtotal">0</span></span>
    </div>
    <div class="payout__summary-row payout__total">
      <span>Total</span>
      <span>₦<span id="payout-total">0</span></span>
    </div>
  </div>
</div>
```

#### Customer Information Card
```html
<div class="payout__customer-info">
  <h3 class="payout__section-title">Customer Information</h3>
  <div class="customer-info-grid">
    <div class="customer-info-item">
      <label>Name</label>
      <span>John Doe</span>
    </div>
    <div class="customer-info-item">
      <label>Email</label>
      <span>john@example.com</span>
    </div>
    <!-- More fields -->
  </div>
</div>
```

#### Trust Badges Section
```html
<div class="payout__trust-section">
  <h3 class="payout__section-title">Why Shop With Us?</h3>
  <div class="trust-badges">
    <div class="trust-badge">
      <i class='bx bx-shield-check'></i>
      <h4>Secure Payment</h4>
      <p>100% secure payment processing</p>
    </div>
    <div class="trust-badge">
      <i class='bx bx-package'></i>
      <h4>Nationwide Delivery</h4>
      <p>Free shipping across Nigeria</p>
    </div>
    <!-- More badges -->
  </div>
</div>
```

---

## Data Management

### Local Storage Structure

#### Cart Data (`cart`)
```javascript
[
  {
    "id": "product1",
    "name": "Rolex Submariner",
    "price": 150000,
    "img": "assets/img/product1.png",
    "quantity": 2
  }
]
```

#### Order Data (`orderData`)
```javascript
{
  "customer": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+234123456789",
    "address": "123 Main Street",
    "city": "Lagos",
    "state": "Lagos State"
  },
  "items": [
    {
      "id": "product1",
      "name": "Rolex Submariner",
      "price": 150000,
      "img": "assets/img/product1.png",
      "quantity": 2
    }
  ],
  "total": 300000,
  "payment": "card" // or "bank"
}
```

#### Theme Preference (`selected-theme`)
```
Value: "dark" or "light"
Default: "light"
```

---

## JavaScript Functions

### Main Application (main.js)

| Function | Purpose |
|----------|---------|
| `getCart()` | Retrieve cart from localStorage |
| `saveCart(cartData)` | Save cart to localStorage |
| `addToCart(product)` | Add item to cart |
| `removeFromCart(productId)` | Remove item from cart |
| `updateQuantity(productId, change)` | Update item quantity |
| `updateCartBadge()` | Update cart icon badge count |
| `updateCartDisplay()` | Render cart drawer contents |
| `setupTheme()` | Initialize dark/light mode |
| `setupNavigation()` | Mobile menu toggle |
| `setupScrollEffects()` | Header scroll and scroll-up button |
| `setupCart()` | Cart drawer open/close |
| `setupAddToCartButtons()` | Product card button listeners |

### Payout Page (inline script)

| Function | Purpose |
|----------|---------|
| `renderPayoutItems()` | Render order items from localStorage |
| `renderCustomerInfo()` | Display customer shipping info |
| `renderPaymentMethod()` | Show selected payment method |
| `setupPaymentMethodUI()` | Toggle card/bank transfer forms |
| `processPayment()` | Handle payment submission |
| `copyAccountNumber()` | Copy bank account to clipboard |
| `showSuccessModal()` | Display order confirmation modal |
| `showToast()` | Show notification toasts |
| `toggleTheme()` | Handle dark/light mode toggle |

---

## Icons Reference

### Boxicons Classes Used

| Icon | Class | Usage |
|------|-------|-------|
| 🌙 Moon | `bx bx-moon` | Dark mode toggle (light theme) |
| ☀️ Sun | `bx bx-sun` | Dark mode toggle (dark theme) |
| 🛒 Shopping Bag | `bx bx-shopping-bag` | Add to cart button |
| 🛒 Shopping Cart | `bx bx-shopping-cart` | Cart icon |
| 🔒 Lock | `bx bx-lock-alt` | Security indicators |
| 🛡️ Shield | `bx bx-shield` | Secure payment badge |
| 📦 Package | `bx bx-package` | Delivery info |
| ↩️ Undo | `bx bx-undo` | Returns info |
| 🎧 Headphone | `bx bx-headphone` | Support info |
| ↩️ Arrow Back | `bx bx-arrow-back` | Back buttons |
| ✅ Check Circle | `bx bx-check-circle` | Success states |
| ❌ Error Circle | `bx bx-error-circle` | Error states |
| 💳 Credit Card | `bx bx-credit-card` | Card payment |
| 🏦 Building | `bx bx-building` | Bank transfer |
| 📋 Clipboard | `bx bx-copy` | Copy account number |
| 💬 Message | `bx bx-message-rounded-dots` | WhatsApp instructions |
| ℹ️ Info Circle | `bx bx-info-circle` | Information tooltips |
| ➕ Plus | `bx bx-plus` | Quantity increase |
| ➖ Minus | `bx bx-minus` | Quantity decrease |
| 🗑️ Trash | `bx bx-trash-alt` | Remove item |
| ⬆️ Up Arrow | `bx bx-up-arrow-alt | Scroll to top |
| ⬇️ Chevron Down | `bx bx-chevron-down` | Accordions |
| 📱 Menu | `bx bx-menu` | Mobile navigation |

### Brand Icons
| Icon | Class | Usage |
|------|-------|-------|
| ⌚ Watch | `bx bxs-watch` | Brand logo |

### Payment Card Icons
| Icon | Class | Provider |
|------|-------|----------|
| 💳 Visa | `bxl-visa` | Visa cards |
| 💳 Mastercard | `bxl-mastercard` | Mastercard cards |

---

## CSS Class Naming Convention

### BEM-like Naming
The project uses a modified BEM (Block Element Modifier) naming convention:

```
Block: .button, .nav, .cart, .products
Element: .button__icon, .nav__menu, .cart__title
Modifier: .button--gray, .button--small, .nav__link--active
```

### Custom Prefixes
| Prefix | Component |
|--------|-----------|
| `payout__` | Payout page components |
| `checkout__` | Checkout page components |
| `featured__` | Featured products section |
| `story__` | Brand story section |
| `testimonial__` | Customer testimonials |
| `newsletter__` | Newsletter signup |
| `footer__` | Footer components |
| `scroll__` | Scroll-related elements |

---

## Animation & Transitions

### Global Transitions
```css
body {
  transition: .4s; /* Theme changes */
}

.button {
  transition: .3s; /* Button hover effects */
}

.nav__link {
  transition: .3s; /* Link hover effects */
}

.products__card,
.featured__card,
.new__card {
  transition: .3s; /* Card hover effects */
}
```

### Keyframe Animations
```css
@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

---

## Browser Support

### Tested Browsers
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Features Used
- CSS Custom Properties (92.5% global support)
- CSS Grid (92.5% global support)
- CSS Flexbox (99.4% global support)
- ES6 JavaScript (95% global support)
- localStorage (96.5% global support)

---

## Setup Instructions

### Local Development
1. Clone the repository
2. Open `index.html` in a web browser
3. No build process required (vanilla HTML/CSS/JS)

### Customization

#### Changing Colors
Edit CSS variables in `assets/css/styles.css`:
```css
:root {
  --first-color: hsl(31, 100%, 70%); /* Change brand color */
}
```

#### Adding Products
Add new product cards to the appropriate section in `index.html`:
```html
<article class="products__card" 
         data-id="new-id" 
         data-name="Product Name" 
         data-price="100000" 
         data-img="assets/img/new-product.png">
  <img src="assets/img/new-product.png" alt="Product Name" class="products__img">
  <h3 class="products__title">Product Name</h3>
  <span class="products__price">₦100,000</span>
  <button class="button products__button">
    <i class='bx bx-shopping-bag'></i>
  </button>
</article>
```

#### Changing Bank Details
Update in `payout.html`:
```html
<p><strong>Bank:</strong> Your Bank Name</p>
<p><strong>Account Name:</strong> Your Account Name</p>
<p><strong>Account Number:</strong> Your Account Number</p>
```

---

## Performance Considerations

### Optimizations
1. **Lazy Loading** - Images load as they enter viewport
2. **Minimal External Requests** - No heavy frameworks
3. **CSS Variables** - Efficient theme switching
4. **Event Delegation** - Single event listeners for dynamic content
5. **Debounced Functions** - Scroll and resize handlers

### Best Practices Used
- Semantic HTML5 elements
- ARIA labels for accessibility
- Contrast ratios for readability
- Keyboard-navigable interface
- Focus states for interactive elements

---

## Future Enhancements

### Possible Improvements
1. **Backend Integration** - Connect to payment gateway
2. **User Accounts** - Login/registration system
3. **Order History** - Save and display past orders
4. **Wishlist** - Save favorite products
5. **Product Reviews** - Customer ratings and reviews
6. **Search Functionality** - Product search bar
7. **Filtering** - Filter by price, category, brand
8. **Pagination** - For large product catalogs
9. **Image Optimization** - WebP format for faster loading
10. **CDN Integration** - Faster asset delivery

---

## Credits

### Design Inspired By
- Various e-commerce template designs
- Modern UI/UX best practices

### Icons
- [Boxicons](https://boxicons.com) - MIT License

### Fonts
- [Google Fonts - Roboto](https://fonts.google.com/specimen/Roboto) - Apache License

---

## License
MIT License - Free to use and modify for personal and commercial projects.
