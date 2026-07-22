const deploymentChecks = [
  "Next.js app directory is present at the project root.",
  "The Vercel framework preset can detect and build the project.",
  "No environment variables are required for the static landing page.",
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">Charlotteverse</p>
        <h1 id="page-title">Charlotte Star Calculator</h1>
        <p className="lede">
          This deployment-ready Next.js page restores the required app entry
          points so Vercel can install, build, and serve the project.
        </p>
      </section>

      <section className="card" aria-labelledby="deployment-title">
        <h2 id="deployment-title">Vercel deployment status</h2>
        <ul>
          {deploymentChecks.map((check) => (
            <li key={check}>{check}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
