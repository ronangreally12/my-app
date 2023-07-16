import React, { useEffect } from 'react';
import CardItem from './CardItem'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Modal from '@mui/material/Modal';

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

function AnimalList({animals, windowWidth}) {
  const [cols, setCols] = React.useState(6);
  const [open, setOpen] = React.useState(false);
  const [modalItem, setModalItem] = React.useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleOpenItem(item) {
    setModalItem(item);
    handleOpen(true);
  }

  useEffect(() => {
    if(windowWidth > 1100){
      setCols(5);
    }
    else if(windowWidth < 1100 && windowWidth > 700){
      setCols(3);
    } else if(windowWidth < 700 && windowWidth > 500){
      setCols(2);
    } else {
      setCols(1);
    }
  }, [windowWidth]);

  return (
    <>
    <ImageList sx={{ width: '100%', height: '100%' }} cols={cols} rowHeight={164} gap={1}>
      {animals && animals.data && animals.data.map((item, i) => {
           const cols = item.featured ? 2 : 1;
           const rows = item.featured ? 2 : 1;
        return item.images && item.images.length > 0 ? (
        <ImageListItem key={i} cols={cols} rows={rows} onClick={() => handleOpenItem(item)}>
          <img
            {...srcset( item.images.fixed_height && item.images.fixed_height.url ? item.images.fixed_height.url : '', 250, 200, rows, cols)}
            alt={item.title}
            loading="lazy"
            className='animal-detail-img'
          />
          <ImageListItemBar
            sx={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
            }}
            title={item.title}
            position="top"
            actionIcon={
              <IconButton
                sx={{ color: 'white' }}
                aria-label={`star ${item.title}`}
              >
                <VisibilityIcon />
              </IconButton>
            }
            actionPosition="left"
          />
        </ImageListItem> ): (<div>no images</div>)
        
      })} 
    
     </ImageList>
     <Modal
     open={open}
     onClose={handleClose}
     aria-labelledby="modal-modal-title"
     aria-describedby="modal-modal-description"
   >
     {modalItem ? <CardItem item={modalItem} /> : <div></div>}
   </Modal>
   </>
  );
}

export default AnimalList;