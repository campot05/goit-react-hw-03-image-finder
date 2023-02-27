import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';
import Button from 'components/Button';
const data = {
  BASE_URL: 'https://pixabay.com/api/',
  API_KEY: '33190219-0860edc2b5cf578f738ea4f26',
};

class ImageGallery extends Component {
  state = {
    hits: null,
    loading: false,
    error: null,
  };
  total = 1;
  page = 1;
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.setState({ loading: true });
      this.page = 1;
      fetch(
        `${data.BASE_URL}?key=${data.API_KEY}&q=${this.props.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(
            new Error(`По запросу ${this.props.query} ничего не найдено :(`)
          );
        })
        .then(data => {
          this.total = data.totalHits;
          return this.setState({ hits: data.hits });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  clickLoadMore = () => {
    this.page += 1;
    fetch(
      `${data.BASE_URL}?key=${data.API_KEY}&q=${this.props.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=12`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(
          new Error(`По запросу ${this.props.query} ничего не найдено :(`)
        );
      })
      .then(data => {
        return this.setState(prev => {
          return { hits: [...prev.hits, ...data.hits] };
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
    console.log(this.state.hits);
  };

  render() {
    const { error, hits } = this.state;
    return (
      <>
        {hits && (
          <ul className={css.ImageGallery}>
            {hits.map(({ id, webformatURL, tags }) => {
              return (
                <ImageGalleryItem key={id} url={webformatURL} alt={tags} />
              );
            })}
          </ul>
        )}
        {this.total > 12 * this.page && (
          <Button clickLoadMore={this.clickLoadMore} />
        )}

        {error && <h1>{error.message}</h1>}
      </>
    );
  }
}

export default ImageGallery;
