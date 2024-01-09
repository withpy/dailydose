import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import ErrorPage from "./ErrorPage";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [articles, setarticles] = useState([]);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(true);
  const [maxPage, setmaxPage] = useState(1);
  const fetchData = async (num) => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${num}&pageSize=${props.pageSize}`;
    let response = await fetch(url);
    let data = await response.json();
    if (data.status !== "error") {
      let filtered_articles = data.articles.filter(
        (article) => article.urlToImage !== null
      );
      let totalResults = data.totalResults;
      let maxPage = Math.ceil(totalResults / props.pageSize);
      setarticles(articles.concat(filtered_articles));
      setpage(num);
      setmaxPage(maxPage);
    }
    if (num <= 1) {
      setloading(false);
      props.setloadingProgress(100);
    }
  };

  const fetchMoreData = () => {
    fetchData(page + 1);
  };
  useEffect(() => {
    props.setloadingProgress(20);
    fetchData(page);
    props.setloadingProgress(50);
  }, []);
  return loading ? (
    <Loader />
  ) : articles.length ? (
    <div className="container" style={{ marginTop: "4rem" }}>
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
};
