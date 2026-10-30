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
      <div class="cv-role" style="margin-top:6px; font-size:15px; letter-spacing:0.04em;">
        <a href="mailto:${profile.email}" style="color:#111; text-decoration:none;">${profile.email}</a>
      </div>
      <div class="cv-bio-block">
        <div>
          <p style="font-weight:400; color:#111; margin-bottom:8px;">[ Professional Summary ]</p>
          <p>${profile.statementEn}</p>
        </div>
        <div>
          <p style="font-weight:400; color:#111; margin-bottom:8px;">[ 專業實踐與研究自述 ]</p>
          <p>${profile.statementZh}</p>
        </div>
      </div>
      
      <!-- Interactive 3D Spatial Pavilion & Tectonic Philosophy -->
      <div class="spatial-3d-showcase">
        <div class="spatial-3d-header">
          <div class="spatial-3d-tag">Interactive 3D Spatial Pavilion • 三維空間構築探索</div>
          <div class="spatial-3d-controls-hint">Drag to Orbit / 滑鼠拖曳旋轉 3D 視角</div>
        </div>
        <div class="spatial-3d-layout">
          <div class="spatial-3d-canvas-wrap">
            <canvas id="spatialCanvas" width="480" height="340"></canvas>
            <div class="spatial-mode-pills">
              <button class="spatial-pill-btn active" data-mode="wireframe">Tectonic Wireframe (幾何構造)</button>
              <button class="spatial-pill-btn" data-mode="solid">Shaded Massing (量體光影)</button>
              <button class="spatial-pill-btn" data-mode="nodes">Thermal Nodes (分析節點)</button>
            </div>
          </div>
          <div class="spatial-3d-text">
            <h3>3D Spatial Tectonics & Geometry</h3>
            <p class="spatial-sub">[ 三維空間哲學與形態運算 ]</p>
            <p>${profile.spatialPhilosophyZh || ''}</p>
            <p style="margin-top:10px; color:#666; font-size:13px;">${profile.spatialPhilosophyEn || ''}</p>
            <div class="spatial-specs-mini">
              <div><strong>Morphology:</strong> Parametric Hyperbolic Pavilion</div>
              <div><strong>Tessellation:</strong> Discretized Quad Louvers (Revit API)</div>
              <div><strong>Solar Response:</strong> Daylighting & sDA Optimization</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Experience -->
    <section class="cv-section">
      <div class="cv-section-title">01 / Professional & Engineering Practice</div>
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
      <div class="cv-section-title">02 / Education & Academic Background</div>
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
      <div class="cv-section-title">03 / Technical Skills & Certifications</div>
      <div class="skills-grid">
        <div class="skill-category">
          <h4>BIM, Forma & Computational Design</h4>
          <div class="skill-pills">
            ${skills.bimComputation.map(s => `<span class="skill-pill">${s}</span>`).join('')}
          </div>
        </div>

        <div class="skill-category">
          <h4>Environmental Simulation & Optimization</h4>
          <div class="skill-pills">
            ${skills.environmentalSimulation.map(s => `<span class="skill-pill">${s}</span>`).join('')}
          </div>
        </div>

        <div class="skill-category">
          <h4>Digital Fabrication & Prototyping</h4>
          <div class="skill-pills">
            ${skills.fabricationTools.map(s => `<span class="skill-pill">${s}</span>`).join('')}
          </div>
        </div>

        <div class="skill-category">
          <h4>Licenses, Credentials & Languages</h4>
          <div class="skill-pills">
            ${skills.certificationsLanguages.map(s => `<span class="skill-pill">${s}</span>`).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Honors & Awards -->
    <section class="cv-section" style="border-bottom:none;">
      <div class="cv-section-title">04 / Honors & Leadership</div>
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

  initSpatial3DViewer();
}

/**
 * Lightweight bespoke 3D Vector Math & Parametric Pavilion Renderer
 * Uses HTML5 Canvas without heavy external dependencies for fast GitHub Pages loading.
 */
