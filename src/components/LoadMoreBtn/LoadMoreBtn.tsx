import css from './LoadMoreBtn.module.css';

type LoadMoreBtnProps = {
  handleClick: () => void;
};

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({
  handleClick,
}: LoadMoreBtnProps) => {
  return (
    <button className={css.button} type="button" onClick={() => handleClick()}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
