import React, { useContext } from "react";
import { Link, Form, useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import LoadingProgressContext from "../context/loadingProgressContext";

function Navbar() {
  let location = useLocation();
  let loaction_path = location.pathname;
  const { loadingProgress, setloadingProgress } = useContext(
    LoadingProgressContext
  );

  return (
    <div>
      <LoadingBar
        color="#f11946"
        progress={loadingProgress}
        onLoaderFinished={() => setloadingProgress(0)}
      />
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <strong>DailyDose</strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    loaction_path !== "/about" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    loaction_path === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/business">
                      Business
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/entertainment">
                      Entertainment
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/general">
                      General
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/health">
                      Health
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/science">
                      Science
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/sports">
                      Sports
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/technology">
                      Technology
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <Form
              action="/search"
              method="get"
              className="d-flex"
              role="search"
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="query"
                required
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </Form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