function initSpatial3DViewer() {
  const canvas = document.getElementById('spatialCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // View state & angles
  let rotX = 0.45;
  let rotY = -0.55;
  let autoRotate = true;
  let renderMode = 'wireframe'; // 'wireframe', 'solid', 'nodes'
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  // Generate 3D parametric pavilion mesh (Hyperbolic Paraboloid / Tectonic Shell)
  const U_SEGMENTS = 14;
  const V_SEGMENTS = 14;
  const vertices = [];
  const faces = [];

  for (let i = 0; i <= U_SEGMENTS; i++) {
    const u = (i / U_SEGMENTS) * 2 - 1; // -1 to 1
    for (let j = 0; j <= V_SEGMENTS; j++) {
      const v = (j / V_SEGMENTS) * 2 - 1; // -1 to 1
      // Architectural saddle shell surface
      const x = u * 120;
      const z = v * 120;
      const y = (u * u - v * v) * 55 - 25; // Saddle height formula
      vertices.push({ x, y, z });
    }
  }

  // Create quad faces & diagonal trusses
  for (let i = 0; i < U_SEGMENTS; i++) {
    for (let j = 0; j < V_SEGMENTS; j++) {
      const idx = i * (V_SEGMENTS + 1) + j;
      const p1 = idx;
      const p2 = idx + 1;
      const p3 = idx + (V_SEGMENTS + 1) + 1;
      const p4 = idx + (V_SEGMENTS + 1);
      faces.push([p1, p2, p3, p4]);
    }
  }

  // Ground base ring / boundary support foundation
  const groundRing = [];
  for (let a = 0; a <= 24; a++) {
    const angle = (a / 24) * Math.PI * 2;
    groundRing.push({
      x: Math.cos(angle) * 140,
      y: -60,
      z: Math.sin(angle) * 140
    });
  }

  // Project 3D Point to 2D Screen
  function project(p) {
    // Rotation around Y
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const x1 = p.x * cosY + p.z * sinY;
    const z1 = -p.x * sinY + p.z * cosY;

    // Rotation around X
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);
    const y2 = p.y * cosX - z1 * sinX;
    const z2 = p.y * sinX + z1 * cosX;

    // Perspective projection
    const fov = 340;
    const distance = 420;
    const scale = fov / (distance + z2);

    return {
      x: canvas.width / 2 + x1 * scale,
      y: canvas.height / 2 - y2 * scale,
      z: z2,
      scale: scale
    };
  }

  // Draw loop
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (autoRotate && !isDragging) {
      rotY += 0.007;
    }

    // Draw Ground Grid / Datum
    ctx.strokeStyle = '#eaeaea';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < groundRing.length - 1; i++) {
      const sp1 = project(groundRing[i]);
      const sp2 = project(groundRing[i + 1]);
      ctx.moveTo(sp1.x, sp1.y);
      ctx.lineTo(sp2.x, sp2.y);
    }
    ctx.stroke();

    // Sort faces by depth for Painter's algorithm
    const projectedFaces = faces.map(face => {
      const pts = face.map(idx => project(vertices[idx]));
      const avgZ = (pts[0].z + pts[1].z + pts[2].z + pts[3].z) / 4;
      return { face, pts, avgZ };
    }).sort((a, b) => b.avgZ - a.avgZ);

    projectedFaces.forEach(pf => {
      const { pts, avgZ } = pf;

      if (renderMode === 'solid') {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        ctx.lineTo(pts[1].x, pts[1].y);
        ctx.lineTo(pts[2].x, pts[2].y);
        ctx.lineTo(pts[3].x, pts[3].y);
        ctx.closePath();

        // Shading based on Z depth & curvature
        const depthTone = Math.min(235, Math.max(160, Math.floor(190 + avgZ * 0.4)));
        ctx.fillStyle = `rgb(${depthTone - 10}, ${depthTone}, ${depthTone + 15})`;
        ctx.fill();
        ctx.strokeStyle = '#222222';
        ctx.lineWidth = 0.75;
        ctx.stroke();

      } else if (renderMode === 'wireframe') {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        ctx.lineTo(pts[1].x, pts[1].y);
        ctx.lineTo(pts[2].x, pts[2].y);
        ctx.lineTo(pts[3].x, pts[3].y);
        ctx.closePath();
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 0.85;
        ctx.stroke();

        // Internal cross braces for spatial tectonic feel
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        ctx.lineTo(pts[2].x, pts[2].y);
        ctx.strokeStyle = '#b0b0b0';
        ctx.lineWidth = 0.5;
        ctx.stroke();

      } else if (renderMode === 'nodes') {
        // Analytical nodes
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        ctx.lineTo(pts[1].x, pts[1].y);
        ctx.lineTo(pts[2].x, pts[2].y);
        ctx.lineTo(pts[3].x, pts[3].y);
        ctx.closePath();
        ctx.strokeStyle = '#d5d5d5';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        pts.forEach(pt => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = '#2563eb'; // High-performance blue node
          ctx.fill();
        });
      }
    });

    requestAnimationFrame(draw);
  }

  // Interactive mouse/touch drag controls
  canvas.addEventListener('mousedown', e => {
    isDragging = true;
    autoRotate = false;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;
    rotY += dx * 0.009;
    rotX += dy * 0.009;
    rotX = Math.max(-1.1, Math.min(1.1, rotX)); // clamp pitch
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  // Touch support for mobile devices
  canvas.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      isDragging = true;
      autoRotate = false;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  canvas.addEventListener('touchmove', e => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMouseX;
    const dy = e.touches[0].clientY - lastMouseY;
    rotY += dx * 0.01;
    rotX += dy * 0.01;
    rotX = Math.max(-1.1, Math.min(1.1, rotX));
    lastMouseX = e.touches[0].clientX;
    lastMouseY = e.touches[0].clientY;
    e.preventDefault();
  }, { passive: false });

  // Mode button interactions
  const pills = document.querySelectorAll('.spatial-pill-btn');
  pills.forEach(btn => {
    btn.addEventListener('click', () => {
      pills.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMode = btn.dataset.mode;
    });
  });

  draw();
}

document.addEventListener('DOMContentLoaded', initCV);
