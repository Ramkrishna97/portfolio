# Ramkrishna Portfolio

A personal developer portfolio built from the public work at
<a href="https://github.com/Ramkrishna97" target="_blank" rel="noopener noreferrer">github.com/Ramkrishna97 ↗</a>.

## Design and content

A full-width portfolio with a personal introduction, TCS experience, personal
projects, technical skills, education, certifications, and contact links. Dark
charcoal and mint are the default; an optional light theme is saved locally.
Content, navigation, project links, and the resume work without JavaScript.

The GitHub photo appears as a small avatar beside the navbar name. Motion includes
a scroll-driven contour background, a subtle backend-architecture hero visual, gentle hover
highlights, and staggered scroll reveals. Project diagrams animate data packets,
highlight the processing component, and show the current step in a caption.
Each diagram has a pause/play control and stops when off-screen or the tab is
hidden. Without JavaScript or with reduced motion, diagrams show a static overview.
The hosting headers permit same-origin SVG embedding while blocking frames
from other origins.
The technical focus line changes automatically, with a pause/resume control;
it stops when the intro is off-screen or the tab is hidden. Reduced-motion
preferences disable moving effects and expose all content immediately. A fixed
arrow returns to the top from anywhere on the page.

The structure draws from the supplied references:

- [WendoJ](https://wendoj.vercel.app/) / [source](https://github.com/wendoj/developer-portfolio):
  clear introduction, generous section spacing, and image-led project showcases.
- [DeveloperFolio](https://developerfolio.js.org/) / [source](https://github.com/saadpasta/developerFolio):
  experience, categorized skills, education, achievements, and resume access.
- The supplied charcoal-and-mint visual reference informed the color direction.

The layout and assets are original. Copy focuses on actual responsibilities,
implementation details, and learning rather than slogans or service pitches.
Professional details come from the supplied 2026 resume. Personal project
descriptions come from the public GitHub READMEs reviewed on October 26, 2026.

## Images and resume

All visible images are local to [dist/img](./dist/img). See the
[image replacement guide](./dist/img/README.md) for filenames, dimensions, and
how to substitute favorite photos or project screenshots. The intro uses a transparent
backend-systems illustration; the locally saved GitHub avatar is in the navbar. Project images
are animated SVG architecture diagrams, not app screenshots. Images are optional:
if a file is missing, JavaScript shows a simple
text cover while leaving all content and links intact.

The Resume link opens [the supplied PDF](./dist/docs/Ramkrishna-Goswami-Resume.pdf).
Replace this file with an updated PDF under the same name to update the download.

The site is buildless HTML, CSS, and JavaScript. Google Fonts is optional;
system-font fallbacks keep the layout usable if it cannot load.

## Live site

[Open the portfolio](https://portfolio-rk-dev1.vercel.app/)

## Run locally

From the project root:

~~~powershell
py -m http.server 4173 --directory dist
~~~

Then open http://127.0.0.1:4173.

## Deploy on Vercel

The repository includes vercel.json, so Vercel serves the dist/ directory
as a static site without a build command.

1. Import Ramkrishna97/portfolio in Vercel, or run npx vercel --prod.
2. Leave the framework setting as **Other**.
3. Vercel uses the configured dist output directory automatically.

Every push to the connected main branch can trigger a new public deployment.
