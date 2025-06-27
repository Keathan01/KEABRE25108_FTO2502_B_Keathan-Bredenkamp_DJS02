// PodcastPreview.js
// A reusable Web Component that displays a podcast preview card

class PodcastPreview extends HTMLElement {
  constructor() {
    super();
      // Attach Shadow DOM to encapsulate styles and markup
    this.attachShadow({ mode: 'open' });
  }
// Observe relevant attributes for reactivity
  static get observedAttributes() {
    return ['id', 'cover', 'title', 'genres', 'seasons', 'episodes', 'updated', 'description'];
  }

  // Re-render the component whenever an attribute changes
  attributeChangedCallback() {
    this.render();
  }
 // Setup click listener to emit custom event when selected
  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener('click', () => {
        // Emit podcast-selected event with all relevant podcast data
      this.dispatchEvent(new CustomEvent('podcast-selected', {
        detail: {
          id: this.getAttribute('id'),
          title: this.getAttribute('title'),
          cover: this.getAttribute('cover'),
          genres: this.getAttribute('genres'),
          seasons: this.getAttribute('seasons'),
          episodes: this.getAttribute('episodes'),
          updated: this.getAttribute('updated'),
          description: this.getAttribute('description')
        },
        bubbles: true,
        composed: true
      }));
    });
  }

  // Format ISO date to human-readable string
  formatDate(iso) {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  }

  // Render the podcast preview card
  render() {
    const cover = this.getAttribute('cover') || '';
    const title = this.getAttribute('title') || '';
    const genres = this.getAttribute('genres') || '';
    const seasons = this.getAttribute('seasons') || '0';
    const episodes = this.getAttribute('episodes') || '0';
    const updated = this.formatDate(this.getAttribute('updated') || '');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          border: 1px solid #ddd;
          border-radius: 10px;
          overflow: hidden;
          max-width: 300px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          transition: transform 0.2s;
          cursor: pointer;
          background: white;
        }
        :host(:hover) {
          transform: scale(1.02);
        }
        img {
          width: 100%;
        }
        .content {
          padding: 1rem;
        }
        h3 {
          margin: 0 0 0.5rem;
          font-size: 1.1rem;
        }
        .genres {
          font-size: 0.85rem;
          color: #666;
        }
        .meta {
          margin-top: 0.5rem;
          font-size: 0.8rem;
          color: #999;
        }
      </style>
      <img src="${cover}" alt="Podcast cover" />
      <div class="content">
        <h3>${title}</h3>
        <div class="genres">${genres}</div>
        <div class="meta">${seasons} seasons • ${episodes} episodes • Updated ${updated}</div>
      </div>
    `;
  }
}

customElements.define('podcast-preview', PodcastPreview);
