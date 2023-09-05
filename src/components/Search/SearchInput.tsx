import { useEffect, useState } from 'react';

import useDebounce from '../../hooks/useDebounce';

import SearchIcon from '../Icon/SearchIcon';
import * as S from './SearchInput.styled';

interface SearchInputProps {
  isFocus: boolean;
  handleFoucs: () => void;
  handleBlur: () => void;
  handleSearch: (debouncedSearchWord: string) => void;
}

const SearchInput = ({
  isFocus,
  handleFoucs,
  handleBlur,
  handleSearch,
}: SearchInputProps) => {
  const [searchWord, setSearchWord] = useState('');
  const debouncedSearchWord = useDebounce(searchWord);

  useEffect(() => {
    handleSearch(debouncedSearchWord);
  }, [debouncedSearchWord, handleSearch]);

  return (
    <div>
      <S.InputWrapper $outline={isFocus}>
        <S.Input
          type='text'
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder='질환명을 입력해 주세요.'
          onFocus={handleFoucs}
          onBlur={handleBlur}
        />
        <S.SearchButton type='button'>
          <SearchIcon />
        </S.SearchButton>
      </S.InputWrapper>
    </div>
  );
};

export default SearchInput;
