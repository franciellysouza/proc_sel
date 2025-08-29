const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiJson(path, method, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-User': 'demo-user' },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
