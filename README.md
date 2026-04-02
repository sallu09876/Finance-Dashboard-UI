# FinSight - Finance Dashboard UI

FinSight is a frontend-only finance analytics dashboard built as an assignment project using React + Vite.
It includes role-based actions, advanced filters, responsive charts, and dark/light mode with persistent localStorage state.

## Tech Stack

- React (Vite)
- Tailwind CSS v3
- React Router v6
- React Context API + reducer pattern
- Recharts
- Framer Motion
- date-fns
- PapaParse
- lucide-react

## Features

- Dashboard summary cards with animated counters
- Balance trend area chart and spending donut chart
- Recent transactions with formatted dates/currency
- Transaction filters (search/category/type/date range/sort)
- Admin-only add/edit/delete transaction controls
- Viewer/Admin role toggle with smooth animation
- Insights page with monthly comparison and category trends
- CSV and JSON export for currently filtered transactions
- Dark/light theme toggle across all pages
- Editable profile panel with avatar upload and local persistence
- Responsive layout with sidebar (desktop) and bottom tabs (mobile)

## Setup Instructions

```bash
npm install
npm run dev
```

## Folder Structure

```text
src/
├── context/
├── components/
│   ├── layout/
│   ├── dashboard/
│   ├── transactions/
│   ├── insights/
│   └── ui/
├── hooks/
├── data/
├── utils/
├── pages/
├── App.jsx
└── main.jsx
```

## Approach

- Global app state is managed in `AppContext` and updated through reducer actions.
- Theme state is isolated in `ThemeContext` and applies `dark` mode at root HTML level.
- Theme follows system preference on first load and stays persistent after user toggle.
- Role-based UI hides all mutating controls in Viewer mode.
- Chart and insight values are fully derived from local mock transaction data.
- Export actions only include currently visible/filtered transaction rows.
- CSV date export is Excel-safe (keeps dates readable when opened in spreadsheet apps).

## Screenshots

- Dashboard (dark mode) - _placeholder_
- Transactions page with filters - _placeholder_
- Insights page - _placeholder_
- Mobile bottom navigation - _placeholder_

## Assignment Notes

- Includes 40+ realistic transactions from Nov 2025 to Apr 2026.
- Uses only static data and frontend state; no backend/API usage.
- Implements required custom hooks (`useLocalStorage`, `useAnimatedCounter`).
- Applies consistent INR/date formatting across the app.
- Provides EmptyState fallback when transaction results are empty.
