# Portfolio images

All visible site images live in this folder. Put your own photos, project
screenshots, or cover images here; no external image service is needed at runtime.

| File | Where it appears | Suggested size |
| --- | --- | --- |
| `profile.png` | Small navbar avatar beside the name | Square, at least 64 × 64 |
| `backend-architecture.png` | Transparent intro background visual | 1792 × 1024 with alpha transparency |
| `background.svg` | Moving page background | Decorative image or SVG, around 1440 × 1000 |
| `spring-log.svg` | Logging starter cover | 720 × 360, or any 2:1 image |
| `platform.svg` | Microservices platform cover | 720 × 360, or any 2:1 image |
| `briefly.svg` | Briefly cover | 720 × 360, or any 2:1 image |
| `local-ai.svg` | Android AI helper cover | 720 × 360, or any 2:1 image |
| `spring-log-flow.svg` | Animated method / logging flow | 720 × 420 |
| `platform-flow.svg` | Animated gateway / catalog request | 720 × 420 |
| `briefly-flow.svg` | Animated extraction / summarization flow | 720 × 420 |
| `local-ai-flow.svg` | Animated local screen-assistance flow | 720 × 420 |

Replace `profile.png` with a favorite portrait or `backend-architecture.png` with a
transparent technical illustration using the same filenames. The avatar is small, softly masked,
and placed beside the navbar wordmark. The included photo was downloaded from Ramkrishna's
GitHub profile; it does not require a live GitHub request to display.

The page uses `background.svg` as a subtle contour layer that moves on scroll.
Replace it with another SVG, or change the background URL in
[styles.css](../styles.css) to use a JPG, PNG, or WebP. The transparent intro illustration
also moves slightly on scroll. Both effects stop with reduced motion.

The animated SVGs use moving data packets, highlighted components, and four
step captions per loop. They are loaded through same-origin `<object>` elements
so the page can pause their timelines individually, off-screen, or for reduced
motion. The original 2:1 SVG covers remain as fallback images. Without JavaScript,
the new SVGs display a static architecture overview.

For a custom animated diagram, edit or replace its `*-flow.svg` file. For a photo,
GIF, or screenshot instead, replace the corresponding `<object>` in
[index.html](../index.html) with `<img src="./img/your-file.jpg" alt="...">`, and
remove that card's `diagram-controls` row. Prefer files below 200 KB when possible.

The current project covers are original SVG code/architecture illustrations,
not screenshots of running applications. The hero background is an original generated
illustration of backend services, data flow, and storage components.

If a project image is missing, JavaScript replaces it with a simple text cover.
A missing avatar shows initials, and a missing hero illustration leaves the contour background.
The portfolio's project descriptions and links are independent of the images.
