import SearchIcon from '../Icon/SearchIcon';

import * as S from './SearchInput.styled';

const SearchInput = () => {
  const [isFocus, setIsFocus] = useState(false);

  const handleFoucs = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  return (
    <div>
      <S.InputWrapper $outline={isFocus}>
        <S.Input type='text' />
          onFocus={handleFoucs}
          onBlur={handleBlur}
        <S.SearchButton type='button'>
          <SearchIcon />
        </S.SearchButton>
      </S.InputWrapper>
      {isFocus && (
      <S.SuggestionList>
        <S.SuggestionItem>dummy</S.SuggestionItem>
      </S.SuggestionList>
      )}
    </div>
  );
};

export default SearchInput;
