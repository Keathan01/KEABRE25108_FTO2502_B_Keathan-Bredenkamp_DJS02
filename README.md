# DJS02 – Web Component: Podcast Preview

# 🎧 Podcast Preview Web Component

A reusable, stateless Web Component for displaying podcast previews.  
Click a card to open a modal showing podcast details, genres, and season breakdown.

---

## 📦 Features

- Built using native Web Components (no frameworks)
- Stateless: accepts all data via attributes or properties
- Encapsulated with Shadow DOM
- Triggers custom events to communicate with the main app
- Responsive design with accessible layout
- Clean, modular JavaScript and HTML structure

---

## 🚀 Getting Started

### 📁 File Structure
- app.js
- data.js
- index.html
- PodcastModal.js
- PodcastPreview.js

## 🔧 How to Use and Register the Component

Web Components register themselves when their defining script is loaded.  
* Example
- customElements.define('podcast-preview', PodcastPreview);
- customElements.define('podcast-modal', PodcastModal);


## 📤 Instructions for Passing Data
There are two ways to pass data into the components:

1. 🔠 Using Attributes (for <podcast-preview>)
You pass data directly into the component via standard HTML attributes.

Example:
html
Copy
Edit
<podcast-preview
  title="Something Was Wrong"
  cover="https://content.production.cdn.art19.com/images/cc/e5/0a/08/cce50a08-d77d-490e-8c68-17725541b0ca/9dcebd4019d57b9551799479fa226e2a79026be5e2743c7aef19eac53532a29d66954da6e8dbdda8219b059a59c0abe6dba6049892b10dfb2f25ed90d6fe8d9a.jpeg"
  genres="True Crime, Personal Growth"
  seasons="14"
  episodes="98"
  updated="2024-06-10T10:00:00Z"
  description="A true crime podcast about abuse and recovery."
></podcast-preview>


2. 📦 Using a Property (for <podcast-modal>)


Example:
js
Copy
Edit
const modal = document.createElement('podcast-modal');
modal.data = {
  title: "Something Was Wrong",
  cover: "https://example.com/cover.jpg",
  genres: "True Crime, Personal Growth",
  seasons: "14",
  episodes: "98",
  updated: "2024-06-10T10:00:00Z",
  description: "A true crime podcast...",
  seasonDetails: [ { title: "Season 1", episodes: 10 }, ... ]
};
document.body.appendChild(modal);




### 📥 How to Listen
- js copy

* document.addEventListener('podcast-selected', (event) => {
  const podcastData = event.detail;
  console.log('Podcast selected:', podcastData);

  // Example: show modal with full data
  const modal = document.createElement('podcast-modal');
  modal.data = podcastData;
  document.body.appendChild(modal);
});


## Overview

In this project, you will build a reusable and encapsulated **custom HTML element** that displays a podcast preview. The component must follow the **Web Component standard**, using `customElements.define()` and should work independently from the main application logic. This component will enhance modularity, promote reuse, and reduce code duplication across the app.

The component should be designed to **accept podcast data via attributes or properties**, display relevant UI elements (such as title, cover image, and genres), and **communicate with the main application** through custom events.

---

## Core Objectives

### Web Component Functionality

- Create a **custom HTML element** using `customElements.define()`.
- Accept data (cover image, title, genres, number of seasons, and last updated date) **as attributes or properties**.
- Keep the component **stateless** and reliant on external data provided by the parent.
- Use **Shadow DOM** for style and logic encapsulation to avoid global conflicts.
- Trigger a **custom event** when a user interacts with the component (e.g., clicking), so that the parent application can open a modal or take other actions without tightly coupling to the component’s logic.

---

## UI/UX Requirements

- The component should render a clean and **visually consistent preview** of each podcast.
- Display:
  - Podcast **cover image**
  - Podcast **title**
  - **Genre names**
  - **Number of seasons**
  - **Last updated** in a human-readable format
- The component must be **responsive**, and match the overall app design on desktop and mobile.
- On click, the component must notify the parent app to **open a modal** or navigate to details.

---

## Code Quality & Maintainability

- Write clear, consistent, and modular code.
- Follow **functional and object-oriented programming** patterns.
- Document major functions using **JSDoc comments** (parameters, return types, etc.).
- Use consistent **code formatting** across HTML, CSS, and JavaScript.

---

## Technical Constraints

- Do **not** use any third-party frameworks for creating the web component.
- Use **native JavaScript (ES6+)**, HTML, and CSS.
- No page reloads or navigation.
- Ensure compatibility with modern browsers.

---

## Deliverables

- A working custom Web Component file (e.g., `PodcastPreview.js`).
- An HTML demo page showcasing the component usage.
- A `README.md` file with:
  - How to use and register the component
  - Instructions for passing data
  - How to listen for interaction events

---
