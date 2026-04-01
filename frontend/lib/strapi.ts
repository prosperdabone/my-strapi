/** URL de base Strapi (sans slash final). Définir `API_URL` dans `.env.local`. */
export function getStrapiUrl(): string {
  const url = process.env.API_URL ?? "http://localhost:1337"
  return url.replace(/\/$/, "")
}


export async function fetchStrapi(
  pathname: string,
  init?: RequestInit
): Promise<Response> {
  const url = `${getStrapiUrl()}${pathname.startsWith("/") ? pathname : `/${pathname}`}`
  const isDev = process.env.NODE_ENV === "development"
  const maxAttempts = isDev ? 20 : 1
  const delayMs = 400
  let lastErr: unknown
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fetch(url, init)
    } catch (e) {
      lastErr = e
      if (!isDev || attempt === maxAttempts) throw e
      await new Promise((r) => setTimeout(r, delayMs))
    }
  }
  throw lastErr
}
