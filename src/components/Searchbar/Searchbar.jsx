import React, { Component } from 'react';
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
      <header className="searchbar">
        <form className="form" onSubmit={this.onSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
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
