/**
 * CV & Biography Engine - Dynamic Data-Driven Rendering
 * Workflow: data/cv.json -> fetch -> JavaScript processing -> DOM injection
 */

async function initCV() {
  const container = document.getElementById('cvContent');
  if (!container) return;

  try {
    const response = await fetch('./data/cv.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    renderCV(data);
  } catch (error) {
    console.error('Failed to load cv.json:', error);
    container.innerHTML = `
      <div style="padding: 40px 0; color: #777;">
        <p><strong>Notice:</strong> Unable to dynamically fetch <code>data/cv.json</code>.</p>
        <p>If testing locally, please run a lightweight web server (e.g. <code>npx serve</code>), or view once deployed on GitHub Pages.</p>
      </div>
    `;
  }
}

function renderCV(data) {
  const container = document.getElementById('cvContent');
  const { profile, education, experience, skills, honors } = data;

  container.innerHTML = `
    <!-- Header / Statement -->
    <header class="cv-header">
      <h1>${profile.nameEn} <span style="font-family:'PingFang TC','Microsoft JhengHei',sans-serif; font-size:26px; color:#666; margin-left:12px;">${profile.nameZh}</span></h1>
      <div class="cv-role">${profile.role} • ${profile.location}</div>
      <div class="cv-bio-block">
        <div>
          <p style="font-weight:400; color:#111; margin-bottom:8px;">[ Architectural Statement ]</p>
          <p>${profile.statementEn}</p>
        </div>
        <div>
          <p style="font-weight:400; color:#111; margin-bottom:8px;">[ 空間實踐自述 ]</p>
          <p>${profile.statementZh}</p>
        </div>
      </div>
    </header>

    <!-- Experience -->
    <section class="cv-section">
      <div class="cv-section-title">01 / Practice & Experience</div>
      <div class="cv-list">
        ${experience.map(exp => `
          <div class="cv-entry">
            <div class="cv-entry-head">
              <div class="cv-entry-title">${exp.role}</div>
              <div class="cv-entry-period">${exp.period}</div>
            </div>
            <div class="cv-entry-org">${exp.organization}</div>
            <ul class="cv-entry-bullets">
              ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Education -->
    <section class="cv-section">
      <div class="cv-section-title">02 / Academic Background</div>
      <div class="cv-list">
        ${education.map(edu => `
          <div class="cv-entry">
            <div class="cv-entry-head">
              <div class="cv-entry-title">${edu.degree}</div>
              <div class="cv-entry-period">${edu.period}</div>
            </div>
            <div class="cv-entry-org">${edu.institution}</div>
            <div class="cv-entry-notes">${edu.notes}</div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Skills & Tools -->
    <section class="cv-section">
      <div class="cv-section-title">03 / Technical Competencies</div>
      <div class="skills-grid">
        <div class="skill-category">
          <h4>Spatial & Parametric Computation</h4>
          <div class="skill-pills">
            ${skills.spatialComputation.map(s => `<span class="skill-pill">${s}</span>`).join('')}
          </div>
        </div>

        <div class="skill-category">
          <h4>Material Fabrication & Prototyping</h4>
          <div class="skill-pills">
            ${skills.fabricationPhysical.map(s => `<span class="skill-pill">${s}</span>`).join('')}
          </div>
        </div>

        <div class="skill-category">
          <h4>Environmental & Climatic Analysis</h4>
          <div class="skill-pills">
            ${skills.environmentalSimulation.map(s => `<span class="skill-pill">${s}</span>`).join('')}
          </div>
        </div>

        <div class="skill-category">
          <h4>Digital & Web Technologies</h4>
          <div class="skill-pills">
            ${skills.digitalWeb.map(s => `<span class="skill-pill">${s}</span>`).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Honors & Awards -->
    <section class="cv-section" style="border-bottom:none;">
      <div class="cv-section-title">04 / Honors & Research</div>
      <div class="cv-list">
        ${honors.map(h => `
          <div class="cv-entry-head" style="margin-bottom:12px;">
            <div class="cv-entry-title" style="font-size:14px; font-weight:400;">${h.title}</div>
            <div class="cv-entry-period">${h.year}</div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

document.addEventListener('DOMContentLoaded', initCV);
