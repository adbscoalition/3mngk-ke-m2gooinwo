const features = [
  "TEFFB, RadB, MassB, RadSeed, TeffSeed, and MassSeed calculations",
  "Continuous spectral and evolution interpolation",
  "Current Teff, radius, mass, luminosity, density, stage, path, and SpectralC presentation",
  "Local leaderboard with editable entries and synchronized refresh support",
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero-card" aria-labelledby="page-title">
        <p className="eyebrow">Website-ready deployment shell</p>
        <h1 id="page-title">Charlotte Star Calculator</h1>
        <p className="intro">
          This Next.js app now has an application entry point, global styling, and
          static-export configuration so it can render in a browser and be hosted
          as a website.
        </p>
        <div className="actions" aria-label="Project actions">
          <a href="#features" className="button button-primary">
            View features
          </a>
          <a href="https://nextjs.org/docs/app/building-your-application/deploying" className="button button-secondary">
            Deployment docs
          </a>
        </div>
      </section>

      <section id="features" className="content-card" aria-labelledby="features-title">
        <h2 id="features-title">Preserved app purpose</h2>
        <p>
          The project remains focused on the Charlotteverse star-calculation
          workflow described in the README. This page is intentionally minimal:
          it makes the repository renderable without replacing the future
          calculator implementation.
        </p>
        <ul>
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
