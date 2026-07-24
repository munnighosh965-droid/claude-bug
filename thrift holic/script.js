// THRIFT HOLIC - Premium Spatial E-Commerce JavaScript

// ===== STATE MANAGEMENT =====
const state = {
    cart: [],
    wishlist: [],
    products: [],
    videoEntered: false,
    videoPlaying: false,
    videoMuted: true
};

// ===== VIDEO HERO FUNCTIONALITY =====
const heroVideo = document.getElementById('heroVideo');
const heroInterface = document.getElementById('heroInterface');
const videoProgressBar = document.getElementById('videoProgressBar');
const videoRippleContainer = document.getElementById('videoRippleContainer');
const productHotspotsContainer = document.getElementById('productHotspots');

// FORCE video to autoplay immediately
if (heroVideo) {
    console.log('🎬 Initializing video autoplay...');

    // Set video properties
    heroVideo.muted = true;
    heroVideo.loop = true;
    heroVideo.autoplay = true;
    heroVideo.playsInline = true;

    // Force load
    heroVideo.load();

    // Attempt 1: Immediate play
    setTimeout(() => {
        heroVideo.play()
            .then(() => {
                console.log('✅ Video autoplaying successfully!');
                state.videoPlaying = true;
                state.videoEntered = true;
                initializeHotspots();
            })
            .catch(err => {
                console.log('⚠️ Attempt 1 failed:', err.message);

                // Attempt 2: Try again after short delay
                setTimeout(() => {
                    heroVideo.play()
                        .then(() => {
                            console.log('✅ Video playing (attempt 2)');
                            state.videoPlaying = true;
                            state.videoEntered = true;
                            initializeHotspots();
                        })
                        .catch(err2 => {
                            console.log('⚠️ Attempt 2 failed:', err2.message);

                            // Attempt 3: Wait for any user interaction
                            console.log('💡 Click anywhere on the page to start video');

                            const startVideo = () => {
                                heroVideo.play()
                                    .then(() => {
                                        console.log('✅ Video started after user interaction');
                                        state.videoPlaying = true;
                                        state.videoEntered = true;
                                        initializeHotspots();

                                        // Remove listeners
                                        document.removeEventListener('click', startVideo);
                                        document.removeEventListener('touchstart', startVideo);
                                        document.removeEventListener('keydown', startVideo);
                                    })
                                    .catch(err3 => {
                                        console.error('❌ Failed to play video:', err3);
                                    });
                            };

                            // Listen for ANY user interaction
                            document.addEventListener('click', startVideo, { once: true });
                            document.addEventListener('touchstart', startVideo, { once: true });
                            document.addEventListener('keydown', startVideo, { once: true });
                        });
                }, 500);
            });
    }, 100);

    // Also try on video canplay event
    heroVideo.addEventListener('canplay', () => {
        if (heroVideo.paused && !state.videoPlaying) {
            console.log('🎬 Video can play - attempting autoplay...');
            heroVideo.play().catch(err => {
                console.log('Autoplay still blocked');
            });
        }
    });

    // Try on canplaythrough event
    heroVideo.addEventListener('canplaythrough', () => {
        if (heroVideo.paused && !state.videoPlaying) {
            console.log('🎬 Video fully loaded - attempting autoplay...');
            heroVideo.play().catch(err => {
                console.log('Autoplay still blocked');
            });
        }
    });
}

// Video Progress Bar
if (heroVideo && videoProgressBar) {
    heroVideo.addEventListener('timeupdate', () => {
        const progress = (heroVideo.currentTime / heroVideo.duration) * 100;
        videoProgressBar.style.width = progress + '%';
    });
}

// Video Click Ripple Effect
if (heroVideo && videoRippleContainer) {
    let lastClickTime = 0;

    heroVideo.addEventListener('click', (e) => {
        const currentTime = Date.now();
        const timeDiff = currentTime - lastClickTime;

        // Double click detection
        if (timeDiff < 300) {
            // Double click - replay
            heroVideo.currentTime = 0;
            heroVideo.play();
            state.videoPlaying = true;
            updatePlayPauseIcon();
        } else {
            // Single click - create ripple
            createRipple(e.clientX, e.clientY);
        }

        lastClickTime = currentTime;
    });
}

