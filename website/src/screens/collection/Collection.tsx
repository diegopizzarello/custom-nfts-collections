import React, { useEffect, useState, useSyncExternalStore } from "react";
import { useInfiniteQuery } from "react-query";
import { useLoaderData } from "react-router-dom";
import Select from "react-select";
import { fetchCollections } from "../../api/collection";
import Grid from "../../components/Grid";
import TokenList from "../../components/TokenList";
import { SavedCollection, Token } from "../../types";
import { isSameToken } from "../../utils/token";

interface Collection {
  id: string;
  name: string;
}
interface SelectOptions {
  value: string;
  label: string;
}

const Collection = () => {
  const collectionToEdit = useLoaderData() as SavedCollection | undefined;
  const [tokens, setTokens] = useState<Token[]>(collectionToEdit?.tokens || []);
  const [slug, setSlug] = useState(collectionToEdit?.slug || "");
  const [options, setOptions] = useState<SelectOptions[]>([]);
  const [collection, setCollection] = useState<string | undefined>(undefined);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery("tokens", fetchCollections, {
    getNextPageParam: (lastPage, pages) => lastPage.continuation,
  });

  useEffect(() => {
    if (data) {
      data.pages.forEach((page) => {
        const newOptions = page.collections.map((collection: Collection) => ({
          value: collection.id,
          label: collection.name,
        }));
        setOptions([...options, ...newOptions]);
      });
    }
  }, [data]);

  const addToken = (token: Token) => {
    setTokens((prevState) => [...prevState, token]);
  };

  const removeToken = (token: Token) => {
    const newTokens = tokens.filter((t) => !isSameToken(token, t));
    setTokens(newTokens);
  };

  return (
    <div className="h-screen">
      <div className="h-1/5 flex items-center px-2">
        <Select
          isLoading={isFetching || isFetchingNextPage}
          className="w-52"
          onChange={(newValue) => newValue && setCollection(newValue.value)}
          options={options}
          onMenuScrollToBottom={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
        />
      </div>
      <div className="flex h-4/5">
        {collection && (
          <TokenList
            collectionId={collection}
            selectedTokens={tokens}
            addToken={addToken}
          />
        )}
        <Grid tokens={tokens} removeToken={removeToken} />
      </div>
    </div>
  );
};

export default Collection;
