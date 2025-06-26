export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query")

  const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`)

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Unsplash API hatası" }), { status: 500 })
  }

  const data = await response.json()
  return new Response(JSON.stringify({ url: data.urls.small }))
}
