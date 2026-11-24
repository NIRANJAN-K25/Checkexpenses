const Stats = ({ items }) => <div className="grid" style={{ marginBottom: 8 }}>
  {items.map(([l, v]) => <div className="stat" key={l}><b>{v}</b><span>{l}</span></div>)}</div>;

export default Stats;
