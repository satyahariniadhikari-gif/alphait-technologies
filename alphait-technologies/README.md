# AlphaIT Technologies — website

React (Vite) marketing site for AlphaIT Technologies, modelled on the structure of
skilltune.com: top contact bar, sticky primary nav, hero carousel, services, stats,
careers and a "request a call back" form.

## Run

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production bundle in dist/
npm run preview # serve the built bundle
```

## Where things live

| Path | Purpose |
| --- | --- |
| `src/data/site.js` | **Single source of truth** — company name, address, phone, email, nav, services, jobs, stats. Edit here to change content site-wide. |
| `src/assets/alpha-logo.jpeg` | Logo used in the header and footer (`public/alpha-logo.jpeg` is the favicon copy). |
| `src/components/` | Header, Footer, HeroSlider, PageBanner, ServiceCard, CallbackForm, Icon (inline SVG set). |
| `src/pages/` | Home, About, Services, Career, Contact, NotFound. |
| `src/index.css` | All styling — design tokens are the CSS custom properties in `:root`. |

## Contact details

971 US Highway 202 N, Branchburg, NJ 08876 · +1 (732) 383-9115 · info@alphait-technologies.com

## Notes

- The call-back form has no backend. It validates input and then opens the visitor's mail
  client pre-filled to `info@alphait-technologies.com`. Point `handleSubmit` in
  `src/components/CallbackForm.jsx` at a real endpoint (Formspree, an API route, etc.) when
  one exists.
- Routing is client-side (`react-router-dom`). When deploying to a static host, add an
  SPA fallback that rewrites unknown paths to `/index.html`, otherwise deep links like
  `/services` will 404.
