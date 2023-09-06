const cache = new Map<string, { data: any; expireTime: number }>();
const CACHE_DURATION = 1000 * 60 * 5;

interface fetchWithCacheProps<T extends (...args: any[]) => Promise<any>> {
  apiFunction: T;
  cacheKey: string;
}

export const fetchWithCache = async <
  T extends (...args: any[]) => Promise<any>
>({
  apiFunction,
  cacheKey,
}: fetchWithCacheProps<T>) => {
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    const { data, expireTime } = cachedData;
    const currentTime = new Date().getTime();

    if (currentTime < expireTime) {
      return Promise.resolve<ReturnType<typeof apiFunction>>(data);
    }
  }

  const data = await apiFunction(cacheKey);
  cache.set(cacheKey, {
    data,
    expireTime: new Date().getTime() + CACHE_DURATION,
  });
  return data as ReturnType<typeof apiFunction>;
};
