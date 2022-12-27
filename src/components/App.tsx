import { useMemo, useState } from "react"


import { Routes, Route, Navigate } from "react-router-dom"

import { NewCollection } from "./NewCollection"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { v4 as uuidV4 } from "uuid"
import { CollectionList } from "./CollectionList"

import '../globals.css'
import { Container } from "@mui/material"

export type Collection = {
  id: string
} & CollectionData

export type RawCollection = {
  id: string
} & RawCollectionData

export type RawCollectionData = {
  body: string
  images: Images[]
  tagIds: string[]
}

export type Images = {
  url: string,
  favorite: boolean,
}

export type CollectionData = {
  body: string
  images: Images[]
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

export type CardCollection = {
  body: string
  id: string
  images: Images[]
  tags: Tag[]
  onToggleFavorite: (image: Images) => void
}

function App() {
  const defaultTags: Tag[] = [
    {
      id: uuidV4(),
      label: "Modern Art"
    },
    {
      id: uuidV4(),
      label: "Abstract Art"
    },
    {
      id: uuidV4(),
      label: "Digital Art"
    },
    {
      id: uuidV4(),
      label: "Pop Art"
    },
    {
      id: uuidV4(),
      label: "Surreal Art"
    }
  ]

  const [collections, setCollections] = useLocalStorage<RawCollection[]>("COLLECTION", [])
  let [tags, setTags] = useLocalStorage<Tag[]>("TAGS", defaultTags)

  function toggleFavorite(image: Images) {
    setCollections(prevCollections => {
      return prevCollections.map(collection => {
        if (collection.images.some(img => img.url === image.url)) {
          return {
            ...collection,
            images: collection.images.map(img => {
              if (img.url === image.url) {
                return { ...img, favorite: !img.favorite }
              }
              return img
            }),
          }
        }
        return collection
      })
    })
  }

  const collectionsWithTags: CardCollection[] = useMemo(() => {
    return collections.map(collection => {
      return {
        ...collection,
        tags: tags.filter(tag => collection.tagIds.includes(tag.id)),
        onToggleFavorite: toggleFavorite
      }
    })
  }, [collections, tags])

  function onCreateCollection({ tags, ...data }: CollectionData) {
    setCollections(prevCollections => {
      return [
        ...prevCollections,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <Container maxWidth="lg">

      <Routes>
        <Route
          path="/"
          element={
            <CollectionList
              collections={collectionsWithTags}
              availableTags={tags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewCollection
              onSubmit={onCreateCollection}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
      </Routes>
      </Container>
  )
}

export default App
