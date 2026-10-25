# Tullymurry Equestrian Centre website

The website for **www.tullymurryequestrian.com**. It's a plain HTML/CSS site with no build step, so you can host it on Cloudflare Pages for free.

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Riding School | `riding-school.html` |
| Riding Camps | `riding-camps.html` |
| Events | `events.html` |
| Livery | `livery.html` |
| Gallery | `gallery.html` |
| Facilities | `facilities.html` |
| Contact | `contact.html` |

Styling lives in `assets/css/style.css`. The colours (logo gold `#f9b22c` on black) are set at the top of that file.

## Adding photos

Every picture on the site is a "photo slot". Save a JPG into `assets/img/photos/` with the filename below and it appears automatically. Until then, the slot shows a gold horseshoe placeholder.

| Filename | Where it appears |
|---|---|
| `hero.jpg` | Big banner on the home page (landscape, at least 1920px wide) |
| `welcome.jpg` | Home page welcome section (portrait) |
| `riding-school.jpg`, `riding-camps.jpg`, `events.jpg`, `livery.jpg`, `facilities.jpg`, `gallery.jpg` | Home page "What we offer" cards. Some are reused on inner pages. |
| `banner-riding-school.jpg`, `banner-camps.jpg`, `banner-events.jpg`, `banner-livery.jpg`, `banner-facilities.jpg`, `banner-gallery.jpg`, `banner-contact.jpg` | Banner at the top of each page (landscape) |
| `camps.jpg`, `camps-2.jpg`, `lesson-prices.jpg` | Riding Camps / Riding School pages |
| `indoor-arena.jpg`, `outdoor-arena.jpg`, `cross-country.jpg`, `stables.jpg` | Facilities page |
| `gallery-01.jpg` … `gallery-12.jpg` | Gallery page |

Resize photos to about 1600–2000px wide before uploading so the pages stay fast.

## Things to check before going live

I couldn't reach the old site while building this one, so the details came from public listings (BHS, Visit Mourne Gullion Strangford, MapQuest). Please check:

- **Email.** `sarahjgething@aol.com` came from an old listing. If it's wrong, search and replace it across all `.html` files.
- **Phone.** 028 4481 1880.
- **Prices.** Lesson prices currently say "Please enquire" (`riding-school.html`).
- **Livery packages.** Full, part and DIY are shown on `livery.html`. Remove any you don't offer.
- **Camps.** Easter, summer and Halloween camps, from age 6, are on `riding-camps.html`.
- **Events.** Dates currently say "TBC". The comment in `events.html` explains how to add a dated event.
- **Facebook / Instagram.** No social links yet. Send them over and they can go in the header and footer.
- **Contact form.** It opens the visitor's email app. For a form that sends directly, you could connect a free service such as Formspree.

## Hosting on Cloudflare Pages

1. Log in to Cloudflare and go to **Workers & Pages → Create → Pages → Connect to Git**.
2. Choose this GitHub repository and the branch to publish.
3. Use these build settings:
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/`
4. Click **Save and Deploy**. The site goes live at `<project>.pages.dev`.
5. To link the domain, open the Pages project and go to **Custom domains → Set up a custom domain**. Add `www.tullymurryequestrian.com`, then `tullymurryequestrian.com`.
   - If the domain's DNS is on Cloudflare, the records are created for you.
   - If the DNS stays with your current registrar, add a **CNAME** record for `www` pointing to `<project>.pages.dev`. Alternatively, move the domain's nameservers to Cloudflare, which is the simplest route.

Each change pushed to GitHub redeploys the site automatically.

## Previewing locally

Open `index.html` in a browser. To preview the site exactly as it will be served, run `python3 -m http.server` in this folder and visit http://localhost:8000.
