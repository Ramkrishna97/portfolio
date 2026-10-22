# Ramkrishna Portfolio

A static, source-linked portfolio built from the public work at
<a href="https://github.com/Ramkrishna97" target="_blank" rel="noopener noreferrer">github.com/Ramkrishna97 ↗</a>.

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
