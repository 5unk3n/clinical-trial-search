import { useCallback, useEffect, useRef, useState } from 'react';

import SearchList from './SearchList';
import SearchInput from './SearchInput';
import { SuggestionType } from '../../types';
import { getSearchSuggestions } from '../../apis/sick';
import { fetchWithCache } from '../../utils/fetchWithCache';

const SearchMain = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const openSuggestions = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const closeSuggestions = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', closeSuggestions);
    return () => {
      document.removeEventListener('mousedown', closeSuggestions);
    };
  }, []);

  const handleSearch = useCallback(async (searchWord: string) => {
    if (searchWord === '') {
      setSuggestions([]);
      return;
    }

    const result = await fetchWithCache({
      apiFunction: () => getSearchSuggestions(searchWord),
      cacheKey: searchWord,
    });
    setSuggestions(result);
  }, []);

  return (
    <div ref={wrapperRef}>
      <SearchInput
        isOpen={isOpen}
        openSuggestions={openSuggestions}
        handleSearch={handleSearch}
      />
      {isOpen && <SearchList suggestions={suggestions} />}
    </div>
  );
};

export default SearchMain;
