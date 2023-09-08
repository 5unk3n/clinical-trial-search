# 원티드 프리온보딩 프론트엔드 인턴십 3주차 개인 과제

## 프로젝트 소개

한국임상정보 메인 페이지의 검색 기능 클론코딩입니다.

배포 링크: https://clinical-trial-search-black.vercel.app/

### 데모 영상

![임상](https://github.com/5unk3n/clinical-trial-search/assets/97281800/90ee4173-7b44-4aef-9249-59c7857df2a1)

## 개발 기간

2023.09.05 ~ 2023.09.08

## 기술 스택

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/styled component-DB7093?style=flat-square&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/> <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint">

## 프로젝트 실행 방법

```shell
git clone https://github.com/5unk3n/clinical-trial-search.git

npm install

# 리액트 앱과 json-server를 함께 실행합니다.
npm run dev
```

## 디렉토리 구조

```
📦src
 ┣ 📂apis
 ┃ ┗ 📜sick.ts
 ┣ 📂components
 ┃ ┣ 📂Icon
 ┃ ┃ ┗ 📜SearchIcon.tsx
 ┃ ┗ 📂Search
 ┃ ┃ ┣ 📜SearchInput.styled.ts
 ┃ ┃ ┣ 📜SearchInput.tsx
 ┃ ┃ ┣ 📜SearchMain.tsx
 ┃ ┃ ┣ 📜SearchResult.styled.ts
 ┃ ┃ ┗ 📜SearchResult.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useDebounce.ts
 ┃ ┗ 📜useKeyboardFocus.ts
 ┣ 📂libs
 ┃ ┗ 📜axios.ts
 ┣ 📂pages
 ┃ ┣ 📜SearchPage.styled.ts
 ┃ ┗ 📜SearchPage.tsx
 ┣ 📂types
 ┃ ┗ 📜index.ts
 ┣ 📂utils
 ┃ ┗ 📜fetchWithCache.ts
 ┣ 📜App.tsx
 ┣ 📜GlobalStyle.ts
 ┣ 📜index.tsx
```

## 구현 기능

### API 호출별로 로컬 캐싱 구현

이 프로젝트에서 캐싱될 데이터는 추천 검색어인데 추천 검색어는 세션 종료 후에 남아있을 필요가 없다고 생각해 인메모리 방식으로 구현했습니다.

api호출함수와 쿼리키를 매개변수로 받아 캐싱하는 `fetchWithCache` 유틸 함수로 분리했습니다.

캐시에 데이터가 저장되어있다면 캐시 데이터를 사용하고, 없다면 api를 호출합니다.

api를 호출하고 캐시에 저장할 때 expire time을 함께 저장합니다. expire time은 5분으로 설정하였고, 캐시 데이터를 사용할 때 현재 시간이 expire time 전이라면 캐시 데이터를 사용하고, 후라면 다시 api함수를 호출합니다.

```ts
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
```

### 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

`useDebounce` 커스텀 훅 구현

value와 delay를 인자로 받아 delay만큼 타이머를 설정합니다. 타이머 종료 전에 value가 바뀐다면 취소 후 재설정합니다.

따라서, 마지막 입력 후 delay만큼 시간이 지났을 때만 api를 호출하게 됩니다.

```ts
const useDebounce = (value: string, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
```

### 키보드만으로 추천 검색어들로 이동 가능하도록 구현

검색 컴포넌트 마운트 시 document에 `keydown`이벤트 리스너를 추가해 키 입력시 `focusIndex` 상태를 조작하는 방식으로 구현했습니다.

#### 사용 방법

- `↑`: 추천 검색어의 이전(위) 요소로 이동합니다. 첫 번째 요소에서 입력 시 동작하지 않습니다.
- `Shift + Tab`: 추천 검색어의 이전(위) 요소로 이동합니다. 첫 번째 요소에서 입력 시 focus를 이동합니다.
- `↓`: 추천 검색어의 다음(아래) 요소로 선택 이동합니다. 마지막 요소에서 입력 시 동작하지 않습니다.
- `Tab`: 추천 검색어의 다음(아래) 요소로 선택 이동합니다. 마지막 요소에서 입력 시 focus를 이동합니다.
