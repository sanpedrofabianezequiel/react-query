import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const { data, hasNextPage, fetchNextPage, isLoading, isError, error, isFetching } = useInfiniteQuery("sw-species", ({ pageParam = initialUrl }) => fetchUrl(pageParam), {
    getNextPageParam: (lastGroup) => lastGroup.next || undefined,
  })
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return(
    <>
      {isFetching && <div className="loading">Loading...</div>}
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {
          data.pages.map((x) => {
            return x.results.map((y)=>{
              return <Species key={y.name} name={y.name} language={y.language} averageLifespan={y.averageLifespan} />
            })
          })
        }
      </InfiniteScroll>
    </>
  ); 

}
