import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Collection from "./screens/collection/Collection";
import Home from "./screens/home/Home";
import { SavedCollection } from "./types";

const queryClient = new QueryClient();

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
      const savedCollections: SavedCollection[] = [
        {
          slug: "bored",
          tokens: [{ tokenId: "1", image: "bla", name: "jotape" }],
        },
      ];
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
  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router} />
      </DndProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
