import React from "react";
import { Link } from "react-router-dom";

export default function NewsItem(props) {
  let { title, desc, imageUrl, author, source, publishedAt, sourceUrl } = props;
  const wordwrap = (text, maxLength) => {
    if (!text || text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + "...";
    }
  };
  return (
    <div className="card-group my-4">
      <div className="card">
        <div className="row g-0 h-100">
          <div className="col-md-4 text-center">
            <img
              src={imageUrl}
              className="img-fluid rounded-sm-top rounded-md-start mt-md-0.25 mt-sm-0.5"
              alt="..."
              style={{
                width: "95%",
                height: "90%",
                objectFit: "cover",
                // padding: "0.5rem",
              }}
            />
            <span
              className="text-body-secondary align-text-top"
              style={{ fontSize: "0.8rem" }}
            >
              {source ? source : "Unknown"}
            </span>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <Link
                className="nav-link"
                aria-current="page"
                to={sourceUrl}
                target="_blank"
              >
                <h5 className="card-title">{wordwrap(title, 100)}</h5>
              
              <p className="card-text">{wordwrap(desc, 180)}</p>

              <p className="card-text text-truncate">
                <small className="text-body-secondary">
                  By{" "}
                  <span className="text-dark">
                    {author ? author : "Unknown"}
                  </span>{" "}
                  on{" "}
                  <span className="text-dark">
                    {new Date(publishedAt).toLocaleString("en-us", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </span>
                </small>
              </p></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
