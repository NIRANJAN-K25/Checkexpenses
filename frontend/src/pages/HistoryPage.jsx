import { useState } from 'react';
import HistoryList from '../components/HistoryList.jsx';
export default function HistoryPage({ data, onDelete }) {
  const [q, setQ] = useState('');
  const rows = data.filter(e => (e.description || '').toLowerCase().includes(q.toLowerCase()));
  return <><h1 className="title">History</h1>
    <input className="search" placeholder="Search descriptions" value={q} onChange={e => setQ(e.target.value)} />
    <HistoryList data={rows} title={`All expenses (${rows.length})`} onDelete={onDelete} /></>;
}
