import { useState, useEffect, useRef } from 'react';
import Notiflix from 'notiflix';
import { SearchBar } from '../SearchBar/SearchBar';
import { LoadMoreBtn } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { AppContainer } from './App.styled';
import { Loader } from 'components/Loader/Loader';
import { ImagesLoadService } from 'components/RequestService/ReguestService';

const imagesLoader = new ImagesLoadService();

export const App = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [userRequest, setUserRequest] = useState('');
  const [totalImages, setTotalImages] = useState(null);
  const [, setPage] = useState(1);

  const isRequestNew = useRef(false);
  const isPageChanged = useRef(false);

  useEffect(() => {
    if (isRequestNew.current || isPageChanged.current) {
      imagesRequest();
      isRequestNew.current = false;
      isPageChanged.current = false;
      return;
    }
  });

  const imagesRequest = async () => {
    try {
      setStatus('pending');
      imagesLoader.query = userRequest;
      const obtainedImages = await imagesLoader.requestImages();

      setImages([...images, ...obtainedImages.hits]);
      setTotalImages(obtainedImages.total);
      setStatus('resolved');
    } catch (err) {
      setError(err.message);
      setPage(1);
      setStatus('rejected');
    }
  };

  const setUserInputToState = userInput => {
    if (userInput === '') {
      return Notiflix.Notify.warning('Please, enter your request!', {
        width: '500px',
        fontSize: '20px',
      });
    }

    imagesLoader.resetPage();
    setUserRequest(userInput);
    setImages([]);
    setPage(imagesLoader.page);
    isRequestNew.current = true;
  };

  const showNextImages = () => {
    setPage(imagesLoader.page);
    isPageChanged.current = true;
  };

  return (
    <AppContainer>
      <SearchBar onSubmit={setUserInputToState} />

      {totalImages !== 0 && <ImageGallery images={images} />}

      {status === 'pending' && <Loader />}

      {status === 'resolved' && totalImages > images.length && (
        <LoadMoreBtn onBtnClick={showNextImages} />
      )}

      {status === 'rejected' && <h1>{error}</h1>}
    </AppContainer>
  );
};
