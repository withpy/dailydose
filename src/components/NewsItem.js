import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class NewsItem extends Component {
  wordwrap = (text, maxLength) => {
    if (!text || text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + "...";
    }
  };
  render(props) {
    let { title, desc, imageUrl, author, source, publishedAt, sourceUrl } =
      this.props;
    return (
      <div className="card-group my-4">
        <div className="card">
          <div className="row g-0 h-100">
            <div className="col-md-4 text-center">
              <img
                src={imageUrl}
                className="img-fluid rounded-start mt-1"
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
                <Link className="nav-link" aria-current="page" to={sourceUrl} target="_blank">
                  <h5 className="card-title">{this.wordwrap(title, 100)}</h5>
                </Link>
                <p className="card-text">{this.wordwrap(desc, 180)}</p>

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
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

