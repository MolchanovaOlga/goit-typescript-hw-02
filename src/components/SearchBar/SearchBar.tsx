import toast, { Toaster } from 'react-hot-toast';
import { LuSearch } from 'react-icons/lu';
import { FormEvent } from 'react';

import css from './SearchBar.module.css';

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }: SearchBarProps) => {
  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const inputValue = form.searchInput.value;
    if (inputValue.trim() === '') {
      toast('Please enter search term!', {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#ffa500',
          color: '#fff',
        },
      });
      return;
    }
    onSearch(inputValue);
    form.reset();
  };
  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
          <LuSearch className={css.icon} />
          <input
            className={css.input}
            type="text"
            name="searchInput"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </label>
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;
