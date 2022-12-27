import { useMemo, useState } from "react"

import { Link } from "react-router-dom"
import ReactSelect from "react-select"

import { FullscreenLightbox } from './FullscreenLightbox'

import { Tag, Collection, Images } from "./App"

import { Card, Button, ImageList, CardContent, ImageListItem, Box, Grid, IconButton, ImageListItemBar, TextField, Modal} from '@mui/material';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

type CollectionCardProps = {
  id: string
  body: string
  images: Images[]
  tags: Tag[]
  onToggleFavorite: (image: Images) => void
}

type CollectionListProps = {
  availableTags: Tag[]
  collections: Collection[]
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
  onToggleFavorite: (image: Images) => void,
}

type EditTagsModalProps = {
  show: boolean
  availableTags: Tag[]
  handleClose: () => void
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
}

export function CollectionList({
  availableTags,
  collections,
  onUpdateTag,
  onDeleteTag,
  onToggleFavorite
}: CollectionListProps) {

  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)

  const filteredCollections = useMemo(() => {
    return collections.filter(collection => {
      return (
        !selectedTags.some(tag => {
          return collection.tags.every(collectionTag => collectionTag.id !== tag.id)
        })
      )
    })
  }, [selectedTags, collections])


  return (
    <>
      <Link to="/new" >
        <Button variant="contained">Generate new collection</Button>
      </Link>
      <Button onClick={() => {
        localStorage.clear()
        window.location.reload()
      }} variant="contained" color="error">CL</Button>

      <Grid container alignItems="center">
        <Grid item xs>
          <ReactSelect
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
        <Grid item>
          <Button
            onClick={() => setEditTagsModalIsOpen(true)}
            variant="contained"
          >
            Edit Tags
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {filteredCollections.map(collection => (
          <Grid item key={collection.id}>
            <CollectionCard id={collection.id} body={collection.body} images={collection.images} tags={collection.tags} onToggleFavorite={onToggleFavorite} />
          </Grid>
        ))}
      </Grid>
      <EditTagsModal
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        availableTags={availableTags}
      />
    </>
  )
}


function CollectionCard({ body, images, tags, onToggleFavorite }: CollectionCardProps) {

  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <Card>
      <CardContent>
        <h2>{body}</h2>
        {tags.map(tag => tag.label).join(', ')}
      </CardContent>
      <ImageList
        cols={5}
        gap={0}
      >
        {images.map((image, index) => (

          <ImageListItem
            key={image.url}
            style={{
            }}
            onClick={() => {
              setIsOpen(true)
              setCurrentIndex(index)
            }}
          >
            <img src={image.url} width={'auto'} style={{ cursor: 'pointer' }} />
            <ImageListItemBar
              style={{ backgroundColor: 'transparent' }}
              actionIcon={
                <IconButton
                  sx={{ color: 'red' }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleFavorite(image)
                  }}
                >
                  {image.favorite ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                </IconButton>
              }
            />
          </ImageListItem>
        ))}

      </ImageList>
      <FullscreenLightbox images={images || []} onClose={() => setIsOpen(false)} isOpen={isOpen} onToggleFavorite={onToggleFavorite} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
    </Card>
  )
}


function EditTagsModal({
  availableTags,
  handleClose,
  show,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps) {
  return (
    <Modal open={show} onClose={handleClose}>
      <Box>
        {availableTags.map(tag => (
          <div>
            <TextField
              type="text"
              value={tag.label}
              onChange={e => onUpdateTag(tag.id, e.target.value)}
            />
            <Button
              onClick={() => onDeleteTag(tag.id)}
              variant="contained"
            >
              Delete
            </Button>
          </div>
        ))}
      </Box>
    </Modal>
  )
}
