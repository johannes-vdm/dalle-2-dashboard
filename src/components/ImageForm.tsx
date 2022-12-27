import { generateImage } from "../utils/api"
import { FormEvent, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"

import { CollectionData, Tag } from "./App"
import { Loading } from "./Loading"

import { v4 as uuidV4 } from "uuid"
import { Button, Grid, TextField } from "@mui/material"

type ImageFormProps = {
  onSubmit: (data: CollectionData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<CollectionData>

export function ImageForm({
  onSubmit,
  onAddTag,
  availableTags = [],
  body = "",
  tags = [],
}: ImageFormProps) {
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const loadImage = async () => {
    setIsLoading(true)

    await makeApiCall(bodyRef.current!.value)

    setIsLoading(false)
  }

  const makeApiCall = async (prompt: string) => {
    const response = await generateImage(prompt)

    const newArray: { url: string, favorite: false }[] = response.data.data.map(item => {
      return {
        url: item.url || '',
        favorite: false
      }
    })

    return onSubmit(
      {
        body: bodyRef.current!.value,
        images: newArray,
        tags: selectedTags,
      }
    )
  }

  async function handleSubmit(e: FormEvent) {
    {
      e.preventDefault()

      // await makeApiCall(bodyRef.current!.value)
      await loadImage();

      navigate("..")
    }
  }

  return (
    <>
      {isLoading ? <Loading /> : ""}
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <CreatableReactSelect
              onCreateOption={label => {
                const newTag = { id: uuidV4(), label }
                onAddTag(newTag)
                setSelectedTags(prev => [...prev, newTag])
              }}
              value={selectedTags.map(tag => {
                return { label: tag.label, value: tag.id }
              })}
              options={availableTags.map(tag => {
                return { label: tag.label, value: tag.id }
              })}
              onChange={tags => {
                setSelectedTags(
                  tags.map(tag => {
                    return { label: tag.label, id: tag.value }
                  })
                )
              }}
              isMulti
            />
          </Grid>
        </Grid>
        <TextField
          defaultValue={body}
          required
          multiline
          rows={15}
          label="Body"
          inputRef={bodyRef}
        />
        <Button type="submit" variant="contained">
          Save
        </Button>
        <Link to="..">
          <Button variant="contained">
            Cancel
          </Button>
        </Link>
      </form>
    </>
  )
}
