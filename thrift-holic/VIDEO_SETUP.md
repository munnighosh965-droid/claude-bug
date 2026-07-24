# THRIFT HOLIC - Video Hero Integration Guide

## 📹 Video Setup Instructions

### Important: Video File Location

The website is configured to use your uploaded video file:
**"WhatsApp Video 2026-07-24 at 5.57.27 PM.mp4"**

### To Make the Video Work:

1. **Copy the video file** to the project folder:
   - From: `%USERPROFILE%\Downloads\WhatsApp Video 2026-07-24 at 5.57.27 PM.mp4`
   - To: `<project folder>\thrift-holic\`

2. **Or rename the video** in the HTML file (line 95 in `index.html`):
   ```html
   <source src="YOUR_VIDEO_FILENAME.mp4" type="video/mp4">
   ```

---

## 🎬 Interactive Video Hero Features

### Tap-to-Enter Experience
- **Before Entry:** Clean entrance screen with "TAP TO ENTER" prompt
- **Pulsing indicator** around the button
- **Click/Tap** to enter the experience

### When You Enter:
1. ⚡ **Camera flash transition** (white flash effect)
2. 🔊 **Audio fade-in** (smooth volume increase)
3. 🎥 **Video plays from beginning**
4. 🎨 **Interface reveals** (navigation, copy, controls)
5. 📊 **Progress bar appears** at bottom

---

## 🎮 Interactive Controls

### Custom Video Controls (Bottom Right):
- **⏯️ Play/Pause** - Toggle video playback
- **🔊 Sound On/Off** - Mute/unmute audio
- **🔄 Replay** - Restart video from beginning
- **⛶ Fullscreen** - Enter fullscreen mode

### Video Interactions:
- **Single Click** - Creates ripple effect
- **Double Click** - Replays video from start
- **Scroll Down** - Video scales up (1.0 → 1.08) and dims
- **Scroll Back Up** - Video returns to normal

### Product Hotspots:
- **Appear at specific timestamps** (3s, 8s, 15s)
- **Click `+` hotspot** to view product
- **"SHOP THE LOOK"** label on hover
- **Video pauses** while viewing product
- **Auto-resumes** when closed

---

## 🖱️ Mouse & Cursor Effects

### Desktop:
- **Mouse movement** creates parallax on text
- **Custom cursor** expands over interactive elements
- **Hover over "ENTER THE DROP"** - cursor shows "SHOP"
- **Magnetic attraction** to CTA button
- **Spotlight effect** follows cursor (subtle)

### Mobile:
- **Single tap** - Enter experience / reveal controls
- **Double tap** - Replay video
- **Tap hotspot** - Open product preview
- **Swipe up** - Scroll to products

---

## 📱 Responsive Design

### Mobile Optimizations:
- Touch-friendly controls (45px buttons)
- Simplified navigation (only BAG visible)
- Larger touch targets
- Reduced text sizes
- Optimized layouts

### Tablet:
- Adjusted spacing
- Flexible layouts
- Touch-compatible controls

---

## 🎨 Visual Treatment

### Monochrome Aesthetic:
- Black, white, and grey palette
- Film grain overlay
- Gradient overlays for readability
- Technical interface lines
- Industrial labels
- Electric lime accents (minimal)

### Typography:
- **Top Left:** THRIFT HOLIC® (display font)
- **Bottom Left:** PRE-LOVED. RELOVED. (tagline)
- **Bottom Right:** ENTER THE DROP → (CTA)

---

## ⚡ Performance Features

### Optimizations:
- **Preload metadata** - Fast initial load
- **Poster frame** - Shows while loading
- **Tab inactive pause** - Saves resources
- **Scroll-based pause** - Pauses when off-screen
- **Reduced motion support** - Shows still frame
- **Slow connection detection** - Uses poster only

### Accessibility:
- ✅ Keyboard navigation (Tab, Enter, Space)
- ✅ ARIA labels on all controls
- ✅ Focus states visible
- ✅ `prefers-reduced-motion` support
- ✅ Readable contrast maintained

---

## 🎯 Video Timeline

The code is set up to show product hotspots at:
- **3 seconds** - First product (top right area)
- **8 seconds** - Second product (middle left)
- **15 seconds** - Third product (top right)

These timings can be adjusted in `script.js` around line 250:

```javascript
const hotspots = [
    {
        time: 3,  // Change timing here
        position: { top: '40%', left: '60%' },  // Adjust position
        product: state.products[0]
    },
    // Add more hotspots...
];
```

---

## 🔧 Customization

### Change Video:
Replace the video source in `index.html`:
```html
<source src="your-video.mp4" type="video/mp4">
```

### Adjust Hotspot Positions:
Edit the `hotspots` array in `script.js`:
```javascript
position: { top: '50%', left: '40%' }  // CSS percentage values
```

### Change Colors:
Edit CSS variables in `styles.css`:
```css
--electric-lime: #C7FF38;  /* Hotspot color */
```

### Adjust Scroll Scale:
In `script.js`, line ~330:
```javascript
const scale = 1 + (scrollProgress * 0.08);  // Increase 0.08 for more zoom
```

---

## 🚨 Troubleshooting

### Video Not Playing:
1. ✅ Check video file is in the same folder as `index.html`
2. ✅ Check filename matches exactly in HTML
3. ✅ Click "TAP TO ENTER" (autoplay is disabled until interaction)
4. ✅ Check browser console for errors (F12)

### No Sound:
1. ✅ Click "TAP TO ENTER" first (audio requires user interaction)
2. ✅ Check sound button (click to unmute)
3. ✅ Check browser isn't muting the tab
4. ✅ Check system volume

### Video Not Visible:
1. ✅ Check file path in HTML
2. ✅ Try opening HTML in different browser
3. ✅ Check browser console (F12) for errors
4. ✅ Ensure video format is MP4 (H.264 codec)

### Hotspots Not Appearing:
1. ✅ Wait for the specified timestamps (3s, 8s, 15s)
2. ✅ Check browser console for JavaScript errors
3. ✅ Ensure you've entered the experience (clicked TAP TO ENTER)

---

## 📊 Browser Support

| Browser | Video | Controls | Hotspots | Fullscreen |
|---------|-------|----------|----------|------------|
| Chrome  | ✅    | ✅       | ✅       | ✅         |
| Firefox | ✅    | ✅       | ✅       | ✅         |
| Safari  | ✅    | ✅       | ✅       | ✅         |
| Edge    | ✅    | ✅       | ✅       | ✅         |

---

## 💡 Tips

1. **Video Format:** MP4 with H.264 codec works best across all browsers
2. **Video Size:** Compress video for web (< 50MB recommended)
3. **Resolution:** 1920×1080 is ideal for desktop
4. **Audio:** Keep audio volume moderate (website fades it in)
5. **Length:** 15-30 seconds is optimal for hero videos

---

## 🎬 What's Included

### Features Implemented:
- ✅ Full-screen video background
- ✅ Tap-to-enter interaction
- ✅ Camera flash transition
- ✅ Audio fade-in
- ✅ Custom video controls
- ✅ Progress bar
- ✅ Click ripple effects
- ✅ Double-click replay
- ✅ Product hotspots (timed)
- ✅ Hotspot preview cards
- ✅ Mouse parallax on text
- ✅ Custom cursor effects
- ✅ Scroll-based scaling
- ✅ Auto pause/resume
- ✅ Tab visibility handling
- ✅ Reduced motion support
- ✅ Mobile touch gestures
- ✅ Keyboard accessibility
- ✅ Fullscreen mode

### Not Included (would require video editing):
- Timecode overlays (add in video editor)
- "THRIFT / HOLIC" text in video (add in video editor)

---

## 📝 Next Steps

1. **Copy your video file** to the project folder
2. **Open `index.html`** in your browser
3. **Click "TAP TO ENTER"** to start the experience
4. **Explore** the interactive features
5. **Scroll down** to see the transition to products

Enjoy your immersive THRIFT HOLIC experience! 🎨✨
