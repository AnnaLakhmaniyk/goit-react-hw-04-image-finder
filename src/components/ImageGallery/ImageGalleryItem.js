import s from './ImageGallery.module.css';
export default function ImageGalleryItem({ webformatURL }) {
  return <img src={webformatURL} alt="" className={s.image} />;
}
