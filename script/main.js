/* =========================================================
   main.js - Universal Functions (Cart, Search, Nav, Theme)
   ========================================================= */

// --- GLOBAL LOAD & SCROLL SETTINGS ---
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // FIX: Restore scroll position ONLY if returning from a single product page 
    // AND there is no hash (#) in the URL (like #about or #brands).
    if (document.referrer.includes('post.html') && !window.location.hash) {
        const savedPos = sessionStorage.getItem('savedScrollPos');
        if (savedPos) {
            // Slight delay ensures dynamically rendered grids are fully painted first
            setTimeout(() => {
                window.scrollTo({ top: parseInt(savedPos), behavior: 'instant' });
            }, 100);
        }
    }
});

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// --- CENTRALIZED SCROLL LOCK MANAGER ---
function updateScrollLock() {
    const isCartOpen = document.getElementById('cartOverlay')?.classList.contains('active');
    const isSearchOpen = document.getElementById('mobileSearchOverlay')?.classList.contains('active');
    const isNavMenuOpen = document.getElementById('nav-links')?.classList.contains('active');

    if (isCartOpen || isSearchOpen || isNavMenuOpen) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }
}

// --- CART LOGIC ---
let cart = JSON.parse(localStorage.getItem('fkcpp_cart')) || [];

function saveCart() { localStorage.setItem('fkcpp_cart', JSON.stringify(cart)); }

// FIX: Ensure priceStr is treated as a string to prevent .replace() errors
function parsePrice(priceStr) { 
    return Number(String(priceStr).replace(/[^0-9.-]+/g, "")); 
}
function formatPrice(num) { return "₱" + num.toLocaleString('en-US'); }

function toggleCart() {
    const overlay = document.getElementById('cartOverlay');
    if(overlay) {
        overlay.classList.toggle('active');
        updateScrollLock(); 
    }
}

function flyToCartAnim(event, productImg) {
    const cartIcon = document.getElementById('cartIconWrapper');
    if (!cartIcon) return; // FIX: Prevent error if cart icon isn't on the page

    let imgElement = null;

    if (event && event.target && event.target.closest('.card')) {
        imgElement = event.target.closest('.card').querySelector('.card-img-wrapper img');
    } else {
        imgElement = document.querySelector('.product-image-container img');
    }

    if (!imgElement) return;

    const startRect = imgElement.getBoundingClientRect();
    const endRect = cartIcon.getBoundingClientRect();

    const clone = document.createElement('img');
    clone.src = productImg;
    clone.classList.add('fly-to-cart');
    clone.style.width = `${startRect.width}px`; clone.style.height = `${startRect.height}px`;
    clone.style.top = `${startRect.top}px`; clone.style.left = `${startRect.left}px`;
    document.body.appendChild(clone);

    void clone.offsetWidth; // Trigger reflow

    clone.style.top = `${endRect.top}px`; clone.style.left = `${endRect.left}px`;
    clone.style.width = '20px'; clone.style.height = '20px';
    clone.style.opacity = '0.2'; clone.style.borderRadius = '50%';

    setTimeout(() => {
        clone.remove();
        cartIcon.classList.add('bump');
        setTimeout(() => cartIcon.classList.remove('bump'), 200);
    }, 700);
}

function addToCart(event, productId) {
    if (typeof productData === 'undefined') {
        console.error("productData is not defined. Make sure your products script is loaded before main.js.");
        return;
    }

    // FIX: Use String() to ensure IDs match even if one is a number and one is a string
    const product = productData.find(p => String(p.id) === String(productId));
    if (!product) {
        console.error("Product not found:", productId);
        return;
    }
    
    const existingItem = cart.find(item => String(item.id) === String(productId));
    if (existingItem) {
        existingItem.quantity += 1; 
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart(); 
    updateCartUI(); 
    flyToCartAnim(event, product.img);
}

function updateQuantity(productId, delta) {
    // FIX: String matching for IDs
    const item = cart.find(i => String(i.id) === String(productId));
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => String(i.id) !== String(productId));
        }
        saveCart(); 
        updateCartUI();
    }
}

