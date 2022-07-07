import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';
export default function ImageGalleryItem({ webformatURL, tags, onClickModal }) {
  return (
    <img
      src={webformatURL}
      alt={tags}
      className={s.image}
      onClick={onClickModal}
    />
  );
}
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClickModal: PropTypes.func.isRequired,
};
