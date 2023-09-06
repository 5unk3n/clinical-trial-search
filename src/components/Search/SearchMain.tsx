import { useEffect, useRef, useState } from 'react';

import SearchResult from './SearchResult';
import SearchInput from './SearchInput';
import { SuggestionType } from '../../types';
import { getSearchSuggestions } from '../../apis/sick';
import { fetchWithCache } from '../../utils/fetchWithCache';
import useDebounce from '../../hooks/useDebounce';

const SearchMain = () => {
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);
  const [searchWord, setSearchWord] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debouncedSearchWord = useDebounce(searchWord);

  const handleSearchWrodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  useEffect(() => {
    const closeSuggestions = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsResultOpen(false);
      }
    };

    document.addEventListener('mousedown', closeSuggestions);
    return () => {
      document.removeEventListener('mousedown', closeSuggestions);
    };
  }, []);

  useEffect(() => {
    const handleSearch = async (searchWord: string) => {
      if (searchWord === '') {
        setSuggestions([]);
        return;
      }

      const result = await fetchWithCache({
        apiFunction: () => getSearchSuggestions(searchWord),
        cacheKey: searchWord,
      });
      setSuggestions(result);
    };
    handleSearch(debouncedSearchWord);
  }, [debouncedSearchWord]);

  return (
    <div ref={wrapperRef}>
      <SearchInput
        isResultOpen={isResultOpen}
        handleSearchWordChange={handleSearchWrodChange}
        searchWord={searchWord}
        setIsResultOpen={setIsResultOpen}
      />
      {isResultOpen && (
        <SearchResult
          suggestions={suggestions}
          debouncedSearchWord={debouncedSearchWord}
        />
      )}
    </div>
  );
};

export default SearchMain;
