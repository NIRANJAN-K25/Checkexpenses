import { useState, useEffect } from 'react';
import authService from './services/authService.js';
import useExpenses from './hooks/useExpenses.js';
import Login from './pages/LoginPage.jsx';
import AddPage from './pages/AddPage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import AnalysisPage from './pages/AnalysisPage.jsx';

const NAV = [['add', '＋', 'Expense'], ['history', '🕘', 'History'], ['analysis', '📊', 'Check']];

function Shell({ me }) {
  const [page, setPage] = useState('add');
  const { data, reload, remove } = useExpenses();
  const logout = async () => { await authService.logout(); location.reload(); };
  return <div className="shell">
    <aside className="side">
      <div className="brand"><i>₹</i>Checkexprense</div>
      <nav className="nav">{NAV.map(([k, ic, l]) =>
        <button key={k} className={page === k ? 'on' : ''} onClick={() => setPage(k)}><span>{ic}</span>{l}</button>)}</nav>
      <div className="me">
        {me.picture ? <img src={me.picture} referrerPolicy="no-referrer" alt="" /> : <span className="av">{me.name?.[0]}</span>}
        <div><b>{me.name}</b><small>{me.email}</small></div>
        <button className="link" onClick={logout}>Log out</button></div>
    </aside>
    <header className="top"><div className="brand"><i>₹</i>Checkexpense</div><button className="link" onClick={logout}>Log out</button></header>
    <main className="main">
      {page === 'add' && <AddPage data={data} onSaved={reload} onDelete={remove} onViewAll={() => setPage('history')} />}
      {page === 'history' && <HistoryPage data={data} onDelete={remove} />}
      {page === 'analysis' && <AnalysisPage data={data} />}
    </main>
  </div>;
}

export default function App() {
  const [me, setMe] = useState(undefined);
  useEffect(() => { authService.me().then(setMe).catch(() => setMe(null)); }, []);
  if (me === undefined) return null;
  return me ? <Shell me={me} /> : <Login onLogin={setMe} />;
}
