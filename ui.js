function showLoading() {
  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('cards-grid').classList.add('hidden');
  document.getElementById('error').classList.add('hidden');
  document.getElementById('load-more-btn').classList.add('hidden');
}


function hideLoading() {
  document.getElementById('loading').classList.add('hidden');
}


function showError() {
  hideLoading();
  document.getElementById('error').classList.remove('hidden');
  document.getElementById('cards-grid').classList.add('hidden');
  document.getElementById('load-more-btn').classList.add('hidden');
}


function createCard(item) {
  const card = document.createElement('div');
  card.className = 'cinescope-card';

  const title = item.title || item.name || 'Unknown';
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
  const year = (item.release_date || item.first_air_date || '').slice(0, 4);
  const type = item.media_type === 'tv' ? 'TV' : 'Movie';
  const badgeClass = item.media_type === 'tv' ? 'badge-tv' : 'badge-movie';

  const posterHTML = item.poster_path
    ? `<img class="card-poster" src="${IMG_BASE}${item.poster_path}" alt="${title}" loading="lazy" />`
    : `<div class="card-no-poster">🎬</div>`;

  card.innerHTML = `
    ${posterHTML}
    <div class="card-body">
      <div class="card-title" title="${title}">${title}</div>
      <div class="card-meta">
        <span class="card-rating">⭐ ${rating}</span>
        <span class="card-badge ${badgeClass}">${type}</span>
      </div>
      <div class="card-meta">
        <span>${year || '—'}</span>
      </div>
    </div>
  `;

  return card;
}


function renderCards(items, append = false) {
  const grid = document.getElementById('cards-grid');

  if (!append) {
    grid.innerHTML = '';
  }

  if (items.length === 0 && !append) {
    grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:#6b7280; padding: 64px 0;">No results found.</p>`;
  }

  items.forEach(item => {
    grid.appendChild(createCard(item));
  });

  hideLoading();
  grid.classList.remove('hidden');
}
