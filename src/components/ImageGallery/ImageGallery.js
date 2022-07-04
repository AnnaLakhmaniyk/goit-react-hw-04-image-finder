import { Component } from 'react';
import { toast } from 'react-toastify';
import ImageGalleryItem from './ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import pixabayApi from 'services/pixabayApi';
import Modal from 'components/Modal/Modal';
import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
class ImageGallery extends Component {
  state = {
    images: [],
    showModal: false,
    page: 1,
    totalPages: 1,
    bigImage: ``,
    error: null,
    status: Status.IDLE,
  };
  componentDidUpdate(prevProps, prevState) {
    const { imageName } = this.props;
    const { page } = this.state;
    if (prevProps.imageName !== imageName || prevState.page !== page) {
      this.setState({ status: Status.PENDING });
      pixabayApi
        .fetchPixabayApi(imageName, page)
        .then(images => {
          this.setState({
            images: images.hits,
            totalPages: Math.ceil(images.totalHits / 12),
            status: Status.RESOLVED,
          });
          if (!images.hits.length) {
            this.setState({ images: [], status: Status.REJECTED });
            toast.error(`Sorry, not found`);
            return;
          }
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }
  onLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };
  toggleModal = image => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      bigImage: image,
    }));
  };

  render() {
    const { images, page, totalPages, status, showModal, bigImage } =
      this.state;
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'resolved') {
      return (
        <>
          <>
            {images.length !== 0 && (
              <ul className={s.imageGallery}>
                {images.map(({ id, webformatURL, tags, largeImageURL }) => (
                  <li key={id} className={s.imageGalleryItem}>
                    <ImageGalleryItem
                      webformatURL={webformatURL}
                      tags={tags}
                      onClickModal={() => this.toggleModal(largeImageURL)}
                    />
                  </li>
                ))}
              </ul>
            )}
            {showModal && (
              <Modal onClose={this.toggleModal}>
                <img src={bigImage} alt="" />
              </Modal>
            )}
          </>
          {page !== totalPages && <Button onLoadMore={this.onLoadMore} />}
        </>
      );
    }
  }
}

export default ImageGallery;
