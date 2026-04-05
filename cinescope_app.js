

let allItems    = [];       
let favorites   = [];        
let currentTab  = 'movies';  
let currentPage = 1;       
let showFavOnly = false;     
let searchTimer = null;      




async function fetchMovies(page) {
  const url  = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`;
  const res  = await fetch(url);
  const data = await res.json();
  return data.results.map(item => ({ ...item, media_type: 'movie' }));
}

async function fetchTVShows(page) {
  const url  = `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=${page}`;
  const res  = await fetch(url);
  const data = await res.json();
  return data.results.map(item => ({ ...item, media_type: 'tv' }));
}




async function loadContent(append = false) {

  if (!append) {
    currentPage = 1;
    allItems    = [];
    showLoading();
  }

  try {
    let newItems = [];

    if (currentTab === 'movies') {
      newItems = await fetchMovies(currentPage);
    } else {
      newItems = await fetchTVShows(currentPage);
    }

    if (append) {
      allItems = [...allItems, ...newItems];
    } else {
      allItems = newItems;
    }

    applyFilters();
    document.getElementById('load-more-btn').classList.remove('hidden');

  } catch (err) {
    console.error('Failed to load:', err);
    showError();
  }
}


function loadMore() {
  currentPage++;
  loadContent(true);
}




function applyFilters() {
  const searchText = document.getElementById('search-input').value.toLowerCase().trim();
  const minRating  = parseFloat(document.getElementById('rating-filter').value);
  const sortBy     = document.getElementById('sort-select').value;


  let result = showFavOnly ? [...favorites] : [...allItems];


  if (searchText !== '') {
    result = result.filter(item => {
      const title = (item.title || item.name || '').toLowerCase();
      return title.includes(searchText);
    });
  }


  if (minRating > 0) {
    result = result.filter(item => item.vote_average >= minRating);
  }


  if (sortBy === 'rating-high') {
    result = result.sort((a, b) => b.vote_average - a.vote_average);

  } else if (sortBy === 'rating-low') {
    result = result.sort((a, b) => a.vote_average - b.vote_average);

  } else if (sortBy === 'title-az') {
    result = result.sort((a, b) => {
      const ta = (a.title || a.name || '').toLowerCase();
      const tb = (b.title || b.name || '').toLowerCase();
      return ta.localeCompare(tb);
    });

  } else if (sortBy === 'title-za') {
    result = result.sort((a, b) => {
      const ta = (a.title || a.name || '').toLowerCase();
      const tb = (b.title || b.name || '').toLowerCase();
      return tb.localeCompare(ta);
    });

  } else if (sortBy === 'year-new') {
    result = result.sort((a, b) => {
      const ya = (a.release_date || a.first_air_date || '0000').slice(0, 4);
      const yb = (b.release_date || b.first_air_date || '0000').slice(0, 4);
      return yb - ya;
    });

  } else if (sortBy === 'year-old') {
    result = result.sort((a, b) => {
      const ya = (a.release_date || a.first_air_date || '0000').slice(0, 4);
      const yb = (b.release_date || b.first_air_date || '0000').slice(0, 4);
      return ya - yb;
    });
  }

  renderCards(result);
}




function handleSearch() {
  const query    = document.getElementById('search-input').value;
  const clearBtn = document.getElementById('search-clear');


  if (query.length > 0) {
    clearBtn.classList.remove('hidden');
  } else {
    clearBtn.classList.add('hidden');
  }

  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    applyFilters();
  }, 400);
}

function clearSearch() {
  document.getElementById('search-input').value = '';
  document.getElementById('search-clear').classList.add('hidden');
  applyFilters();
}




function switchTab(tab) {
  currentTab  = tab;
  showFavOnly = false;


  document.getElementById('tab-movies').classList.toggle('tab-active', tab === 'movies');
  document.getElementById('tab-tv').classList.toggle('tab-active', tab === 'tv');
  document.getElementById('fav-toggle-btn').classList.remove('fav-active');


  document.getElementById('search-input').value  = '';
  document.getElementById('sort-select').value   = 'default';
  document.getElementById('rating-filter').value = '0';
  document.getElementById('search-clear').classList.add('hidden');

  loadContent();
}




function toggleTheme() {
  const body = document.getElementById('body-root');
  const btn  = document.getElementById('theme-toggle');

  if (body.classList.contains('light')) {
    body.classList.remove('light');
    btn.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.add('light');
    btn.textContent = '☀️';
    localStorage.setItem('theme', 'light');
  }
}

function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  if (saved === 'light') {
    document.getElementById('body-root').classList.add('light');
    document.getElementById('theme-toggle').textContent = '☀️';
  }
}




function loadFavorites() {
  const saved = localStorage.getItem('cinescope-favorites');
  favorites   = saved ? JSON.parse(saved) : [];
  updateFavCount();
}

function saveFavorites() {
  localStorage.setItem('cinescope-favorites', JSON.stringify(favorites));
  updateFavCount();
}


function isFavorite(id) {
  return !!favorites.find(item => item.id === id);
}


function toggleFavorite(id, btn) {
  const alreadySaved = favorites.find(item => item.id === id);

  if (alreadySaved) {

    favorites = favorites.filter(item => item.id !== id);
    btn.textContent = '🤍';
    btn.classList.remove('fav-active');
  } else {

    const item = allItems.find(i => i.id === id);
    if (item) {
      favorites = [...favorites, item];
      btn.textContent = '❤️';
      btn.classList.add('fav-active');
    }
  }

  saveFavorites();


  if (showFavOnly) {
    renderCards(favorites);
  }
}

function updateFavCount() {
  document.getElementById('fav-count').textContent = favorites.length;
}


function toggleFavoritesView() {
  showFavOnly = !showFavOnly;

  const btn = document.getElementById('fav-toggle-btn');
  btn.classList.toggle('fav-active', showFavOnly);

  if (showFavOnly) {
    document.getElementById('load-more-btn').classList.add('hidden');
    renderCards(favorites);
  } else {
    document.getElementById('load-more-btn').classList.remove('hidden');
    applyFilters();
  }
}




initTheme();
loadFavorites();
loadContent();
