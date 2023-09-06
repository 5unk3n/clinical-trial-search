import { SuggestionType } from '../../types';
import SearchIcon from '../Icon/SearchIcon';
import useKeyboardFocus from '../../hooks/useKeyboardFocus';

import * as S from './SearchList.styled';

interface SearchListProps {
  suggestions: SuggestionType[];
}

const SearchList = ({ suggestions }: SearchListProps) => {
  const MAX_SUGGESTION_COUNT = 8;
  const renderSuggestions = suggestions.slice(0, MAX_SUGGESTION_COUNT);

  const focusItemRefs = useKeyboardFocus(renderSuggestions.length - 1);

  return (
    <S.SuggestionWrapper>
      <S.SuggestionTitle>추천 검색어</S.SuggestionTitle>
      {suggestions.length > 0 &&
        renderSuggestions.map((suggestion, index) => (
          <S.SuggestionItem
            key={suggestion.sickCd}
            href='#'
            ref={(el) => el && (focusItemRefs.current[index] = el)}
          >
            <S.SuggestionItemIcon>
              <SearchIcon />
            </S.SuggestionItemIcon>
            {suggestion.sickNm}
          </S.SuggestionItem>
        ))}
    </S.SuggestionWrapper>
  );
};

export default SearchList;