function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'video-ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    videoRippleContainer.appendChild(ripple);

    setTimeout(() => ripple.remove(), 1000);
}

// Initialize Product Hotspots
function initializeHotspots() {
    if (!productHotspotsContainer) return;

    // Sample hotspots synchronized with video timing
    const hotspots = [
        {
            time: 3,
            position: { top: '40%', left: '60%' },
            product: state.products[0]
        },
        {
            time: 8,
            position: { top: '50%', left: '35%' },
            product: state.products[1]
        },
        {
            time: 15,
            position: { top: '45%', left: '70%' },
            product: state.products[3]
        }
    ];

    let activeHotspots = [];

    heroVideo.addEventListener('timeupdate', () => {
        const currentTime = heroVideo.currentTime;

        hotspots.forEach((hotspot, index) => {
            if (currentTime >= hotspot.time && currentTime < hotspot.time + 5) {
                if (!activeHotspots.includes(index)) {
                    createHotspot(hotspot);
                    activeHotspots.push(index);
                }
            } else if (currentTime >= hotspot.time + 5) {
                const existingHotspot = document.getElementById(`hotspot-${index}`);
                if (existingHotspot) {
                    existingHotspot.remove();
                    activeHotspots = activeHotspots.filter(i => i !== index);
                }
            }
        });
    });
}

function createHotspot(hotspotData) {
    const hotspot = document.createElement('div');
    hotspot.className = 'product-hotspot';
    hotspot.id = `hotspot-${Date.now()}`;
    hotspot.style.top = hotspotData.position.top;
    hotspot.style.left = hotspotData.position.left;

    hotspot.innerHTML = `
        <div class="hotspot-indicator">
            <svg viewBox="0 0 24 24" fill="none">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
        </div>
        <div class="hotspot-label">SHOP THE LOOK</div>
    `;

    hotspot.addEventListener('click', () => {
        openHotspotPreview(hotspotData.product);
    });

    productHotspotsContainer.appendChild(hotspot);
}

function openHotspotPreview(product) {
    // Pause video gently
    heroVideo.pause();
    state.videoPlaying = false;
    updatePlayPauseIcon();

    // Create preview
    const preview = document.createElement('div');
    preview.className = 'hotspot-preview';
    preview.innerHTML = `
        <img src="${product.images[0]}" alt="${product.name}" class="hotspot-preview-image">
        <div class="hotspot-preview-name">${product.name}</div>
        <div class="hotspot-preview-meta">
            <span class="product-size">SIZE ${product.size}</span>
            <span class="product-condition">${product.condition.toUpperCase()}</span>
        </div>
        <div class="hotspot-preview-price">$${product.price}</div>
        <div class="hotspot-preview-actions">
            <button class="btn btn-primary" onclick="addToCart(${product.id}); closeHotspotPreview();">ADD TO BAG</button>
            <button class="btn btn-secondary" onclick="openQuickView(${product.id}); closeHotspotPreview();">VIEW ITEM</button>
        </div>
    `;

    document.body.appendChild(preview);
    setTimeout(() => preview.classList.add('active'), 10);

    // Close on click outside
    preview.addEventListener('click', (e) => {
        if (e.target === preview) {
            closeHotspotPreview();
        }
    });
}

function closeHotspotPreview() {
    const preview = document.querySelector('.hotspot-preview');
    if (preview) {
        preview.classList.remove('active');
        setTimeout(() => preview.remove(), 400);
    }

    // Resume video
    heroVideo.play();
    state.videoPlaying = true;
    updatePlayPauseIcon();
}

