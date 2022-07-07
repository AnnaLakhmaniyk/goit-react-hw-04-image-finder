import { useState } from 'react';
import { ImImages } from 'react-icons/im';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit, onChangePage }) => {
  const [imageName, setImageName] = useState('');

  const handleChange = evt => {
    setImageName(evt.currentTarget.value.toLowerCase());
  };
  const handleSubmit = evt => {
    evt.preventDefault();

    if (imageName.trim() === '') {
      toast.error('Enter a word');
      return;
    }
    onSubmit(imageName);
    onChangePage();
    setImageName('');
  };
  return (
    <header className={s.searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <ImImages size="30" fill="rgb(25, 22, 22)" />
        </button>

        <input
          className={s.input}
          onChange={handleChange}
          type="text"
          name="imageName"
          value={imageName}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
};
export default Searchbar;
