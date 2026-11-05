# 🎂 Best Friend Birthday Website ✨

A modern, interactive, and responsive website designed to celebrate your best friend's birthday in style. Built with pure HTML5, CSS3, and JavaScript — zero dependencies, zero build steps, and 100% compatible with GitHub Pages hosting.

---

## ✨ Features Included

- **Hero Banner & Live Countdown**: Dynamic timer counting down to her birthday with floating celebratory animations.
- **Interactive Birthday Cake & Candles**: Clickable candle that she can blow out to trigger a confetti explosion and unlock a special birthday wish.
- **Polaroid Memory Gallery**: Nostalgic tilt-effect polaroids with captions and an expandable lightbox modal viewer.
- **"Reasons Why You're Special" Grid**: Aesthetic glassmorphism cards highlighting her unique traits and your bond.
- **The Birthday Jar of Warm Thoughts**: Interactive surprise notes generator that dispenses thoughtful messages on click.
- **Secret Wax-Seal Envelope**: Clickable wax seal that opens an animated envelope to reveal your heartfelt handwritten-style letter.
- **Ambient Music Controller**: Floating audio toggle that plays celebratory background music.

---

## 📸 Step 1: Adding Her Photos

In the `images/` folder, place her favorite photos and name them:
- `photo1.jpg`
- `photo2.jpg`
- `photo3.jpg`
- `photo4.jpg`
- `photo5.jpg`
- `photo6.jpg`

*(If no photos are placed yet, the site automatically displays elegant pastel aesthetic placeholders!)*

---

## ✏️ Step 2: Personalizing the Text

Open `index.html` in any text editor to customize:
1. **Her Name / Nickname**:
   - Change `Bestie` on line 42 to her real name or nickname (e.g., `kuchuPuchu` or her name).
2. **Photo Captions**:
   - Update the captions inside `.polaroid-caption` under the `#photo-gallery` section.
3. **The Letter**:
   - Scroll to `#secret-letter` and personalize the words in `<div class="letter-content">`.
4. **Countdown Date**:
   - In `script.js` around line 125, you can adjust the birthday month and day (`targetDate = new Date(targetYear, 10, 9)` — month is 0-indexed, so 10 = November).

---

## 🚀 Step 3: Hosting on GitHub Pages (Step-by-Step)

1. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com) and click **New Repository**.
   - Name it (for example `happy-birthday-bestie`).
   - Keep it **Public** and leave "Add a README" unchecked. Click **Create repository**.

2. **Upload the Files**:
   - **Option A (Via Web Browser / Drag & Drop)**:
     - On your newly created repo page, click **uploading an existing file**.
     - Drag and drop `index.html`, `style.css`, `script.js`, and the `images` folder into GitHub.
     - Click **Commit changes**.
   - **Option B (Via Terminal)**:
     ```bash
     cd birthday-website
     git init
     git add .
     git commit -m "Initial birthday website commit"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/happy-birthday-bestie.git
     git push -u origin main
     ```

3. **Enable GitHub Pages**:
   - In your repository, click **Settings** (gear icon at the top).
   - In the left sidebar, click **Pages**.
   - Under **Build and deployment > Branch**, select `main` (and `/ (root)`), then click **Save**.
   - Wait 1–2 minutes, and GitHub will provide your live website link:
     `https://YOUR_USERNAME.github.io/happy-birthday-bestie/`

4. **Send her the link** on her birthday! 🎁✨
