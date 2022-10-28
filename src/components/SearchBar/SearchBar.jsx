import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import { BsSearch } from 'react-icons/bs';
import {
  SearchBarContainer,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit(inputValue.toLowerCase().trim());
    setInputValue('');
  };

  const handleFormInput = e => setInputValue(e.target.value);

  return (
    <SearchBarContainer>
      <SearchForm onSubmit={handleFormSubmit}>
        <SearchFormInput
          name="input"
          type="text"
          value={inputValue}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleFormInput}
        />
        <IconContext.Provider value={{ size: '20px' }}>
          <SearchFormButton type="submit">
            <BsSearch />
          </SearchFormButton>
        </IconContext.Provider>
      </SearchForm>
    </SearchBarContainer>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
