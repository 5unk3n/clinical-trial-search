import SearchIcon from '../Icon/SearchIcon';

import * as S from './SearchInput.styled';

const SearchInput = () => {
  return (
    <div>
      <S.InputWrapper>
        <S.Input type='text' />
        <S.SearchButton type='button'>
          <SearchIcon />
        </S.SearchButton>
      </S.InputWrapper>
      <S.SuggestionList>
        <S.SuggestionItem>dummy</S.SuggestionItem>
      </S.SuggestionList>
    </div>
  );
};

export default SearchInput;
