import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import s from './ImageGallery.module.css';
class ImageGallery extends Component {
  state = {
    images: [],
  };
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;
    if (prevName !== nextName) {
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=1&key=27994875-421b8ab33988d310df64bba56&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => response.json())
        .then(images => this.setState({ images: images.hits }));
    }
  }
  render() {
    return (
      <>
        <ul className={s.imageGallery}>
          {this.state.images.map(({ id, webformatURL }) => (
            <li key={id} className={s.imageGalleryItem}>
              <ImageGalleryItem webformatURL={webformatURL} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}
export default ImageGallery;
