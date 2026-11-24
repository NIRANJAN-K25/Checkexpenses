const pad = n => String(n).padStart(2, '0');
export const dkey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const mkey = d => dkey(d).slice(0, 7);
export const wkey = d => { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return dkey(x); };
export const parse = k => new Date(k + 'T00:00:00');
export const nowLocal = () => { const d = new Date(); return `${dkey(d)}T${pad(d.getHours())}:${pad(d.getMinutes())}`; };
