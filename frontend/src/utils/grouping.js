import { parse } from './dates.js';
export const group = (fn, src) => { const o = {}; for (const [k, v] of Object.entries(src)) { const g = fn(parse(k)); o[g] = (o[g] || 0) + v; } return o; };
export const pick = (src, test) => Object.fromEntries(Object.entries(src).filter(([k]) => test(k)));
export const sortEntries = (obj, s) => Object.entries(obj).sort(([ka, va], [kb, vb]) =>
  s === 'new' ? kb.localeCompare(ka) : s === 'old' ? ka.localeCompare(kb) : s === 'high' ? vb - va : va - vb);
