import { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchImages } from 'services/fetchImages';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Error } from 'components/Error/Error';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    images: [],
    pageNumber: 1,
    loadMore: null,
    status: 'idle',
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchResult;
    const nextName = this.props.searchResult;

    if (prevName !== nextName) {
      this.setState({
        status: 'pending',
        images: [],
      });
    }

    if (
      prevName !== nextName ||
      this.state.pageNumber !== prevState.pageNumber
    ) {
      fetchImages(nextName, this.state.pageNumber)
        .then(data => {
          this.setState(prevState => ({
            images: [...prevState.images, ...data],
            status: data.length === 0 ? 'rejected' : 'resolved',
            loadMore: 12 - data.length,
          }));
        })
        .catch(error => console.log(error));
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  getlargeURL = (imageURL, tagNames) => {
    this.setState({ largeImageURL: imageURL, tags: tagNames });
    this.toggleModal();
  };



  render() {
    const { images, status, loadMore, showModal, largeImageURL, tags } =
      this.state;
    const { searchResult } = this.props;

    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'resolved') {
      return (
        <ImageGalleryItem images={images} loadLargeImg={this.getlargeURL}>

          {loadMore === 0 && <Button loadMore={this.handleLoadMore} />}
          {showModal && <Modal url={largeImageURL} alt={tags} toggleModal={this.toggleModal}/>}
        </ImageGalleryItem>
      );
    }

    if (status === 'rejected') {
      return <Error searchResult={searchResult} />;
    }
  }
}

ImageGallery.propTypes = {
  searchResult: PropTypes.string.isRequired,
};