// Mouse Parallax Effect on Hero Interface
if (heroInterface) {
    document.addEventListener('mousemove', (e) => {
        if (!state.videoEntered) return;

        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;

        const heroTitle = document.querySelector('.hero-title-video');
        const heroSubtitle = document.querySelector('.hero-subtitle-video');

        if (heroTitle) {
            heroTitle.style.transform = `translate(${-xPos * 0.5}px, ${-yPos * 0.5}px)`;
        }

        if (heroSubtitle) {
            heroSubtitle.style.transform = `translate(${-xPos * 0.3}px, ${-yPos * 0.3}px)`;
        }
    });
}

// Scroll Interaction - Scale Video and Transition
let heroScrollTicking = false;

window.addEventListener('scroll', () => {
    if (!heroScrollTicking && state.videoEntered) {
        window.requestAnimationFrame(() => {
            const hero = document.querySelector('.hero.video-hero');
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;

            if (scrolled < heroHeight) {
                const scrollProgress = scrolled / heroHeight;
                const scale = 1 + (scrollProgress * 0.08);
                const brightness = 1 - (scrollProgress * 0.3);

                heroVideo.style.transform = `translate(-50%, -50%) scale(${scale})`;
                heroVideo.style.filter = `brightness(${brightness})`;

                // Parallax title
                const heroTitle = document.querySelector('.hero-title-video');
                const heroSubtitle = document.querySelector('.hero-subtitle-video');

                if (heroTitle) {
                    heroTitle.style.transform = `translateY(${-scrollProgress * 50}px)`;
                    heroTitle.style.opacity = 1 - scrollProgress;
                }

                if (heroSubtitle) {
                    heroSubtitle.style.transform = `translateY(${-scrollProgress * 30}px)`;
                    heroSubtitle.style.opacity = 1 - scrollProgress;
                }

                // Pause video when scrolled away
                if (scrollProgress > 0.8 && state.videoPlaying) {
                    heroVideo.pause();
                    state.videoPlaying = false;
                }
            } else {
                // Resume video when returning to hero
                if (!state.videoPlaying && scrolled < heroHeight * 0.5) {
                    heroVideo.play();
                    state.videoPlaying = true;
                }
            }

            heroScrollTicking = false;
        });

        heroScrollTicking = true;
    }
});

// Pause video when tab is inactive
document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.videoPlaying) {
        heroVideo.pause();
    } else if (!document.hidden && state.videoEntered) {
        heroVideo.play();
    }
});

// Respect prefers-reduced-motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroVideo.pause();
    const poster = heroVideo.getAttribute('poster');
    if (poster) {
        heroVideo.style.backgroundImage = `url(${poster})`;
    }
}

// Detect slow connection and use poster
if (navigator.connection) {
    const connection = navigator.connection;
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        heroVideo.removeAttribute('autoplay');
        heroVideo.poster = heroVideo.getAttribute('poster');
    }
}

// Hero Cart Button
const heroCartBtn = document.getElementById('heroCartBtn');
const heroCartCount = document.getElementById('heroCartCount');

if (heroCartBtn) {
    heroCartBtn.addEventListener('click', () => {
        document.getElementById('cartDrawer').classList.add('active');
    });
}

// Update hero cart count
function updateHeroCartCount() {
    if (heroCartCount) {
        heroCartCount.textContent = state.cart.length;
    }
}

