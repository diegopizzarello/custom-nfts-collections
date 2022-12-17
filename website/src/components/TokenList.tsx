import React, { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchTokens } from "../api/collection";
import { Token } from "../types";
import TokenItem from "./TokenItem";

interface TokenListProps {
  collectionId: string;
}

interface TokensProps {
  token: Token;
  market: unknown;
}

const TokenList = ({ collectionId }: TokenListProps) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    "collections",
    ({ pageParam }) => fetchTokens({ collectionId, pageParam }),
    {
      getNextPageParam: (lastPage, pages) => lastPage.continuation,
    }
  );

  useEffect(() => {
    refetch();
  }, [collectionId]);

  return (
    <div className="h-4/5 overflow-scroll w-52 border-r border-slate-300">
      {data?.pages.map(({ tokens }) =>
        tokens.map(({ token }: TokensProps) => <TokenItem {...token} />)
      )}
      {hasNextPage && (
        <button className="flex m-auto my-1" onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load more..."}
        </button>
      )}
    </div>
  );
};

export default TokenList;
