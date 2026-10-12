# Admin editing — setup

The site's text can be edited from the live website by an admin. Edits are stored in a
Google Sheet through a small Google Apps Script, so changes go live without a redeploy.

```
Visitor's browser ──GET──▶ Apps Script web app ──▶ Google Sheet ("Content" tab)
Admin's browser  ──POST (login / save)──▶ same web app
```

The built-in text in the code is always the fallback: if the sheet is empty or
unreachable the site shows its original content.

## One-time setup (about 10 minutes)

1. **Create the sheet.** In Google Drive create a new Google Sheet, e.g. "Alpha IT — Site
   Content". Keep it private; the website never reads it directly.
2. **Add the script.** In the sheet open *Extensions → Apps Script*. Delete the sample code
   and paste the contents of [`apps-script/Code.gs`](apps-script/Code.gs). Save.
3. **Set the admin login.** In the Apps Script editor open *Project Settings* (gear icon) →
   *Script properties* → *Add script property*:

   | Property | Value |
   | --- | --- |
   | `ADMIN_USERNAME` | the admin's username, e.g. `admin` |
   | `ADMIN_PASSWORD` | a strong password (16+ characters) |

   The credentials live only here, never in the website code. To change the password,
   edit the property. To sign everyone out immediately, delete `TOKEN_SECRET`.
4. **Deploy.** *Deploy → New deployment* → type **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**

   Authorize when asked (Google warns the app is unverified because you wrote it —
   choose *Advanced → Go to project*). Copy the **Web app URL** (ends in `/exec`).
5. **Point the site at it.** Set the URL as an environment variable where the site is built:

   ```bash
   VITE_CONTENT_API_URL=https://script.google.com/macros/s/XXXX/exec
   ```

   Locally put it in `.env.local`; on Netlify/Vercel/etc. add it under the project's
   environment variables. Rebuild/redeploy **once**. From then on, content changes need no
   deploys.

> If you later change `Code.gs`, use *Deploy → Manage deployments → Edit → New version*
> so the URL stays the same.

## Editing the site

Go to `https://<your-site>/admin` and sign in. While signed in:

| To change… | Do this |
| --- | --- |
| Any text | Click text with a dashed blue outline (green = already edited) |
| A button's label or where it goes | Click the button text — the dialog has a Label and a Link field |
| A photo | Click the photo → upload from your computer (stored in your Google Drive) or paste an image URL |
| Cards, jobs, chips, stats, ticks | Hover an item → ↑ ↓ to reorder, ✕ to delete · **+ Add …** under the list adds a new one |
| A card's icon | Click the icon and pick another |
| Section order | Hover a section → green bar → **↑ Up / ↓ Down**; **Hide** removes a built-in section from the page |
| New sections | **+ Add section here** between sections → Text block, Cards, Image + text or Call to action. Added sections can change background, image side, or be deleted |
| Hero slides | Use the slide controls under the hero: add, move, change image, delete |
| Colours, button shape, corners, logo, header options | **Site settings** in the bar at the bottom of the screen |

Every change is saved immediately and visitors see it on their next page load.
**Restore original** in an edit dialog returns that text/image to the built-in version.
Sessions expire after 8 hours; sign out from the bar at the bottom.

The *Content* tab of the sheet lists every change (`key`, `value`, `updated`). Deleting a row
there restores the original for that item. Uploaded images live in the Drive folder
*Alpha IT Technologies — Site Images* — don't delete files that are still in use.

## For developers

- Text: `<Editable id="page.section.field">Default</Editable>`. Buttons: `<ButtonLink id to>`.
  Images: `<EditableImage id src>`. Icons: `<EditableIcon id fallback>`.
- Lists: `<EditableList id defaults renderItem newItem>` stores the item order under
  `<id>.order` and each item's fields under `<id>.<itemId>.<field>`.
- Sections: `<PageSections page sections>` stores the layout under `layout.<page>`; added
  sections are rendered by `src/admin/CustomSection.jsx` with content under `sections.<id>.*`.
- Design settings are JSON under `site.settings` (`src/admin/theme.js`).
- Renaming an id orphans its saved edit — keep ids stable.
- Still done in code: new pages and menu items, the contact form, and brand-new kinds of section.
