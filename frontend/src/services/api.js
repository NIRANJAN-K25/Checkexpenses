export async function api(url, opt) {
  const r = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...opt });
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || 'Request failed');
  return r.json();
}
