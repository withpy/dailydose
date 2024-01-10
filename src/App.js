import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import SearchItem, { SearchItemLoader } from "./components/SearchItem";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import About from "./components/About";
import Seo from "./components/Seo";

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [loadingProgress, setloadingProgress] = useState(0);

  const router = createHashRouter([
    {
      element: (
        <>
          <Seo />
          <LoadingBar
            color="#f11946"
            progress={loadingProgress}
            onLoaderFinished={() => setloadingProgress(0)}
          />
          <Navbar />
          <Outlet />
        </>
      ),

      children: [
        {
          path: "/",
          element: (
            <News
              path="Home"
              setloadingProgress={setloadingProgress}
              apiKey={apiKey}
            />
          ),
        },
        {
          path: "/general",
          element: (
            <News
              setloadingProgress={setloadingProgress}
              key="general"
              category="general"
              apiKey={apiKey}
            />
          ),
        },
        {
          path: "/business",
          element: (
            <News
              setloadingProgress={setloadingProgress}
              key="business"
              category="business"
              apiKey={apiKey}
            />
          ),
        },
        {
          path: "/entertainment",
          element: (
            <News
              setloadingProgress={setloadingProgress}
              key="entertainment"
              category="entertainment"
              apiKey={apiKey}
            />
          ),
        },
        {
          path: "/health",
          element: (
            <News
              setloadingProgress={setloadingProgress}
              key="health"
              category="health"
              apiKey={apiKey}
            />
          ),
        },
        {
          path: "/science",
          element: (
            <News
              setloadingProgress={setloadingProgress}
              key="science"
              category="science"
              apiKey={apiKey}
            />
          ),
        },
        {
          path: "/sports",
          element: (
            <News
              setloadingProgress={setloadingProgress}
              key="sports"
              category="sports"
              apiKey={apiKey}
            />
          ),
        },
        {
          path: "/technology",
          element: (
            <News
              setloadingProgress={setloadingProgress}
              key="technology"
              category="technology"
              apiKey={apiKey}
            />
          ),
        },
        {
          path: "/search",
          element: <SearchItem pageSize={10} apiKey={apiKey} />,
          loader: SearchItemLoader,
        },
        {
          path: "/about",
          element: <About />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
