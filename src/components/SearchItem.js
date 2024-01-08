import { useLoaderData } from "react-router-dom";
import NewsItem from "./NewsItem";
import React, { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";
import InfiniteScroll from "react-infinite-scroll-component";

export default function SearchItem(props) {
  const maxPage = useLoaderData().maxPage;
  const article = useLoaderData().articles;
  const query = useLoaderData().query;
  const [page, setPage] = useState(1);
  const [articles, setarticles] = useState([]);
  // const [loading, setloading] = useState(false);
  const fetchData = async (num) => {
    let url = `https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=${props.apiKey}&page=${num}&pageSize=${props.pageSize}`;
    let response = await fetch(url);
    let data = await response.json();
    if (data.status !== "error") {
      let filtered_articles = data.articles.filter(
        (article) => article.urlToImage !== null
      );
      setPage(num);
      setarticles(articles.concat(filtered_articles));
    }
  };
  useEffect(() => {
    props.setLoadingBar(100)
    setarticles(article);
    props.setLoadingBar(100)
  }, [article,props]);
  // const handelpagination = (num) => {
  //   fetchData(page + num);
  // };
  return articles ? (
    <div className="container my-4">
      {articles.length ? (
        <h3 className="display-2">Top Stories</h3>
      ) : (
        <h5 className="text-center">
          No articles were found for the query: '{query}'
        </h5>
      )}
      <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={() => {
          fetchData(page + 1);
        }}
        hasMore={page < maxPage}
        loader={<h4>Loading...</h4>}
      >
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2">
            {articles.map((element, index) => {
              return (
                <NewsItem
                  key={index}
                  title={element.title}
                  desc={element.description}
                  sourceUrl={element.url}
                  imageUrl={element.urlToImage}
                  author={element.author}
                  source={element.source.name}
                  publishedAt={element.publishedAt}
                />
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-outline-dark mx-5"
          style={{ visibility: page <= 1 ? "hidden" : "visible" }}
          onClick={() => {
            handelpagination(-1);
          }}
        >
          &larr; Prev
        </button>
        <button
          type="button"
          className="btn btn-outline-dark mx-5"
          style={{
            visibility: page >= maxPage ? "hidden" : "visible",
          }}
          onClick={() => {
            handelpagination(1);
          }}
        >
          Next &rarr;
        </button>
      </div> */}
    </div>
  ) : (
    <ErrorPage />
  );
}

export async function SearchItemLoader ({ request, apiKey }) {
  apiKey = process.env.REACT_APP_API_KEY;
  const searchValue=document.querySelector("form .form-control")
  if (searchValue) {
    searchValue.value = "";
  }
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  let articles = null;
  let maxPage = 1;
  let apiUrl = `https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=${apiKey}&page=1&pageSize=10`;
  let response = await fetch(apiUrl);
  let data = await response.json();
  if (data.status !== "error") {
    articles = data.articles.filter(
      (article) => article.urlToImage !== null
    );
    let totalResults = data.totalResults;
    maxPage = Math.ceil(totalResults / 10);
  }
  return { articles: articles, maxPage: maxPage, query: query };
}
