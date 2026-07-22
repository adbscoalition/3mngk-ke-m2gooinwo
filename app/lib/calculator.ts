export type StarResult = {
  clt: number;
  surname: string;
  teffB: number;
  radB: number;
  massB: number;
  radSeed: number;
  teffSeed: number;
  massSeed: number;
  spectralB: string;
  spectralC: string;
  stage: string;
  path: string;
  currentTeff: number;
  currentRadius: number;
  currentMass: number;
  luminosity: number;
  density: number;
  score: number;
};

type SpectralBand = {
  label: string;
  minTeff: number;
  maxTeff: number;
  radiusMultiplier: number;
  massMultiplier: number;
};

const SOLAR_TEMPERATURE = 5772;
const SOLAR_DENSITY = 1.409822456;

const spectralBands: SpectralBand[] = [
  { label: "O1", minTeff: 30000, maxTeff: 60000, radiusMultiplier: 9.2, massMultiplier: 16 },
  { label: "B", minTeff: 10000, maxTeff: 29999, radiusMultiplier: 4.6, massMultiplier: 5.1 },
  { label: "A", minTeff: 7500, maxTeff: 9999, radiusMultiplier: 2.1, massMultiplier: 2.2 },
  { label: "F", minTeff: 6000, maxTeff: 7499, radiusMultiplier: 1.35, massMultiplier: 1.35 },
  { label: "G", minTeff: 5200, maxTeff: 5999, radiusMultiplier: 1, massMultiplier: 1 },
  { label: "K", minTeff: 3700, maxTeff: 5199, radiusMultiplier: 0.78, massMultiplier: 0.74 },
  { label: "M", minTeff: 2400, maxTeff: 3699, radiusMultiplier: 0.48, massMultiplier: 0.36 },
  { label: "L0", minTeff: 1300, maxTeff: 2399, radiusMultiplier: 0.22, massMultiplier: 0.12 },
];

const stages = [
  { label: "Protostar", maxAge: 0.08, teff: 0.78, radius: 2.4, mass: 0.94 },
  { label: "Proto-main-sequence", maxAge: 0.18, teff: 0.91, radius: 1.45, mass: 0.98 },
  { label: "Main sequence", maxAge: 0.82, teff: 1, radius: 1, mass: 1 },
  { label: "Late sequence", maxAge: 0.94, teff: 0.94, radius: 1.7, mass: 0.96 },
  { label: "Final living endpoint", maxAge: 1, teff: 0.82, radius: 2.9, mass: 0.9 },
];

export function calculateStar(clt: number, surname: string): StarResult {
  const normalizedName = surname.trim();
  const nameScore = scoreName(normalizedName || "Charlotte");
  const nameLength = Math.max(normalizedName.replace(/[^a-z]/gi, "").length, 1);
  const safeClt = Number.isFinite(clt) ? Math.max(clt, 0) : 0;

  const teffB = 2400 + ((safeClt * 41 + nameScore * 13 + nameLength * 97) % 57600);
  const radB = clamp(0.12 + Math.sqrt(teffB / SOLAR_TEMPERATURE) * (1 + safeClt / 180), 0.08, 98);
  const massB = clamp(Math.pow(teffB / SOLAR_TEMPERATURE, 1.45) * (0.65 + nameLength / 18) + safeClt / 240, 0.02, 250);

  const seed = 0.86 + (nameScore % 29) / 100;
  const radSeed = radB * seed;
  const teffSeed = teffB * (0.92 + (nameScore % 17) / 100);
  const massSeed = massB * (0.9 + (nameLength % 9) / 40);
  const spectral = getSpectralBand(teffSeed);
  const agePosition = ((safeClt + nameScore) % 1000) / 1000;
  const stage = stages.find((item) => agePosition <= item.maxAge) ?? stages.at(-1)!;

  const currentTeff = teffSeed * stage.teff;
  const currentRadius = radSeed * spectral.radiusMultiplier * stage.radius;
  const currentMass = massSeed * spectral.massMultiplier * stage.mass;
  const luminosity = Math.pow(currentRadius, 2) * Math.pow(currentTeff / SOLAR_TEMPERATURE, 4);
  const density = SOLAR_DENSITY * currentMass / Math.pow(currentRadius, 3);
  const spectralC = getSpectralBand(currentTeff).label;
  const score = luminosity + currentMass * 10 + currentRadius;

  return {
    clt: safeClt,
    surname: normalizedName,
    teffB,
    radB,
    massB,
    radSeed,
    teffSeed,
    massSeed,
    spectralB: spectral.label,
    spectralC,
    stage: stage.label,
    path: `${spectral.label} seeded path → ${stage.label}`,
    currentTeff,
    currentRadius,
    currentMass,
    luminosity,
    density,
    score,
  };
}

export function formatMass(value: number): string {
  if (value < 1) return value.toFixed(6);
  if (value < 100) return value.toFixed(4);
  return value.toFixed(2);
}

export function formatNumber(value: number, digits = 3): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

function scoreName(name: string): number {
  return [...name.toUpperCase()].reduce((total, character, index) => {
    const code = character.charCodeAt(0);
    const value = code >= 65 && code <= 90 ? code - 64 : 7;
    return total + value * (index + 1);
  }, 0);
}

function getSpectralBand(teff: number): SpectralBand {
  return spectralBands.find((band) => teff >= band.minTeff && teff <= band.maxTeff) ?? spectralBands.at(-1)!;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