// ===== SAMPLE PRODUCTS DATA =====
const sampleProducts = [
    {
        id: 1,
        name: 'VINTAGE LEVI\'S DENIM JACKET',
        category: 'Jackets',
        price: 68,
        size: 'L',
        condition: 'Excellent',
        era: '1990s',
        images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600', 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600'],
        description: 'Classic Levi\'s trucker jacket from the 90s. Perfect fading, all original hardware. A true vintage staple.',
        fabric: '100% Cotton Denim',
        fit: 'Regular Fit'
    },
    {
        id: 2,
        name: 'OVERSIZED BAND TEE',
        category: 'Oversized T-Shirts',
        price: 32,
        size: 'XL',
        condition: 'Good',
        era: '2000s',
        images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600', 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600'],
        description: 'Authentic vintage band tee with classic graphics. Soft, worn-in fabric that only gets better with time.',
        fabric: '100% Cotton',
        fit: 'Oversized Fit'
    },
    {
        id: 3,
        name: 'VINTAGE WINDBREAKER',
        category: 'Jackets',
        price: 45,
        size: 'M',
        condition: 'Very Good',
        era: '1990s',
        images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600'],
        description: 'Retro windbreaker with bold colorblocking. Lightweight, packable, and perfect for layering.',
        fabric: 'Nylon Shell',
        fit: 'Athletic Fit'
    },
    {
        id: 4,
        name: 'LEATHER BOMBER JACKET',
        category: 'Jackets',
        price: 125,
        size: 'L',
        condition: 'Excellent',
        era: '1980s',
        images: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600', 'https://images.unsplash.com/photo-1520367745676-56196527d0b7?w=600'],
        description: 'Genuine leather bomber from the 80s. Rich patina, fully functional zippers, quilted lining.',
        fabric: 'Genuine Leather',
        fit: 'Oversized Fit'
    },
    {
        id: 5,
        name: 'VINTAGE FLANNEL SHIRT',
        category: 'Vintage Shirts',
        price: 38,
        size: 'L',
        condition: 'Excellent',
        era: '1990s',
        images: ['https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600', 'https://images.unsplash.com/photo-1598032895397-e41b0c9ea026?w=600'],
        description: 'Classic 90s flannel in perfect condition. Heavy-duty cotton that gets softer with every wear.',
        fabric: '100% Cotton Flannel',
        fit: 'Regular Fit'
    },
    {
        id: 6,
        name: 'VINTAGE CARGO PANTS',
        category: 'Bottoms',
        price: 52,
        size: '32',
        condition: 'Very Good',
        era: '2000s',
        images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600', 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600'],
        description: 'Y2K cargo pants with multiple pockets. Durable ripstop fabric, adjustable waist.',
        fabric: 'Cotton Ripstop',
        fit: 'Relaxed Fit'
    }
];

state.products = sampleProducts;

// ===== LOADER =====
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const counter = document.getElementById('loaderCounter');
    let count = 0;

    const interval = setInterval(() => {
        count += Math.floor(Math.random() * 15) + 5;
        if (count >= 100) {
            count = 100;
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 600);
            }, 500);
        }
        counter.textContent = count;
    }, 100);
});

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('customCursor');
const cursorText = cursor.querySelector('.cursor-text');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Cursor hover effects
document.querySelectorAll('a, button, .product-card, .category-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        if (el.classList.contains('product-card')) {
            cursorText.textContent = 'VIEW';
        } else if (el.classList.contains('category-item')) {
            cursorText.textContent = 'EXPLORE';
        } else if (el.tagName === 'BUTTON') {
            cursorText.textContent = 'CLICK';
        }
    });

    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorText.textContent = '';
    });
});

// ===== NAVIGATION =====
const nav = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ===== HERO 3D EFFECT =====
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');
const floatingLabels = document.querySelectorAll('.floating-label');

if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;

        floatingLabels.forEach((label, index) => {
            const depth = parseFloat(label.dataset.depth) || 0.5;
            label.style.transform = `translate(${xPos * depth}px, ${yPos * depth}px)`;
        });
    });
}

