import axios from "axios";

const BASE_URL = "https://api.reservoir.tools";

export const fetchCollections = async ({ pageParam = undefined }) => {
  const { data } = await axios.get(`${BASE_URL}/collections/v5`, {
    params: {
      continuation: pageParam,
    },
  });
  return data;
};

interface FetchTokens {
  collectionId: string;
  pageParam?: string;
}

export const fetchTokens = async ({
  collectionId,
  pageParam = undefined,
}: FetchTokens) => {
  const { data } = await axios.get(`${BASE_URL}/tokens/v5`, {
    params: {
      continuation: pageParam,
      collection: collectionId,
    },
  });
  return data;
};
