"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateStar, formatMass, formatNumber, type StarResult } from "./lib/calculator";

type LeaderboardEntry = StarResult & { id: string; createdAt: string };

const STORAGE_KEY = "charlotte-star-calculator-leaderboard";

export default function Home() {
  const [clt, setClt] = useState("92");
  const [surname, setSurname] = useState("Charlotte");
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as LeaderboardEntry[]) : [];
  });
  const [ranking, setRanking] = useState<"score" | "luminosity" | "currentMass">("score");

  const cltValue = Number(clt);
  const result = useMemo(() => calculateStar(cltValue, surname), [cltValue, surname]);


  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const sortedEntries = [...entries].sort((a, b) => b[ranking] - a[ranking]);

  function saveEntry() {
    const entry: LeaderboardEntry = {
      ...result,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setEntries((current) => [entry, ...current].slice(0, 25));
  }

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Charlotteverse calculator</p>
          <h1>Charlotte Star Calculator</h1>
          <p className="intro">
            Enter a CLT value and legal surname to calculate base stellar values,
            seeded values, current evolution values, spectral classes, density,
            luminosity, and a local leaderboard score.
          </p>
        </div>
        <div className="quick-result" aria-label="Current star summary">
          <span>{result.spectralC}</span>
          <strong>{formatNumber(result.currentTeff, 0)} K</strong>
          <small>{result.stage}</small>
        </div>
      </section>

      <section className="calculator-grid">
        <form className="card input-card" onSubmit={(event) => event.preventDefault()}>
          <h2>Inputs</h2>
          <label>
            CLT
            <input
              inputMode="decimal"
              min="0"
              type="number"
              value={clt}
              onChange={(event) => setClt(event.target.value)}
            />
          </label>
          <label>
            Legal surname
            <input value={surname} onChange={(event) => setSurname(event.target.value)} />
          </label>
          <button type="button" onClick={saveEntry}>
            Save to leaderboard
          </button>
        </form>

        <section className="card results-card" aria-labelledby="results-title">
          <h2 id="results-title">Calculated result</h2>
          <ResultGrid result={result} />
        </section>
      </section>

      <section className="card leaderboard" aria-labelledby="leaderboard-title">
        <div className="leaderboard-header">
          <div>
            <p className="eyebrow">Local browser storage</p>
            <h2 id="leaderboard-title">Leaderboard</h2>
          </div>
          <select value={ranking} onChange={(event) => setRanking(event.target.value as typeof ranking)}>
            <option value="score">Rank by score</option>
            <option value="luminosity">Rank by luminosity</option>
            <option value="currentMass">Rank by mass</option>
          </select>
        </div>
        {sortedEntries.length === 0 ? (
          <p className="empty">No saved stars yet. Calculate a profile and save it.</p>
        ) : (
          <ol className="entry-list">
            {sortedEntries.map((entry) => (
              <li key={entry.id}>
                <strong>{entry.surname || "Unnamed"}</strong>
                <span>CLT {entry.clt}</span>
                <span>{entry.spectralC}</span>
                <span>{formatNumber(entry[ranking], ranking === "currentMass" ? 4 : 2)}</span>
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}

function ResultGrid({ result }: { result: StarResult }) {
  const rows = [
    ["TEFFB", `${formatNumber(result.teffB, 3)} K`],
    ["RadB", `${formatNumber(result.radB, 4)} R☉`],
    ["MassB", `${formatMass(result.massB)} M☉`],
    ["RadSeed", `${formatNumber(result.radSeed, 4)} R☉`],
    ["TeffSeed", `${formatNumber(result.teffSeed, 3)} K`],
    ["MassSeed", `${formatMass(result.massSeed)} M☉`],
    ["SpectralB", result.spectralB],
    ["Current Teff", `${formatNumber(result.currentTeff, 0)} K`],
    ["Current radius", `${formatNumber(result.currentRadius, 4)} R☉`],
    ["Current mass", `${formatMass(result.currentMass)} M☉`],
    ["Luminosity", `${formatNumber(result.luminosity, 4)} L☉`],
    ["Density", `${formatNumber(result.density, 6)} g/cm³`],
    ["Stage", result.stage],
    ["Path", result.path],
    ["SpectralC", result.spectralC],
  ];

  return (
    <dl className="result-grid">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
