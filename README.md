# clothing

A single repository holding three self-contained front-end projects: two versions of the
AlphaIT Technologies marketing site, and the HARINI clothing store.

None of them share code or a build system, so each can be opened, run and deployed on its own.

## What's in here

| Path | Project | Stack | Build step |
| --- | --- | --- | --- |
| `index.html`, `app.js`, `style.css` | AlphaIT Technologies — one-page site | React 18 via CDN + in-browser Babel | None |
| `alphait-technologies/` | AlphaIT Technologies — full multi-page site | React 19, React Router 7, Vite 8 | `npm run build` |
| `website/` | HARINI — clothing store storefront | Static HTML + vanilla JS | None |

---

## 1. AlphaIT one-page site (repo root)

A single-file prototype of the AlphaIT site. React and Babel are loaded from unpkg and JSX
is compiled in the browser, so there is nothing to install.

```bash
# Open directly, or serve it to avoid file:// restrictions
python -m http.server 8000
# then visit http://localhost:8000
```

All markup lives in `app.js` as one `App` component; `style.css` holds the styling.

> In-browser Babel is fine for a prototype but compiles on every page load. Use the Vite app
> below for anything going to production.

## 2. AlphaIT multi-page site (`alphait-technologies/`)

The maintained version — proper routing, componentised layout, and a real build.

```bash
cd alphait-technologies
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle
npm run lint     # oxlint
```

Content is centralised in `src/data/site.js` — company details, nav, services, jobs and
stats all come from there. See [`alphait-technologies/README.md`](alphait-technologies/README.md)
for the full layout and deployment notes.

**Deploying:** routing is client-side, so configure an SPA fallback that rewrites unknown
paths to `/index.html`. Without it, deep links like `/services` will 404.

## 3. HARINI clothing store (`website/`)

A six-page storefront — home, shop, product detail, cart, about and contact — built with
plain HTML, CSS and JavaScript.

```bash
cd website
python -m http.server 8000
# then visit http://localhost:8000
```

`script.js` holds everything: the product catalogue, category list, filtering, and a cart
persisted to `localStorage` under the key `hariniCart`. Product imagery is hotlinked from
Unsplash.

> The cart is browser-only — there is no backend, no checkout and no payment processing.

---

## Notes

- `node_modules/` and `dist/` are gitignored; run `npm install` in `alphait-technologies/`
  after cloning.
- Neither contact form is wired to a backend. The AlphaIT form opens the visitor's mail
  client; point `handleSubmit` in `src/components/CallbackForm.jsx` at a real endpoint when
  one exists.
