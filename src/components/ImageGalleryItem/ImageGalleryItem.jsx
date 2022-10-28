import PropTypes from 'prop-types';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ onSelectImage, images }) => {
  const selectImage = e => onSelectImage(Number(e.currentTarget.id));

  return images.map(({ id, webformatURL, tags }) => {
    return (
      <GalleryItem key={id} id={id} onClick={selectImage}>
        <Image src={webformatURL} alt={tags} />
      </GalleryItem>
    );
  });
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onSelectImage: PropTypes.func.isRequired,
};
