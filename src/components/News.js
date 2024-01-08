import React, { Component } from "react";
import NewsItem from "./NewsItem";
import ErrorPage from "./ErrorPage";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    pageSize: 10,
    category: "general",
    country: "in",
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      loading: false,
    };
  }
  componentDidMount() {
    this.props.setLoadingBar(80)
    this.fetchData(this.state.page);
    this.props.setLoadingBar(100)
  }

  fetchData = async (num) => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${num}&pageSize=${this.props.pageSize}`;
    let response = await fetch(url);
    let data = await response.json();
    if (data.status !== "error") {
      let articles = data.articles.filter(
        (article) => article.urlToImage !== null
      );
      let totalResults = data.totalResults;
      let maxPage = Math.ceil(totalResults / this.props.pageSize);
      this.setState({
        page: num,
        maxPage: maxPage,
        articles: this.state.articles.concat(articles),
      });
    }
  };

  fetchMoreData = () => {
    this.fetchData(this.state.page + 1);
  };
  render() {
    return this.state.loading ? (
      ""
    ) : this.state.articles.length ? (
      <div className="container my-4">
        <div>
          <h3 className="display-2">Top Stories</h3>
          <InfiniteScroll
            dataLength={this.state.articles.length} //This is important field to render the next data
            next={this.fetchMoreData}
            hasMore={this.state.page < this.state.maxPage}
            loader={<h4>Loading...</h4>}
          >
            <div className="container">
              <div className="row row-cols-1 row-cols-md-2">
                {this.state.articles.map((element, index) => {
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
}


