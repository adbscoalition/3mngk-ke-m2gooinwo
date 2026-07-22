# Deploying the Charlotte Star Calculator

The project is a standard Next.js repository configured for zero-environment-variable deployment on Vercel.

## 1. Extract the download

Extract the ZIP into a new empty folder. The repository files are already at the root of the archive; do not upload the ZIP itself as the Vercel project root.

## 2. Push it to GitHub

Create an empty GitHub repository, then run these commands from the extracted project folder:

```bash
git init
git add .
git commit -m "Initial Charlotte Star Calculator"
git branch -M main
git remote add origin https://github.com/YOUR-NAME/YOUR-REPOSITORY.git
git push -u origin main
```

## 3. Import it into Vercel

1. Open the Vercel dashboard and choose **Add New → Project**.
2. Import the GitHub repository.
3. Confirm the framework preset is **Next.js** and the root directory is `./`.
4. Leave environment variables empty.
5. Choose **Deploy**.

Future pushes to `main` deploy to production. Pull requests and other branches receive preview deployments automatically.

## 4. Connect your domain

In Vercel, open **Project Settings → Domains**, add the domain, and apply the DNS records Vercel displays. Vercel provisions HTTPS after the records resolve.

## Optional local verification

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm build
pnpm dev
```

The leaderboard uses browser `localStorage`. It works immediately after deployment, but each visitor has a separate leaderboard. A shared public leaderboard requires a database or API.
