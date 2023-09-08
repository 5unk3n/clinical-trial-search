import { SuggestionType } from '../../types';
import SearchIcon from '../Icon/SearchIcon';
import useKeyboardFocus from '../../hooks/useKeyboardFocus';

import * as S from './SearchResult.styled';

const MAX_SUGGESTION_COUNT = 8;

interface SearchResultProps {
  suggestions: SuggestionType[];
  debouncedSearchWord: string;
}

const SearchResult = ({
  suggestions,
  debouncedSearchWord,
}: SearchResultProps) => {
  const suggestionsCopy = suggestions?.slice();
  const sortedSuggestions = suggestionsCopy.sort((a, b) => {
    const isAStartsWithKeyword = a.sickNm.startsWith(debouncedSearchWord);
    const isBStartsWithKeyword = b.sickNm.startsWith(debouncedSearchWord);

    if (isAStartsWithKeyword && !isBStartsWithKeyword) return -1;
    if (!isAStartsWithKeyword && isBStartsWithKeyword) return 1;
    return 0;
  });

  const slicedSuggestions = sortedSuggestions.slice(0, MAX_SUGGESTION_COUNT);

  const focusItemRefs = useKeyboardFocus(slicedSuggestions.length - 1);

  const highlightedWord = (originalString: string, keyword: string) => {
    const regex = new RegExp(`(${keyword})`);
    const parts = originalString.split(regex);

    return (
      <>
        <span>{parts[0]}</span>
        <strong>{parts[1]}</strong>
        <span>{parts[2]}</span>
      </>
    );
  };

  return (
    <S.SuggestionWrapper>
      <S.SuggestionTitle>추천 검색어</S.SuggestionTitle>
      {debouncedSearchWord ? (
        slicedSuggestions.map((suggestion, index) => {
          return (
            <S.SuggestionItem
              key={suggestion.sickCd}
              href='#'
              ref={(el) => el && (focusItemRefs.current[index] = el)}
            >
              <S.SuggestionItemIcon>
                <SearchIcon />
              </S.SuggestionItemIcon>
              {highlightedWord(suggestion.sickNm, debouncedSearchWord)}
            </S.SuggestionItem>
          );
        })
      ) : (
        <S.SuggestionEmptyText>검색어 없음</S.SuggestionEmptyText>
      )}
    </S.SuggestionWrapper>
  );
};

export default SearchResult;
