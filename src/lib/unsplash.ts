const UNSPLASH_BASE_URL = "https://api.unsplash.com"

export async function fetchUnsplashImage(query: string) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY

  const response = await fetch(`${UNSPLASH_BASE_URL}/photos/random?query=${query}&client_id=${accessKey}`)

  if (!response.ok) {
    throw new Error("Unsplash API hatası")
  }

  const data = await response.json()
  return data.urls.small
}
