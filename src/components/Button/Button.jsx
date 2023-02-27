import css from './Button.module.css';
const Button = ({ clickLoadMore }) => {
  return (
    <button type="button" onClick={clickLoadMore} className={css.Button}>
      Load more
    </button>
  );
};

export default Button;
