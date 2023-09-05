import SearchInput from '../components/SearchInput/SearchInput';

import * as S from './SearchPage.styled';

const SearchPage = () => {
  return (
    <S.PageWrapper>
      <S.SearchSection>
        <S.Header>국내 모든 임상시험 검색하고 온라인으로 참여하기</S.Header>
        <SearchInput />
      </S.SearchSection>
    </S.PageWrapper>
  );
};

export default SearchPage;
