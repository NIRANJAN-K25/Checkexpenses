import { useState } from 'react';
import { money } from '../utils/format.js';
import { mkey, wkey, parse } from '../utils/dates.js';
import { group, pick, sortEntries } from '../utils/grouping.js';

function Report({ daily }) {
  const [view, setView] = useState('nest'), [sort, setSort] = useState('new');
  const S = o => sortEntries(o, sort);
  const Line = ({ k, t }) => <div className="day"><span>{k}</span><b>{money(t)}</b></div>;
  const Sum = ({ k, t }) => <summary><span>{k}</span><b>{money(t)}</b></summary>;
  let body;
  if (view === 'day') body = S(daily).map(([k, t]) => <Line key={k} k={k} t={t} />);
  else if (view === 'week') body = S(group(wkey, daily)).map(([k, t]) => <Line key={k} k={'Week of ' + k} t={t} />);
  else if (view === 'month') body = S(group(mkey, daily)).map(([k, t]) => <Line key={k} k={k} t={t} />);
  else body = S(group(mkey, daily)).map(([mk, mt]) => {
    const days = pick(daily, k => k.startsWith(mk));
    return <details key={mk}><Sum k={mk} t={mt} />
      {S(group(wkey, days)).map(([wk, wt]) => <details key={wk}><Sum k={'Week of ' + wk} t={wt} />
        {S(pick(days, k => wkey(parse(k)) === wk)).map(([k, t]) => <Line key={k} k={k} t={t} />)}</details>)}</details>;
  });
  return <div className="card"><h2>Report</h2>
    <div className="row" style={{ marginTop: 0 }}>
      <select value={view} onChange={e => setView(e.target.value)}>
        <option value="nest">Month › Week › Day</option><option value="month">By month</option>
        <option value="week">By week</option><option value="day">By day</option></select>
      <select value={sort} onChange={e => setSort(e.target.value)}>
        <option value="new">Newest first</option><option value="old">Oldest first</option>
        <option value="high">Most spent first</option><option value="low">Least spent first</option></select></div>
    <div style={{ marginTop: 10 }}>{body.length ? body : <p style={{ color: 'var(--mut)' }}>Nothing to report yet.</p>}</div></div>;
}

export default Report;
