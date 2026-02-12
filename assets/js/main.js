// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Check for old cart data with dollar prices and convert
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // If we have order data but no cart, try to restore from orderData
    const orderData = JSON.parse(localStorage.getItem('orderData')) || null;
    if (cart.length === 0 && orderData && orderData.items) {
        cart = orderData.items;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Initialize cart count badge
    updateCartBadge();
    
    // Setup all event listeners
    setupNavigation();
    setupScrollEffects();
    setupCart();
    setupAddToCartButtons();
    setupTheme();
    
    // Initialize swipers if available
    initSwipers();
});

// Cart functions
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cartData) {
    console.log('Saving cart to localStorage:', cartData);
    localStorage.setItem('cart', JSON.stringify(cartData));
    updateCartBadge();
    updateCartDisplay();
    
    // Verify it was saved
    const saved = localStorage.getItem('cart');
    console.log('Verified cart in localStorage:', saved);
}

function updateCartBadge() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(badge => {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}

function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    console.log('Adding to cart:', product);
    console.log('Current cart:', cart);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price),
            img: product.img,
            quantity: 1
        });
    }
    
    console.log('Updated cart:', cart);
    saveCart(cart);
    
    // Ensure localStorage is set
    localStorage.setItem('cart', JSON.stringify(cart));
    
    showToast(product.name + ' added to cart!');
    
    // Open cart drawer
    const cartEl = document.getElementById('cart');
    if (cartEl) {
        cartEl.classList.add('show-cart');
    }
}

function removeFromCart(productId) {
    let cart = getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
        showToast(item.name + ' removed from cart');
    }
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

function updateQuantity(productId, change) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart(cart);
            showToast(item.name + ' quantity: ' + item.quantity);
        }
    }
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return;
    
    const cart = getCart();
    const { totalItems, totalPrice } = calculateTotals();
    
    // Update totals
    const itemsCountEl = document.getElementById('cart-items-count');
    const totalEl = document.getElementById('cart-total');
    
    if (itemsCountEl) itemsCountEl.textContent = totalItems;
    if (totalEl) totalEl.textContent = totalPrice.toLocaleString();
    
    // Show/hide checkout button
    const checkoutSection = document.getElementById('cart-checkout-section');
    if (checkoutSection) {
        checkoutSection.style.display = cart.length > 0 ? 'block' : 'none';
    }
    
    // Render cart items
    if (cart.length === 0) {
        cartContainer.innerHTML = '<div style="text-align: center; padding: 2rem;"><i class="bx bx-shopping-bag" style="font-size: 3rem; color: var(--text-color-light); margin-bottom: 1rem;"></i><p style="color: var(--text-color);">Your cart is empty</p></div>';
        return;
    }
    
    cartContainer.innerHTML = cart.map(item => '<article class="cart__card" data-id="' + item.id + '"><div class="cart__box"><img src="' + item.img + '" alt="' + item.name + '" class="cart__img"></div><div class="cart__details"><h3 class="cart__title">' + item.name + '</h3><span class="cart__price">' + item.price.toLocaleString() + '</span><div class="cart__amount"><div class="cart__amount-content"><span class="cart__amount-box cart__minus" data-id="' + item.id + '"><i class="bx bx-minus"></i></span><span class="cart__amount-number">' + item.quantity + '</span><span class="cart__amount-box cart__plus" data-id="' + item.id + '"><i class="bx bx-plus"></i></span></div><i class="bx bx-trash-alt cart__amount-trash cart__remove" data-id="' + item.id + '"></i></div></div></article>').join('');
    
    // Add event listeners
    document.querySelectorAll('.cart__minus').forEach(btn => {
        btn.addEventListener('click', function() {
            updateQuantity(this.dataset.id, -1);
        });
    });
    
    document.querySelectorAll('.cart__plus').forEach(btn => {
        btn.addEventListener('click', function() {
            updateQuantity(this.dataset.id, 1);
        });
    });
    
    document.querySelectorAll('.cart__remove').forEach(btn => {
        btn.addEventListener('click', function() {
            removeFromCart(this.dataset.id);
        });
    });
}

