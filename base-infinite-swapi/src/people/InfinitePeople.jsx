import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const { data, hasNextPage, fetchNextPage, isLoading, isError, error, isFetching } = useInfiniteQuery("sw-people", ({ pageParam = initialUrl }) => fetchUrl(pageParam), {
    getNextPageParam: (lastGroup) => lastGroup.next || undefined,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((x) => {
          return x.results.map((y) => {
            return <Person key={y.name} name={y.name} hairColor={y.hairColor} eyeColor={y.eyeColor} />;
          });
        })}
      </InfiniteScroll>
    </>
  );
}
