import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function StandardImageList() {
  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://www.team-bhp.com/sites/default/files/styles/amp_high_res/public/Saipa%20Tiba.jpg',
    title: 'Breakfast',
  },
  {
    img: 'https://s3-prod.utech-polyurethane.com/EMEA%20Iran%20foreign%20investment%20Saipa.jpg',
    title: 'Burger',
  },
  {
    img: 'https://dnaunion.com/en-us/wp-content/uploads/2019/10/saipa2-02.jpg',
    title: 'Camera',
  },
  {
    img: 'https://cdn.ilna.ir/thumbnail/5T89ccn0B0vW/lJIszr6HaWRziNocTLLHoQVar3TrxmvO0e6SENMutiC00PrDHQQ9bqLgCR9h7O_-yMtFV2AKWHv4l_4LeI27QlX6CMwP_W8J63Dl4KrtLTiFfrGwjohJ9MP_KX6Prp9btVWjPPHRnsuqW3qZNTbtQQ,,/SAIPA.jpg',
    title: 'Coffee',
  },
];