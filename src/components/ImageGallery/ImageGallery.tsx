import css from './ImageGallery.module.css';

import ImageCard from '../ImageCard/ImageCard';
import { Image, ModalData } from '../../types';

type ImageGalleryProps = {
  items: Image[];
  onClickImg: (obj: ModalData) => void;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({
  items,
  onClickImg,
}: ImageGalleryProps) => {
  return (
    <ul className={css.list}>
      {items.map(item => {
        return (
          <li className={css.item} key={item.id}>
            <ImageCard item={item} onClickImg={onClickImg} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
