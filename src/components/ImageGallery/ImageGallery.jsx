import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, children }) => {
  const [showedModal, setShowedModal] = useState(false);
  const [imageId, setImageId] = useState(null);

  const toggleModal = () => setShowedModal(!showedModal);

  const getImageIdByClick = id => {
    setImageId(id);
    toggleModal();
  };

  const getLargeImgUrlForModal = () => {
    const selectedImgUrl = images.find(({ id }) => id === imageId);
    return selectedImgUrl.largeImageURL;
  };

  return (
    <Gallery>
      <ImageGalleryItem images={images} onSelectImage={getImageIdByClick} />
      {showedModal && (
        <Modal onClose={toggleModal}>
          <img src={getLargeImgUrlForModal()} width="1000" alt="" />
        </Modal>
      )}
      {children}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
