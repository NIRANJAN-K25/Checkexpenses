import { useState, useMemo } from 'react';
import { money } from '../utils/format.js';
import { dkey } from '../utils/dates.js';

export default function RangeHistory({ data }) {
  const today = dkey(new Date());
  const monthStart = today.slice(0, 8) + '01';
  const [pickFrom, setPickFrom] = useState(null);
  const [pickTo, setPickTo] = useState(today);
  const [order, setOrder] = useState('normal');

  // earliest valid day = the user's first expense (never later than today)
  const minDate = useMemo(() =>
    data.reduce((m, e) => { const k = dkey(new Date(e.date)); return k < m ? k : m; }, today), [data, today]);

  const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
  const to = clamp(pickTo || today, minDate, today);
  const from = clamp(pickFrom || monthStart, minDate, to);

  const { rows, total } = useMemo(() => {
    let rows = data.filter(e => { const k = dkey(new Date(e.date)); return k >= from && k <= to; });
    if (order === 'high') rows = [...rows].sort((a, b) => b.amount - a.amount);
    if (order === 'low') rows = [...rows].sort((a, b) => a.amount - b.amount);
    return { rows, total: rows.reduce((s, e) => s + e.amount, 0) };
  }, [data, from, to, order]);

  return <section className="card">
    <h2>Check by date</h2>
    <div className="range">
      <div className="range-l">
        <div><label className="lbl" htmlFor="from">From</label>
          <input id="from" type="date" min={minDate} max={to} value={from}
            onChange={e => setPickFrom(e.target.value || null)} /></div>
        <div><label className="lbl" htmlFor="to">To</label>
          <input id="to" type="date" min={from} max={today} value={to}
            onChange={e => setPickTo(e.target.value || today)} /></div>
      </div>
      <div><label className="lbl" htmlFor="order">Order</label>
        <select id="order" value={order} onChange={e => setOrder(e.target.value)}>
          <option value="normal">Normal order</option>
          <option value="high">Highest to lowest</option>
          <option value="low">Lowest to highest</option></select></div>
    </div>

    <div className="range-sum">
      <span className="mut">{rows.length} expenses</span>
      <span>Total spent <b>{money(total)}</b></span>
    </div>

    {rows.length ? rows.map(e => <div className="item" key={e._id}>
      <div><b>{e.description || '(no description)'}</b>
        <small>{new Date(e.date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</small></div>
      <b>{money(e.amount)}</b></div>)
      : <p className="mut">No expenses in these dates.</p>}
  </section>;
}