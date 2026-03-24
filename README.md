# CineScope — Movie & TV Show Explorer

A modern, responsive web application for discovering and exploring movies and TV shows using the [TMDB (The Movie Database) API](https://www.themoviedb.org/documentation/api).

---

## Project Purpose

CineScope allows users to browse trending movies and TV shows, search for titles, filter by genre or rating, and save their favorites — all within a clean, dark-mode-friendly interface built with Tailwind CSS.

---

## API Used

**TMDB API** — [https://www.themoviedb.org/documentation/api](https://www.themoviedb.org/documentation/api)

- Free to use with account registration
- Provides endpoints for trending movies, TV shows, genres, search, and more
- Returns rich data: posters, ratings, release dates, overviews, genres

**Key Endpoints:**
| Endpoint | Purpose |
|---|---|
| `/trending/movie/week` | Fetch trending movies |
| `/trending/tv/week` | Fetch trending TV shows |
| `/search/multi` | Search across movies & shows |
| `/genre/movie/list` | Get genre list for filtering |

---

## Planned Features

### Core Features
- 🔍 **Search** — Search movies and TV shows by title using a live search bar (with debouncing)
- 🎛️ **Filter** — Filter results by genre, media type (movie/TV), and minimum rating
- 🔃 **Sort** — Sort results by popularity, release date, or rating (ascending/descending)
- ❤️ **Favorites** — Like and save favorite titles; persisted using Local Storage
- 🌙 **Dark / Light Mode** — Toggle between themes; preference saved in Local Storage

### Bonus Features (Planned)
- Debouncing on the search input to reduce unnecessary API calls
- Pagination for browsing large result sets
- Loading indicators while data is being fetched
- Local Storage for saving favorites and theme preference

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| Tailwind CSS | Styling and responsive layout |
| Vanilla JavaScript (ES6+) | Logic, API calls, interactivity |
| TMDB API | Movie and TV show data source |
| Fetch API | HTTP requests to TMDB |
| Local Storage | Persisting favorites and theme |
| GitHub Pages | Deployment |

---

## Project Structure (Planned)

```
cinescope/
├── index.html          # Main HTML file
├── style.css           # Custom styles (alongside Tailwind)
├── js/
│   ├── api.js          # All fetch/API logic
│   ├── ui.js           # DOM rendering functions
│   ├── filter.js       # Search, filter, sort using Array HOFs
│   └── app.js          # Main entry point, event listeners
└── README.md
```

---

## Setup & Running the Project

1. **Clone the repository**
   ```bash
   git clone https://github.com/charan29tej/cinescope.git
   cd cinescope
   ```

2. **Get a TMDB API Key**
   - Sign up at [https://www.themoviedb.org/](https://www.themoviedb.org/)
   - Go to Settings → API → Request an API key (free)

3. **Add your API Key**
   - Open `js/api.js`
   - Replace `YOUR_API_KEY` with your actual TMDB API key

4. **Run the project**
   - Open `index.html` directly in a browser, **or**
   - Use the Live Server extension in VS Code for a better dev experience

> No build tools or npm install required — this is a plain HTML/CSS/JS project.

---

## Milestones

| Milestone | Description | Deadline |
|---|---|---|
| ✅ Milestone 1 | Project setup, API selection, README | 23rd March |
| 🔲 Milestone 2 | API integration, display data, responsiveness | 1st April |
| 🔲 Milestone 3 | Search, filter, sort, favorites, dark mode | 8th April |
| 🔲 Milestone 4 | Final cleanup, documentation, deployment | 10th April |

---

## 👨‍💻 Author

- **GitHub:** charan29tej(https://github.com/charan29tej)

---

> _This project is submitted as part of a web development course assignment._

