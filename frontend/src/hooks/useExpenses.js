import { useState, useEffect, useCallback } from 'react';
import expenseService from '../services/expenseService.js';
export default function useExpenses() {
  const [data, setData] = useState([]);
  const reload = useCallback(() => expenseService.list().then(setData), []);
  useEffect(() => { reload(); }, [reload]);
  const remove = async id => { if (confirm('Delete this expense?')) { await expenseService.remove(id); reload(); } };
  return { data, reload, remove };
}
