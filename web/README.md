# Run the portfolio site

```bash
cd web
npm install
npm run dev
```

Open **http://localhost:5173**

**Production URL (GitHub Pages):**  
https://ramya-rajasekaran1.github.io/Robot-interactive-webpage/

Pushes to `main` run [.github/workflows/deploy-pages.yml](../.github/workflows/deploy-pages.yml).  
In the repo on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions** (once).

Debug hero progress: `http://localhost:5173/?heroProgress=0.5`

Build: `npm run build` · Preview: `npm run preview`

Local production build matching Pages:

```bash
cd web
VITE_BASE_PATH=/Robot-interactive-webpage/ npm run build
npm run preview
```
