import { Component } from 'react';
import { fetchImg } from 'components/services/api';
import { MutatingDots } from 'react-loader-spinner';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';
import Button from 'components/Button';

class ImageGallery extends Component {
  state = {
    hits: null,
    loading: false,
    total: 0,
  };
  page = 1;
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.setState({ loading: true, hits: null });
      this.page = 1;
      const data = await fetchImg(this.props.query, this.page);
      this.setState({
        loading: false,
        hits: data.hits,
        total: data.totalHits,
      });
    }
  }

  clickLoadMore = async () => {
    this.setState({ loading: true });
    this.page += 1;
    const data = await fetchImg(this.props.query, this.page);
    this.setState(prev => ({
      hits: [...prev.hits, ...data.hits],
      loading: false,
    }));
  };

  render() {
    const { hits, total, loading } = this.state;
    return (
      <>
        {loading && <MutatingDots wrapperClass={css.spinner} />}
        {hits && (
          <ul className={css.ImageGallery}>
            {hits.map(({ id, webformatURL, tags }) => {
              return (
                <ImageGalleryItem key={id} url={webformatURL} alt={tags} />
              );
            })}
          </ul>
        )}
        {total > 12 * this.page && (
          <Button clickLoadMore={this.clickLoadMore}>
            {loading ? 'Loading...' : 'Load more'}
          </Button>
        )}
      </>
    );
  }
}

export default ImageGallery;
