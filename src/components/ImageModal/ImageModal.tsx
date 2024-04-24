import Modal from 'react-modal';
import css from './ImageModal.module.css';
import { Image, ModalData } from '../../types';

Modal.setAppElement('#root');

type ImageModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  data: ModalData;
};

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  closeModal,
  data,
}: ImageModalProps) => {
  const { regular, alt_description, description } = data;
  return (
    <Modal
      className={css.modal}
      overlayClassName={css.backdrop}
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <div className={css.container}>
        <div className={css.imgContainer}>
          <img className={css.image} src={regular} alt={alt_description} />
        </div>
        {description && (
          <div className={css.textContainer}>
            <p className={css.text}>{description}</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ImageModal;
