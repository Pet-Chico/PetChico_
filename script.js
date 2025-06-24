// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initProductFiltering();
});

// Toggle mobile menu
function toggleMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
    }
}

// Filter products by category
function filterProducts(category, buttonElement) {
    // Update active button
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (buttonElement) {
        buttonElement.classList.add('active');
    }
    
    // Show/hide products based on category
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        if (category === 'todos') {
            card.style.display = 'block';
        } else {
            const cardCategory = card.getAttribute('data-category');
            if (cardCategory === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Initialize product filtering
function initProductFiltering() {
    // Show all products by default
    filterProducts('todos', document.querySelector('.category-btn.active'));
}

// Format price to Brazilian currency format
function formatPrice(price) {
    return price.toFixed(2).replace('.', ',');
}

// Send WhatsApp message for product purchase
function sendWhatsApp(productName, price) {
    const message = `Olá! Tenho interesse no produto: ${productName} - R$ ${formatPrice(price)}`;
    const whatsappUrl = `https://wa.me/5511983057779?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

// Open general WhatsApp contact
function openWhatsApp() {
    const message = "Olá! Gostaria de saber mais sobre os produtos da PetChico.";
    const whatsappUrl = `https://wa.me/5511983057779?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

// Initialize smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const mobileNav = document.getElementById('mobileNav');
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
        });
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (mobileNav && mobileNav.classList.contains('active')) {
        if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
            mobileNav.classList.remove('active');
        }
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    const mobileNav = document.getElementById('mobileNav');
    if (window.innerWidth > 768 && mobileNav) {
        mobileNav.classList.remove('active');
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll-based header background change (optional enhancement)
const header = document.querySelector('.header');
const handleScroll = debounce(() => {
    if (window.scrollY > 100) {
        header.style.backdropFilter = 'blur(10px)';
        header.style.backgroundColor = 'rgba(255, 254, 124, 0.95)';
    } else {
        header.style.backdropFilter = 'none';
        header.style.backgroundColor = '';
    }
}, 10);

window.addEventListener('scroll', handleScroll);

// Error handling for failed image loads
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        // Set a placeholder image or hide the image
        e.target.style.display = 'none';
        // Or you can set a placeholder image:
        // e.target.src = 'images/placeholder.jpg';
        e.target.alt = 'Imagem não disponível';
    }
}, true);

// Console log for debugging (remove in production)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('PetChico Website loaded successfully!');
}