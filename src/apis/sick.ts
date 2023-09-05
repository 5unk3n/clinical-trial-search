import { instance } from '../libs/axios';
import { SuggestionType } from '../types';

export const getSearchSuggestions = async (
  searchQuery: string
): Promise<SuggestionType[]> => {
  console.info('calling api');
  const params = {
    q: searchQuery,
  };

  const { data } = await instance.get('/sick', { params });
  return data;
};