// ===== PRODUCTS RENDERING =====
function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}">
                ${product.images[1] ? `<img class="product-image-alt" src="${product.images[1]}" alt="${product.name}">` : ''}
                <button class="product-wishlist" data-product-id="${product.id}" aria-label="Add to wishlist">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 17.5L2 9.5C0.5 8 0.5 5.5 2 4C3.5 2.5 6 2.5 7.5 4L10 6.5L12.5 4C14 2.5 16.5 2.5 18 4C19.5 5.5 19.5 8 18 9.5L10 17.5Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </button>
                <div class="product-badge">ONLY ONE AVAILABLE</div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.toUpperCase()}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-meta">
                    <span class="product-size">SIZE ${product.size}</span>
                    <span class="product-condition ${product.condition.toLowerCase().replace(' ', '-')}">${product.condition.toUpperCase()}</span>
                </div>
                <div class="product-price">$${product.price}</div>
                <div class="product-actions">
                    <button class="quick-add" data-product-id="${product.id}">QUICK ADD</button>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners
    container.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                const productId = parseInt(card.dataset.productId);
                openQuickView(productId);
            }
        });
    });

    container.querySelectorAll('.product-wishlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.productId);
            toggleWishlist(productId);
            btn.classList.toggle('active');
        });
    });

    container.querySelectorAll('.quick-add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.productId);
            addToCart(productId);
        });
    });
}

// Render initial products
renderProducts(state.products.slice(0, 6), 'newDropGrid');

// ===== CATEGORY HOVER EFFECTS =====
const categories = document.querySelectorAll('.category-item');
categories.forEach(category => {
    const preview = category.querySelector('.category-preview');

    category.addEventListener('mouseenter', () => {
        // Set a sample image for the category
        const categoryName = category.dataset.category;
        const categoryImages = {
            'oversized-tees': 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400',
            'vintage-shirts': 'https://images.unsplash.com/photo-1598032895397-e41b0c9ea026?w=400',
            'hoodies': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
            'jackets': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
            'denim': 'https://images.unsplash.com/photo-1582552938357-32b906d8e6a0?w=400',
            'bottoms': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400',
            'accessories': 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400'
        };

        if (categoryImages[categoryName]) {
            preview.style.backgroundImage = `url('${categoryImages[categoryName]}')`;
        }
    });

    category.addEventListener('click', () => {
        // Filter products by category
        const categoryName = category.querySelector('h3').textContent;
        window.location.hash = 'new-drop';
        setTimeout(() => {
            renderProducts(
                state.products.filter(p => p.category === categoryName),
                'newDropGrid'
            );
        }, 300);
    });
});

// ===== PRODUCT ORBIT =====
const orbitTrack = document.getElementById('orbitTrack');
const orbitPrev = document.querySelector('.orbit-prev');
const orbitNext = document.querySelector('.orbit-next');

let orbitAngle = 0;
let orbitItems = [];

function initOrbit() {
    if (!orbitTrack) return;

    const orbitProducts = state.products.slice(0, 8);
    const radius = 250;
    const angleStep = (Math.PI * 2) / orbitProducts.length;

    orbitProducts.forEach((product, index) => {
        const angle = angleStep * index;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const item = document.createElement('div');
        item.className = 'orbit-item';
        item.style.transform = `translate(${x}px, ${y}px)`;
        item.innerHTML = `<img src="${product.images[0]}" alt="${product.name}">`;
        item.addEventListener('click', () => openQuickView(product.id));

        orbitTrack.appendChild(item);
        orbitItems.push({ element: item, angle: angle, product: product });
    });
}

function rotateOrbit(direction) {
    const angleStep = (Math.PI * 2) / orbitItems.length;
    orbitAngle += direction * angleStep;

    const radius = 250;
    orbitItems.forEach((item, index) => {
        const angle = item.angle + orbitAngle;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const scale = 0.8 + (Math.sin(angle) + 1) * 0.2;
        const zIndex = Math.floor((Math.sin(angle) + 1) * 10);

        item.element.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        item.element.style.zIndex = zIndex;
    });
}

if (orbitPrev) orbitPrev.addEventListener('click', () => rotateOrbit(-1));
if (orbitNext) orbitNext.addEventListener('click', () => rotateOrbit(1));

initOrbit();

// Auto-rotate orbit
setInterval(() => {
    rotateOrbit(0.01);
}, 50);

