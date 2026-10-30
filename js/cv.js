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
      
      <!-- Interactive 3D Isometric Studio Room (Fujitsu-Style Split Layout) -->
      <div class="studio-3d-section">
        <!-- Top Wide Banner Header -->
        <div class="studio-top-banner">
          <h2 class="studio-main-title">Step inside the computational studio with Chu-Shian Tsau</h2>
          <div class="studio-sub-header-row">
            <span class="studio-sub-zh">[ 運算化建築科學 • 3D 空間研究室 ]</span>
            <div class="studio-view-btns">
              <button class="studio-btn active" id="btnMyStudio">MY STUDIO</button>
              <button class="studio-btn" id="btnResetView">RESET VIEW</button>
              <button class="studio-btn" id="btnToggleLights">💡 LIGHTS: <span id="lightsStatus">ON</span></button>
            </div>
          </div>
        </div>

        <!-- Main Split Showcase: Left Index & Action, Right 3D Viewport -->
        <div class="studio-split-showcase">
          <!-- Left Column: Index Menu & Download Action Button -->
          <div class="studio-split-sidebar">
            <div class="studio-index-block">
              <div class="studio-index-heading">Studio Index & Research Spheres</div>
              <ul class="studio-index-list">
                <li class="studio-index-item active" onclick="selectStudioHotspot('workstation')">
                  <span class="index-bullet"></span>
                  <div>
                    <strong>BIM Workstation</strong>
                    <p>Revit API Automation & gbXML BEM Validation</p>
                  </div>
                </li>
                <li class="studio-index-item" onclick="selectStudioHotspot('window')">
                  <span class="index-bullet"></span>
                  <div>
                    <strong>Microclimate Window</strong>
                    <p>Autodesk Forma Daylighting & Urban Wind Comfort</p>
                  </div>
                </li>
                <li class="studio-index-item" onclick="selectStudioHotspot('shelf')">
                  <span class="index-bullet"></span>
                  <div>
                    <strong>Munich & Da'an Archive</strong>
                    <p>European Timber Exchange, IELTS 6.0 & ACU Honors</p>
                  </div>
                </li>
                <li class="studio-index-item" onclick="selectStudioHotspot('chair')">
                  <span class="index-bullet"></span>
                  <div>
                    <strong>Songshan Lounge & Fabrication</strong>
                    <p>Solo Graduation Exhibition & TTDA 3D Printing Lab</p>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Download Official Portfolio / CV Action Button (Fujitsu Pill Style) -->
            <a href="Midterm_Assignment_Submission_Chu-Shian_Tsau.doc" class="studio-fujitsu-cta" download>
              <div class="fujitsu-cta-icon">📄</div>
              <div class="fujitsu-cta-text">
                <span class="cta-title">Download Official Report & CV</span>
                <span class="cta-sub">Academic Portfolio & Credentials 2026</span>
              </div>
              <div class="fujitsu-cta-arrow">&rsaquo;</div>
            </a>
          </div>

          <!-- Right Column: 3D Isometric Viewport & Dynamic Card Overlay -->
          <div class="studio-split-canvas-wrap">
            <div class="studio-viewport-container" id="studioViewport">
              <!-- 3D Isometric Canvas -->
              <canvas id="isometricStudioCanvas" width="1100" height="660"></canvas>

              <!-- Interactive Floating Annotation Callouts -->
              <div class="studio-hotspot-pin" id="pin-workstation" style="top: 48%; left: 38%;">
                <span class="pin-dot"></span>
                <div class="pin-line"></div>
                <div class="pin-label">BIM Workstation</div>
              </div>

              <div class="studio-hotspot-pin" id="pin-window" style="top: 38%; left: 63%;">
                <span class="pin-dot"></span>
                <div class="pin-line"></div>
                <div class="pin-label">Microclimate Window</div>
              </div>

              <div class="studio-hotspot-pin" id="pin-shelf" style="top: 24%; left: 32%;">
                <span class="pin-dot"></span>
                <div class="pin-line"></div>
                <div class="pin-label">Munich & Da'an Archive</div>
              </div>

              <div class="studio-hotspot-pin" id="pin-chair" style="top: 66%; left: 56%;">
                <span class="pin-dot"></span>
                <div class="pin-line"></div>
                <div class="pin-label">Songshan Lounge</div>
              </div>

              <!-- Bottom Left Architectural Stamp / Sheet Meta -->
              <div class="studio-sheet-stamp">
                <strong>Chu-Shian Tsau 曹楚献</strong><br>
                COMPUTATIONAL ARCHITECTURE • BIM<br>
                SHEET 01 • NTUST STUDIO • 2026
              </div>

              <!-- Selected Project Card in bottom right -->
              <div class="studio-project-card" id="studioProjectCard">
                <div class="card-tag" id="cardTag">SELECTED PROJECT</div>
                <div class="card-thumb-wrap" id="cardThumbWrap">
                  <img id="cardThumbImg" src="assets/studio/autodesk_revit_cert.jpg" alt="Project preview">
                </div>
                <h3 class="card-title" id="cardTitle">BIM-to-BEM Interoperability</h3>
                <div class="card-subtitle" id="cardCategory">GRADUATE RESEARCH LAB • NTUST</div>
                <p class="card-desc" id="cardDesc">Revit API analytical space boundaries & automated gbXML validation pipeline to EnergyPlus, reducing topological error to &lt;5%.</p>
                <div class="card-action-row">
                  <a href="index.html" class="card-action-btn" id="cardLinkBtn">OPEN PROJECT &rarr;</a>
                  <button class="card-zoom-btn" id="cardZoomBtn">🔍 檢視原圖</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Real Portfolio Photo Gallery Strip below the 3D room -->
        <div class="studio-gallery-strip">
          <div class="gallery-strip-title">Authentic Portfolio & Credentials Gallery • 實績成果、德國交換歷程與推薦函藝廊</div>
          <div class="gallery-strip-items">
            <div class="gallery-item" onclick="openStudioModal('Autodesk Revit ACU 國際認證', 'assets/studio/autodesk_revit_cert.jpg', 'Autodesk 原廠認證專業證照 (June 2023)')">
              <img src="assets/studio/autodesk_revit_cert.jpg" alt="Revit Cert">
              <span>Revit 原廠證照</span>
            </div>
            <div class="gallery-item" onclick="openStudioModal('IELTS 國際英語測驗成績單 (Overall 6.0)', 'assets/studio/ielts_score_cert.jpg', 'CEFR B2 專業工作水平，聽力 6.0、口說 6.0、寫作 6.0')">
              <img src="assets/studio/ielts_score_cert.jpg" alt="IELTS Cert">
              <span>雅思 6.0 證照</span>
            </div>
            <div class="gallery-item" onclick="openStudioModal('張國章建築師 推薦函 (台北國際聯合建築師事務所)', 'assets/studio/rec_letter_chang.jpg', '主持建築師極力推薦，高度肯定 Revit 作業能力與實習表現')">
              <img src="assets/studio/rec_letter_chang.jpg" alt="Rec Chang">
              <span>張國章建築師推薦函</span>
            </div>
            <div class="gallery-item" onclick="openStudioModal('蔡欣君副教授 推薦函 (國立臺灣科技大學建築系)', 'assets/studio/rec_letter_tsaih.jpg', '指導教授極力推薦，肯定學習態度積極自主與研究潛力')">
              <img src="assets/studio/rec_letter_tsaih.jpg" alt="Rec Tsaih">
              <span>蔡欣君教授推薦函</span>
            </div>
            <div class="gallery-item" onclick="openStudioModal('蔡孟廷教授 推薦函 (國立臺灣科技大學建築系)', 'assets/studio/rec_letter_tsai_mt.jpg', '畢業設計指導教授極力推薦，肯定海外交換與國際競圖表現')">
              <img src="assets/studio/rec_letter_tsai_mt.jpg" alt="Rec Tsai">
              <span>蔡孟廷教授推薦函</span>
            </div>
            <div class="gallery-item" onclick="openStudioModal('德國慕尼黑交換過程：夜生活與國際友人交流', 'assets/studio/munich_exchange_01.jpg', '在慕尼黑與各國交換學生共聚，體驗歐洲多元文化與校園生活')">
              <img src="assets/studio/munich_exchange_01.jpg" alt="Munich Exchange 01">
              <span>德國交換生活 (一)</span>
            </div>
            <div class="gallery-item" onclick="openStudioModal('德國慕尼黑交換過程：營火晚會與露營交流', 'assets/studio/munich_exchange_02.jpg', '營火晚會與各國好友在草地交流，體驗戶外文化與國際情誼')">
              <img src="assets/studio/munich_exchange_02.jpg" alt="Munich Exchange 02">
              <span>德國交換生活 (二)</span>
            </div>
            <div class="gallery-item" onclick="openStudioModal('德國慕尼黑交換過程：建築參訪與城市探索', 'assets/studio/munich_exchange_03.jpg', '在歐洲各地與好友進行建築參訪、城市空間考察與文藝展覽')">
              <img src="assets/studio/munich_exchange_03.jpg" alt="Munich Exchange 03">
              <span>德國交換生活 (三)</span>
            </div>
            <div class="gallery-item" onclick="openStudioModal('阿吉師 MAOAO 餐廳 微氣候風場與日照分析', 'assets/studio/mooao_sun_wind_analysis.jpg', 'Autodesk Forma 早期微氣候分析圖板')">
              <img src="assets/studio/mooao_sun_wind_analysis.jpg" alt="Maoao Analysis">
              <span>Forma 微氣候圖板</span>
            </div>
            <div class="gallery-item" onclick="openStudioModal('TTDA 數位構築與 3D 列印精密實體模型', 'assets/studio/ttda_3d_fabrication.jpg', '3D 列印與雷切管理員實作成果')">
              <img src="assets/studio/ttda_3d_fabrication.jpg" alt="TTDA Fab">
              <span>TTDA 3D 列印構件</span>
            </div>
            <div class="gallery-item" onclick="openStudioModal('中山 CURVED 青年旅舍 7層波浪形外觀渲染', 'assets/studio/curved_hostel_exterior.jpg', '波浪立面遮陽與透通社區空間設計')">
              <img src="assets/studio/curved_hostel_exterior.jpg" alt="Curved Hostel">
              <span>中山青年旅舍</span>
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
    <section class="cv-section">
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

    <!-- Professional Recommendations & Endorsements -->
    ${data.recommendations ? `
    <section class="cv-section" style="border-bottom:none;">
      <div class="cv-section-title">05 / Recommendation Letters (權威推薦函)</div>
      <div class="cv-list">
        ${data.recommendations.map(rec => `
          <div class="cv-entry" style="background:#fafafa; border:1px solid #eaeaea; border-radius:4px; padding:20px 24px;">
            <div class="cv-entry-head">
              <div class="cv-entry-title" style="font-size:15px; font-weight:600; color:#111;">${rec.name}</div>
              <div class="cv-entry-period" style="color:#2563eb; font-weight:500;">極力推薦</div>
            </div>
            <div class="cv-entry-org" style="color:#666; font-size:12px; margin-bottom:8px;">${rec.title} • ${rec.organization}</div>
            <div class="cv-entry-notes" style="font-size:13px; line-height:1.75; color:#333;">${rec.evaluation}</div>
          </div>
        `).join('')}
      </div>
    </section>
    ` : ''}
  `;

  initIsometricStudioRoom(data.studioRoom);
}

/**
 * 3D Isometric Studio Room Engine (Directly mimicking the reference image)
 * Renders a stylized isometric room with warm lighting, walls, desk, laptop, window,
 * chair, rug, and interactive hotspot picking that updates the project card.
 */
function initIsometricStudioRoom(studioData) {
  const canvas = document.getElementById('isometricStudioCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let isLightOn = true;
  let activeHotspotId = 'workstation';
  let hoveredHotspotId = null;

  // Isometric projection parameters (calibrated for spacious expanded viewport)
  const originX = canvas.width * 0.45;
  const originY = canvas.height * 0.64;
  const ISO_ANGLE = Math.PI / 6; // 30 degrees
  const cosIso = Math.cos(ISO_ANGLE);
  const sinIso = Math.sin(ISO_ANGLE);
  const scale = 2.05;

  function toIso(x, y, z) {
    // x: left-back to right-front
    // y: height (upward is positive in our 3D logic, canvas Y is inverted)
    // z: right-back to left-front
    const screenX = originX + (x - z) * cosIso * scale;
    const screenY = originY + (x + z) * sinIso * scale - y * scale;
    return { x: screenX, y: screenY };
  }

  function drawQuad(p1, p2, p3, p4, fillStyle, strokeStyle, lineWidth = 1) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.closePath();
    if (fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  }

  function drawBox(x, y, z, w, h, d, topColor, leftColor, rightColor, strokeColor = 'rgba(0,0,0,0.15)') {
    const pA = toIso(x, y, z);
    const pB = toIso(x + w, y, z);
    const pC = toIso(x + w, y, z + d);
    const pD = toIso(x, y, z + d);

    const pA_top = toIso(x, y + h, z);
    const pB_top = toIso(x + w, y + h, z);
    const pC_top = toIso(x + w, y + h, z + d);
    const pD_top = toIso(x, y + h, z + d);

    // Left wall face (along Z)
    drawQuad(pA, pD, pD_top, pA_top, leftColor, strokeColor);
    // Right wall face (along X)
    drawQuad(pD, pC, pC_top, pD_top, rightColor, strokeColor);
    // Top face
    drawQuad(pA_top, pB_top, pC_top, pD_top, topColor, strokeColor);
  }

  function renderRoom() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Warm atmospheric gradient in background
    const bgGrad = ctx.createRadialGradient(originX, originY - 60, 40, originX, originY - 40, 420);
    if (isLightOn) {
      bgGrad.addColorStop(0, '#2d333b');
      bgGrad.addColorStop(1, '#1e2228');
    } else {
      bgGrad.addColorStop(0, '#1c1f24');
      bgGrad.addColorStop(1, '#111317');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Architectural Grid on the background (from reference)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
    ctx.lineWidth = 1;
    const GRID_STEP = 32;
    for (let gx = 0; gx < canvas.width; gx += GRID_STEP) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, canvas.height);
      ctx.stroke();
    }
    for (let gy = 0; gy < canvas.height; gy += GRID_STEP) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(canvas.width, gy);
      ctx.stroke();
    }

    // Colors depending on light state
    const floorColor = isLightOn ? '#8a6245' : '#4d3727';
    const floorStroke = isLightOn ? '#704f37' : '#38271b';
    const wallLeftColor = isLightOn ? '#d9d2c5' : '#6b665e';
    const wallRightColor = isLightOn ? '#c2baa9' : '#575249';
    const wallEdge = isLightOn ? '#fff' : '#888';

    // 1. Room Floor (Trapezoid / Isometric rhombus)
    const ROOM_SIZE = 175;
    const WALL_HEIGHT = 160;

    const f0 = toIso(0, 0, 0);                   // Back corner
    const fX = toIso(ROOM_SIZE, 0, 0);          // Right corner
    const fC = toIso(ROOM_SIZE, 0, ROOM_SIZE);  // Front corner
    const fZ = toIso(0, 0, ROOM_SIZE);          // Left corner

    // Draw Floor with wooden plank texture lines
    drawQuad(f0, fX, fC, fZ, floorColor, floorStroke, 1.5);
    ctx.strokeStyle = 'rgba(0,0,0,0.12)';
    ctx.lineWidth = 1;
    for (let s = 20; s < ROOM_SIZE; s += 22) {
      const pStart = toIso(s, 0, 0);
      const pEnd = toIso(s, 0, ROOM_SIZE);
      ctx.beginPath();
      ctx.moveTo(pStart.x, pStart.y);
      ctx.lineTo(pEnd.x, pEnd.y);
      ctx.stroke();
    }

    // 2. Left Wall (Z-axis wall)
    const w0_top = toIso(0, WALL_HEIGHT, 0);
    const wZ_top = toIso(0, WALL_HEIGHT, ROOM_SIZE);
    drawQuad(f0, fZ, wZ_top, w0_top, wallLeftColor, null);

    // 3. Right Wall (X-axis wall)
    const wX_top = toIso(ROOM_SIZE, WALL_HEIGHT, 0);
    drawQuad(f0, fX, wX_top, w0_top, wallRightColor, null);

    // White architectural clean top cut line
    ctx.strokeStyle = wallEdge;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(wZ_top.x, wZ_top.y);
    ctx.lineTo(w0_top.x, w0_top.y);
    ctx.lineTo(wX_top.x, wX_top.y);
    ctx.stroke();

    // 4. Window on the Right Wall (Daylight source)
    const winX1 = 45;
    const winX2 = 125;
    const winY1 = 35;
    const winY2 = 125;
    const winP1 = toIso(winX1, winY1, 0);
    const winP2 = toIso(winX2, winY1, 0);
    const winP3 = toIso(winX2, winY2, 0);
    const winP4 = toIso(winX1, winY2, 0);

    // Window frame depth & light fill
    drawQuad(winP1, winP2, winP3, winP4, isLightOn ? '#b8d5e5' : '#32404e', '#ffffff', 2);
    // Window mullions
    const winMidX = (winX1 + winX2) / 2;
    const wmA = toIso(winMidX, winY1, 0);
    const wmB = toIso(winMidX, winY2, 0);
    ctx.beginPath();
    ctx.moveTo(wmA.x, wmA.y);
    ctx.lineTo(wmB.x, wmB.y);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Curtains on sides
    drawQuad(toIso(winX1 - 10, winY1 - 8, 0), toIso(winX1 + 6, winY1 - 8, 0), toIso(winX1 + 6, winY2 + 10, 0), toIso(winX1 - 10, winY2 + 10, 0), '#6c5c4e', null);
    drawQuad(toIso(winX2 - 6, winY1 - 8, 0), toIso(winX2 + 12, winY1 - 8, 0), toIso(winX2 + 12, winY2 + 10, 0), toIso(winX2 - 6, winY2 + 10, 0), '#6c5c4e', null);

    // 5. Bookshelf on the Left Wall (Munich & Da'an Archive)
    drawBox(0, 105, 30, 8, 6, 95, '#4a3f35', '#382f27', '#5a4d41');
    // Books on the shelf
    drawBox(0, 111, 40, 6, 18, 12, '#3b82f6', '#1d4ed8', '#60a5fa');
    drawBox(0, 111, 55, 6, 22, 14, '#10b981', '#047857', '#34d399');
    drawBox(0, 111, 72, 6, 16, 20, '#d97706', '#b45309', '#f59e0b');

    // 6. Architectural Desk (BIM Workstation)
    const deskX = 2;
    const deskZ = 20;
    const deskW = 42;
    const deskD = 110;
    const deskH = 50;

    // Desk legs (slim architectural steel legs)
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2.5;
    const leg1 = toIso(deskX + 4, 0, deskZ + 4);
    const leg1_top = toIso(deskX + 4, deskH, deskZ + 4);
    const leg2 = toIso(deskX + deskW - 4, 0, deskZ + 4);
    const leg2_top = toIso(deskX + deskW - 4, deskH, deskZ + 4);
    const leg3 = toIso(deskX + 4, 0, deskZ + deskD - 4);
    const leg3_top = toIso(deskX + 4, deskH, deskZ + deskD - 4);
    const leg4 = toIso(deskX + deskW - 4, 0, deskZ + deskD - 4);
    const leg4_top = toIso(deskX + deskW - 4, deskH, deskZ + deskD - 4);

    [ [leg1, leg1_top], [leg2, leg2_top], [leg3, leg3_top], [leg4, leg4_top] ].forEach(pair => {
      ctx.beginPath();
      ctx.moveTo(pair[0].x, pair[0].y);
      ctx.lineTo(pair[1].x, pair[1].y);
      ctx.stroke();
    });

    // Desk top table-board (White minimalist desk)
    drawBox(deskX, deskH, deskZ, deskW, 4, deskD, '#ffffff', '#e5e7eb', '#d1d5db');

    // Laptop on desk
    const lapX = deskX + 12;
    const lapZ = deskZ + 48;
    drawBox(lapX, deskH + 4, lapZ, 20, 2, 22, '#374151', '#1f2937', '#4b5563');
    // Laptop screen (tilted)
    const scrBase = toIso(lapX, deskH + 6, lapZ);
    const scrBaseR = toIso(lapX, deskH + 6, lapZ + 22);
    const scrTop = toIso(lapX - 4, deskH + 24, lapZ);
    const scrTopR = toIso(lapX - 4, deskH + 24, lapZ + 22);
    drawQuad(scrBase, scrBaseR, scrTopR, scrTop, isLightOn ? '#ecfeff' : '#0284c7', '#ffffff', 1);

    // Warm task lamp on desk
    drawBox(deskX + 8, deskH + 4, deskZ + 14, 6, 2, 6, '#f59e0b', '#d97706', '#fbbf24');
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    const lampStem = toIso(deskX + 11, deskH + 6, deskZ + 17);
    const lampTop = toIso(deskX + 11, deskH + 22, deskZ + 17);
    ctx.beginPath();
    ctx.moveTo(lampStem.x, lampStem.y);
    ctx.lineTo(lampTop.x, lampTop.y);
    ctx.stroke();
    drawBox(deskX + 7, deskH + 22, deskZ + 13, 8, 5, 8, '#fbbf24', '#f59e0b', '#fde68a');

    // 7. Area Rug on Floor
    const rugX = 75;
    const rugZ = 75;
    const rugW = 75;
    const rugD = 65;
    drawQuad(
      toIso(rugX, 1, rugZ),
      toIso(rugX + rugW, 1, rugZ),
      toIso(rugX + rugW, 1, rugZ + rugD),
      toIso(rugX, 1, rugZ + rugD),
      '#f4ede4',
      '#ea580c',
      2
    );

    // 8. Modern Lounge Chair (Songshan Lounge Chair)
    const chairX = 92;
    const chairZ = 90;
    // Chair legs
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 2;
    const cl1 = toIso(chairX - 8, 0, chairZ - 8);
    const cl1_t = toIso(chairX, 18, chairZ);
    const cl2 = toIso(chairX + 18, 0, chairZ - 8);
    const cl3 = toIso(chairX - 8, 0, chairZ + 18);
    const cl4 = toIso(chairX + 18, 0, chairZ + 18);
    [cl1, cl2, cl3, cl4].forEach(leg => {
      ctx.beginPath();
      ctx.moveTo(leg.x, leg.y);
      ctx.lineTo(cl1_t.x, cl1_t.y);
      ctx.stroke();
    });
    // Chair bowl cushion (Egg / Shell chair)
    drawBox(chairX - 6, 18, chairZ - 6, 26, 8, 26, '#1f2937', '#111827', '#374151');
    drawBox(chairX + 10, 26, chairZ - 6, 10, 22, 26, '#111827', '#030712', '#1f2937');

    // Warm radial light glow onto desk and floor when light is ON
    if (isLightOn) {
      const glowGrad = ctx.createRadialGradient(originX - 70, originY - 110, 15, originX - 70, originY - 110, 240);
      glowGrad.addColorStop(0, 'rgba(254, 243, 199, 0.45)');
      glowGrad.addColorStop(0.5, 'rgba(251, 191, 36, 0.12)');
      glowGrad.addColorStop(1, 'rgba(251, 191, 36, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(originX - 70, originY - 110, 240, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Update Project Card when a hotspot is clicked
  function selectHotspot(hotspotId) {
    activeHotspotId = hotspotId;
    const hotspot = studioData.hotspots.find(h => h.id === hotspotId);
    if (!hotspot) return;

    if (hotspot.id === 'lamp') {
      isLightOn = !isLightOn;
      const lightLabel = document.getElementById('lightsStatus');
      if (lightLabel) lightLabel.textContent = isLightOn ? 'ON' : 'OFF';
      renderRoom();
      return;
    }

    const card = document.getElementById('studioProjectCard');
    const cardTag = document.getElementById('cardTag');
    const cardTitle = document.getElementById('cardTitle');
    const cardCategory = document.getElementById('cardCategory');
    const cardDesc = document.getElementById('cardDesc');
    const cardLinkBtn = document.getElementById('cardLinkBtn');
    const cardThumbImg = document.getElementById('cardThumbImg');
    const cardZoomBtn = document.getElementById('cardZoomBtn');

    if (cardTag) cardTag.textContent = hotspot.tag.toUpperCase();
    if (cardTitle) cardTitle.textContent = hotspot.projectTitle;
    if (cardCategory) cardCategory.textContent = `${hotspot.category.toUpperCase()} • NTUST`;
    if (cardDesc) cardDesc.textContent = `${hotspot.summaryZh} (${hotspot.summary})`;
    if (cardLinkBtn) cardLinkBtn.href = hotspot.targetUrl;

    if (cardThumbImg && hotspot.image) {
      cardThumbImg.src = hotspot.image;
      cardThumbImg.alt = hotspot.projectTitle;
    }

    if (cardZoomBtn) {
      cardZoomBtn.onclick = () => {
        openStudioModal(hotspot.projectTitle, hotspot.image || hotspot.previewImage, `${hotspot.category} • ${hotspot.summaryZh}`);
      };
    }

    // Highlight card animation
    if (card) {
      card.classList.remove('pulse-card');
      void card.offsetWidth; // trigger reflow
      card.classList.add('pulse-card');
    }

    // Highlight corresponding pin
    document.querySelectorAll('.studio-hotspot-pin').forEach(pin => pin.classList.remove('active'));
    const activePin = document.getElementById(`pin-${hotspotId}`);
    if (activePin) activePin.classList.add('active');

    // Highlight corresponding sidebar index item
    document.querySelectorAll('.studio-index-item').forEach(item => item.classList.remove('active'));
    const activeIndexItem = document.querySelector(`.studio-index-item[onclick*="${hotspotId}"]`);
    if (activeIndexItem) activeIndexItem.classList.add('active');
  }

  // Expose to window so sidebar list items can trigger it
  window.selectStudioHotspot = selectHotspot;

  // Bind Pin Click Events
  const pinMapping = [
    { pinId: 'pin-workstation', hotspotId: 'workstation' },
    { pinId: 'pin-window', hotspotId: 'window' },
    { pinId: 'pin-shelf', hotspotId: 'shelf' },
    { pinId: 'pin-chair', hotspotId: 'chair' }
  ];

  pinMapping.forEach(item => {
    const pinEl = document.getElementById(item.pinId);
    if (pinEl) {
      pinEl.addEventListener('click', () => {
        selectHotspot(item.hotspotId);
      });
    }
  });

  // Top Buttons
  const btnReset = document.getElementById('btnResetView');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      selectHotspot('workstation');
      isLightOn = true;
      const lightLabel = document.getElementById('lightsStatus');
      if (lightLabel) lightLabel.textContent = 'ON';
      renderRoom();
    });
  }

  const btnLights = document.getElementById('btnToggleLights');
  if (btnLights) {
    btnLights.addEventListener('click', () => {
      isLightOn = !isLightOn;
      const lightLabel = document.getElementById('lightsStatus');
      if (lightLabel) lightLabel.textContent = isLightOn ? 'ON' : 'OFF';
      renderRoom();
    });
  }

  // Initial render & select workstation
  renderRoom();
  selectHotspot('workstation');
}

/**
 * Fullscreen Modal Viewer for Studio Real Photos & Credentials
 */
function openStudioModal(title, imgSrc, desc) {
  let modal = document.getElementById('studioPhotoModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'studioPhotoModal';
    modal.className = 'studio-modal-overlay';
    modal.innerHTML = `
      <div class="studio-modal-box">
        <button class="studio-modal-close" onclick="closeStudioModal()">&times;</button>
        <div class="studio-modal-img-wrap">
          <img id="studioModalImg" src="" alt="Photo preview">
        </div>
        <div class="studio-modal-meta">
          <h3 id="studioModalTitle"></h3>
          <p id="studioModalDesc"></p>
        </div>
      </div>
    `;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeStudioModal();
    });
    document.body.appendChild(modal);
  }

  const mImg = document.getElementById('studioModalImg');
  const mTitle = document.getElementById('studioModalTitle');
  const mDesc = document.getElementById('studioModalDesc');

  mImg.src = imgSrc;
  mTitle.textContent = title;
  mDesc.textContent = desc || '';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeStudioModal() {
  const modal = document.getElementById('studioPhotoModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeStudioModal();
});

document.addEventListener('DOMContentLoaded', initCV);
