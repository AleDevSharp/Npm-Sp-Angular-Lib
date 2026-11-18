# SpLib showcase branding and metadata

## Brand assets

The original SP monogram uses the showcase's purple, pink, coral and orange palette. The same mark appears beside the SpLib name in the top-left navigation and in browser tabs.

- `public/sp-lib-mark.svg`: editable vector source, with no font or external asset dependencies.
- `public/sp-lib-mark.png`: transparent 512 x 512 export.
- `public/favicon.ico`: 16, 32, 48 and 64 pixel versions for browser compatibility.
- `public/apple-touch-icon.png`: 180 x 180 export for Apple home-screen bookmarks.

Keep these exports synchronized when changing the SVG. Angular copies `public` into the production output through the existing asset configuration.

## Library identity and package discovery

The public identity is **SpLib - Angular UI Components by AleDevSharp**. Both READMEs show the existing logo, identify the author and link the npm package, library source and showcase source. The npm README uses an absolute GitHub image URL so the logo can render outside the repository; push the brand assets together with the documentation before publishing the package.

Both package manifests contain a descriptive summary and relevant npm keywords. The library manifest also identifies `projects/sp-lib` through `repository.directory`; `homepage` points to GitHub until a public showcase URL is chosen. These metadata changes reach npm with the next package release.

## Page metadata

`src/index.html` identifies AleDevSharp in the initial title and author metadata and supplies the initial English title, language, description, application name, theme color, favicon links and basic social metadata. The AppBar lets visitors choose English or Italian. The initial language is English; an explicit saved choice is restored on later visits. See [I18N.md](I18N.md) for translation maintenance.

Each content route in `src/app/app.routes.ts` defines catalog keys for its title and description. `ShowcaseTitleStrategy` synchronizes the localized browser title, meta description and Open Graph/Twitter title and description after navigation and language changes, including browser history navigation. Document language and Open Graph locale follow the selected language. The sidebar identifies the current page through `aria-current="page"`.

The showcase version badge currently matches `projects/sp-lib/package.json`. Update `nav.003` in both translation catalogs when preparing a new library release.

## Netlify deployment

The root `netlify.toml` builds the client-rendered showcase with `npm run build:showcase` and publishes `dist/sp-showcase/browser`. Node.js 22.22.3 is pinned in that file and `.nvmrc`. Connect the repository to a separate Netlify project with the repository root as the base directory. The showcase imports the library sources using the root TypeScript path mapping; neither an external sibling package nor a separate library build is needed.

The deployment targets the domain root with the existing base href `/`. A non-forced SPA rewrite serves `index.html` for Angular routes, preserving real static assets. Verify direct navigation and refresh on component pages after deployment. This configuration does not publish the npm package.

## Publication configuration still needed

The repository does not establish a production showcase URL. Once the HTTPS origin and deployment base path are known:

1. Set the deployment base href when hosting below a subpath. Keep asset links relative to that base.
2. Verify direct visits to routes and static assets on the deployed site. The Netlify SPA fallback is already configured in `netlify.toml`.
3. Add absolute canonical URLs for individual pages. Avoid giving every component page the homepage canonical.
4. Add `og:url`, absolute `og:image` and `twitter:image` URLs, image dimensions and image descriptions. The PNG mark is available as a starting asset.
5. Add `WebSite` structured data on the homepage with the name `SpLib` and its actual production URL, plus a sitemap listing the published content URLs. Configure `robots.txt` for the actual hosting location if needed; index/follow are the default and need no explicit meta tag.
6. Verify the deployed site using Google Search Console, including rendered HTML, crawl access to the favicon and direct page URLs.

The current showcase is client rendered. Search metadata updates after Angular starts; link preview crawlers that do not run JavaScript receive the initial metadata. Route-specific previews in those clients require prerendering or server rendering. Browser checks cannot establish live Google indexing, rankings, or the final text Google chooses to display.

References: [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [Google favicon guidelines](https://developers.google.com/search/docs/appearance/favicon-in-search), [Google site names](https://developers.google.com/search/docs/appearance/site-names).
