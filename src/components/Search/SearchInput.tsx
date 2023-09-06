import { useEffect, useState } from 'react';

import useDebounce from '../../hooks/useDebounce';

import SearchIcon from '../Icon/SearchIcon';
import * as S from './SearchInput.styled';

interface SearchInputProps {
  isOpen: boolean;
  openSuggestions: () => void;
  handleSearch: (debouncedSearchWord: string) => void;
}

const SearchInput = ({
  isOpen,
  openSuggestions,
  handleSearch,
}: SearchInputProps) => {
  const [searchWord, setSearchWord] = useState('');
  const debouncedSearchWord = useDebounce(searchWord);

  useEffect(() => {
    handleSearch(debouncedSearchWord);
  }, [debouncedSearchWord, handleSearch]);

  return (
    <S.InputWrapper $outline={isOpen}>
      <S.Input
        type='text'
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        placeholder='질환명을 입력해 주세요.'
        onFocus={openSuggestions}
      />
      <S.SearchButton type='button'>
        <SearchIcon />
      </S.SearchButton>
    </S.InputWrapper>
  );
};

export default SearchInput;
