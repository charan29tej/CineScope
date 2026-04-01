const API_KEY = 'f91a60ec94bfe3f5a0083d341ee1ca70';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';


async function fetchTrendingMovies(page = 1) {
  const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`);
  if (!response.ok) throw new Error('Failed to fetch movies');
  const data = await response.json();
  return data.results;
}


async function fetchTrendingTV(page = 1) {
  const response = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=${page}`);
  if (!response.ok) throw new Error('Failed to fetch TV shows');
  const data = await response.json();
  return data.results;
}


async function fetchAll(page = 1) {
  const [movies, tvShows] = await Promise.all([
    fetchTrendingMovies(page),
    fetchTrendingTV(page)
  ]);


  const taggedMovies = movies.map(item => ({ ...item, media_type: 'movie' }));
  const taggedTV = tvShows.map(item => ({ ...item, media_type: 'tv' }));


  const combined = [];
  const maxLen = Math.max(taggedMovies.length, taggedTV.length);
  for (let i = 0; i < maxLen; i++) {
    if (taggedMovies[i]) combined.push(taggedMovies[i]);
    if (taggedTV[i]) combined.push(taggedTV[i]);
  }
  return combined;
}
