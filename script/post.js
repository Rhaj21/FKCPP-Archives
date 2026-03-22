/* =========================================================
   post.js - Single Product Page Functions
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const container = document.getElementById('product-container');

    const product = productData.find(p => p.id === productId);

    if (product) {
        document.title = `${product.name} | FKCPP Archives`;
        container.innerHTML = `
            <a href="#" onclick="goBackClean(event)" class="back-link">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                Back to Archives
            </a>
            
            <div class="product-layout">
                <div class="product-image-container">
                    <img src="${product.img}" alt="${product.name}">
                </div>
                
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h1 class="product-title">${product.name}</h1>
                    <div class="product-price">₱${product.price}</div>
                    
                    <div class="product-specs">
                        <div class="spec-item">
                            <span class="spec-label">Brand</span>
                            <span class="spec-value">${product.brand}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Size</span>
                            <span class="spec-value">${product.size}</span>
                        </div>
                        <div class="spec-item" style="grid-column: span 2;">
                            <span class="spec-label">Condition</span>
                            <span class="spec-value">${product.condition}</span>
                        </div>
                    </div>
                    
                    <p class="product-description">${product.desc}</p>
                    
                    <button class="btn-large" onclick="addToCart(event, ${product.id})">
                        Add to Bag
                    </button>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="error-state">
                <h2>Item Not Found</h2>
                <p style="color: var(--text-muted); margin-bottom: 2rem;">This item may have been removed or sold.</p>
                <a href="index.html">Return to Shop</a>
            </div>
        `;
    }
});

function goBackClean(event) {
    event.preventDefault();

    const referrer = document.referrer;

    // If user came from shop-all.html, go back there
    if (referrer && referrer.includes("shop-all.html")) {
        window.location.href = "shop-all.html";
    } 
    // NEW: Removed #shop so it doesn't fight with the exact scroll restoration logic
    else {
        window.location.href = "index.html";
    }
}