import AddExpenseForm from '../components/AddExpenseForm.jsx';
import HistoryList from '../components/HistoryList.jsx';
export default function AddPage({ data, onSaved, onDelete, onViewAll }) {
  return <><h1 className="title">Add expense</h1>
    <AddExpenseForm onSaved={onSaved} />
    <HistoryList data={data} limit={5} onDelete={onDelete} onViewAll={onViewAll} /></>;
}
