import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import CollectionCard from "../../components/CollectionCard";
import { SavedCollection } from "../../types";

const Home = () => {
  const collectionToEdit = useLoaderData() as SavedCollection[];
  const [collections, setCollections] = useState(collectionToEdit);
  return (
    <div className="p-8">
      <span>Custom Collections</span>
      <ul>
        {collections.map((collection) => (
          <li key={collection.slug}>
            <CollectionCard collection={collection} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
