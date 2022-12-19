import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Collection from "./screens/collection/Collection";
import Home from "./screens/home/Home";
import { getSavedCollections } from "./utils/collections";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: () => {
      const collections = getSavedCollections();
      if (!collections.length) {
        return redirect("/collection");
      }
      return collections;
    },
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
      const savedCollections = getSavedCollections();
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
