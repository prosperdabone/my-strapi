import Card, { CardProps } from "@/components/card"
import { fetchStrapi } from "@/lib/strapi"

export default async function Home() {
  const res = await fetchStrapi("/api/programs")
  if (!res.ok) {
    return (
      <p className="py-40 text-center text-gray-600">
        Impossible de charger les programmes ({res.status}).
      </p>
    )
  }
  const programs = await res.json()
  const list: CardProps[] = programs?.data ?? []

  return (
    <div className="grid grid-cols-3 gap-20 py-40">
      {list.map((program) => (
        <Card key={program.documentId} data={program} />
      ))}
    </div>
  )
}
