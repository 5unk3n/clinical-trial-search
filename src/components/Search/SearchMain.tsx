import { useCallback, useState } from 'react';

import SearchList from './SearchList';
import SearchInput from './SearchInput';
import { SuggestionType } from '../../types';
import { getSearchSuggestions } from '../../apis/sick';

const SearchMain = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);

  const handleFoucs = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  const handleSearch = useCallback(async (searchWord: string) => {
    if (searchWord === '') {
      setSuggestions([]);
      return;
    }

    const result = await getSearchSuggestions(searchWord);
    setSuggestions(result);
  }, []);

  return (
    <div>
      <SearchInput
        isFocus={isFocus}
        handleFoucs={handleFoucs}
        handleBlur={handleBlur}
        handleSearch={handleSearch}
      />
      {isFocus && <SearchList suggestions={suggestions} />}
    </div>
  );
};

export default SearchMain;
