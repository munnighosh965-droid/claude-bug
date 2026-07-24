# THRIFT HOLIC - Premium Spatial E-Commerce Website

**PRE-LOVED. RELOVED.**

A complete, immersive spatial e-commerce experience for a vintage fashion and thrift streetwear brand.

---

## 🎨 Brand Identity

- **Primary Tagline:** PRE-LOVED. RELOVED.
- **Mission:** Curated vintage pieces for people who refuse to dress ordinary.
- **Personality:** Bold, youthful, rebellious, sustainable, and unisex

---

## 🌈 Color Palette

- **Ink Black:** `#0A0A0A` - Primary text and navigation
- **Warm Cream:** `#F4F0E8` - Primary background
- **Washed Grey:** `#B7B4AD` - Secondary elements
- **Electric Lime:** `#C7FF38` - Interactive highlights and CTAs
- **Faded Burgundy:** `#7A1E24` - Accent color

---

## ✨ Features

### 🎬 Loading Experience
- Animated wordmark assembly
- Percentage counter (0–100)
- Rotating vintage clothing tag
- Smooth curtain transition into homepage

### 🧭 Navigation
- Minimal floating navigation bar
- Transparent over hero, solid on scroll
- Full-screen animated mobile menu
- Search, wishlist, and shopping bag functionality

### 🎭 Spatial Hero Section
- Full-screen immersive 3D composition
- Mouse-responsive parallax effects
- Floating product labels and tags
- Animated typography layers
- Scroll-triggered camera movements

### 🛍️ Interactive Features

#### Custom Cursor
- Context-aware cursor states
- "VIEW", "EXPLORE", "CLICK" prompts
- Magnetic button attraction
- Smooth trailing motion

#### Product Cards
- Hover effects with tilt perspective
- Alternate image reveals
- Quick add to cart
- Wishlist toggle
- One-of-one availability badges

#### Shop by Category
- Full-width typographic rows
- Hover-activated product previews
- 7 categories: Oversized Tees, Vintage Shirts, Hoodies, Jackets, Denim, Bottoms, Accessories

#### Product Orbit
- Circular 3D product carousel
- Drag to rotate functionality
- Auto-rotation animation
- Click to view details

#### Featured Archive
- Scroll-pinned product showcase
- Dynamic background color transitions
- Progressive detail animations
- Museum-style labeling

#### Lookbook
- Horizontal scroll gallery
- Cinematic campaign photography
- Editorial messaging overlays
- Click to expand full-screen

#### Sustainability Story
- Animated counter statistics
- Environmental impact estimates
- Transparent messaging
- Disclaimer for estimated figures

### 🛒 E-Commerce Functionality

#### Shopping Cart
- Side drawer interface
- Add/remove items
- Real-time total calculation
- Empty state messaging
- Persistent storage (localStorage)

#### Wishlist
- Save favorite items
- Heart icon toggle
- Side drawer display
- Persistent across sessions

#### Product Search
- Real-time filtering
- Search by name, category, or era
- Modal interface
- Grid results display

#### Quick View Modal
- Large product images
- Image gallery thumbnails
- Detailed specifications
- Add to bag / wishlist actions
- Condition ratings

### 📱 Responsive Design
- Fully mobile-optimized
- Touch-friendly interactions
- Swipe gestures
- Simplified mobile menu
- Adaptive layouts

### ♿ Accessibility
- Keyboard navigation support
- Focus states on interactive elements
- ARIA labels
- `prefers-reduced-motion` support
- Alt text for images
- Semantic HTML structure

---

## 🚀 How to Use

### Opening the Website

1. **Simply open `index.html` in a modern web browser**
2. All files are self-contained with CDN-loaded libraries
3. No build process or server required

### Recommended Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Navigation
- **Scroll** to explore sections
- **Hover** over products for interactive previews
- **Click** products to view details
- **Search** icon to find specific items
- **Heart** icon to view wishlist
- **Bag** icon to view shopping cart

### Adding Products
- Click **"QUICK ADD"** on any product card
- Or click the product for details, then **"ADD TO BAG"**
- Click the **heart icon** to add to wishlist

---

## 📂 File Structure

