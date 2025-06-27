// Handles rendering podcast previews and setting up modal interaction
import { podcasts, genres, seasons } from './data.js';
// Convert genre IDs to readable titles
function getGenreTitles(ids) {
  return ids.map(id => genres.find(g => g.id === id)?.title || 'Unknown');
}
// Calculate total episode count from all seasons
function getTotalEpisodes(podcastId) {
  const season = seasons.find(s => s.id === podcastId);
  return season ? season.seasonDetails.reduce((sum, s) => sum + s.episodes, 0) : 0;
}

// Retrieve full list of season details for modal
function getSeasonDetails(podcastId) {
  const match = seasons.find(s => s.id === podcastId);
  return match ? match.seasonDetails : [];
}

// Enrich raw podcast data with computed values
const enriched = podcasts.map(p => ({
  ...p,
  genreTitles: getGenreTitles(p.genres).join(', '),
  totalEpisodes: getTotalEpisodes(p.id),
  seasonDetails: getSeasonDetails(p.id) // 
}));

// Render all podcast previews in the container
export function renderPodcasts(containerId = 'podcast-container') {
  const container = document.getElementById(containerId);

  enriched.forEach(p => {
    const el = document.createElement('podcast-preview');
     // Set all attributes for the preview component
    el.setAttribute('id', p.id);
    el.setAttribute('title', p.title);
    el.setAttribute('cover', p.image);
    el.setAttribute('genres', p.genreTitles);
    el.setAttribute('seasons', p.seasons);
    el.setAttribute('episodes', p.totalEpisodes);
    el.setAttribute('updated', p.updated);
    el.setAttribute('description', p.description);

    // Listen for custom event from preview
    el.addEventListener('podcast-selected', e => {
      const modal = document.createElement('podcast-modal');
       // Pass full data to modal for rendering
      modal.data = { ...e.detail, seasonDetails: p.seasonDetails }; 
      document.body.appendChild(modal);
    });

    container.appendChild(el);
  });
}
