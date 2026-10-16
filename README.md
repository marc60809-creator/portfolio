# Chu-Xi Lin (林楚熙) — Architecture & Spatial Portfolio

A bespoke, minimal, and data-driven personal architectural portfolio website designed and developed with AI assistance. Built to demonstrate sustainable web architecture, content-presentation decoupling, and version-controlled iterative design.

- **Live Deployment:** [https://<your-username>.github.io/<repo-name>/](https://github.com) *(Update with your deployed GitHub Pages / Vercel URL)*
- **GitHub Repository:** [https://github.com/<your-username>/<repo-name>](https://github.com)

---

## 1. Project Overview & Design Concept

This portfolio is tailored specifically for an architectural designer and spatial researcher. It translates the spatial ethos of architectural tectonics—rhythm, light, order, and materiality—into a digital editorial layout.

### Visual Precedents & Aesthetic Direction
- **Typography:** Harmonious pairing of *Playfair Display* (editorial serif for project titles), *Cinzel* (classical inscription style for brand monogram), and *Inter* (clean sans-serif for architectural specs and metadata).
- **Spatial Rhythm:** Alternating layout between prominent 2-column featured project hero panels and a 3-column comparative project grid, inspired by contemporary architectural monograph publications.
- **Micro-Interactions:** Subtle scale transitions upon image hover, custom minimalist lightbox modal for project deep-dives, and instantaneous category filtering without full page reload.

---

## 2. Decoupled Content Architecture (Maintainable Content)

In strict accordance with course guidelines, **content is completely separated from HTML presentation**. The site can be updated, expanded, or maintained indefinitely without touching HTML markup or requiring AI assistance.

### Architecture Workflow
```
[ Human-Readable JSON ]
  ├── data/projects.json   -->  js/portfolio.js  -->  DOM Injection into index.html
  └── data/cv.json         -->  js/cv.js         -->  DOM Injection into about.html
```

### How to Update Content (No Coding or AI Required)
1. **Adding a New Project:**
   Open `data/projects.json` and append a new JSON object under `projects`:
   ```json
   {
     "id": "new-pavilion",
     "type": "featured",
     "reverse": false,
     "title": "Pavilion of Mist",
     "subtitle": "Timber Micro-Climate Structure",
     "year": 2025,
     "category": "public",
     "location": "Taipei, Taiwan",
     "area": "120 m²",
     "summary": "Project description here...",
     "image": "https://images.unsplash.com/your-image-url",
     "details": {
       "concept": "Your design concept...",
       "materials": "Glue-lam wood, tensile fabric",
       "awards": "Honorable Mention"
     }
   }
   ```
2. **Updating CV / Work Experience / Skills:**
   Open `data/cv.json` and edit items in the `experience`, `education`, or `skills` arrays. The changes will immediately reflect upon page reload.

---

## 3. Pages Structure

The website includes two distinct, fully realized pages:
1. **`index.html` (Selected Works & Spatial Projects):**
   - Dynamic category filter with project count indicators (`Residential`, `Public & Cultural`, `Urban & Landscape`, `Interior & Pavilion`).
   - Editorial alternating layout of featured and grid works.
   - Interactive Lightbox modal displaying floor area, design concepts, materials, and awards.
2. **`about.html` (Curriculum Vitae & Research Statement):**
   - Bilingual personal introduction (`林楚熙 / Chu-Xi Lin`).
   - Architectural design philosophy and academic background (NCKU / TUM exchange).
   - Professional studio experience and detailed responsibilities.
   - Technical competencies (Parametric modeling, Environmental simulation, Physical fabrication).

---

## 4. AI-Assisted Iteration & Development History

This project was developed through an iterative dialogue with Google Antigravity:
1. **Visual Reference Formulation:** Analyzed architectural monograph precedents featuring alternating two-column hero blocks and clean 3-column project rows.
2. **Prompting & Layout Execution:** Directed the AI to compose an editorial structure avoiding generic modern card templates.
3. **Decoupling Enforcement:** Refactored static elements into pure `JSON -> Fetch -> Render` architecture to ensure lifelong maintenance without code alteration.
4. **Interactive Polish:** Designed and refined the non-intrusive lightbox modal and keyboard accessibility (`ESC` to exit).

---

## 5. Local Development & Deployment

### Running Locally
Because this project utilizes modern browser `fetch()` to load external `.json` data files, it is recommended to run a lightweight local HTTP server (to prevent browser local file CORS restrictions):

```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js (npx)
npx serve .

# Option 3: VS Code
Open with "Live Server" extension
```

### Deploying to GitHub Pages
1. Initialize Git and commit all changes (see commit history guide below):
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of bespoke architecture portfolio"
   ```
2. Create a repository on GitHub and link the remote:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. In GitHub Repository: Go to **Settings** &rarr; **Pages** &rarr; Under **Branch**, select `main` &rarr; click **Save**.
4. Your website will be live at `https://<your-username>.github.io/<your-repo-name>/`.
