import { useLocation } from "react-router-dom";
import NewsItem from "./NewsItem";
import React, { useContext, useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import ErrorContext from "../context/errorContext";
import LoadingProgressContext from "../context/loadingProgressContext";
import AlertContext from "../context/alertContext";

export default function SearchItem(props) {
  const location = useLocation();
  const queryparam = new URLSearchParams(location.search);
  const query = queryparam.get("query");
  const { setloadingProgress } = useContext(LoadingProgressContext);
  const { setError } = useContext(ErrorContext);
  const { setalert } = useContext(AlertContext);

  const [page, setPage] = useState(1);
  const [maxPage, setmaxPage] = useState(1);
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  document.title = `DailyDose - ${capitalizeFirstLetter(query)}`;

  const fetchData = async (num) => {
    try {
      let url = `https://dailydose.pythonanywhere.com/https://newsapi.org/v2/everything?q=${query}&language=en&apiKey=${props.apiKey}&page=${num}&pageSize=${props.pageSize}`;
      let response = await fetch(url);
      let data = await response.json();
      if (data.status !== "error") {
        if (data.articles.length) {
          let filtered_articles = data.articles.filter(
            (article) => article.urlToImage !== null
          );
          let totalResults = data.totalResults;
          let maxPage = Math.ceil(totalResults / props.pageSize);
          setPage(num);
          if (num <= 1) {
            setarticles(filtered_articles);
          } else {
            setarticles(articles.concat(filtered_articles));
          }
          setmaxPage(maxPage);
        } else {
          setError(`No articles were found for the query: ${query}`);
        }
      } else {
        if (num >= 2) {
          setmaxPage(page);
          setalert(
            "info",
            "Sorry, but I'm currently utilizing the NewsAPI's developer API that only allows 100 requests per day, and the limit has been exceeded for today."
          );
        }
        setError(
          "Sorry, but I'm currently utilizing the NewsAPI's developer API that only allows 100 requests per day, and the limit has been exceeded for today."
        );
      }
    } catch (error) {
      setError("Some error occurred - " + error.message);
    }
    if (num <= 1) {
      setloading(false);
      setloadingProgress(100);
    }
  };
  useEffect(() => {
    document.querySelector("form input").value = "";
    setarticles([]);
    setloading(true);
    setloadingProgress(20);
    fetchData(1);
    setloadingProgress(50);
    // eslint-disable-next-line
  }, [query]);
  return loading ? (
    <Loader />
  ) : articles.length ? (
    <div className="container">
      <h3 className="display-2">Top Stories</h3>

      <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={() => {
          fetchData(page + 1);
        }}
        hasMore={page < maxPage}
        loader={<Loader />}
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
    </div>
  ) : (
    <ErrorPage />
  );
}
