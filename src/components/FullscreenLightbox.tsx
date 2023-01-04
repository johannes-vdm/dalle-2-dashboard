  import { Backdrop, IconButton, ImageListItem, ImageListItemBar, Button, Modal, Box } from '@mui/material'
  // import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
  // import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

  export type Images = {
    url: string,
    favorite: boolean,
  }

  type FullscreenLightboxProps = {
    images: Images[],
    onClose: () => void,
    isOpen: boolean,
    onToggleFavorite: (image: Images) => void,
    currentIndex: number,
    setCurrentIndex: (index: number) => void,
  }

  export function FullscreenLightbox({ images, onClose, isOpen, onToggleFavorite, currentIndex, setCurrentIndex }: FullscreenLightboxProps): JSX.Element {

    const handleChangeSlide = (direction: "prev" | "next", e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (direction === "prev") {
        if (currentIndex > 0){
          setCurrentIndex(currentIndex - 1);
        } else {
          setCurrentIndex(images.length - 1);
        }
      } else {
        if (currentIndex < images.length - 1){
          setCurrentIndex(currentIndex + 1);
        } else { 
          setCurrentIndex(0);
        }
      }
    }
    
    return (
      <Modal open={isOpen} onClose={onClose}>
        <Backdrop open={isOpen} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
          <Box>
            <ImageListItem>
              <img src={images[currentIndex].url} width={'auto'} style={{ cursor: 'pointer' }} />
              {/* <ImageListItemBar
                style={{ backgroundColor: 'transparent' }}
                actionIcon={
                  <IconButton
                    style={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleFavorite(images[currentIndex])
                    }}
                  >
                    {images[currentIndex].favorite ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                  </IconButton>
                }
              /> */}
            </ImageListItem>
            <div>
              <Button variant="contained" onClick={(e) => {
                return handleChangeSlide("prev", e);
              }}>Prev</Button>
              <Button variant="contained" onClick={(e) => {
                return handleChangeSlide("next", e);
              }}>Next</Button>
              <Button variant="contained" onClick={onClose}>X</Button>
            </div>
          </Box>
        </Backdrop>
      </Modal>
    )
  }
