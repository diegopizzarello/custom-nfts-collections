import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useLoaderData, useNavigate } from "react-router-dom";
import Select from "react-select";
import { fetchCollections } from "../../api/collection";
import Grid from "../../components/Grid";
import TokenList from "../../components/TokenList";
import { SavedCollection, Token } from "../../types";
import { deleteCollection, saveCollection } from "../../utils/collections";
import { isSameToken } from "../../utils/token";
import arrow from "../../assets/up-arrow.png";

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
  const navigate = useNavigate();

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
    const { tokenId, image, contract } = token;
    setTokens((prevState) => [...prevState, { tokenId, image, contract }]);
  };

  const removeToken = (token: Token) => {
    const newTokens = tokens.filter((t) => !isSameToken(token, t));
    setTokens(newTokens);
  };

  const onSaveCollection = () => {
    if (collectionToEdit) {
      deleteCollection(collectionToEdit.slug);
    }
    saveCollection(slug, tokens);
    navigate("/");
  };

  return (
    <div className="h-screen">
      <div className="h-1/5 flex flex-col px-2 py-4 justify-around">
        <span
          onClick={() => navigate("/")}
          className="text-sm text-gray-700 cursor-pointer w-fit"
        >{`< Collections`}</span>
        <div className="flex items-center">
          <Select
            isLoading={isFetching || isFetchingNextPage}
            className="w-52 mr-3"
            onChange={(newValue) => newValue && setCollection(newValue.value)}
            options={options}
            onMenuScrollToBottom={() => {
              if (hasNextPage) {
                fetchNextPage();
              }
            }}
          />
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Custom Collection Name"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <button
            onClick={onSaveCollection}
            disabled={!slug}
            className={`text-white bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-3 ${
              !slug ? "opacity-40" : "hover:bg-gray-900"
            }`}
          >
            Save
          </button>
        </div>
      </div>
      <div className="flex h-4/5">
        {collection ? (
          <TokenList
            collectionId={collection}
            selectedTokens={tokens}
            addToken={addToken}
          />
        ) : (
          <div className="w-52 flex flex-col items-center mt-6">
            <img src={arrow} className="w-12" />
            <span className="text-sm text-gray-700">Select collection</span>
          </div>
        )}
        <Grid tokens={tokens} removeToken={removeToken} />
      </div>
    </div>
  );
};

export default Collection;
