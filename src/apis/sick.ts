import { instance } from '../libs/axios';

export const getSearchSuggestions = async (searchQuery: string) => {
  const params = {
    q: searchQuery,
  };

  const { data } = await instance.get('/sick', { params });
  return data;
};