```
thrift holic/
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

---

## 🎯 Key Interactions

### Custom Cursor
- **Default:** Small circle with trailing motion
- **Product hover:** Expands with "VIEW" text
- **Category hover:** Shows "EXPLORE" prompt
- **Button hover:** Displays "CLICK" text

### Hero Section
- **Move mouse:** 3D parallax effect on floating elements
- **Scroll down:** Hero transitions into shopping section

### Product Cards
- **Hover:** Tilt effect and alternate image reveal
- **Click card:** Open quick view modal
- **Click heart:** Toggle wishlist
- **Click "Quick Add":** Add directly to cart

### Product Orbit
- **Drag:** Rotate the product carousel
- **Click arrows:** Navigate between items
- **Click product:** View details
- **Auto-rotates:** Continuous gentle rotation

### Lookbook
- **Scroll horizontally:** Browse campaign images
- **Wheel scroll:** Converts vertical scroll to horizontal
- **Drag:** Swipe through images

---

## 🎨 Design Principles

### Typography
- **Display Font:** Bebas Neue (condensed editorial)
- **Body Font:** Space Grotesk (clean modern sans-serif)
- **Accent Font:** Playfair Display (elegant italic serif)

### Visual Style
- **Brutalist graphic design** with bold typography
- **Experimental fashion editorial** aesthetic
- **Underground thrift culture** influence
- **Spatial 3D interfaces** with layered depth
- **Film grain and vintage textures**
- **Torn paper and photocopied effects**

### Motion Design
- **Smooth cinematic transitions**
- **Parallax scrolling effects**
- **Staggered entrance animations**
- **Hover micro-interactions**
- **60 FPS performance target**

---

## 📊 Sample Products

The website includes 6 sample products:

1. **Vintage Levi's Denim Jacket** - $68
2. **Oversized Band Tee** - $32
3. **Vintage Windbreaker** - $45
4. **Leather Bomber Jacket** - $125
5. **Vintage Flannel Shirt** - $38
6. **Vintage Cargo Pants** - $52

All products feature:
- Multiple images
- Era information (1980s–2000s)
- Condition ratings
- Size specifications
- Fabric details
- Fit information

---

## 🔧 Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Advanced styling and animations
- **JavaScript (ES6+)** - Interactive functionality
- **GSAP** - Scroll-triggered animations
- **ScrollTrigger** - Scroll-based interactions
- **Three.js** - (Referenced, simplified to canvas)
- **Google Fonts** - Typography

---

## 💡 Customization

### Adding Products

Edit the `sampleProducts` array in `script.js`:

```javascript
const sampleProducts = [
    {
        id: 1,
        name: 'PRODUCT NAME',
        category: 'Category',
        price: 50,
        size: 'L',
        condition: 'Excellent',
        era: '1990s',
        images: ['image1.jpg', 'image2.jpg'],
        description: 'Product description',
        fabric: 'Cotton',
        fit: 'Regular Fit'
    }
];
```

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --ink-black: #0A0A0A;
    --warm-cream: #F4F0E8;
    --washed-grey: #B7B4AD;
    --electric-lime: #C7FF38;
    --faded-burgundy: #7A1E24;
}
```

### Modifying Typography

Update the font imports in `index.html` and CSS variables:

```css
:root {
    --font-display: 'Bebas Neue', 'Anton', sans-serif;
    --font-body: 'Space Grotesk', sans-serif;
    --font-accent: 'Playfair Display', serif;
}
```

---

## ⚡ Performance

- **Lazy loading** for images
- **CSS animations** optimized for GPU
- **Efficient scroll listeners** with throttling
- **Intersection Observer** for counter animations
- **LocalStorage** for persistent cart/wishlist
- **Responsive images** from CDN

---

## 🌐 Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Core functionality | ✅ | ✅ | ✅ | ✅ |
| Custom cursor | ✅ | ✅ | ✅ | ✅ |
| GSAP animations | ✅ | ✅ | ✅ | ✅ |
| 3D transforms | ✅ | ✅ | ✅ | ✅ |
| LocalStorage | ✅ | ✅ | ✅ | ✅ |

---

## 📱 Mobile Experience

- **Touch-optimized** interactions
- **Swipe gestures** for carousels
- **Responsive grid layouts**
- **Simplified navigation menu**
- **Performance-optimized** for mid-range devices

---

## 🎓 Learning Resources

This project demonstrates:

- Modern CSS Grid and Flexbox layouts
- Advanced CSS animations and transitions
- JavaScript ES6+ features
- Event handling and DOM manipulation
- State management patterns
- Intersection Observer API
- LocalStorage for data persistence
- Responsive design principles
- Accessibility best practices

---

## 📄 License

This is a demonstration project created for educational purposes. The THRIFT HOLIC brand and all associated designs are fictional.

**Images:** Sample images are sourced from Unsplash and are used for demonstration purposes only.

---

## 🚀 Future Enhancements

Potential additions for a production version:

- Backend integration for real product data
- Payment gateway integration (Stripe, PayPal)
- User authentication and accounts
- Order history and tracking
- Product filtering and advanced search
- Size guide modal
- Product reviews and ratings
- Email notifications
- Admin dashboard for inventory management
- Real-time inventory updates
- Social media integration
- SEO optimization
- Analytics tracking

---

## 📞 Support

For questions or issues with this demonstration:

1. Check that all three files (`index.html`, `styles.css`, `script.js`) are in the same folder
2. Ensure you're using a modern web browser
3. Check the browser console for any error messages
4. Verify that JavaScript is enabled

---

## 🎨 Design Credits

**Concept:** Premium vintage thrift e-commerce experience  
**Style:** Brutalist graphic design meets spatial interfaces  
**Typography:** Editorial and street-inspired  
**Color Theory:** Warm neutrals with electric accents  

---

**PRE-LOVED CLOTHES FOR A FUTURE THAT LOOKS BETTER.**

---

*Built with attention to detail, accessibility, and immersive user experience.*
