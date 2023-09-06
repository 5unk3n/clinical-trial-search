import SearchIcon from '../Icon/SearchIcon';
import * as S from './SearchInput.styled';

interface SearchInputProps {
  isResultOpen: boolean;
  searchWord: string;
  setIsResultOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearchWordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({
  isResultOpen,
  searchWord,
  setIsResultOpen,
  handleSearchWordChange,
}: SearchInputProps) => {
  return (
    <S.InputWrapper $outline={isResultOpen}>
      <S.Input
        type='text'
        value={searchWord}
        onChange={handleSearchWordChange}
        placeholder='질환명을 입력해 주세요.'
        onFocus={() => setIsResultOpen(true)}
      />
      <S.SearchButton type='button'>
        <SearchIcon />
      </S.SearchButton>
    </S.InputWrapper>
  );
};

export default SearchInput;
