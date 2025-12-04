**Rainwater Convention — Implementation & Run Guide**

**Project summary**
- A 4-page website (Home, FAQs, Registration, Admin) built with React + Vite. The registration form validates inputs and stores participant records in the browser using `localStorage`. The Admin page lists participants and allows deletion with confirmation.

**What I implemented**
- Pages and routing: `Home`, `FAQs`, `Register`, `Admin` wired with `react-router-dom`.
- Registration form: controlled inputs, client-side validation (required fields and email format), SweetAlert2 dialogs for validation errors and success messages.
- Persistence: client-only storage using `localStorage` under the key `rainwater_participants` (no backend required).
- Admin portal: reads participants from `localStorage`, displays a table, and supports deletion with SweetAlert2 confirmation.
- Styling: Tailwind CSS utilities are used across the app.

**Files & locations (important)**
- `client/` — front-end app (Vite + React).
  - `client/src/pages/Home.jsx`
  - `client/src/pages/FAQs.jsx`
  - `client/src/pages/Register.jsx` (registration logic + localStorage writes)
  - `client/src/pages/Admin.jsx` (reads localStorage + delete)
  - `client/src/components/Navbar.jsx` (navigation)

**Quick start — Run locally (development)**
1. Open a terminal and install client dependencies:

```powershell
cd d:/rainwater-convention/client
npm install
```

2. Start the Vite dev server:

```powershell
npm run dev
# open the printed URL (usually http://localhost:5173)
```

3. Test the app:
- Go to `Register`, submit a valid participant (name, email, phone, organization).
- The app shows a SweetAlert2 success modal and saves the record to `localStorage`.
- Open `Admin` to view and delete participants (deletions show a confirmation dialog and update storage).

**Build & preview (production)**

```powershell
cd d:/rainwater-convention/client
npm run build
npm run preview
```

**Deploying**
- The client builds to `client/dist/` and can be deployed to any static host (Netlify, Vercel, GitHub Pages, nginx). For static hosts, point the deploy target to the `dist` folder produced by the client build.

**Data & persistence**
- Data is stored in-browser in `localStorage` using the key `rainwater_participants` as a JSON array of participant objects. Data is local to each browser and origin; clearing browser storage removes the records.
- To reset stored participants manually, open DevTools console and run: `localStorage.removeItem('rainwater_participants')`.

**Tools, frameworks & languages used**
- JavaScript (ES2020+), React (client)
- Vite (dev server + build)
- React Router (`react-router-dom`) for routing
- Tailwind CSS for styling utilities
- SweetAlert2 for modal dialogs (validation, confirmation, success)
- localStorage (browser) for persistence

