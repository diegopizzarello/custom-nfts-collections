import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Collection from "./screens/collection/Collection";
import Home from "./screens/home/Home";
import { SavedCollection } from "./types";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "collection",
    element: <Collection />,
  },
  {
    path: "collection/:slug",
    element: <Collection />,
    loader: ({ params }) => {
      const { slug } = params;
      // TODO: get saved collections from localstorage
      const savedCollections: SavedCollection[] = [];
      const collection = savedCollections.find(
        (collection) => collection.slug === slug
      );
      if (!collection) {
        throw new Response("Not Found", { status: 404 });
      }
      return collection;
    },
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
