# Vivek Kumar — Personal Portfolio

A premium, MacOS-styled personal portfolio website built with React.js.

## ✨ Features

- **MacOS UI** — Glassmorphism, rounded corners, traffic light dots, and Apple-like spacing
- **Animated Hero** — Multilingual greeting rotator (EN/HI/ES/FR/JP/KR) with fade transitions
- **Time-based Photo** — Profile photo changes filter based on time of day (Morning/Afternoon/Evening/Night)
- **3D Skill Sphere** — Canvas-based rotating Fibonacci sphere with all your tech skills
- **Project Cards** — Hover lift effect with gradient accents and tech tags
- **Education Timeline** — NIT Manipur timeline with your actual college logo
- **Achievements Section** — With LeetCode profile link
- **Resume Viewer** — Embedded PDF with Mac window chrome + download button
- **Dark/Light Mode** — Smooth toggle with Mac-style button
- **Floating Background** — Animated blob shapes with noise texture
- **Scroll Animations** — FadeIn on intersection for all sections

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 📦 Deploy to Vercel

```bash
npm install -g vercel
npm run build
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deploys.

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Fixed glassmorphism navbar with Mac dots
│   ├── Hero.jsx            # Hero with greeting rotator + time-based photo
│   ├── SkillsSphere.jsx    # 3D rotating Canvas skill sphere
│   ├── Projects.jsx        # Project cards with hover effects
│   ├── Education.jsx       # Education timeline + achievements
│   ├── ResumeViewer.jsx    # Embedded PDF with Mac chrome
│   ├── Footer.jsx          # Footer with social links
│   ├── FadeIn.jsx          # Scroll-based fade-in wrapper
│   └── FloatingBackground.jsx  # Animated blob background
├── data/
│   ├── projects.js         # Project data
│   └── skills.js           # Skills list
├── assets/
│   └── images.js           # Base64 encoded photos (your actual images!)
├── pages/
│   └── Home.jsx            # Main page layout
├── App.jsx                 # Root with dark/light state
└── index.js                # Entry point
public/
└── resume.pdf              # Your actual resume (already included!)
```

## 🎨 Customization

### Update Projects
Edit `src/data/projects.js` to add/change projects.

### Update Skills
Edit `src/data/skills.js` to add/change skills.

### Update Personal Info
Edit `src/components/Hero.jsx` to update name, bio, stats.

### Update Social Links
Edit `src/components/Footer.jsx` to update email/LinkedIn/GitHub.

### Replace Photos
The images are embedded as base64 in `src/assets/images.js`.  
To replace them, convert your new images to base64 and update the file.

## 🛠 Tech Stack

- **React.js 18** — UI framework
- **Canvas API** — 3D skill sphere
- **IntersectionObserver** — Scroll animations
- **CSS-in-JS** — All styles via inline style objects
- **Plus Jakarta Sans** — Typography (via Google Fonts)
