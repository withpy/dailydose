import React from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import SearchItem from "./components/SearchItem";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./components/About";
import Alert from "./components/Alert"
import ValueState from "./context/ValueState";

function App() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const router = createHashRouter([
    {
      element: (
        <>
          <ValueState>
            <Navbar />
            <Outlet />
            <Alert />
          </ValueState>
        </>
      ),

      children: [
        {
          path: "/",
          element: <News path="Home" apiKey={apiKey} />,
        },
        {
          path: "/general",
          element: <News key="general" category="general" apiKey={apiKey} />,
        },
        {
          path: "/business",
          element: <News key="business" category="business" apiKey={apiKey} />,
        },
        {
          path: "/entertainment",
          element: (
            <News
              key="entertainment"
              category="entertainment"
              apiKey={apiKey}
            />
          ),
        },
        {
          path: "/health",
          element: <News key="health" category="health" apiKey={apiKey} />,
        },
        {
          path: "/science",
          element: <News key="science" category="science" apiKey={apiKey} />,
        },
        {
          path: "/sports",
          element: <News key="sports" category="sports" apiKey={apiKey} />,
        },
        {
          path: "/technology",
          element: (
            <News key="technology" category="technology" apiKey={apiKey} />
          ),
        },
        {
          path: "/search",
          element: <SearchItem pageSize={10} apiKey={apiKey} />,
          // loader: SearchItemLoader,
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
