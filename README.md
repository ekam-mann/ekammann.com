# ekammann.com

Personal portfolio site for Ekam Mann, Mechanical Engineering student at UBC (aerospace specialization).

## Stack

Static HTML, CSS, and vanilla JS. No build step, no framework, no dependencies.

## Structure

```
index.html                  About (landing page)
projects/index.html         Projects grid
projects/<slug>/index.html  Project detail pages (5)
resume/index.html           Embedded resume PDF + download
assets/css/style.css        Design system and layout
assets/js/main.js           Mobile nav toggle, obfuscated mailto
assets/img/                 Optimized project images
assets/resume/              Resume PDF
404.html                    Custom not found page
CNAME                       Custom domain for GitHub Pages
```

## Local development

No build step required. Serve the repo root with any static file server, for example:

```
python -m http.server 8090
```

Then open `http://localhost:8090`.

## Deployment

Hosted on GitHub Pages, served from the `main` branch root. The `CNAME` file points the custom domain at `ekammann.com`; DNS is configured separately at the registrar (A records to GitHub Pages).
