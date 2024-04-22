import css from './ImageGallery.module.css';

import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ items, onClickImg }) => {
  return (
    <ul className={css.list}>
      {items.map(item => {
        return (
          <li className={css.item} key={item.id}>
            <ImageCard items={item} onClickImg={onClickImg} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
