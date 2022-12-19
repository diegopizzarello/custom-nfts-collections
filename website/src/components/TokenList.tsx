import React, { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchTokens } from "../api/collection";
import { Token } from "../types";
import { getKey, isSameToken } from "../utils/token";
import TokenItem from "./TokenItem";

interface TokenListProps {
  collectionId: string;
  selectedTokens: Token[];
  addToken: (token: Token) => void;
}

interface TokensProps {
  token: Token;
  market: unknown;
}

const TokenList = ({
  collectionId,
  addToken,
  selectedTokens,
}: TokenListProps) => {
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
    <div className="overflow-y-scroll w-52">
      {data?.pages.map(({ tokens }) =>
        tokens.map(({ token }: TokensProps) => (
          <TokenItem
            key={getKey(token)}
            token={token}
            isDisabled={!!selectedTokens.find((t) => isSameToken(token, t))}
            addToken={addToken}
          />
        ))
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
