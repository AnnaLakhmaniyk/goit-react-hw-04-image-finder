import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ImageGalleryItem from './ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import pixabayApi from 'services/pixabayApi';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const ImageGallery = ({ imageName, page, onLoadMoreBtn }) => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [bigImage, setBigImage] = useState('');
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!imageName) {
      return;
    }
    setStatus(Status.PENDING);
    pixabayApi
      .fetchPixabayApi(imageName, page)
      .then(images => {
        setImages(images.hits);
        // if (page > 1) {
        //   setImages(prevState => [...prevState, ...images.hits]);
        // } else {
        //   setImages(images.hits);
        // }
        setTotalPages(Math.ceil(images.totalHits / 12));
        setStatus(Status.RESOLVED);
        if (!images.total) {
          setImages([]);
          setStatus(Status.REJECTED);
          toast.error(`Sorry, not found`);
          return;
        }
      })
      .catch(error => {
        console.log(error);
        setStatus(Status.REJECTED);
      });
  }, [imageName, page]);

  const toggleModal = image => {
    setShowModal(!showModal);
    setBigImage(image);
  };

  if (status === Status.PENDING) {
    return <Loader />;
  }
  if (status === Status.RESOLVED) {
    return (
      <>
        {images.length !== 0 && (
          <ul className={s.imageGallery}>
            {images.map(({ id, webformatURL, tags, largeImageURL }) => (
              <li key={id} className={s.imageGalleryItem}>
                <ImageGalleryItem
                  webformatURL={webformatURL}
                  tags={tags}
                  onClickModal={() => toggleModal(largeImageURL)}
                />
              </li>
            ))}
          </ul>
        )}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={bigImage} alt="" />
          </Modal>
        )}
        {page !== totalPages && <Button onLoadMore={onLoadMoreBtn} />}
      </>
    );
  }
};
ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  onLoadMoreBtn: PropTypes.func.isRequired,
};

export default ImageGallery;
