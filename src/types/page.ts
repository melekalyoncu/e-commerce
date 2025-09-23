export type AppPageProps<P extends Record<string, string>> = {
  params: P
  searchParams?: Record<string, string | string[] | undefined>
}
