import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Collection } from "./App"

type CollectionLayoutProps = {
  collections: Collection[]
}

export function CollectionLayout({ collections }: CollectionLayoutProps) {
  const { id } = useParams()
  const collection = collections.find(n => n.id === id)

  if (collection == null) return <Navigate to="/" replace />

  return <Outlet context={collection} />
}

export function useCollection() {
  return useOutletContext<Collection>()
}
