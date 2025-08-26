const NS = 'bappa'
export const storage = {
  get<T>(key: string, fallback: T): T { try { const v = localStorage.getItem(`${NS}:${key}`); return v ? JSON.parse(v) as T : fallback } catch { return fallback } },
  set<T>(key: string, value: T) { try { localStorage.setItem(`${NS}:${key}`, JSON.stringify(value)) } catch {} },
  remove(key: string) { try { localStorage.removeItem(`${NS}:${key}`) } catch {} }
}
