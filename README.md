# Photo Gallery Web App

A clean, responsive photo gallery web app built with **React**, **Vite**, and **Tailwind CSS**. This project fetches curated photos from the free public Picsum Photos API, displays them in a fully responsive grid, allows real-time author search filtering, and manages user favourites with persistence.

---

## 🚀 Features & Requirements

1. **React + Vite + Tailwind CSS**: Clean modern setup with zero third-party UI component libraries (no MUI, Bootstrap, or Ant Design).
2. **Picsum Photos API Integration**: Fetches 30 photos on initial load via `https://picsum.photos/v2/list?limit=30` with dedicated loading spinner and error handling.
3. **Responsive Grid**:
   - **Desktop**: 4 columns (`lg:grid-cols-4`)
   - **Tablet**: 2 columns (`md:grid-cols-2`)
   - **Mobile**: 1 column (`grid-cols-1`)
4. **Real-time Search Filter**: Instant client-side search by author name with zero page reload and zero redundant API requests.
5. **Favourites with `useReducer`**: Heart icon toggles favourite status managed cleanly via `useReducer` and persisted to `localStorage`.
6. **Custom Hook (`useFetchPhotos`)**: Clean separation of data-fetching concerns, returning `{ photos, loading, error }`.
7. **Performance Optimization (`useCallback` + `useMemo`)**:
   - `useCallback` on the search input change handler.
   - `useMemo` for client-side author filtering.

---

## 📁 Project Structure

```text
├── public/
├── src/
│   ├── components/
│   │   ├── ErrorMessage.jsx      # Error banner with retry option
│   │   ├── Gallery.jsx           # Main gallery container (hooks, search, grid)
│   │   ├── LoadingSpinner.jsx    # Tailwind-only animated loading spinner
│   │   ├── PhotoCard.jsx         # Card displaying photo, author, & heart toggle
│   │   └── SearchBar.jsx         # Accessible real-time search input
│   ├── hooks/
│   │   └── useFetchPhotos.js     # Custom hook for Picsum API fetching
│   ├── reducers/
│   │   └── favouritesReducer.js  # useReducer logic + localStorage persistence
│   ├── App.jsx                   # Root layout component
│   ├── index.css                 # Tailwind CSS styles
│   └── main.jsx                  # React application entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for production
```bash
npm run build
```

---

## 📄 License
MIT License.

