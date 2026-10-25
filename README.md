# Tullymurry Equestrian Centre website

Static website for [tullymurryequestrian.com](https://www.tullymurryequestrian.com). Plain HTML, CSS and a little JavaScript: no build step.

## Pages
- `index.html` – Home
- `riding-school.html`, `riding-camps.html`, `events.html`, `livery.html`, `gallery.html`, `facilities.html`
- `contact.html` – contact details and map
- `404.html` – page-not-found

Styles are in `css/style.css` (brand colours at the top), behaviour in `js/main.js`.

## Adding photos
See `assets/img/photos/README.md` and `assets/img/gallery/README.md`. Drop files in with the listed names and they replace the placeholders automatically.

## Hosting on Cloudflare Pages
1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick the `tmec` repository, branch `main`.
3. Framework preset: **None**. Build command: *(leave empty)*. Build output directory: `/`.
4. Deploy. You'll get a `*.pages.dev` address to preview.
5. Once you have access to the domain: **Custom domains** → add `tullymurryequestrian.com` and `www.tullymurryequestrian.com`. If the domain's DNS is on Cloudflare this is automatic; otherwise move the nameservers to Cloudflare or add the CNAME records it shows you.

Every push to `main` redeploys the site automatically.
