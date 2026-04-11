# The CineScope — Movie & TV Show Explorer

A modern, responsive web application for discovering and exploring trending movies and TV shows using the [TMDB (The Movie Database) API](https://www.themoviedb.org/documentation/api).

---

## Project Purpose

CineScope allows users to browse trending movies and TV shows, search for titles, filter by genre or rating, sort results, and save their favorites — all within a clean, dark-mode-friendly interface.

---

## API Used

**TMDB API** — [https://www.themoviedb.org/documentation/api](https://www.themoviedb.org/documentation/api)

- Free to use with account registration
- Provides endpoints for trending movies, TV shows, search, and more
- Returns rich data: posters, ratings, release dates, overviews

**Key Endpoints:**

| Endpoint | Purpose |
|---|---|
| `/trending/movie/week` | Fetch trending movies |
| `/trending/tv/week` | Fetch trending TV shows |

---

## Features Implemented

### Core Features
- **Search** — Search movies and TV shows by title (with debouncing)
- **Filter** — Filter results by minimum rating
- **Sort** — Sort by rating, title (A-Z), or release year
- **Favorites** — Like and save favorite titles
- **Dark / Light Mode** — Toggle between themes

### Bonus Features
- ⏱️ **Debouncing** — Search input waits 400ms before filtering
- 📄 **Pagination** — Load More button to fetch more results
- 🔄 **Loading Indicators** — Spinner shown while data is fetching
- 💾 **Local Storage** — Favorites and theme preference are saved

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and responsive layout |
| Vanilla JavaScript (ES6+) | Logic, API calls, interactivity |
| TMDB API | Movie and TV show data source |
| Fetch API | HTTP requests to TMDB |
| Local Storage | Persisting favorites and theme |
| GitHub Pages | Deployment |

---

## Project Structure

```
CineScope/
├── cinescope.html       # Main HTML file
├── cinescope.css        # All styles
├── api.js               # API configuration (keys, base URL)
├── ui.js                # Card rendering and UI states
├── cinescope_app.js     # Main app logic (search, filter, sort, favorites)
└── README.md
```

---

## ⚙️ Array HOFs Used

| Feature | HOF Used |
|---|---|
| Search | `Array.filter()` |
| Filter by rating | `Array.filter()` |
| Sort by rating/title/year | `Array.sort()` |
| Check if favorite | `Array.find()` |
| Remove from favorites | `Array.filter()` |
| Add to favorites | `Array.find()` + spread |

---

## Setup & Running the Project

1. **Clone the repository**
   ```bash
   git clone https://github.com/charan29tej/CineScope.git
   cd CineScope
   ```

2. **Open with Live Server**
   - Open the folder in VS Code
   - Right-click `cinescope.html` → Open with Live Server

>  Did not used build tools or npm install required — plain HTML, CSS, and JS.

---

## Live Demo

[View Live on GitHub Pages](https://charan29tej.github.io/CineScope/)

---

## Milestones

| Milestone | Description | Status |
|---|---|---|
| Milestone 1 | Project setup, API selection, README | Done |
| Milestone 2 | API integration, display data, responsiveness | Done |
| Milestone 3 | Search, filter, sort, favorites, dark mode | Done |
| Milestone 4 | Documentation, deployment, final submission | Done |

---

## Author

- **GitHub:** [charan29tej](https://github.com/charan29tej)

---

> *This project is submitted as part of a web development course assignment.*
