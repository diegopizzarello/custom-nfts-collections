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
