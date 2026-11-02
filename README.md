# Tullymurry Equestrian Centre website

Static website for [tullymurryequestrian.co.uk](https://www.tullymurryequestrian.co.uk). Plain HTML, CSS and a little JavaScript: no build step.

## Pages
- `index.html` – Home
- `riding-school.html`, `riding-camps.html`, `events.html`, `livery.html`, `gallery.html`, `facilities.html`
- `clubs.html` – Pony Club Linked Centre and Riding for the Disabled (under Riding School in the menu)
- `contact.html` – contact details and map
- `404.html` – page-not-found

Styles are in `css/style.css` (brand colours at the top), behaviour in `js/main.js`.

## Editing events and the gallery (no code needed)
Events and gallery photos are edited with **Pages CMS** (free), at https://app.pagescms.org.

**One-off setup (owner):**
1. Go to https://app.pagescms.org and sign in with GitHub.
2. Open the `tmec` repository. You'll see two sections: **Events** and **Gallery**.
3. To give someone access, open **Collaborators** in Pages CMS and invite them by email. They don't need a GitHub account.

**Editors:**
- **Events:** add an event with its name, date (or leave the date empty and type e.g. "Spring" in *Date text*), a short description and an optional link. Past events disappear from the site automatically.
- **Gallery:** add a photo, write a caption and choose a category (Lessons, Camps, Events, The Yard).
- Click **Save**. The live site updates within a minute or two.

The data lives in `data/events.json` and `data/gallery.json`; the editor settings are in `.pages.yml`.

## Adding photos
See `assets/img/photos/README.md` and `assets/img/gallery/README.md`. Drop files in with the listed names and they replace the placeholders automatically.

## Forms (lesson booking, livery enquiry, home contact)
All forms send to info@tullymurryequestrian.co.uk.
1. Once that mailbox is working, go to https://web3forms.com, enter the address and you'll be emailed a free access key.
2. Paste the key into `js/forms.js` where it says `web3formsKey: ''`, then push.

Until the key is added, submitting a form opens the visitor's email app with the details filled in, addressed to info@.

## Logos
The BHS logo is in `assets/img/logos/bhs-logo.png`.

## Hosting on Cloudflare
The site runs as a Cloudflare Worker called `tmec` (account: Dean@trt-ni.co.uk), connected to this repository.

- Every push to `main` is built and deployed automatically (Cloudflare dashboard → Workers & Pages → `tmec` → Deployments).
- `wrangler.jsonc` sets which folder is served and uses `404.html` for missing pages. `.assetsignore` lists repo files that are not published.
- Addresses: https://www.tullymurryequestrian.co.uk (main) and https://tullymurryequestrian.co.uk, which redirects to www. Preview: https://tmec.trt-ni.workers.dev
- DNS for tullymurryequestrian.co.uk is managed in Cloudflare. The domain is still registered with 123-reg, and email (info@) is still hosted there. Don't delete the MX, SPF (TXT), `_dmarc`, `_autodiscover` or `email` records in Cloudflare, or email will stop working.
