import { SuggestionType } from '../../types';

import * as S from './SearchList.styled';

interface SearchListProps {
  suggestions: SuggestionType[];
}

const SearchList = ({ suggestions }: SearchListProps) => {
  return (
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
  );
};

export default SearchList;