// ===== FEATURED ARCHIVE SCROLL =====
if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);

    const featuredItems = document.querySelectorAll('.featured-item');
    featuredItems.forEach((item, index) => {
        const color = item.dataset.color;

        ScrollTrigger.create({
            trigger: item,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => {
                item.style.backgroundColor = color;
            },
            onLeaveBack: () => {
                item.style.backgroundColor = '';
            }
        });

        gsap.from(item.querySelector('.featured-image'), {
            scrollTrigger: {
                trigger: item,
                start: 'top center',
                end: 'center center',
                scrub: 1
            },
            scale: 0.8,
            opacity: 0
        });

        gsap.from(item.querySelectorAll('.featured-details > *'), {
            scrollTrigger: {
                trigger: item,
                start: 'top center',
                end: 'center center',
                scrub: 1
            },
            x: 100,
            opacity: 0,
            stagger: 0.1
        });
    });
}

// ===== LOOKBOOK HORIZONTAL SCROLL =====
const lookbookContainer = document.querySelector('.lookbook-scroll-container');
if (lookbookContainer) {
    lookbookContainer.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            lookbookContainer.scrollLeft += e.deltaY;
        }
    }, { passive: false });
}

// ===== SUSTAINABILITY COUNTER ANIMATION =====
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateCounter = (element) => {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// ===== CART FUNCTIONALITY =====
const cartBtn = document.getElementById('cartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartFooter = document.getElementById('cartFooter');
const cartTotal = document.getElementById('cartTotal');

function addToCart(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    // Check if already in cart
    const existingItem = state.cart.find(item => item.id === productId);
    if (existingItem) {
        alert('This item is already in your bag!');
        return;
    }

    state.cart.push({ ...product, quantity: 1 });
    updateCart();

    // Show notification
    showNotification(`${product.name} added to bag!`);
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    cartCount.textContent = state.cart.length;
    updateHeroCartCount(); // Update hero cart count too

    if (state.cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <path d="M15 18V15C15 7.5 19.5 3 30 3C40.5 3 45 7.5 45 15V18M6 18H54L51 57H9L6 18Z" stroke="currentColor" stroke-width="2"/>
                </svg>
                <p>Your bag is empty</p>
                <a href="#new-drop" class="btn btn-primary">START SHOPPING</a>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = state.cart.map(item => `
            <div class="cart-item">
                <img src="${item.images[0]}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-meta">Size ${item.size} • ${item.condition}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <button class="cart-item-remove" data-product-id="${item.id}">Remove</button>
                </div>
            </div>
        `).join('');

        const total = state.cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `$${total}`;
        cartFooter.style.display = 'block';

        // Add remove listeners
        cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const productId = parseInt(btn.dataset.productId);
                removeFromCart(productId);
            });
        });
    }
}

cartBtn.addEventListener('click', () => {
    cartDrawer.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartDrawer.classList.remove('active');
});

// ===== WISHLIST FUNCTIONALITY =====
const wishlistBtn = document.getElementById('wishlistBtn');
const wishlistDrawer = document.getElementById('wishlistDrawer');
const closeWishlist = document.getElementById('closeWishlist');
const wishlistCount = document.getElementById('wishlistCount');
const wishlistItems = document.getElementById('wishlistItems');

function toggleWishlist(productId) {
    const index = state.wishlist.indexOf(productId);

    if (index === -1) {
        state.wishlist.push(productId);
        showNotification('Added to wishlist!');
    } else {
        state.wishlist.splice(index, 1);
        showNotification('Removed from wishlist');
    }

    updateWishlist();
}

function updateWishlist() {
    wishlistCount.textContent = state.wishlist.length;

    if (state.wishlist.length === 0) {
        wishlistItems.innerHTML = `
            <div class="empty-state">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <path d="M30 52.5L6 28.5C1.5 24 1.5 16.5 6 12C10.5 7.5 18 7.5 22.5 12L30 19.5L37.5 12C42 7.5 49.5 7.5 54 12C58.5 16.5 58.5 24 54 28.5L30 52.5Z" stroke="currentColor" stroke-width="2"/>
                </svg>
                <p>No favorites yet</p>
                <a href="#new-drop" class="btn btn-primary">EXPLORE PIECES</a>
            </div>
        `;
    } else {
        const wishlistProducts = state.products.filter(p => state.wishlist.includes(p.id));
        renderProducts(wishlistProducts, 'wishlistItems');
    }
}

