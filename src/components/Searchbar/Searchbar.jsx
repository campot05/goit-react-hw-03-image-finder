import React, { Component } from 'react';
class Searchbar extends Component {
  state = {
    text: '',
  };

  handlechange = e => {
    this.setState({ text: e.currentTarget.value });
  };

  resetForm = () => {
    this.setState({ text: '' });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    this.resetForm();
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
            value={this.state.text}
            onChange={this.handlechange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
