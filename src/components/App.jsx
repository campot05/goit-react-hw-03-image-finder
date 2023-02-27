import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
export class App extends Component {
  state = {
    query: '',
  };
  handleChange = query => {
    this.setState({ query });
  };
  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleChange} />
        <ImageGallery query={this.state.query} />
      </>
    );
  }
}