wishlistBtn.addEventListener('click', () => {
    wishlistDrawer.classList.add('active');
});

closeWishlist.addEventListener('click', () => {
    wishlistDrawer.classList.remove('active');
});

// ===== SEARCH FUNCTIONALITY =====
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchBtn.addEventListener('click', () => {
    searchModal.classList.add('active');
    searchInput.focus();
});

closeSearch.addEventListener('click', () => {
    searchModal.classList.remove('active');
});

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();

    if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
    }

    const results = state.products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.era.toLowerCase().includes(query)
    );

    if (results.length === 0) {
        searchResults.innerHTML = '<p style="text-align: center; padding: 2rem;">No results found</p>';
    } else {
        renderProducts(results, 'searchResults');
    }
});

// Close modals on escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchModal.classList.remove('active');
        document.getElementById('quickViewModal').classList.remove('active');
        cartDrawer.classList.remove('active');
        wishlistDrawer.classList.remove('active');
    }
});

// ===== QUICK VIEW MODAL =====
const quickViewModal = document.getElementById('quickViewModal');
const closeQuickView = document.getElementById('closeQuickView');
const quickViewContent = document.getElementById('quickViewContent');

function openQuickView(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    quickViewContent.innerHTML = `
        <div class="quick-view-content">
            <div class="quick-view-images">
                <img src="${product.images[0]}" alt="${product.name}" class="quick-view-main-image" id="quickViewMainImage">
                <div class="quick-view-thumbnails">
                    ${product.images.map((img, i) => `
                        <img src="${img}" alt="${product.name}" class="quick-view-thumbnail ${i === 0 ? 'active' : ''}" data-index="${i}">
                    `).join('')}
                </div>
            </div>
            <div class="quick-view-info">
                <div class="product-category">${product.category.toUpperCase()}</div>
                <h2>${product.name}</h2>
                <div class="quick-view-price">$${product.price}</div>
                <div class="product-meta">
                    <span class="product-size">SIZE ${product.size}</span>
                    <span class="product-condition ${product.condition.toLowerCase().replace(' ', '-')}">${product.condition.toUpperCase()}</span>
                </div>
                <div class="quick-view-description">
                    <p>${product.description}</p>
                    <p style="margin-top: 1rem;"><strong>Era:</strong> ${product.era}</p>
                    <p><strong>Fabric:</strong> ${product.fabric}</p>
                    <p><strong>Fit:</strong> ${product.fit}</p>
                    <p style="margin-top: 1rem; color: var(--faded-burgundy); font-weight: 600;">⚠ ONLY ONE AVAILABLE</p>
                </div>
                <div class="quick-view-actions">
                    <button class="btn btn-primary btn-block" onclick="addToCart(${product.id}); document.getElementById('quickViewModal').classList.remove('active');">ADD TO BAG</button>
                    <button class="btn btn-secondary" onclick="toggleWishlist(${product.id}); this.textContent = state.wishlist.includes(${product.id}) ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST';">
                        ${state.wishlist.includes(product.id) ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
                    </button>
                </div>
            </div>
        </div>
    `;

    // Thumbnail click handlers
    quickViewContent.querySelectorAll('.quick-view-thumbnail').forEach(thumb => {
        thumb.addEventListener('click', () => {
            const index = parseInt(thumb.dataset.index);
            document.getElementById('quickViewMainImage').src = product.images[index];
            quickViewContent.querySelectorAll('.quick-view-thumbnail').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    quickViewModal.classList.add('active');
}

closeQuickView.addEventListener('click', () => {
    quickViewModal.classList.remove('active');
});

// ===== NEWSLETTER FORM =====
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;

    // Simulate form submission
    showNotification('Welcome to the cult! Check your email for exclusive drops.');
    e.target.reset();
});

// ===== NOTIFICATION SYSTEM =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--ink-black);
        color: var(--electric-lime);
        padding: 1rem 2rem;
        border: 2px solid var(--electric-lime);
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#hero') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== PARALLAX EFFECTS =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Hero background text parallax
    const heroBgText = document.querySelector('.hero-bg-text');
    if (heroBgText) {
        heroBgText.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.5}px)`;
    }

    // Hero title lines parallax
    document.querySelectorAll('.hero-title-line').forEach((line, index) => {
        const speed = parseFloat(line.dataset.scrollSpeed) || 0.5;
        line.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
    });
});

// ===== HERO 3D CANVAS (Simple version using CSS transforms) =====
const heroCanvas = document.getElementById('heroCanvas');
if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');

    function resizeCanvas() {
        heroCanvas.width = window.innerWidth;
        heroCanvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw simple 3D-like shapes
    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * heroCanvas.width,
            y: Math.random() * heroCanvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5
        });
    }

    function animate() {
        ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

        particles.forEach(particle => {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();

            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > heroCanvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > heroCanvas.height) particle.speedY *= -1;
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// ===== DRAG TO SCROLL FOR LOOKBOOK =====
const lookbookTrack = document.getElementById('lookbookTrack');
if (lookbookTrack) {
    let isDown = false;
    let startX;
    let scrollLeft;

    lookbookTrack.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - lookbookTrack.offsetLeft;
        scrollLeft = lookbookTrack.parentElement.scrollLeft;
    });

    lookbookTrack.addEventListener('mouseleave', () => {
        isDown = false;
    });

    lookbookTrack.addEventListener('mouseup', () => {
        isDown = false;
    });

    lookbookTrack.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - lookbookTrack.offsetLeft;
        const walk = (x - startX) * 2;
        lookbookTrack.parentElement.scrollLeft = scrollLeft - walk;
    });
}

// ===== PRODUCT CARD TILT EFFECT =====
document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.product-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        } else {
            card.style.transform = '';
        }
    });
});

// ===== ACCESSIBILITY - KEYBOARD NAVIGATION =====
document.querySelectorAll('.product-card, .category-item, .orbit-item').forEach(el => {
    el.setAttribute('tabindex', '0');
    el.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            el.click();
        }
    });
});

// ===== PERFORMANCE - LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('THRIFT HOLIC - Initialized');
    console.log('Products loaded:', state.products.length);

    // Initialize cart and wishlist from localStorage
    const savedCart = localStorage.getItem('thriftHolicCart');
    const savedWishlist = localStorage.getItem('thriftHolicWishlist');

    if (savedCart) {
        state.cart = JSON.parse(savedCart);
        updateCart();
    }

    if (savedWishlist) {
        state.wishlist = JSON.parse(savedWishlist);
        updateWishlist();
    }

    // Save state changes to localStorage
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('thriftHolicCart', JSON.stringify(state.cart));
        localStorage.setItem('thriftHolicWishlist', JSON.stringify(state.wishlist));
    });
});

// ===== CLICK OUTSIDE TO CLOSE DRAWERS =====
document.addEventListener('click', (e) => {
    if (cartDrawer.classList.contains('active') && !cartDrawer.contains(e.target) && e.target !== cartBtn) {
        cartDrawer.classList.remove('active');
    }

    if (wishlistDrawer.classList.contains('active') && !wishlistDrawer.contains(e.target) && e.target !== wishlistBtn) {
        wishlistDrawer.classList.remove('active');
    }
});

// ===== FEATURED ARCHIVE CTA BUTTONS =====
document.querySelectorAll('.featured-cta').forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.hash = 'new-drop';
    });
});

console.log('🛍️ THRIFT HOLIC - All systems ready!');


// PLACEHOLDER - More code continues below
