// PodcastModal.js
// A Web Component that displays detailed podcast info in a modal overlay
class PodcastModal extends HTMLElement {
  constructor() {
    super();
        // Shadow DOM encapsulation
    this.attachShadow({ mode: 'open' });
    this._data = null;
  }
 // Set podcast data from parent
  set data(podcast) {
    this._data = podcast;
    this.render();
  }

  connectedCallback() {
    this.render();
  }
 // Generate modal content dynamically based on podcast data
  render() {
    if (!this._data) {
      this.shadowRoot.innerHTML = '';
      return;
    }

    // Destructure data properties
    const {
      title, cover, genres, seasons, episodes, updated, description, seasonDetails = []
    } = this._data;
// Format last updated date
    const formattedDate = new Date(updated).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric'
    });

    // Generate HTML list for each season
    const seasonHTML = seasonDetails.map(season =>
  
      `<li><strong>${season.title}</strong> — ${season.episodes} episode(s)</li>`
    ).join('');

    // Inject the modal HTML template
    this.shadowRoot.innerHTML = `
      
      <style>
        :host {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }

        .modal {
          background: #fff;
          border-radius: 12px;
          max-width: 800px;
          width: 90%;
          padding: 1.5rem;
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          height:70vh;
          overflow-y:auto;
        }
          li{
          background: white;
          border:1px solid #ddd;
          border-radius:8px;
          row-gap:o.5rem;
          diplay:flex;
          margin-top:5px;
          width:50%;
          padding:0.5rem;
          list-style:none;
          cursor:pointer;
          }

        .close {
          position: absolute;
          top: 10px;
          right: 10px;
          border: none;
          background: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .content {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;

        }

        .cover {
          flex: 0 0 200px;
        }

        .cover img {
          width: 100%;
          border-radius: 8px;
        }

        .details {
          flex: 1;
        }

        .bottom-meta {
          border-top: 1px solid #eee;
          padding-top: 1rem;
          font-size: 0.9rem;
          color: #444;
        }

        .season-list {
          margin-top: 1rem;
          padding-left: 1rem;
          list-style: disc;
          font-size: 0.9rem;
          color: #444;
        }
          .Gnr{
          display:inline-block;
          padding:0.2rem;
          border-radius:4px;
          background-color:#f0f0f0;
          }

        @media (max-width: 600px) {
          .content {
            flex-direction: column;
          }
        }
      </style>

      <div class="modal">
        <button class="close" id="close">&times;</button>

        <div class="content">
          <div class="cover">
            <img src="${cover}" alt="Cover image" />
          </div>
          <div class="details">
            <h2>${title}</h2>
            <p><strong>Description:<br></strong> ${description}</p>
            <p><strong>Genres:</strong> <span class="Gnr">${genres}</span></p>
            <p><strong>Last updated:</strong> ${formattedDate}</p>
            <h3>Seasons</h3>
            <ul class="season-list">
              ${seasonHTML}
            </ul>
          </div>
        </div>

        <div class="bottom-meta">
          <strong>${seasons}</strong> season(s) • <strong>${episodes}</strong> episode(s)
        </div>
      </div>
    `;
     // Close modal on button click
        this.shadowRoot.getElementById('close').onclick = () => {
      this.remove();
    };
  }
}

customElements.define('podcast-modal', PodcastModal);