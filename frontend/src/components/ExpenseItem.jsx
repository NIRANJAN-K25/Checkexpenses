import { money } from '../utils/format.js';

function Item({ e, onDelete }) {
  return <div className="item"><div><b>{e.description || '(no description)'}</b>
    <small>{new Date(e.date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</small></div>
    <div><b>{money(e.amount)}</b> <button className="link" aria-label="Delete" onClick={() => onDelete(e._id)}>✕</button></div></div>;
}

export default Item;
