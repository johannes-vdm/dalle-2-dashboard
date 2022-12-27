import { CollectionData, Tag } from "./components/App"
import { ImageForm } from "./ImageForm"

type FormStructureProps = {
  onSubmit: (data: CollectionData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function NewCollection({ onSubmit, onAddTag, availableTags }: FormStructureProps) {
  return (
    <>
      <h1 className="mb-4">Generate Images from Prompt</h1>
      <ImageForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}
