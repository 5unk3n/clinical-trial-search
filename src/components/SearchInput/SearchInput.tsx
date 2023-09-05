import { useEffect, useState } from 'react';

import { SuggestionType } from '../../types';
import { getSearchSuggestions } from '../../apis/sick';
import useDebounce from '../../hooks/useDebounce';

import SearchIcon from '../Icon/SearchIcon';
import * as S from './SearchInput.styled';

const SearchInput = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);
  const debouncedSearchWord = useDebounce(searchWord);

  const handleFoucs = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  useEffect(() => {
    if (debouncedSearchWord === '') {
      setSuggestions([]);
      return;
    }

    const handleSearch = async () => {
      const result = await getSearchSuggestions(debouncedSearchWord);
      setSuggestions(result);
      console.log(result);
    };
    handleSearch();
  }, [debouncedSearchWord]);

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
      {isFocus && (
        <S.SuggestionList>
          <div>추천 검색어</div>
          {suggestions.length > 0 &&
            suggestions
              .slice(0, 8)
              .map((suggestion) => (
                <S.SuggestionItem key={suggestion.sickCd}>
                  {suggestion.sickNm}
                </S.SuggestionItem>
              ))}
        </S.SuggestionList>
      )}
    </div>
  );
};

export default SearchInput;
