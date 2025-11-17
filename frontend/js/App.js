// Header và footer đã được viết trực tiếp trong HTML
document.addEventListener("DOMContentLoaded", function() {
    setupMobileMenu();
    updateCartCount();
});

// Mobile Menu Toggle
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinkItems = navLinks.querySelectorAll('.nav-link');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
        
        // Close menu on window resize if screen becomes larger
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cart') || '{}');
        cartCount.innerText = Object.values(cart).reduce((a, b) => a + b, 0);
    }
}

// Add to cart function
window.addToCart = function(product) {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    cart[product] = (cart[product] || 0) + 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.innerText = Object.values(cart).reduce((a, b) => a + b, 0);
        cartCount.style.background = '#e53935';
        cartCount.style.color = '#fff';
        cartCount.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 300);
    }

    // Toast notification
    const toast = document.createElement('div');
    toast.innerText = 'Đã thêm ' + product + ' vào giỏ hàng!';
    toast.style.position = 'fixed';
    toast.style.bottom = '32px';
    toast.style.right = '32px';
    toast.style.background = '#388e3c';
    toast.style.color = '#fff';
    toast.style.padding = '14px 28px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
    toast.style.fontSize = '1rem';
    toast.style.zIndex = '9999';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s';
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '1'; }, 50);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => { toast.remove(); }, 400);
    }, 1500);
};
