# Café des Langues — website

A 4-page static site: `index.html`, `pricing.html`, `code-of-conduct.html`, `enroll.html`, sharing `css/style.css`. No build step, no dependencies — just files.

## Publish it on GitHub Pages

1. Create a new repository on GitHub (e.g. `cafe-des-langues`).
2. Upload these files to the repository root, keeping the `css` folder intact.
   - Easiest: on the repo page, click **Add file → Upload files**, drag in everything from this folder, and commit.
3. Go to **Settings → Pages** in the repo.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`. Save.
5. GitHub gives you a URL like `https://your-username.github.io/cafe-des-langues/` within a minute or two.

If you later want a custom domain (e.g. `cafedeslangues.com`), that's also set from **Settings → Pages → Custom domain** — happy to help with that step when you're ready.

## Editing content later

- All copy lives directly in the HTML files — no CMS, so edits mean opening the file and changing the text.
- The enrollment button on `enroll.html` points to `https://bit.ly/CafedesLangues`. Update that one link if the form URL changes.
- Contact email (`cafedeslangues.edu@gmail.com`) appears in the footer of every page and on the code of conduct and enroll pages.

## What still needs your eye

- The **hero and "about" copy** on `index.html` (the "A café table, not a classroom" section) is a first draft — written from the school's format and policies, not dictated content. Reword it to sound like you.
- Pricing, payment terms, attendance policy, and the full code of conduct are taken directly from your Terms & Conditions document.
