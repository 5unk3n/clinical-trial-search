const cache = new Map<string, { data: any; expireTime: number }>();
const CACHE_DURATION = 1000 * 60 * 5;

interface fetchWithCacheProps<T> {
  apiFunction: () => Promise<T>;
  cacheKey: string;
}

export const fetchWithCache = async <T>({
  apiFunction,
  cacheKey,
}: fetchWithCacheProps<T>) => {
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    const { data, expireTime } = cachedData;
    const currentTime = new Date().getTime();

    if (currentTime < expireTime) {
      return Promise.resolve<T>(data);
    }
  }

  const data = await apiFunction();
  cache.set(cacheKey, {
    data,
    expireTime: new Date().getTime() + CACHE_DURATION,
  });
  return data;
};
