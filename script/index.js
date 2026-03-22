/* =========================================================
   index.js - Homepage Specific Functions
   ========================================================= */

// --- RENDER 4-ITEM HOMEPAGE GRID ---
const grid = document.getElementById('productGrid');
if (grid) {
    function renderHomeGrid() {
        grid.innerHTML = ''; 
        const displayData = productData.slice(0, 4); 
        displayData.forEach(item => {
            const card = document.createElement('div');
            card.className = "card";
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
    renderHomeGrid();
}

// --- SCROLLSPY ---
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a.nav-item');

function handleScrollSpy() {
    let current = "";
    sections.forEach(section => {
        if (window.scrollY >= (section.offsetTop - 300)) {
            current = section.getAttribute('id');
        }
    });

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        current = "about";
    }

    navItems.forEach(item => {
        item.classList.remove('active');
        if (current && item.getAttribute('href').includes(`#${current}`)) {
            item.classList.add('active');
        }
    });
}
window.addEventListener('scroll', handleScrollSpy);

window.addEventListener('load', () => {
    // NEW: Only trigger smooth hash scroll if we are NOT restoring position from post.html
    if (window.location.hash && !document.referrer.includes('post.html')) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
        }
    }
});

navItems.forEach(link => { 
    link.addEventListener('click', function(e) {
        const targetHref = this.getAttribute('href');
        const hashIndex = targetHref.indexOf('#');
        if(hashIndex !== -1) {
            e.preventDefault();
            const hash = targetHref.substring(hashIndex);
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                history.pushState(null, null, hash); 
            }
        }
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        if(typeof closeMobileMenu === 'function') closeMobileMenu(); 
    }); 
});

// --- HERO CAROUSEL ---
const track = document.getElementById('carouselTrack');
const dotsContainer = document.getElementById('dotsContainer');
const prevBtn = document.getElementById('prevSlideBtn');
const nextBtn = document.getElementById('nextSlideBtn');
let slideIndex = 0; let slideInterval;

function updateCarousel() {
    if(!track) return;
    track.style.transform = `translateX(-${slideIndex * 100}%)`;
    Array.from(dotsContainer.children).forEach(d => d.classList.remove('active'));
    if(dotsContainer.children[slideIndex]) dotsContainer.children[slideIndex].classList.add('active');
}

function nextSlide() { 
    if(!track) return;
    slideIndex = (slideIndex + 1) % track.children.length; 
    updateCarousel(); 
}

function prevSlide() { 
    if(!track) return;
    slideIndex = (slideIndex - 1 + track.children.length) % track.children.length; 
    updateCarousel(); 
}

function resetInterval() { 
    clearInterval(slideInterval); 
    slideInterval = setInterval(nextSlide, 6000); 
}

if (track && dotsContainer) {
    Array.from(track.children).forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if(index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => { slideIndex = index; updateCarousel(); resetInterval(); });
        dotsContainer.appendChild(dot);
    });
    if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
    if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
    slideInterval = setInterval(nextSlide, 6000);
}