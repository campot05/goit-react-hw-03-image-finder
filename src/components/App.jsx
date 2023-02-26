import React, { Component } from 'react';
import Searchbar from './Searchbar';
export class App extends Component {
  handleChange = data => {
    console.log(data);
  };
  render() {
    return <Searchbar onSubmit={this.handleChange} />;
  }
}