function calculateTotals() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { totalItems, totalPrice };
}

function setupCart() {
    const cartEl = document.getElementById('cart');
    const cartShopEl = document.getElementById('cart-shop');
    const cartCloseEl = document.getElementById('cart-close');
    
    if (cartShopEl) {
        cartShopEl.addEventListener('click', function() {
            if (cartEl) cartEl.classList.add('show-cart');
        });
    }
    
    if (cartCloseEl) {
        cartCloseEl.addEventListener('click', function() {
            if (cartEl) cartEl.classList.remove('show-cart');
        });
    }
    
    updateCartDisplay();
}

// Toast notification function
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = '<i class="bx bx-check-circle"></i><span>' + message + '</span>';
    toast.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #333; color: #fff; padding: 12px 20px; border-radius: 8px; display: flex; align-items: center; gap: 10px; z-index: 9999; animation: slideIn 0.3s ease; font-family: var(--body-font);';
    
    // Add animation keyframes if not exists
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = '@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } } @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(function() {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(function() {
            toast.remove();
        }, 300);
    }, 3000);
}

function setupAddToCartButtons() {
    const buttons = document.querySelectorAll('[data-id]');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const product = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: this.dataset.price,
                img: this.dataset.img
            };
            addToCart(product);
        });
    });
}

function setupNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            if (navMenu) navMenu.classList.add('show-menu');
        });
    }
    
    if (navClose) {
        navClose.addEventListener('click', function() {
            if (navMenu) navMenu.classList.remove('show-menu');
        });
    }
    
    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) navMenu.classList.remove('show-menu');
        });
    });
}

function setupScrollEffects() {
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY >= 50) {
                header.classList.add('scroll-header');
            } else {
                header.classList.remove('scroll-header');
            }
        }
        
        // Scroll up button
        const scrollUp = document.getElementById('scroll-up');
        if (scrollUp) {
            if (window.scrollY >= 350) {
                scrollUp.classList.add('show-scroll');
            } else {
                scrollUp.classList.remove('show-scroll');
            }
        }
        
        // Active nav links
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const id = section.id;
            const top = section.offsetTop - 100;
            const height = section.offsetHeight;
            const link = document.querySelector('.nav__menu a[href*=' + id + ']');
            
            if (link) {
                if (window.scrollY >= top && window.scrollY < top + height) {
                    link.classList.add('active-link');
                } else {
                    link.classList.remove('active-link');
                }
            }
        });
    });
}

function setupTheme() {
    const themeButton = document.getElementById('theme-button');
    const darkTheme = 'dark-theme';
    const iconTheme = 'bx-sun';
    
    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');
    
    // Apply saved theme
    if (selectedTheme === 'dark') {
        document.body.classList.add(darkTheme);
    }
    if (selectedIcon === 'bx bx-moon' && themeButton) {
        themeButton.classList.remove('bx-moon');
        themeButton.classList.add('bx-sun');
    }
    
    if (themeButton) {
        themeButton.addEventListener('click', function() {
            document.body.classList.toggle(darkTheme);
            this.classList.toggle(iconTheme);
            
            const currentTheme = document.body.classList.contains(darkTheme) ? 'dark' : 'light';
            const currentIcon = this.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun';
            
            localStorage.setItem('selected-theme', currentTheme);
            localStorage.setItem('selected-icon', currentIcon);
        });
    }
}

function initSwipers() {
    if (typeof Swiper !== 'undefined') {
        // Testimonial Swiper
        if (document.querySelector('.testimonial-swiper')) {
            new Swiper(".testimonial-swiper", {
                spaceBetween: 30,
                loop: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });
        }
        
        // New Swiper
        if (document.querySelector('.new-swiper')) {
            new Swiper(".new-swiper", {
                spaceBetween: 24,
                loop: true,
                breakpoints: {
                    576: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                },
            });
        }
    }
}
