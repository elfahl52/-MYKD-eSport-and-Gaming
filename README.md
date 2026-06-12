<div align="center">

<img src="img/logo/logo.png" alt="MYKD Logo" width="120" height="120" />

# ⚡ MYKD — eSports & Gaming Platform

> *A cutting-edge, immersive web experience built for the gaming generation.*

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Swiper.js](https://img.shields.io/badge/Swiper.js-6332F6?style=for-the-badge&logo=swiper&logoColor=white)](https://swiperjs.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://mykd-e-sport-and-gaming.vercel.app/)

<br/>

**[🌐 View Live Demo](https://mykd-e-sport-and-gaming.vercel.app/)** · **[🐛 Report Bug](https://github.com/khaledelfahl/MYKD-eSport-and-Gaming/issues)** · **[✨ Request Feature](https://github.com/khaledelfahl/MYKD-eSport-and-Gaming/issues)**

<br/>

 
</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#️-configuration)
  - [Swiper.js](#swiperjs-setup)
  - [Responsive Breakpoints](#responsive-breakpoints)
- [Screenshots](#-screenshots)
- [Roadmap](#️-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)
- [Acknowledgements](#-acknowledgements)

---

## 🎮 About The Project

**MYKD** is a modern, fully responsive web platform built for the eSports and gaming community. It combines a sleek dark-mode aesthetic with neon accents, glassmorphism effects, and smooth CSS animations to deliver an immersive, app-like experience across all devices.

Whether you're showcasing **tournaments**, **gaming content**, **NFT card collections**, or **digital assets**, MYKD provides a polished, professional front-end foundation that's easy to customize and extend.

### Why MYKD?

- 🎯 Purpose-built for the gaming niche — not a generic template
- 🧩 Modular, BEM-structured code that's easy to maintain and scale
- 📱 Mobile-first approach ensures flawless performance on every screen
- ⚡ Performance-optimized with minimal layout shifts and fast asset loading

---

## ✨ Features

| Feature | Description |
|---|---|
| 📱 **Fully Responsive** | Flawless display on mobile, tablet, and desktop via CSS Grid & Flexbox |
| 🎠 **Swiper.js Carousels** | Touch-friendly, looping card sliders with responsive breakpoints |
| 🌑 **Modern Dark UI** | Gaming-inspired aesthetic with neon accents and glassmorphism touches |
| 🎨 **Smooth Animations** | CSS transitions, hover effects — image zoom, glowing borders, and more |
| 🧱 **Modular BEM Structure** | Clean, reusable code following BEM naming conventions |
| ⚡ **Performance Optimized** | Fast loading with optimized assets and minimal layout shifts |
| 🖼️ **NFT / Card Gallery** | Showcases digital assets in a sleek, interactive layout |
| 🏆 **Tournament Section** | Dedicated section for event listings and competition highlights |

---

## 🛠️ Tech Stack

```
Frontend        → HTML5, CSS3, Vanilla JavaScript
Slider Library  → Swiper.js v11
Icon Library    → Boxicons
Design System   → Mobile-First, BEM Naming Convention
Deployment      → Vercel
```

### Why These Choices?

- **Vanilla JS** — No framework overhead; keeps the bundle lean and fast
- **Swiper.js** — Industry-standard touch slider with excellent mobile support
- **Boxicons** — Lightweight, consistent icon set that fits the gaming aesthetic
- **BEM** — Makes large CSS codebases readable and scalable

---

## 📂 Project Structure

```
MYKD-eSport-and-Gaming/
│
├── 📁 css/
│   └── style.css           # Global styles, variables, components
│
├── 📁 js/
│   └── main.js             # Swiper init, scroll effects, interactions
│
├── 📁 img/
│   ├── 📁 logo/            # Brand logo assets
│   ├── 📁 background/      # Hero & section backgrounds
│   ├── 📁 cards/           # NFT / gaming card images
│   └── 📁 icons/           # Custom SVG/PNG icons
│
├── index.html              # Main entry point
├── README.md               # You are here
└── LICENSE                 # MIT License
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed or available:

- A modern browser (Chrome, Firefox, Edge, Safari)
- [VS Code](https://code.visualstudio.com/) with the **Live Server** extension *(recommended for hot reloading)*
- [Git](https://git-scm.com/) for cloning the repository

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/khaledelfahl/MYKD-eSport-and-Gaming.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd MYKD-eSport-and-Gaming
   ```

3. **Launch the project**

   **Option A — VS Code Live Server** *(recommended)*
   ```
   Right-click index.html → "Open with Live Server"
   ```

   **Option B — Direct browser**
   ```
   Open index.html in any modern browser
   ```

 
   ```

---

## ⚙️ Configuration

### Swiper.js Setup

The carousels are initialized in `js/main.js`. The core configuration:

```javascript
const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  grabCursor: true,

  // Auto-play (optional)
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  // Pagination dots
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Responsive breakpoints
  breakpoints: {
    576:  { slidesPerView: 2 },
    992:  { slidesPerView: 3 },
    1200: { slidesPerView: 4 },
  },
});
```

### Responsive Breakpoints

| Breakpoint | Slides Shown | Target Device |
|---|---|---|
| `< 576px` | 1 | Mobile (portrait) |
| `≥ 576px` | 2 | Mobile (landscape) / Small tablet |
| `≥ 992px` | 3 | Tablet / Small desktop |
| `≥ 1200px` | 4 | Desktop / Large screen |

### CSS Custom Properties

Key design tokens in `css/style.css` — customize the look by editing these variables:

```css
:root {
  --color-primary:    #6c3ef4;   /* Main neon accent */
  --color-secondary:  #00d4ff;   /* Secondary highlight */
  --color-bg:         #0a0a0f;   /* Page background */
  --color-surface:    #13131a;   /* Card / section surface */
  --color-text:       #e0e0e0;   /* Primary text */
  --border-radius:    12px;
  --transition:       0.3s ease;
}
```

## 🗺️ Roadmap

- [x] Responsive layout (mobile, tablet, desktop)
- [x] Swiper.js touch carousels
- [x] Dark UI with neon accents
- [x] CSS animations & hover effects
- [ ] **Dark / Light mode toggle**
- [ ] **Backend integration** (tournament data, leaderboards)
- [ ] **User authentication** (player profiles)
- [ ] **Live score feeds** via gaming API
- [ ] **Accessibility audit** (WCAG 2.1 AA compliance)
- [ ] **PWA support** (offline-first experience)

See [open issues](https://github.com/khaledelfahl/MYKD-eSport-and-Gaming/issues) for a full list of proposed features and known issues.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. **Any contributions you make are greatly appreciated.**

### How to Contribute

1. **Fork** the repository
2. **Create** your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes with a clear message
   ```bash
   git commit -m "feat: add AmazingFeature"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request** and describe your changes

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/) for clear history:

| Prefix | Use for |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `style:` | CSS/UI changes |
| `docs:` | Documentation updates |
| `refactor:` | Code refactoring |
| `perf:` | Performance improvements |

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for full details.

```
MIT License — Free to use, modify, and distribute with attribution.
```

---

## 📬 Contact

<div align="center">

**Khaled Elfahl** — Fullstack Developer

[![Email](https://img.shields.io/badge/Email-khaledelfahl56%40gmail.com-red?style=for-the-badge&logo=gmail&logoColor=white)](mailto:khaledelfahl56@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-khaledelfahl-black?style=for-the-badge&logo=github)](https://github.com/elfahl52)
[![Project](https://img.shields.io/badge/Project-MYKD%20Repo-6332F6?style=for-the-badge&logo=vercel)](https://github.com/elfahl52/-MYKD-eSport-and-Gaming)

</div>

---

## 🙏 Acknowledgements

- [Swiper.js](https://swiperjs.com/) — The best touch slider library
- [Boxicons](https://boxicons.com/) — Beautiful open-source icons
- [Vercel](https://vercel.com/) — Seamless deployment and hosting
- [Google Fonts](https://fonts.google.com/) — Typography
- [Shields.io](https://shields.io/) — README badges
- [Choose an Open Source License](https://choosealicense.com/) — License guidance

---

<div align="center">

Made with ❤️, ☕, and 🎮 by **Khaled Elfahl**

⭐ **If you found this project helpful, please give it a star!** ⭐

</div>
