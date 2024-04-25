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
import { Image, ModalData, ResponseData } from './types';

const perPage = 20;

function App() {
  const [searchQuery, setsearchQuery] = useState<string | null>(null);
  const [gallery, setGallery] = useState<Image[] | null>(null);
  const [pages, setPages] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalImg, setModalImg] = useState<ModalData | null>(null);
  const [loadMore, setLoadMore] = useState<boolean>(false);

  const onSetSearchQuery = (query: string): void => {
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
        if (searchQuery !== null) {
          const data: ResponseData = await requestByKeyWord(
            searchQuery,
            pages,
            perPage
          );
          if (data.total === 0) {
            message();
            return;
          }

          setGallery((prev): Image[] | null => {
            if (prev) {
              return [...prev, ...data.results];
            }

            return prev;
          });

          if (data.total > perPage && pages < data.total / perPage) {
            setLoadMore(true);
          } else {
            setLoadMore(false);
          }
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

  const afterOpenModal = (obj: ModalData) => {
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
      {modalImg && (
        <ImageModal
          isOpen={modalIsOpen}
          closeModal={closeModal}
          data={modalImg}
        />
      )}
    </>
  );
}

export default App;
