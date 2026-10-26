# 🛡️ SPSK-Threat Detector (APS-cyber)

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Primitives-black?style=for-the-badge&logo=radix-ui&logoColor=white)](https://www.radix-ui.com/)
[![C++](https://img.shields.io/badge/C++-17/20-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white)](https://isocpp.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **A cutting-edge, client-side cybersecurity awareness and threat detection platform.**  
> Featuring an in-browser heuristic phishing scanner (17+ security rules), an email header spoofing analyzer (SPF / DKIM / DMARC verification), an interactive cyber education hub with quizzes, and a modern glassmorphic cyberpunk interface.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [1. Advanced URL Phishing Scanner (17+ Rules)](#1-advanced-url-phishing-scanner-17-rules)
  - [2. Email Header Spoofing Analyzer](#2-email-header-spoofing-analyzer)
  - [3. Cybersecurity Awareness Hub & Interactive Quiz](#3-cybersecurity-awareness-hub--interactive-quiz)
  - [4. Modern Cyberpunk Glassmorphic UI/UX](#4-modern-cyberpunk-glassmorphic-uiux)
- [Heuristics & Threat Scoring Algorithm](#-heuristics--threat-scoring-algorithm)
- [Complete Technology Stack](#-complete-technology-stack)
- [Architecture & Evolution: C++ PoC to TypeScript](#-architecture--evolution-c-poc-to-typescript)
- [Project Directory Structure](#-project-directory-structure)
- [Routes & Sitemap](#-routes--sitemap)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
  - [Running the C++ Proof of Concept](#running-the-c-proof-of-concept)
- [Privacy & Security Commitment](#-privacy--security-commitment)
- [Authors & License](#-authors--license)

---

## 🌟 Overview

Modern cyber threats frequently leverage deceptive URLs, lookalike characters (homoglyphs), domain typosquatting, and forged email headers to bypass traditional security perimeters. **SPSK-Threat Detector (APS-cyber)** provides a fast, privacy-first, client-side threat detection suite alongside educational resources to empower users against social engineering attacks.

### Why SPSK-Threat Detector?
- 🔒 **100% Client-Side Privacy**: Scans are performed directly in your browser. URLs, parameters, and sensitive raw email headers never leave your machine or touch third-party logging servers.
- ⚡ **Zero Latency (0ms API Overhead)**: Local heuristic evaluation yields instant threat intelligence without waiting on remote network calls.
- 🎯 **Deep Multi-Vector Detection**: Combines Shannon entropy calculation, homoglyph mapping, brand typosquatting recognition, and protocol checks to catch zero-day phishing links.
- 🎓 **Educational Gamification**: Bridges threat detection with real-world security literacy through interactive quizzes and actionable security guidelines.

---

## 🛡️ Key Features

### 1. Advanced URL Phishing Scanner (17+ Rules)
The core detection engine inspects incoming URLs through a multi-layered heuristic rule engine:
- **Homoglyph & Punycode (IDN) Attack Detection**: Catches spoofed domains using lookalike Cyrillic/Greek Unicode characters (e.g., substituting Cyrillic `а` for Latin `a`) or `xn--` Punycode encodings.
- **Brand Impersonation & Typosquatting**: Detects unauthorized variations and 1-character edit distances against trusted domains (Google, Microsoft, Apple, Amazon, PayPal, Netflix, major banking institutions).
- **Shannon Domain Entropy Calculation**: Computes mathematical entropy ($H(X) = -\sum P(x) \log_2 P(x)$) on domain labels to detect algorithmically generated domains (DGA) and randomized malware hosts.
- **Deceptive Structure & Length Analysis**: Identifies excessively long URLs (>75 / >150 chars), excessive hyphens, and high subdomain depth (>3 levels).
- **Credential Harvesting & Browser Confusion**: Flags `@` symbol injection (used to disguise the true landing host) and percent-encoded hex obfuscation in domain names.
- **Protocol & Network Validation**: Flags unencrypted HTTP connections, non-standard web ports (e.g., `:8080`, `:8888`), and raw IP addresses used in place of domain names.
- **Malicious Payload Indicators**: Catches executable double extensions (e.g., `.pdf.exe`, `.scr`, `.bat`) and dangerous URI schemes (`data:`, `javascript:`).
- **High-Risk TLD & Shortener Profiling**: Flags suspicious top-level domains (`.xyz`, `.top`, `.tk`, `.zip`, `.mov`, `.ru`, `.click`, etc.) and popular URL shortener masks (`bit.ly`, `tinyurl.com`, `t.co`, etc.).

### 2. Email Header Spoofing Analyzer
Inspects raw RFC-822 email headers to identify business email compromise (BEC) and phishing attempts:
- **Envelope / Header Mismatch**: Verifies alignment between the `From:` display address and the `Return-Path:` bounce address.
- **SPF (Sender Policy Framework)**: Analyzes `Received-SPF` and authentication records to verify if the sending IP is authorized.
- **DKIM (DomainKeys Identified Mail)**: Validates cryptographic signatures to detect in-transit message tampering.
- **DMARC Compliance**: Checks policy enforcement results (`pass` vs. `fail`) to detect domain spoofing.

### 3. Cybersecurity Awareness Hub & Interactive Quiz
- **Topic Deep Dives**: Comprehensive knowledge bases on Phishing Attacks, Password Security & MFA, Safe Browsing, and Data Protection.
- **Interactive Cyber Quiz**: Client-side assessment engine derived from the original C++ quiz logic, providing instant scorecards, answer explanations, and security recommendations.

### 4. Modern Cyberpunk Glassmorphic UI/UX
- **Design System**: Hand-crafted glassmorphism styling utilizing backdrop filters, dynamic neon gradients, and micro-animations.
- **First-Class Theming**: Seamless dark and light mode toggle powered by custom theme context and Tailwind CSS variables.
- **Responsive & Accessible**: Optimized for mobile screens, tablets, and desktops using Radix UI primitives.

---

## 📊 Heuristics & Threat Scoring Algorithm

The threat engine assigns each URL an aggregate risk score normalized between **0 and 100** based on weighted heuristic rules:

$$\text{Risk Score} = \min\left(\sum_{i=1}^{n} w_i, 100\right)$$

| Rule Description | Trigger Condition | Severity | Weight ($w_i$) |
| :--- | :--- | :---: | :---: |
| **Homoglyph Characters** | Lookalike Unicode characters (e.g., Cyrillic 'а') | Critical | +30 |
| **Dangerous URI Scheme** | `javascript:` or `data:` URL schemes | Critical | +30 |
| **IP Address as Host** | Raw IPv4 address in URL | Critical | +25 |
| **Brand Impersonation** | Typosquatting / Unauthorized brand usage | Critical | +25 |
| **Double File Extension** | Camouflaged download (e.g., `.pdf.exe`) | Critical | +25 |
| **Punycode Domain** | `xn--` encoded domain | High | +20 |
| **`@` Symbol Injection** | `@` present before host | High | +20 |
| **Suspicious TLD** | Domain ends with `.xyz`, `.top`, `.tk`, `.zip`, etc. | High | +18 |
| **No HTTPS Encryption** | Plaintext `http://` protocol | High | +15 |
| **Encoded Characters** | Percent-encoded hex characters in domain | High | +15 |
| **Excessive URL Length** | $>75$ characters ($+10$), $>150$ characters ($+15$) | Medium / High | +10 to +15 |
| **Suspicious Keywords** | Presence of `login`, `verify`, `bank`, `secure`, etc. | Medium / High | +5 per kw (max 20) |
| **Excessive Subdomains** | Domain contains $>3$ dots | Medium | +12 |
| **URL Shortener** | Domain matches `bit.ly`, `tinyurl.com`, `t.co`, etc. | Medium | +12 |
| **Excessive Dashes** | Domain contains $>3$ hyphens | Medium | +10 |
| **Non-Standard Port** | Port specified $\neq 80, 443$ | Medium | +10 |
| **High Domain Entropy** | Shannon entropy $> 4.0$ with domain length $> 12$ | Medium | +10 |

### Threat Verdict Levels

```text
[ 0 ──────── 19 ]   ==>   🟢 SAFE       (Minimal or standard web indicators)
[ 20 ─────── 49 ]   ==>   🟡 SUSPICIOUS (Multiple warning flags; proceed with caution)
[ 50 ────── 100 ]   ==>   🔴 MALICIOUS  (High probability of phishing or exploit)
```

---

## 💻 Complete Technology Stack

### Frontend Core & Architecture
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **[React](https://reactjs.org/)** | `^18.3.1` | Declarative UI framework with functional components and hooks |
| **[TypeScript](https://www.typescriptlang.org/)** | `^5.8.3` | Static typing, interface definitions, and compile-time safety |
| **[Vite](https://vitejs.dev/)** | `^5.4.19` | High-performance build tool with SWC fast refresh and rapid HMR |
| **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)** | `^3.11.0` | Speedy Web Compiler (SWC) for instant JSX/TSX transpilation |
| **[React Router DOM](https://reactrouter.com/)** | `^6.30.1` | Client-side routing, navigation, and SPA route management |
| **[TanStack React Query](https://tanstack.com/query/latest)** | `^5.83.0` | Asynchronous state management and caching layer |

### Styling & Design System
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **[Tailwind CSS](https://tailwindcss.com/)** | `^3.4.17` | Utility-first CSS framework with JIT compilation |
| **[PostCSS](https://postcss.org/)** | `^8.5.6` | CSS post-processor for modern vendor prefixing |
| **[Autoprefixer](https://github.com/postcss/autoprefixer)** | `^10.4.21` | Automatic CSS vendor prefix parsing |
| **[tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)** | `^1.0.7` | Keyframe and entrance animation utilities for Tailwind |
| **[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)** | `^0.5.16` | Beautiful typographic styling defaults for rich content |
| **[next-themes](https://github.com/pacocoursey/next-themes)** | `^0.3.0` | Theme switching infrastructure supporting system, dark, and light modes |

### UI Component Library & Primitives
| Component Library / Primitive | Version | Description |
| :--- | :--- | :--- |
| **[Radix UI Primitives](https://www.radix-ui.com/)** | `Various` | Headless, accessible primitives (Dialogs, Dropdowns, Popovers, Tabs, Tooltips, Accordions, Sliders, Checkboxes, etc.) |
| **[Shadcn UI](https://ui.shadcn.com/)** | `v0.x` | Reusable component architecture built with Tailwind CSS & Radix |
| **[Lucide React](https://lucide.dev/)** | `^0.462.0` | Modern, consistent icon library |
| **[Recharts](https://recharts.org/)** | `^2.15.4` | Composable SVG chart rendering for metrics and threat indicators |
| **[Sonner](https://sonner.emilkowal.ski/)** | `^1.7.4` | Modern toast notification manager |
| **[Embla Carousel React](https://www.embla-carousel.com/)** | `^8.6.0` | Fluid carousel and touch-slider interactions |
| **[CMDK](https://cmdk.paco.me/)** | `^1.1.1` | Fast, unstyled command menu primitive |
| **[Vaul](https://vaul.emilkowal.ski/)** | `^0.9.9` | Mobile-friendly drawer component |
| **[Input OTP](https://input-otp.rodz.dev/)** | `^1.4.2` | Accessible one-time password input component |
| **[React Resizable Panels](https://github.com/bvaughn/react-resizable-panels)** | `^2.1.9` | Flexible resizable layout containers |

### Form Validation & Utility Libraries
| Library | Version | Purpose |
| :--- | :--- | :--- |
| **[React Hook Form](https://react-hook-form.com/)** | `^7.61.1` | Performant, flexible form state management |
| **[Zod](https://zod.dev/)** | `^3.25.76` | TypeScript-first schema declaration and data validation |
| **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** | `^3.10.0` | Validation resolvers linking React Hook Form with Zod schemas |
| **[clsx](https://github.com/lukeed/clsx)** | `^2.1.1` | Conditional className construction utility |
| **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** | `^2.6.0` | Conflict-free utility class merging (`cn` utility) |
| **[class-variance-authority](https://cva.style/docs)** | `^0.7.1` | Declarative variant configuration for components |
| **[date-fns](https://date-fns.org/)** | `^3.6.0` | Modern JavaScript date utility library |

### Algorithmic Baseline / PoC
| Technology | Standard | Purpose |
| :--- | :--- | :--- |
| **C++** | `C++17 / C++20` | Proof-of-concept algorithmic validation for phishing detection (`Phishing.cpp`) and CSF cybersecurity quiz logic (`Quiz_CSF.cpp`) |
| **Standard Library (`<regex>`, `<string>`, `<vector>`)** | STL | String tokenization, regular expression evaluation, and score calculation |

### Development, Linting & Build Tools
| Tool | Version | Purpose |
| :--- | :--- | :--- |
| **[ESLint](https://eslint.org/)** | `^9.32.0` | Pluggable linting framework (Flat config) |
| **[typescript-eslint](https://typescript-eslint.io/)** | `^8.38.0` | TypeScript tooling and AST parser for ESLint |
| **[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)** | `^5.2.0` | Enforcement of React Hooks rules |
| **[eslint-plugin-react-refresh](https://www.npmjs.com/package/eslint-plugin-react-refresh)** | `^0.4.20` | Fast refresh lint validation for Vite |
| **Package Managers** | `npm` / `bun` | Dependency resolution and lockfile synchronization |

---

## 🧠 Architecture & Evolution: C++ PoC to TypeScript

The project was engineered with a structured two-phase architecture:

```text
┌─────────────────────────────────┐       Migration & Expansion       ┌─────────────────────────────────┐
│     C++ Logic Prototypes        │  ───────────────────────────────► │  Production TypeScript Engine   │
│   (CPP_LOGIC_PAGES/*.cpp)       │                                   │   (src/pages/ThreatDetector.tsx)│
├─────────────────────────────────┤                                   ├─────────────────────────────────┤
│ • Phishing.cpp (8 Rules)        │                                   │ • 17+ Advanced Detection Rules  │
│ • Quiz_CSF.cpp (CLI Quiz)       │                                   │ • Homoglyph & Typosquat Mapping │
│ • Static Console I/O Execution  │                                   │ • Shannon Entropy Math Engine   │
│ • Deterministic Pattern Matching│                                   │ • Email Header RFC Parser       │
└─────────────────────────────────┘                                   │ • Zero-Server Client-Side UI    │
                                                                      └─────────────────────────────────┘
```

1. **Initial Proof of Concept (C++)**:
   - `CPP_LOGIC_PAGES/Phishing.cpp`: Established baseline string checks (length, `@` symbol, hyphens, IP matching via regex, HTTP protocol, keyword vectors, dot count, and TLD checks).
   - `CPP_LOGIC_PAGES/Quiz_CSF.cpp`: Structured question-and-answer data models, option indexing, and scoring logic.
2. **Production Web Implementation (TypeScript/React)**:
   - Ported and vastly expanded into `src/pages/ThreatDetector.tsx` with Shannon entropy calculations, homoglyph mapping across 14 character classes, brand impersonation distance matching, and email header RFC parsing.
   - Interactive quiz ported into `src/pages/Cybersecurity.tsx` with dynamic feedback and review states.

---

## 📁 Project Directory Structure

```text
APS-cyber/
├── CPP_LOGIC_PAGES/          # Algorithmic Proof-of-Concept Implementations
│   ├── Phishing.cpp          # Baseline C++ URL detection rules & test runner
│   └── Quiz_CSF.cpp          # Baseline C++ cybersecurity awareness quiz
├── public/                   # Static assets, icons, and favicon
├── src/
│   ├── assets/               # Local images and graphic assets
│   ├── components/           # UI Components
│   │   ├── ui/               # 49+ Shadcn UI / Radix primitive components
│   │   │   ├── button.tsx    # Accessible button variants
│   │   │   ├── card.tsx      # Glassmorphic card containers
│   │   │   ├── badge.tsx     # Threat status badges
│   │   │   ├── input.tsx     # Form input controls
│   │   │   ├── textarea.tsx  # Header input controls
│   │   │   └── ...           # Tabs, Dialogs, Tooltips, Sheets, etc.
│   │   ├── FeatureCard.tsx   # Feature showcase card component
│   │   ├── Footer.tsx        # Application footer with navigation & social links
│   │   ├── Navigation.tsx    # Responsive floating navbar & theme switcher
│   │   └── ThemeProvider.tsx # Theme state provider (Dark/Light mode)
│   ├── hooks/                # Custom React Hooks
│   │   ├── use-mobile.tsx    # Mobile viewport detection hook
│   │   └── use-toast.ts      # Toast notification trigger hook
│   ├── lib/
│   │   └── utils.ts          # Class merging utility (clsx + tailwind-merge)
│   ├── pages/                # Application Page Views / Routes
│   │   ├── Home.tsx          # Landing page with hero, stats & feature highlights
│   │   ├── ThreatDetector.tsx# Threat detection engine (URL & Email analysis)
│   │   ├── Cybersecurity.tsx # Security knowledge base & interactive quiz
│   │   ├── About.tsx         # Platform values, mission & team overview
│   │   ├── Contact.tsx       # Interactive support inquiry form
│   │   ├── Index.tsx         # Root redirect handler
│   │   └── NotFound.tsx      # Custom 404 error page
│   ├── App.css               # Base component styles
│   ├── App.tsx               # Main application layout, providers & route definitions
│   ├── index.css             # Design tokens, color system & glassmorphism utilities
│   ├── main.tsx              # React DOM entry point
│   └── vite-env.d.ts         # Vite client type declarations
├── dist/                     # Optimized production build artifacts
├── components.json           # Shadcn UI configuration file
├── eslint.config.js          # ESLint 9 configuration
├── index.html                # HTML5 entry template with SEO metadata
├── package.json              # Project dependencies, scripts & metadata
├── postcss.config.js         # PostCSS plugins configuration
├── tailwind.config.ts        # Tailwind theme extensions & animations
├── tsconfig.json             # Root TypeScript configuration
├── tsconfig.app.json         # Browser-specific TypeScript compiler options
├── tsconfig.node.json        # Node-specific TypeScript compiler options
├── vite.config.ts            # Vite configuration with alias paths
├── bun.lockb                 # Bun lockfile
└── README.md                 # Project documentation
```

---

## 🗺️ Routes & Sitemap

| Route | Page | Purpose |
| :--- | :--- | :--- |
| `/` | [Home](src/pages/Home.tsx) | Landing page with platform capabilities, statistics, and quick CTA |
| `/detector` | [ThreatDetector](src/pages/ThreatDetector.tsx) | Interactive URL Phishing Scanner & Email Header Spoofing Analyzer |
| `/cybersecurity` | [Cybersecurity](src/pages/Cybersecurity.tsx) | Knowledge hub covering phishing, passwords, safe browsing & interactive quiz |
| `/about` | [About](src/pages/About.tsx) | Platform mission, security philosophy, and team profile |
| `/contact` | [Contact](src/pages/Contact.tsx) | Interactive contact form with simulated dispatch and feedback |
| `*` | [NotFound](src/pages/NotFound.tsx) | Friendly 404 error route with return navigation |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher ([Download Node.js](https://nodejs.org/))
- **npm** (comes with Node.js) or **bun** ([Install Bun](https://bun.sh/))
- *(Optional for C++ PoC)*: **g++** / **clang++** with C++17 support

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ParagBhat2007/APS-cyber.git
   cd APS-cyber
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```
   *Or if using Bun:*
   ```bash
   bun install
   ```

### Running the Development Server

Start Vite's development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to:
```text
http://localhost:5173
```

### Building for Production

To create an optimized, minified production build in the `dist` directory:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

### Code Quality & Linting

Run ESLint to check for code quality and syntax issues:
```bash
npm run lint
```

### Running the C++ Proof of Concept

To execute the baseline C++ algorithms:

```bash
# Navigate to the C++ logic folder
cd CPP_LOGIC_PAGES

# Compile and run the Phishing Detection algorithm
g++ -std=c++17 Phishing.cpp -o phishing
./phishing

# Compile and run the Cybersecurity Quiz CLI
g++ -std=c++17 Quiz_CSF.cpp -o quiz
./quiz
```

---

## 🔐 Privacy & Security Commitment

- **No Remote Scanning**: URLs and email headers analyzed within the application are **never** transmitted to remote backends, databases, or third-party telemetry providers.
- **Client-Side Processing**: All regex validations, entropy formulas, homoglyph mappings, and header parsers execute within your browser's sandboxed JavaScript runtime.
- **Defensive Design**: The application does not perform active HTTP fetches to target URLs, preventing malicious servers from detecting your IP or triggering drive-by downloads.

---

## 👥 Authors & Acknowledgments

- **Lead Developer**: [Parag Bhat](https://github.com/ParagBhat2007)
- **Project**: SPSK-Threat Detector / APS-cyber
- **Repository**: [github.com/ParagBhat2007/APS-cyber](https://github.com/ParagBhat2007/APS-cyber)

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
