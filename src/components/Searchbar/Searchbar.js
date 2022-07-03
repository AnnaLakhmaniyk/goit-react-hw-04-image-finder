import { Component } from 'react';
import { ImImages } from 'react-icons/im';
import s from './Searchbar.module.css';
class Searchbar extends Component {
  state = {
    imageName: '',
  };
  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm}>
          <button type="submit" className={s.button}>
            <ImImages size="30" fill="rgb(25, 22, 22)" />
          </button>

          <input
            className={s.input}
            type="text"
            name="imageName"
            // value={this.state.imageName}
            // autocomplete="off"
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
