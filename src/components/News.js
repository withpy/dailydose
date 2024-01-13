import React, { useState, useEffect, useContext } from "react";
import NewsItem from "./NewsItem";
import ErrorPage from "./ErrorPage";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import ErrorContext from "../context/errorContext";
import LoadingProgressContext from "../context/loadingProgressContext";
import AlertContext from "../context/alertContext";

export default function News(props) {
  const { setloadingProgress } = useContext(LoadingProgressContext);
  const seterror = useContext(ErrorContext);
  const { setalert } = useContext(AlertContext);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  document.title = `DailyDose${
    props.path ? "" : " - " + capitalizeFirstLetter(props.category)
  }`;
  const [articles, setarticles] = useState([]);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(true);
  const [maxPage, setmaxPage] = useState(1);
  const fetchData = async (num) => {
    try {
      let url = `https://dailydose.pythonanywhere.com/https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${num}&pageSize=${props.pageSize}`;
      let response = await fetch(url);
      let data = await response.json();
      if (data.status !== "error") {
        let filtered_articles = data.articles.filter(
          (article) => article.urlToImage !== null
        );
        let totalResults = data.totalResults;
        let maxPage = Math.ceil(totalResults / props.pageSize);
        setpage(num);
        setmaxPage(maxPage);
        setarticles(articles.concat(filtered_articles));
      } else {
        if (num >= 2) {
          setmaxPage(page);
          setalert(
            "info",
            "Sorry, but I'm currently utilizing the NewsAPI's developer API that only allows 100 requests per day, and the limit has been exceeded for today."
          );
        }
        seterror.setError(
          "Sorry, but I'm currently utilizing the NewsAPI's developer API that only allows 100 requests per day, and the limit has been exceeded for today."
        );
      }
    } catch (error) {
      seterror.setError("Some error occurred - " + error.message);
    }
    if (num <= 1) {
      setloading(false);
      setloadingProgress(100);
    }
  };

  const fetchMoreData = () => {
    fetchData(page + 1);
  };
  useEffect(() => {
    setloadingProgress(20);
    fetchData(1);
    setloadingProgress(50);
    // eslint-disable-next-line
  }, []);
  return loading ? (
    <Loader />
  ) : articles.length ? (
    <div className="container">
      <div>
        <h3 className="display-2">Top Stories</h3>
        <InfiniteScroll
          dataLength={articles.length} //This is important field to render the next data
          next={fetchMoreData}
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
    </div>
  ) : (
    <ErrorPage />
  );
}
News.defaultProps = {
  pageSize: 10,
  category: "general",
  country: "in",
  path: null,
};
