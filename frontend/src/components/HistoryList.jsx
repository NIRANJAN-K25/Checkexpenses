import Item from './ExpenseItem.jsx';

export default function History({ data, limit, onDelete, onViewAll, title = 'Recent' }) {
  const rows = limit ? data.slice(0, limit) : data;
  return <section className="card">
    <div className="chead"><h2>{title}</h2>{onViewAll && <button className="p" onClick={onViewAll}>View all history</button>}</div>
    {rows.length ? rows.map(e => <Item key={e._id} e={e} onDelete={onDelete} />)
      : <p className="mut">No expenses yet. Add your first one above.</p>}
  </section>;
}
