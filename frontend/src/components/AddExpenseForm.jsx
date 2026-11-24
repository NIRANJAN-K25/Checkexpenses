import { useState, useRef } from 'react';
import expenseService from '../services/expenseService.js';
import { nowLocal } from '../utils/dates.js';

export default function AddExpenseForm({ onSaved }) {
  const [amount, setAmount] = useState(''), [when, setWhen] = useState(nowLocal()), [desc, setDesc] = useState('');
  const [lang, setLang] = useState('en-IN'), [msg, setMsg] = useState(''), [listening, setListening] = useState(false);
  const rec = useRef(), base = useRef('');

  const save = async () => {
    setMsg('');
    if (amount === '' || +amount < 0) return setMsg('Enter an amount.');
    if (new Date(when) > new Date()) return setMsg('Date cannot be in the future.');
    try {
      await expenseService.create({ amount, date: new Date(when).toISOString(), description: desc.trim() });
      setAmount(''); setDesc(''); setWhen(nowLocal()); setMsg('Saved.'); onSaved();
    } catch (e) { setMsg(e.message); }
  };
  const mic = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return setMsg('Voice input needs Chrome, Edge or Safari.');
    if (listening) return rec.current.stop();
    const r = rec.current = new SR(); r.lang = lang; r.interimResults = true; r.continuous = true;
    base.current = desc ? desc.trim() + ' ' : '';
    r.onresult = e => { let t = ''; for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript; setDesc((base.current + t).trim()); };
    r.onend = () => setListening(false);
    r.onerror = e => setMsg('Voice error: ' + e.error);
    r.start(); setListening(true); setMsg('');
  };
  return <section className="card compose">
    <div>
      <label className="lbl" htmlFor="amount">Amount</label>
      <div className="amt-wrap"><span className="cur">₹</span>
        <input id="amount" className="amt" type="number" inputMode="decimal" min="0" step="0.01" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} /></div>
      <label className="lbl" htmlFor="when">Date and time</label>
      <input id="when" type="datetime-local" max={nowLocal()} value={when} onChange={e => setWhen(e.target.value)} />
      <button className="link" onClick={() => setWhen(nowLocal())}>Set to now</button>
    </div>
    <div>
      <label className="lbl" htmlFor="desc">Description</label>
      <textarea id="desc" rows="5" placeholder="What was it for?" value={desc} onChange={e => setDesc(e.target.value)} />
      <p className="hint">{listening ? 'Listening… speak now, then tap Stop.' : 'Type it, or tap the mic and speak. You can edit the text before saving.'}</p>
      <div className="row">
        <select aria-label="Voice language" value={lang} onChange={e => setLang(e.target.value)}>
          <option value="en-IN">English</option><option value="ta-IN">Tamil</option><option value="hi-IN">Hindi</option>
          <option value="te-IN">Telugu</option><option value="ml-IN">Malayalam</option><option value="kn-IN">Kannada</option></select>
        <button className={'mic' + (listening ? ' rec' : '')} onClick={mic}>{listening ? '⏹ Stop' : '🎤 Speak'}</button>
        <button className="p" onClick={save}>Save expense</button>
      </div>
      <p id="msg" className={msg === 'Saved.' ? 'ok' : ''}>{msg}</p>
    </div>
  </section>;
}
