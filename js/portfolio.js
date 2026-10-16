/**
 * Portfolio Engine - Dynamic Data-Driven Rendering
 * Workflow: data/projects.json -> fetch -> JavaScript processing -> DOM injection
 */

let allProjectsData = null;
let currentFilter = 'all';

// 1. Initialize and fetch project data
async function initPortfolio() {
  const feedContainer = document.getElementById('portfolioFeed');
  const filterContainer = document.getElementById('filterBar');

  if (!feedContainer || !filterContainer) return;

  try {
    const response = await fetch('./data/projects.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    allProjectsData = await response.json();

    renderFilterBar(allProjectsData.categories, allProjectsData.projects);
    renderProjects(allProjectsData.projects, currentFilter);
  } catch (error) {
    console.error('Failed to load projects.json:', error);
    feedContainer.innerHTML = `
      <div style="padding: 40px 0; color: #777;">
        <p><strong>Notice:</strong> Unable to dynamically fetch <code>data/projects.json</code>.</p>
        <p>If you are opening this file locally via <code>file://</code>, please run a local web server (e.g. <code>npx serve</code> or VS Code Live Server) due to browser CORS policies, or visit the deployed GitHub Pages link.</p>
      </div>
    `;
  }
}

// 2. Calculate category counts and render filter buttons
function renderFilterBar(categories, projects) {
  const filterContainer = document.getElementById('filterBar');
  const counts = { all: 0 };

  categories.forEach(cat => (counts[cat.id] = 0));

  projects.forEach(block => {
    if (block.type === 'featured') {
      counts.all++;
      if (counts[block.category] !== undefined) counts[block.category]++;
    } else if (block.type === 'grid') {
      block.items.forEach(item => {
        counts.all++;
        if (counts[item.category] !== undefined) counts[item.category]++;
      });
    }
  });

  filterContainer.innerHTML = categories
    .map(
      cat => `
      <button class="filter-btn ${cat.id === currentFilter ? 'active' : ''}" data-filter="${cat.id}">
        ${cat.name} <span class="count">(${counts[cat.id] || 0})</span>
      </button>
    `
    )
    .join('');

  filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      renderFilterBar(allProjectsData.categories, allProjectsData.projects);
      renderProjects(allProjectsData.projects, currentFilter);
    });
  });
}

// 3. Render projects based on current active category
function renderProjects(projects, filterId) {
  const feedContainer = document.getElementById('portfolioFeed');
  feedContainer.innerHTML = '';

  projects.forEach(block => {
    if (block.type === 'featured') {
      if (filterId !== 'all' && block.category !== filterId) return;

      const row = document.createElement('section');
      row.className = `featured-row ${block.reverse ? 'reversed' : ''}`;
      row.innerHTML = `
        <div class="featured-media" data-project-id="${block.id}">
          <img src="${block.image}" alt="${block.title}" loading="lazy">
          <div class="featured-caption">${block.title} (${block.year}) — ${block.location}</div>
        </div>
        <div class="featured-content">
          <div class="project-meta-top">
            <span>${block.category}</span>
            <span>•</span>
            <span>${block.area || ''}</span>
          </div>
          <h2 class="featured-title">${block.title} <span class="year">(${block.year})</span></h2>
          <div class="featured-subtitle">${block.subtitle || ''}</div>
          <p class="featured-desc">${block.summary}</p>
          <button class="project-link-btn" data-project-id="${block.id}">
            Explore Project &rarr;
          </button>
        </div>
      `;

      // Attach click events for modal
      row.querySelectorAll('[data-project-id]').forEach(el => {
        el.addEventListener('click', () => openProjectModal(block));
      });

      feedContainer.appendChild(row);

    } else if (block.type === 'grid') {
      const filteredItems = filterId === 'all'
        ? block.items
        : block.items.filter(item => item.category === filterId);

      if (filteredItems.length === 0) return;

      const gridRow = document.createElement('section');
      gridRow.className = 'grid-row';

      filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'grid-card';
        card.innerHTML = `
          <div class="grid-card-media">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
          </div>
          <div class="grid-card-info">
            <div class="grid-card-title">
              <span>${item.title}</span>
              <span class="year">${item.year}</span>
            </div>
            <div class="grid-card-loc">${item.location} • ${item.category}</div>
          </div>
        `;

        card.addEventListener('click', () => openProjectModal(item));
        gridRow.appendChild(card);
      });

      feedContainer.appendChild(gridRow);
    }
  });
}

// 4. Modal Lightbox Handler
function openProjectModal(project) {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalMetaTag = document.getElementById('modalMetaTag');
  const modalDesc = document.getElementById('modalDesc');
  const modalSpecs = document.getElementById('modalSpecs');

  modalImg.onerror = () => {
    modalImg.src = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80';
  };
  modalImg.src = project.image;
  modalImg.alt = project.title;
  modalTitle.textContent = `${project.title} (${project.year})`;
  modalMetaTag.textContent = `${project.category} • ${project.location}`;
  modalDesc.textContent = project.summary || '';

  // Render spec list if available
  let specsHtml = `
    <p><strong>Location:</strong> ${project.location}</p>
    <p><strong>Year:</strong> ${project.year}</p>
  `;

  if (project.area) {
    specsHtml += `<p><strong>Floor Area:</strong> ${project.area}</p>`;
  }

  if (project.details) {
    if (project.details.concept) {
      specsHtml += `<p style="margin-top:10px;"><strong>Tectonic Concept:</strong><br>${project.details.concept}</p>`;
    }
    if (project.details.materials) {
      specsHtml += `<p style="margin-top:10px;"><strong>Materiality:</strong><br>${project.details.materials}</p>`;
    }
    if (project.details.awards) {
      specsHtml += `<p style="margin-top:10px;"><strong>Recognition:</strong><br>${project.details.awards}</p>`;
    }
  }

  modalSpecs.innerHTML = specsHtml;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = 'auto';
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', () => {
  initPortfolio();

  const closeBtn = document.getElementById('modalCloseBtn');
  const modal = document.getElementById('projectModal');

  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeProjectModal();
    });
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProjectModal();
  });
});
