import { Token } from "../types";

export const getSavedCollections = () => {
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
    JSON.stringify([...savedCollections, newCollection])
  );
};
