import { useState, useRef, useEffect } from 'react';
import authService from '../services/authService.js';

export default function Login({ onLogin }) {
  const btn = useRef(); const [err, setErr] = useState('');
  useEffect(() => {
    let t, dead = false;
    authService.getConfig().then(({ clientId }) => {
      const go = () => {
        if (dead) return;
        if (!window.google?.accounts) { t = setTimeout(go, 200); return; }
        google.accounts.id.initialize({ client_id: clientId, callback: async r => {
          try { onLogin(await authService.loginWithGoogle(r.credential)); } catch { setErr('Login failed. Try again.'); } } });
        google.accounts.id.renderButton(btn.current, { theme: 'outline', size: 'large', width: 280 });
      };
      go();
    });
    return () => { dead = true; clearTimeout(t); };
  }, []);
  return <div className="login">
    <div className="lbrand"><div className="brand"><i>₹</i>Checkexprense</div>
      <h1>Know where every rupee goes.</h1><p>Log an expense in seconds. Type it or say it, then see the pattern.</p></div>
    <div className="lcard"><h2>Sign in</h2><p className="mut">Continue with your Google account.</p>
      <div ref={btn} /><p className="bad">{err}</p></div>
  </div>;
}
