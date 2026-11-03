# Northwind – animated studio site (React + Vite + GSAP)

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Build for production
```bash
npm run build
npm run preview
```

## Structure
```
src/
  App.jsx               page composition + hero intro
  styles.css            all styles (design tokens in :root)
  utils.js              reduced-motion helper
  components/
    Loader.jsx          counter preloader
    Cursor.jsx          custom cursor
    Header.jsx          menu button + full-screen overlay
    Hero.jsx            masked headline
    Marquee.jsx         looping marquee, speeds up on scroll
    Work.jsx            pinned horizontal scroll + parallax
    Services.jsx        scroll-filled headline + service rows
    Cta.jsx             magnetic button
```
Each animated component creates its tweens inside `gsap.context()` and reverts them on unmount, which keeps React StrictMode and hot reload clean.
