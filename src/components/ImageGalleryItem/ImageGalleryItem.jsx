import css from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({ url, alt }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img src={url} alt={alt} className={css.ImageGalleryItemImage} />
    </li>
  );
};

export default ImageGalleryItem;
