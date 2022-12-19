import React from "react";
import { useNavigate } from "react-router-dom";
import { SavedCollection } from "../types";

interface CollectionCardProps {
  collection: SavedCollection;
  deleteCollection: (slug: string) => void;
}

const CollectionCard = ({
  collection,
  deleteCollection,
}: CollectionCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center w-full p-4 text-center bg-white border rounded-lg shadow-md mt-2 max-w-2xl">
      <div className="flex flex-col items-start">
        <span className="font-semibold  tracking-wide uppercase">
          {collection.slug}
        </span>
        <span>{collection.tokens.length} items</span>
      </div>
      <div>
        <button
          onClick={() => deleteCollection(collection.slug)}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-1"
        >
          Delete
        </button>
        <button
          onClick={() => navigate(`/collection/${collection.slug}`)}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default CollectionCard;
