import { dkey, mkey, wkey } from './dates.js';
export function computeStats(data) {
  const now = new Date(), t = dkey(now), w = wkey(now), m = mkey(now);
  const daily = {}; let T = 0, W = 0, M = 0;
  data.forEach(e => { const d = new Date(e.date), k = dkey(d); daily[k] = (daily[k] || 0) + e.amount;
    if (k === t) T += e.amount; if (wkey(d) === w) W += e.amount; if (mkey(d) === m) M += e.amount; });
  let ns = 0, best = 0, run = 0;
  if (data.length) {
    const f = new Date(data[data.length - 1].date);
    for (let d = new Date(f.getFullYear(), f.getMonth(), f.getDate()); dkey(d) <= t; d.setDate(d.getDate() + 1)) {
      if (daily[dkey(d)] === undefined) { ns++; run++; best = Math.max(best, run); } else run = 0; }
  }
  return { daily, T, W, M, ns, best, cur: run };
}
