# Course Assignment Presentation Guide: AI-Assisted Bespoke Portfolio

This document provides a complete English outline and script suggestions for your presentation alongside the Final Project Concept Presentation.

---

## Slide 1: Title & Overview
- **Project Title:** Chu-Xi Lin (林楚熙) — Architecture & Spatial Portfolio
- **Subtitle:** An AI-Assisted, Decoupled, Bespoke Web Architecture
- **Student Name:** Chu-Xi Lin (林楚熙)
- **Live URL:** `https://<your-username>.github.io/<repo-name>/`
- **GitHub Repo:** `https://github.com/<your-username>/<repo-name>`

> **Talking Point:**
> *"Good morning/afternoon everyone. Today I am presenting my bespoke personal portfolio and CV website. Rather than relying on rigid templates or manually authoring static HTML, this project explores an AI-assisted development workflow focused on content-presentation separation, rigorous editorial typography, and sustainable post-course maintenance."*

---

## Slide 2: Visual Precedents & Design Intent
- **Aesthetic Direction:** Minimalist Architectural Monograph style.
- **Reference Analysis:**
  - Provided the AI assistant with a reference screenshot of an architectural studio portfolio.
  - Extracted two primary layout rhythms: an alternating 2-column featured project hero and a 3-column comparative project grid.
  - Specified clean, high-contrast serif typography (*Playfair Display* & *Cinzel*) paired with functional sans-serif (*Inter*).
- **Avoiding Templates:** 
  - Bespoke CSS grid architecture built from zero to match spatial sensibilities rather than generic Bootstrap or WordPress themes.

> **Talking Point:**
> *"I began by giving the AI assistant an annotated visual reference of a minimalist architecture studio. I didn't simply say 'make it pretty'; instead, I directed the AI to alternate between asymmetric 2-column hero features and 3-column grid sections, mimicking the pacing of an architectural monograph."*

---

## Slide 3: Content-Presentation Decoupling (The Core Requirement)
- **Problem with Static Sites:** Updating HTML directly is error-prone, fragile, and requires coding knowledge.
- **Our Solution:** Complete Decoupling via Structured JSON:
  ```
  projects.json (Data)  -->  portfolio.js (Engine)  -->  index.html (DOM Render)
  cv.json (Data)        -->  cv.js (Engine)         -->  about.html (DOM Render)
  ```
- **Sustainable Maintenance Demonstration:**
  - Show how adding 1 new project in `projects.json` automatically updates the category counts, renders the card, and enables the interactive lightbox without touching a single line of HTML or JavaScript.

> **Talking Point:**
> *"One of the most critical requirements was maintainability. In my site, HTML files contain zero hardcoded project or biographical text. All content lives in human-readable JSON files. Anyone—including non-programmers—can add a new building or update an internship in seconds simply by editing `projects.json` or `cv.json`."*

---

## Slide 4: Interactive Features & Multi-Page Architecture
- **Page 1: `index.html` (Selected Works):**
  - Dynamic category filtering with real-time project counter pills.
  - Asymmetric editorial layouts.
  - Non-intrusive Lightbox modal displaying floor area, tectonic concepts, materials, and awards.
- **Page 2: `about.html` (Curriculum Vitae & Research):**
  - Bilingual identity: Chinese name (林楚熙) and English name (Chu-Xi Lin).
  - Spatial statement, academic milestones (NCKU / TUM exchange), studio practice, and 4 specialized technical competency matrices.

> **Talking Point:**
> *"The site consists of two distinct pages. The Works page features dynamic category filtering and an accessible lightbox modal, while the About & CV page presents my academic trajectory, bilingual spatial philosophy, and computational fabrication competencies."*

---

## Slide 5: Git Version Control & Development Process
- **Meaningful Commit History:**
  - `docs:` Specification and roadmap establishment.
  - `style:` Architectural styling and responsive grid systems.
  - `feat(data):` JSON schemas for projects, CV, and bio content.
  - `feat(js):` Dynamic fetching, category filtering, and modal lightbox.
  - `feat(ui):` Decoupled multi-page composition.
- **Deployment:**
  - Seamless zero-configuration deployment to GitHub Pages.

> **Talking Point:**
> *"Our Git repository reflects clear, incremental development phases rather than an all-in-one final commit. Each commit represents a distinct layer: documentation, styling, data schemas, dynamic JavaScript engines, and page composition."*

---

## Slide 6: Conclusion & Takeaways
- Effective AI prompt engineering requires precise architectural vocabulary (tectonics, hierarchy, visual rhythm, constraints).
- Separation of content and presentation creates long-term value.
- Thank you! Q&A.
