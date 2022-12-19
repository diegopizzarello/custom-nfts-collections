import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import CollectionCard from "../../components/CollectionCard";
import { SavedCollection } from "../../types";
import { deleteCollection } from "../../utils/collections";

const Home = () => {
  const collectionToEdit = useLoaderData() as SavedCollection[];
  const [collections, setCollections] = useState(collectionToEdit);

  const onDeleteCollection = (slug: string) => {
    const newCollections = deleteCollection(slug);
    setCollections(newCollections);
  };

  return (
    <div className="p-8">
      <span>Custom Collections</span>
      <ul>
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
