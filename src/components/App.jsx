import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

function App() {
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const onLoadMoreBtn = () => {
    setPage(prevState => prevState + 1);
  };
  const onChangePage = () => {
    setPage(1);
  };
  return (
    <div>
      <Searchbar onSubmit={setImageName} onChangePage={onChangePage} />
      <ImageGallery
        imageName={imageName}
        page={page}
        onLoadMoreBtn={onLoadMoreBtn}
      />
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
