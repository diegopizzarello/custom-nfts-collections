import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import CollectionCard from "../../components/CollectionCard";
import { SavedCollection } from "../../types";
import { deleteCollection } from "../../utils/collections";

const Home = () => {
  const collectionToEdit = useLoaderData() as SavedCollection[];
  const [collections, setCollections] = useState(collectionToEdit);
  const navigate = useNavigate();

  const onDeleteCollection = (slug: string) => {
    const newCollections = deleteCollection(slug);
    setCollections(newCollections);
  };

  return (
    <div className="p-8 flex flex-col md:items-center">
      <div className="flex justify-between mb-4 md:min-w-[672px]">
        <span className="font-medium text-xl">Custom Collections</span>
        <button
          onClick={() => navigate("/collection")}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Create collection
        </button>
      </div>
      <ul className="md:min-w-[672px]">
        {collections.map((collection) => (
          <li key={collection.slug}>
            <CollectionCard
              collection={collection}
              deleteCollection={onDeleteCollection}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
