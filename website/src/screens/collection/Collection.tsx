import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { SavedCollection } from "../../types";

const Collection = () => {
  const collectionToEdit = useLoaderData() as SavedCollection | undefined;
  const [tokens, setTokens] = useState(collectionToEdit?.tokens || []);
  const [slug, setSlug] = useState(collectionToEdit?.slug || "");

  console.log({ tokens, slug });
  return <div>Collection page</div>;
};

export default Collection;
