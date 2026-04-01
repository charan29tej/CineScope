
let currentTab = 'both'; 
let currentPage = 1;
let isLoading = false;


async function loadContent(append = false) {
  if (isLoading) return;
  isLoading = true;

  if (!append) {
    currentPage = 1;
    showLoading();
  }

  try {
    let items = [];

    if (currentTab === 'movies') {
      const data = await fetchTrendingMovies(currentPage);
      items = data.map(i => ({ ...i, media_type: 'movie' }));
    } else if (currentTab === 'tv') {
      const data = await fetchTrendingTV(currentPage);
      items = data.map(i => ({ ...i, media_type: 'tv' }));
    } else {
      items = await fetchAll(currentPage);
    }

    renderCards(items, append);
    document.getElementById('load-more-btn').classList.remove('hidden');

  } catch (err) {
    console.error(err);
    showError();
  } finally {
    isLoading = false;
  }
}


function loadMore() {
  currentPage++;
  loadContent(true);
}


function switchTab(tab) {
  currentTab = tab;

  document.getElementById('tab-movies').classList.toggle('tab-active', tab === 'movies');
  document.getElementById('tab-tv').classList.toggle('tab-active', tab === 'tv');

  loadContent(false);
}


function toggleTheme() {
  const body = document.getElementById('body-root');
  const btn = document.getElementById('theme-toggle');

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


initTheme();
loadContent();
