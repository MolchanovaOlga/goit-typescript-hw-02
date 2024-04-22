import css from './ImageCard.module.css';

const ImageCard = ({ items, onClickImg }) => {
  const {
    urls: { small, regular },
    alt_description,
    description,
    likes,
    user: { name, location },
  } = items;
  return (
    <>
      <img
        className={css.image}
        src={small}
        alt={alt_description}
        onClick={() => {
          onClickImg({ regular, alt_description, description });
        }}
      />
      <div className={css.container}>
        <div className={css.userContainer}>
          <p>
            <span className={css.span}>{name}</span>
          </p>
          <p className={css.text}>{location}</p>
        </div>
        <p>
          Likes: <span className={css.span}>{likes}</span>
        </p>
      </div>
    </>
  );
};

export default ImageCard;
