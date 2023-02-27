import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { CiSearch } from 'react-icons/ci';
class Searchbar extends Component {
  state = {
    query: '',
  };

  handlechange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  reset = () => {
    this.setState({ query: '' });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {
      return alert('Введите слово для поиска');
    }

    this.props.onSubmit(this.state.query.trim());
    this.reset();
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            {' '}
            <CiSearch className={css.icon} />
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handlechange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
