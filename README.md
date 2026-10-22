# Ramkrishna Portfolio

A static, source-linked portfolio built from the public work at
<a href="https://github.com/Ramkrishna97" target="_blank" rel="noopener noreferrer">github.com/Ramkrishna97 ↗</a>.

## Live portfolio

- **Production:** <a href="https://portfolio-rk-dev1.vercel.app" target="_blank" rel="noopener noreferrer">portfolio-rk-dev1.vercel.app ↗</a>
- **Main-branch deployment:** <a href="https://portfolio-git-main-rk-dev1.vercel.app" target="_blank" rel="noopener noreferrer">portfolio-git-main-rk-dev1.vercel.app ↗</a>
- **Deployment URL:** <a href="https://portfolio-halu9m83h-rk-dev1.vercel.app" target="_blank" rel="noopener noreferrer">portfolio-halu9m83h-rk-dev1.vercel.app ↗</a>

If a visitor sees a Vercel login screen, turn off Deployment Protection for the
production deployment in Vercel before sharing the link publicly.

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
