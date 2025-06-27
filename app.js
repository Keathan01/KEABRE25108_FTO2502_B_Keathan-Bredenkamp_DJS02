import { podcasts, genres, seasons } from './data.js';

function getGenreTitles(ids) {
  return ids.map(id => genres.find(g => g.id === id)?.title || 'Unknown');
}

function getTotalEpisodes(podcastId) {
  const season = seasons.find(s => s.id === podcastId);
  return season ? season.seasonDetails.reduce((sum, s) => sum + s.episodes, 0) : 0;
}

function getSeasonDetails(podcastId) {
  const match = seasons.find(s => s.id === podcastId);
  return match ? match.seasonDetails : [];
}

const enriched = podcasts.map(p => ({
  ...p,
  genreTitles: getGenreTitles(p.genres).join(', '),
  totalEpisodes: getTotalEpisodes(p.id),
  seasonDetails: getSeasonDetails(p.id) // ✅ Add this
}));

export function renderPodcasts(containerId = 'podcast-container') {
  const container = document.getElementById(containerId);

  enriched.forEach(p => {
    const el = document.createElement('podcast-preview');
    el.setAttribute('id', p.id);
    el.setAttribute('title', p.title);
    el.setAttribute('cover', p.image);
    el.setAttribute('genres', p.genreTitles);
    el.setAttribute('seasons', p.seasons);
    el.setAttribute('episodes', p.totalEpisodes);
    el.setAttribute('updated', p.updated);
    el.setAttribute('description', p.description);

    el.addEventListener('podcast-selected', e => {
      const modal = document.createElement('podcast-modal');
      modal.data = { ...e.detail, seasonDetails: p.seasonDetails }; // ✅ Pass to modal
      document.body.appendChild(modal);
    });

    container.appendChild(el);
  });
}
