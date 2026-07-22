const features = [
  "Convert CLT and legal surname details into an easy-to-review star profile.",
  "Preview seeded temperature, radius, mass, luminosity, density, stage, and spectral class outputs.",
  "Keep leaderboard-ready result cards clear on desktop, tablet, and mobile screens.",
];

const steps = [
  "Enter a CLT value and surname exactly as it should be evaluated.",
  "Review the generated base and current stellar properties.",
  "Save notable profiles to your browser leaderboard for quick comparison.",
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-content">
          <p className="eyebrow">Charlotteverse toolkit</p>
          <h1 id="hero-title">Charlotte Star Calculator</h1>
          <p className="hero-copy">
            A polished website experience for exploring fictional stellar
            profiles, workbook-inspired evolution values, and locally saved
            leaderboard entries.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="button button-primary" href="#calculator-preview">
              View calculator plan
            </a>
            <a className="button button-secondary" href="#deployment">
              Deployment notes
            </a>
          </div>
        </div>
        <aside className="star-card" aria-label="Example output card">
          <div className="star-orbit" aria-hidden="true">
            <span className="star-core" />
          </div>
          <dl>
            <div>
              <dt>Spectral path</dt>
              <dd>O1 → M9</dd>
            </div>
            <div>
              <dt>Refresh cadence</dt>
              <dd>5 seconds</dd>
            </div>
            <div>
              <dt>Storage</dt>
              <dd>Browser localStorage</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="panel-grid" id="calculator-preview">
        <article className="panel">
          <h2>Website-ready calculator</h2>
          <p>
            The repository is configured as a Next.js website with a focused
            landing page, semantic sections, responsive styling, and production
            metadata for the Charlotte Star Calculator concept.
          </p>
        </article>
        <article className="panel">
          <h2>Designed flow</h2>
          <ol className="steps">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
      </section>

      <section className="feature-section" aria-labelledby="features-title">
        <div>
          <p className="eyebrow">Core capabilities</p>
          <h2 id="features-title">Built for a fictional stellar registry</h2>
        </div>
        <div className="feature-list">
          {features.map((feature) => (
            <article key={feature} className="feature-item">
              <span aria-hidden="true">✦</span>
              <p>{feature}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="deployment" id="deployment">
        <p className="eyebrow">Launch path</p>
        <h2>Ready for Vercel previews</h2>
        <p>
          Push the branch to GitHub, import the repository in Vercel, keep the
          detected Next.js framework settings, and use pull-request previews to
          validate future calculator additions before production release.
        </p>
      </section>
    </main>
  );
}
