import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useLoaderData } from "react-router-dom";
import Select from "react-select";
import { fetchCollections } from "../../api/collection";
import { SavedCollection } from "../../types";

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
  const [tokens, setTokens] = useState(collectionToEdit?.tokens || []);
  const [slug, setSlug] = useState(collectionToEdit?.slug || "");
  const [options, setOptions] = useState<SelectOptions[]>([]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery("collections", fetchCollections, {
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

  return (
    <div>
      <Select
        isLoading={isFetching || isFetchingNextPage}
        options={options}
        onMenuScrollToBottom={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
      />
    </div>
  );
};

export default Collection;
