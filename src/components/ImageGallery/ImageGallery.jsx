import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchImages } from 'services/fetchImages';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Error } from 'components/Error/Error';
import { Modal } from 'components/Modal/Modal';

export const ImageGallery = ({ searchResult }) => {
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadMore, setLoadMore] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (!searchResult) {
      // Перший рендер
      return;
    }
    fetchImages(searchResult, pageNumber)
      .then(data => {
        setImages(prevState => [...prevState, ...data]);
        setLoadMore(12 - data.length);
        if (data.length === 0) {
          setStatus('rejected');
        } else {
          setStatus('resolved');
        }
      })
      .catch(error => console.log(error));
  }, [searchResult, pageNumber]);

  useEffect(() => {
    if (!searchResult) {
      // Перший рендер
      return;
    }
    setStatus('pending');
    setImages([]);
  }, [searchResult]);

  const handleLoadMore = () => {
    setPageNumber(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const getlargeURL = (imageURL, tagNames) => {
    setLargeImageURL(imageURL);
    setTags(tagNames);
    toggleModal();
  };

  if (status === 'pending') {
    return <Loader />;
  }
  if (status === 'resolved') {
    return (
      <ImageGalleryItem images={images} loadLargeImg={getlargeURL}>
        {loadMore === 0 && <Button loadMore={handleLoadMore} />}
        {showModal && (
          <Modal url={largeImageURL} alt={tags} toggleModal={toggleModal} />
        )}
      </ImageGalleryItem>
    );
  }

  if (status === 'rejected') {
    return <Error searchResult={searchResult} />;
  }
};

ImageGallery.propTypes = {
  searchResult: PropTypes.string.isRequired,
};
