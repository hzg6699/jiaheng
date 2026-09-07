# Jiaheng Han — Academic Homepage

Personalized from [luost26/academic-homepage](https://github.com/luost26/academic-homepage), under the original MIT license. The original Jekyll layouts, Bootstrap 4.6 styling, Lato typography, navigation and publication cards are retained.

## Content

- Home: profile, education, experience, honors and selected publications.
- Publications: all four CV publications, grouped by year.
- Showcase: 10 categorized activity albums (128 photos), and a unified 23-page certificate gallery. The original reference carousel is retained above the certificate gallery on the right; travel and hobbies remain pending.
- Home (Layout 2), Blog and News are removed.
- Each publication has a Paper link and a DOI link to the original publisher article. Its DOI identifier is stored separately and appears in the DOI link tooltip. Add a `Code` entry to `links` only when a real public repository is available.

Personal content comes from the supplied CV. Publisher records verify article identifiers and equal contribution on the Nutrients paper. The CV's duplicated `https://doi.org/` prefixes have been corrected in publication metadata. University logos and the LinkedIn URL come from the previous personal website. The supplied IMG_7615 portrait is displayed above the name without cropping. The MPH dates follow the CV; the biography does not assert that the degree has already been formally conferred.

## Edit

- `_data/profile.yml`: biography, contacts, education, experience and awards.
- `_publications/*.md`: publication metadata. `links.DOI` is the publisher article URL; `doi` holds the identifier. Add `links.Code` when available.
- `_data/navigation.yml`: navigation.
- `showcase.html` and `_showcase/`: future showcase content.
- `assets/files/Jiaheng-Han-CV.pdf`: original supplied CV download.
- Set `portrait_url` in `_data/profile.yml` after adding your preferred portrait to `assets/images/photos/`.

## Local build

The original Jekyll source remains usable with `bundle install` followed by `bundle exec jekyll serve` on a machine with a supported Ruby environment.

A small alternative static build renders these same Liquid templates without requiring Ruby native build tools:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm dev
```

The static output is `dist/`. The local preview is http://127.0.0.1:4173. The alternative renderer implements the date-year grouping used by this site; use Jekyll for additional Jekyll-specific features added later.

## GitHub Pages

Upload the source to your own repository. Set `_config.yml` `url` to your chosen site origin and `baseurl` to an empty string for a username.github.io site, or your repository path for a project site. Set up Pages with the Jekyll workflow appropriate to that repository, or publish `dist/` as static output. The Sites configuration is specific to this private preview and is not required by GitHub Pages.

## Sources

- https://github.com/luost26/academic-homepage
- https://hzg6699.wixsite.com/gaahang
- https://www.mdpi.com/2072-6643/17/16/2624
- https://www.sciopen.com/article/10.26599/FSHW.2025.9250892
- https://www.sciencedirect.com/science/article/abs/pii/S2212429225000975
- https://www.sciencedirect.com/science/article/abs/pii/S0141813024045525

## Showcase maintenance

`_data/gallery.yml` lists all albums, chosen covers, image labels and PDF links. Web-ready WebP images and thumbnail variants are stored in `assets/gallery/`. HEIC images were decoded with their orientation preserved; PDF pages were rendered at 2.5× scale. No generative enhancement or document-content edits were applied. The certificate viewer includes 23 pages from the 22 supplied files; the two NCRE certificate-notes previews and the UN CC:Learn course-details preview were removed as requested. Original PDFs remain intact. The right-hand certificate card has three manual pages of up to nine thumbnails and aligns with the bottom of the left-hand activity card on desktop. Activity photos retain all 128 supplied files, including duplicates. The original desktop source files are unchanged.

Gallery interactions use native accessible dialogs: select a cover to browse every thumbnail, select an image to enlarge it, use arrow keys or previous/next controls to browse, and Escape to close. Certificate tiles open directly in the same viewer.

Activity album dialogs use a compact three-column masonry layout (two on mobile), four-pixel gutters, and each image’s natural aspect ratio. Explicit CSS height:auto overrides the source pixel-height attributes so thumbnails cannot expand into oversized letterboxed frames.

Institution badges are included for all six Experience entries. HKU and MUST reuse the Education logos; hospital and Guangzhou Restaurant marks match the user-supplied references. The original desktop images and PDFs remain unchanged.

## GitHub Pages

Public website: https://hzg6699.github.io/jiaheng/

Push changes to `main` to publish automatically through GitHub Actions. Edit `_data/profile.yml` for the biography, institutions and social links; `_data/gallery.yml` for albums; `_publications/` for papers; and `assets/` for photos and PDFs. Keep the folder structure when uploading files. Check the Actions tab for publication progress.

The build uses `SITE_BASEURL` to support the `/jiaheng` path, including album and certificate viewers. To preview the GitHub Pages output locally, run `SITE_BASEURL=/jiaheng pnpm build`.