function removeFromCart(productId) {
    // FIX: String matching for IDs
    cart = cart.filter(i => String(i.id) !== String(productId));
    saveCart(); 
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cartItemsContainer');
    const totalEl = document.getElementById('cartSubtotalValue');
    const badges = document.querySelectorAll('.cart-badge-text');
    
    if(!container || !totalEl) return; 

    let totalItems = 0; let subtotal = 0;

    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-cart-msg">Your bag is currently empty.</div>`;
    } else {
        // FIX: Added quotes around '${item.id}' in onclick functions to prevent variable errors
        container.innerHTML = cart.map(item => {
            const itemPrice = parsePrice(item.price);
            subtotal += itemPrice * item.quantity; totalItems += item.quantity;
            return `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">${item.price}</div>
                        <div class="cart-item-actions">
                            <div class="qty-controls">
                                <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                                <span class="qty-val">${item.quantity}</span>
                                <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                            </div>
                            <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    totalEl.textContent = formatPrice(subtotal);
    badges.forEach(badge => badge.textContent = totalItems);
}

const cartOverlayEl = document.getElementById('cartOverlay');
if(cartOverlayEl) {
    cartOverlayEl.addEventListener('click', function(e) {
        if (e.target === this) toggleCart();
    });
}

// --- SEARCH ENGINE LOGIC ---
const desktopInput = document.getElementById('desktopSearchInput');
const desktopResults = document.getElementById('desktopSearchResults');
const clearDesktopBtn = document.getElementById('clearDesktopSearch');
const openMobileBtn = document.getElementById('openMobileSearch');
const closeMobileBtn = document.getElementById('closeMobileSearch');
const clearMobileBtn = document.getElementById('clearMobileSearch');
const mobileOverlay = document.getElementById('mobileSearchOverlay');
const mobileInput = document.getElementById('mobileSearchInput');
const mobileResults = document.getElementById('mobileSearchResults');

function generateResultsHTML(results, query) {
    if (results.length === 0) return `<div style="padding: 1.5rem; text-align: center; color: var(--text-muted);">No items found for "${query}".</div>`;
    
    const limit = 5;
    const topResults = results.slice(0, limit);

    let html = topResults.map(item => `
        <div class="search-item" onclick="sessionStorage.setItem('savedScrollPos', window.scrollY); window.location.href='post.html?id=${item.id}'">
            <img src="${item.img}" alt="${item.name}">
            <div class="search-item-info">
                <div class="search-item-brand">${item.category} | ${item.brand}</div>
                <div class="search-item-name">${item.name}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${item.price}</div>
            </div>
        </div>
    `).join('');

    html += `
        <div class="search-see-all" onclick="window.location.href='shop-all.html'">
            <span>View Full Archive</span>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>
        </div>
    `;

    return html;
}

function handleSearch(query, container, isDesktop) {
    if (typeof productData === 'undefined') return;

    if (query === "") {
        container.innerHTML = "";
        if (isDesktop) container.classList.remove('active');
        return;
    }
    const filtered = productData.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query)
    );
    container.innerHTML = generateResultsHTML(filtered, query);
    if (isDesktop) container.classList.add('active');
}

if(desktopInput) {
    desktopInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        clearDesktopBtn.style.display = query.length > 0 ? 'flex' : 'none';
        handleSearch(query, desktopResults, true);
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-wrapper') && desktopResults) desktopResults.classList.remove('active');
    });
    clearDesktopBtn.addEventListener('click', () => {
        desktopInput.value = ""; desktopResults.innerHTML = "";
        desktopResults.classList.remove('active'); clearDesktopBtn.style.display = 'none';
    });
}

if(openMobileBtn) {
    openMobileBtn.addEventListener('click', () => {
        mobileOverlay.classList.add('active');
        updateScrollLock(); 
        setTimeout(() => mobileInput.focus(), 300);
    });
    closeMobileBtn.addEventListener('click', () => {
        mobileOverlay.classList.remove('active'); 
        updateScrollLock(); 
    });
    mobileInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        clearMobileBtn.style.display = query.length > 0 ? 'flex' : 'none';
        handleSearch(query, mobileResults, false);
    });
    clearMobileBtn.addEventListener('click', () => {
        mobileInput.value = ""; mobileResults.innerHTML = "";
        clearMobileBtn.style.display = 'none'; mobileInput.focus();
    });
}

// --- MOBILE MENU ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

function closeMobileMenu() {
    if(hamburger) hamburger.classList.remove('active');
    if(navLinks) navLinks.classList.remove('active');
    updateScrollLock(); 
}

if(hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        updateScrollLock(); 
    });
}

const mobileJoinBtn = document.querySelector('.mobile-join-btn');
if(mobileJoinBtn) {
    mobileJoinBtn.addEventListener('click', closeMobileMenu);
}

// --- GLOBAL SCROLL NAV & REVEAL ANIMATIONS ---
const mainNav = document.getElementById('mainNav');
const reveals = document.querySelectorAll('.reveal');

function handleGlobalScroll() {
    if (window.scrollY > 50) {
        if(mainNav) mainNav.classList.add('scrolled');
    } else {
        if(mainNav) mainNav.classList.remove('scrolled');
    }

    reveals.forEach(reveal => {
        if(reveal.getBoundingClientRect().top < window.innerHeight - 100) {
            reveal.classList.add('active');
        }
    });
}
window.addEventListener('scroll', handleGlobalScroll);
handleGlobalScroll(); 

// --- DARK MODE ---
const desktopThemeCheck = document.getElementById('desktopCheckbox');
const mobileThemeCheck = document.getElementById('mobileCheckbox');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if(desktopThemeCheck) desktopThemeCheck.checked = true;
    if(mobileThemeCheck) mobileThemeCheck.checked = true;
}

function toggleTheme(e) {
    const isChecked = e.target.checked;
    document.body.classList.toggle('dark-mode', isChecked);
    localStorage.setItem('theme', isChecked ? 'dark' : 'light');
    if(desktopThemeCheck) desktopThemeCheck.checked = isChecked;
    if(mobileThemeCheck) mobileThemeCheck.checked = isChecked;
}

if(desktopThemeCheck) desktopThemeCheck.addEventListener('change', toggleTheme);
if(mobileThemeCheck) mobileThemeCheck.addEventListener('change', toggleTheme);

// Initialize Cart UI on load
updateCartUI();