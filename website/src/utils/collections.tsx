import { SavedCollection, Token } from "../types";

export const getSavedCollections = (): SavedCollection[] => {
  const t = localStorage.getItem("collections");
  if (!t) return [];
  return JSON.parse(t);
};

export const saveCollection = (slug: string, tokens: Token[]) => {
  if (!slug) return;
  const newCollection = { slug, tokens };
  const savedCollections = getSavedCollections();
  localStorage.setItem(
    "collections",
    JSON.stringify([newCollection, ...savedCollections])
  );
};

export const deleteCollection = (slug: string): SavedCollection[] => {
  if (!slug) throw new Error("slug is missing");
  const savedCollections = getSavedCollections();
  const newCollections = savedCollections.filter(
    (collection) => collection.slug !== slug
  );
  localStorage.setItem("collections", JSON.stringify(newCollections));
  return newCollections;
};
