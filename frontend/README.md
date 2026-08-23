# MediVision AI - Frontend client

This directory contains the React frontend client for **MediVision AI**, structured as a single-page application (SPA) built using Vite, TypeScript, and Tailwind CSS.

---

## 🛠️ Tech Stack & Dependencies

* **Build Tool**: [Vite](https://vitejs.dev/) (extremely fast frontend toolchain)
* **Frontend Framework**: [React](https://react.dev/) (v18)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
* **Icons**: [Lucide React](https://lucide.dev/) (modern, clean SVG icons)
* **Utilities**:
  * `clsx` & `tailwind-merge` (clean, conditional Tailwind class configurations)
  * `concurrently` (runs frontend and backend concurrently in local dev environment)

---

## 📁 Codebase Layout

```text
frontend/
├── public/                 # Static public assets (icons, images)
├── src/
│   ├── components/         # Reusable layouts and visual components
│   │   ├── results/        # Results viewers tailored for each service type
│   │   │   ├── XRayResultView.tsx         # Heatmap overlay + pathology breakdown
│   │   │   ├── PrescriptionResultView.tsx  # Translated schedule + abbreviation parser
│   │   │   └── BillResultView.tsx          # Itemized charges audit + alerts list
│   │   ├── Header.tsx      # Top branding bar
│   │   ├── Sidebar.tsx     # Navigation and service selection controls
│   │   ├── MobileNav.tsx   # Hamburger menus for small screens
│   │   ├── MedicalDisclaimerBanner.tsx # Prominent warning panels
│   │   ├── UploadMedicalFile.tsx   # File drag & drop, file validator
│   │   └── ProcessingStepper.tsx    # Multi-stage custom pipeline progress indicator
│   ├── pages/              # SPA route pages
│   │   ├── HomePage.tsx       # Welcoming dashboard and core feature selection
│   │   ├── UploadPage.tsx     # Upload interface wrapper for a chosen service
│   │   ├── ProcessingPage.tsx # Animated stage loader during backend API execution
│   │   ├── ResultsPage.tsx    # Visual results layout mounting appropriate results viewer
│   │   ├── HistoryPage.tsx    # User's uploaded file history archive
│   │   └── SettingsPage.tsx   # Language preferences and config settings
│   ├── services/           # Backend communication utilities
│   │   └── api.ts             # API request controller connecting client to FastAPI
│   ├── data/
│   │   └── mockData.ts        # Seed mock information
│   ├── types/
│   │   └── medivision.ts      # TypeScript interfaces and enum definitions
│   ├── App.tsx             # Main router and state layout coordinator
│   └── main.tsx            # DOM root mounting entrypoint
├── package.json            # Node modules, commands and dependencies
├── tailwind.config.cjs     # Custom tailwind theme colors (Medical Teals, Cyans, Emeralds)
└── tsconfig.json           # Strict TypeScript configuration
```

---

## ⚙️ Environment Variables Config

By default, the API route selector inside `src/services/api.ts` resolves the API backend base URL dynamically:
1. **Local environment variable overrides**: Reads `import.meta.env.VITE_API_URL`.
2. **Relative path fallback**: If the app is run from the same port as the FastAPI backend (i.e. port `8000` or `8001`), relative paths (`/api/...`) are used to prevent CORS issues.
3. **External fallback**: If hosted externally (like on Vercel) and no local URL is defined, it defaults to the live Render staging backend: `https://medivision-klek.onrender.com`.

To override this, create/edit `frontend/.env.local`:
```env
VITE_API_URL=http://localhost:8001
```

---

## 💻 Script Commands

Run these command-line scripts inside the `/frontend` directory:

| Script | Command | Purpose |
|--------|---------|---------|
| `npm run dev` | `concurrently "npm run dev:frontend" "npm run dev:backend"` | Launches both Vite frontend dev server and FastAPI backend concurrently (requires `.venv` virtual environment to be set up in the root directory). |
| `npm run dev:frontend` | `vite` | Starts the Vite development server locally on `http://localhost:5173`. |
| `npm run dev:backend` | `python ../backend/main.py` | Launches the backend from the frontend directory. |
| `npm run build` | `vite build` | Compiles source files and bundles static assets into `/dist` for production deployment. |
| `npm run preview` | `vite preview` | Previews the compiled production build locally. |
| `npm run lint` | `eslint .` | Runs ESLint utility checks on frontend codebase files. |
