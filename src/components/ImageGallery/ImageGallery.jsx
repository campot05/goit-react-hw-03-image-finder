import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
const data = {
  BASE_URL: 'https://pixabay.com/api/',
  API_KEY: '33190219-0860edc2b5cf578f738ea4f26',
};

class ImageGallery extends Component {
  state = {
    articles: null,
    loading: false,
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      console.log('query change');

      this.setState({ loading: true });
      fetch(
        `${data.BASE_URL}?key=${data.API_KEY}&q=${this.props.query}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(
            new Error(`По запросу ${this.props.query} ничего не найдено :(`)
          );
        })
        .then(data => this.setState({ articles: data.hits }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  render() {
    const { error, articles } = this.state;
    return (
      <>
        {articles && (
          <ul>
            {articles.map(({ id, webformatURL }) => {
              return <ImageGalleryItem key={id} url={webformatURL} />;
            })}
          </ul>
        )}
        {error && <h1>{error.message}</h1>}
      </>
    );
  }
}

export default ImageGallery;
