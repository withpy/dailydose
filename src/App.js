import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import SearchItem, { SearchItemLoader } from "./components/SearchItem";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  
  // apiKey="d338dc6f951e46e29f5102439b076a36"
  // apiKey="c064ab0147a240a2a7864afd6fad31dc"
  // apiKey="3e93ad1dca214abaa5a35a496813b6f3"
  // apiKey="d697a88963b84dd0acd01ad803a00ef1"
  // apiKey="24dd43e35bc14744b8d3e75dffc82f4d"
  apiKey = process.env.REACT_APP_API_KEY;
  constructor() {
    super();
    this.state = {
      progress: 10,
    };
  }
  setLoadingbar=(value)=>{
    this.setState({progress:value})
  }
  render() {
  const router = createBrowserRouter([
    {
      element: (
        <>
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
            onLoaderFinished={() => this.setLoadingbar(0)}
          />
          <Navbar />
          <Outlet />
        </>
      ),

      children: [
        {
          path: "/",
          element: <News setLoadingBar={this.setLoadingbar} apiKey={this.apiKey} />,
        },
        {
          path: "/general",
          element: (
            <News setLoadingBar={this.setLoadingbar} key="general" category="general" apiKey={this.apiKey} />
          ),
        },
        {
          path: "/business",
          element: (
            <News setLoadingBar={this.setLoadingbar} key="business" category="business" apiKey={this.apiKey} />
          ),
        },
        {
          path: "/entertainment",
          element: (
            <News setLoadingBar={this.setLoadingbar} key="entertainment"
              category="entertainment"
              apiKey={this.apiKey}
            />
          ),
        },
        {
          path: "/health",
          element: <News setLoadingBar={this.setLoadingbar} key="health" category="health" apiKey={this.apiKey} />,
        },
        {
          path: "/science",
          element: (
            <News setLoadingBar={this.setLoadingbar} key="science" category="science" apiKey={this.apiKey} />
          ),
        },
        {
          path: "/sports",
          element: <News setLoadingBar={this.setLoadingbar} key="sports" category="sports" apiKey={this.apiKey} />,
        },
        {
          path: "/technology",
          element: (
            <News setLoadingBar={this.setLoadingbar} key="technology" category="technology" apiKey={this.apiKey} />
          ),
        },
        {
          path: "/search",
          element: <SearchItem setLoadingBar={this.setLoadingbar} pageSize={10} apiKey={this.apiKey} />,
          loader: SearchItemLoader
        },
      ],
    },
  ]);
  
    return <RouterProvider router={router} />;
  }
}
