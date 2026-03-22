/* =========================================================
   shop-all.js - Full Shop & Filtering Functions
   ========================================================= */

const grid = document.getElementById('productGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderFullGrid(filterCategory) {
    if(!grid) return;
    grid.innerHTML = ''; 
    
    const filteredData = filterCategory === 'All' ? productData : productData.filter(item => item.category === filterCategory);

    filteredData.forEach(item => {
        const card = document.createElement('div');
        card.className = "card reveal active"; 
        
        // NEW: Save scroll position before navigating
        card.onclick = () => { 
            sessionStorage.setItem('savedScrollPos', window.scrollY);
            window.location.href = `post.html?id=${item.id}`; 
        };

        card.innerHTML = `
            <div class="price-tag">₱${item.price}</div>
            <div class="card-img-wrapper"><img src="${item.img}" alt="${item.name}"></div>
            <div class="card-content">
                <span class="card-category">${item.category}</span>
                <h3 class="card-title">${item.name}</h3>
                <div class="card-link-row">
                    <button class="add-to-bag-btn" onclick="event.stopPropagation(); addToCart(event, ${item.id})">Add to Bag</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Initial render
renderFullGrid('All');

// Filter button logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderFullGrid(e.target.dataset.filter);
    });
});

// Close mobile menu on regular nav clicks for shop-all page
const navItems = document.querySelectorAll('.nav-links a.nav-item');
navItems.forEach(link => { 
    link.addEventListener('click', function() {
        if(typeof closeMobileMenu === 'function') closeMobileMenu(); 
    }); 
});