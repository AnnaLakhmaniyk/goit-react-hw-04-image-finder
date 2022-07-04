import { Component } from 'react';
import { ImImages } from 'react-icons/im';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    imageName: '',
  };
  handleChange = evt => {
    this.setState({ imageName: evt.currentTarget.value.toLowerCase() });
  };
  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.imageName.trim() === '') {
      toast.error('Enter a word');
      return;
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };
  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <ImImages size="30" fill="rgb(25, 22, 22)" />
          </button>

          <input
            className={s.input}
            onChange={this.handleChange}
            type="text"
            name="imageName"
            value={this.state.imageName}
            // autocomplete="off"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
