import { useMemo } from 'react';
import { computeStats } from '../utils/analytics.js';
import { money } from '../utils/format.js';
import Stats from '../components/Stats.jsx';
import Report from '../components/ReportPanel.jsx';
import RangeHistory from '../components/RangeHistory.jsx';

export default function AnalysisPage({ data, start }) {
  const s = useMemo(() => computeStats(data, start), [data, start]);
  return <><h1 className="title">Check</h1>
    <section className="card"><h2>Spending</h2>
      <Stats items={[['Today', money(s.T)], ['This week', money(s.W)], ['This month', money(s.M)]]} />
      <h2 style={{ marginTop: 20 }}>No-spend days</h2>
      <Stats items={[['Total no-spend days', s.ns], ['Longest run', s.best + ' days'], ['Current run', s.cur + ' days']]} /></section>
    <RangeHistory data={data} />
    <Report daily={s.daily} /></>;
}