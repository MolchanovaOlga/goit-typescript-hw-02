import { useState, useEffect } from 'react';

import './App.css';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { requestByKeyWord } from './components/services/api';
import message from './components/services/message';
import scrollController from './components/services/noScroll';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import ImageModal from './components/ImageModal/ImageModal';

const perPage = 20;

function App() {
  const [searchQuery, setsearchQuery] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImg, setModalImg] = useState({});
  const [loadMore, setLoadMore] = useState(false);

  const onSetSearchQuery = query => {
    setPages(1);
    setGallery([]);
    setsearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery === null) {
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        const data = await requestByKeyWord(searchQuery, pages, perPage);

        if (data.total === 0) {
          message();
          return;
        }

        setGallery(prev => {
          return [...prev, ...data.results];
        });

        if (data.total > perPage && pages < data.total / perPage) {
          setLoadMore(true);
        } else {
          setLoadMore(false);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchQuery, pages]);

  const handleClick = () => {
    setPages(prev => prev + 1);
  };

  const openModal = () => {
    setModalIsOpen(true);
    scrollController.disabledScroll();
  };

  const afterOpenModal = obj => {
    setModalImg(obj);
    openModal();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    scrollController.enabledScroll();
  };

  return (
    <>
      <SearchBar onSearch={onSetSearchQuery} />
      {error && <ErrorMessage />}
      {Array.isArray(gallery) && gallery.length !== 0 && (
        <ImageGallery items={gallery} onClickImg={afterOpenModal} />
      )}
      {loading && <Loader />}
      {Array.isArray(gallery) &&
        gallery.length !== 0 &&
        !loading &&
        loadMore && <LoadMoreBtn handleClick={handleClick} />}
      <ImageModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        data={modalImg}
      />
    </>
  );
}

export default App;
