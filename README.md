# APS-cyber - Cybersecurity Awareness & Threat Detection

A modern, responsive web application designed to promote cybersecurity awareness and provide interactive tools for detecting threats like phishing URLs and spoofed emails.

## 🌟 Features

### 🛡️ Threat Detector
An advanced, browser-local analysis engine that provides real-time threat intelligence without sending your sensitive data to external servers.
- **URL Phishing Scanner**: Analyzes URLs against 17+ security rules including homoglyph (lookalike) character detection, excessive subdomains, brand impersonation, suspicious TLDs, and URL entropy.
- **Email Header Analyzer**: Scans raw email headers to detect spoofing attempts by validating SPF, DKIM, and DMARC results, and identifying From/Return-Path domain mismatches.

### 📚 Cybersecurity Education
- **Knowledge Base**: Educational content to help users understand digital threats.
- **Interactive Quizzes**: Test your knowledge on safe digital practices (conceptualized in the C++ logic pages).

### 🎨 Modern UI/UX
- **Glassmorphism Aesthetic**: Sleek, modern design with dynamic gradients and micro-animations.
- **Fully Responsive**: Optimized for both desktop and mobile devices.
- **Dark/Light Mode**: First-class theme support.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (built on [Radix UI](https://www.radix-ui.com/))
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [TanStack React Query](https://tanstack.com/query/latest)

---

## 📁 Project Structure

```text
APS-cyber/
├── src/
│   ├── pages/             # Application routes
│   │   ├── Home.tsx             # Landing page
│   │   ├── Cybersecurity.tsx    # Cyber awareness hub
│   │   ├── ThreatDetector.tsx   # Core URL/Email analysis engine
│   │   ├── About.tsx            # About page
│   │   ├── Contact.tsx          # Contact form
│   │   └── NotFound.tsx         # 404 Error page
│   ├── components/        # Reusable UI components (buttons, cards, inputs)
│   ├── lib/               # Utility functions
│   └── App.tsx            # Root component and Route definitions
├── CPP_LOGIC_PAGES/       # Proof of Concept (PoC) logic implementations
│   ├── Phishing.cpp       # Baseline C++ logic for phishing detection
│   └── Quiz_CSF.cpp       # Baseline C++ logic for cybersecurity quizzes
├── public/                # Static assets
└── package.json           # Project dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and `npm` installed.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd APS-cyber
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

### Building for Production

To create a production-ready build:
```bash
npm run build
```
The optimized files will be generated in the `dist` folder.

---

## 🧠 About the Threat Engine

The core logic of the `ThreatDetector` was conceptualized in C++ (found in `CPP_LOGIC_PAGES/Phishing.cpp`) and fully ported into TypeScript (`src/pages/ThreatDetector.tsx`) for client-side execution. 

This approach ensures privacy, as URLs and Email headers are analyzed directly in the user's browser without external API calls, calculating a risk score based on weighted heuristic rules.
