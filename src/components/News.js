import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 6,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.props.category.toUpperCase()} - AnotherNewsApp`
    }

    async updateNews(pageNo) {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${pageNo}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        this.props.setProgress(40);
        let data = await fetch(url);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8e15772165bf46f48429f53c3e947f4f&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // });
        this.updateNews(this.state.page);
    }

    // handlePrevClick = async () => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8e15772165bf46f48429f53c3e947f4f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     // this.setState({loading: true});
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // });
    //     this.updateNews(this.state.page - 1);
    //     this.setState({ page: this.state.page - 1 });
    // }
    // handleNextClick = async () => {
    //     // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8e15772165bf46f48429f53c3e947f4f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     //     this.setState({loading: true});
    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json();
    //     //     this.setState({
    //     //         page: this.state.page + 1,
    //     //         articles: parsedData.articles,
    //     //         loading: false
    //     //     });
    //     // }
    //     this.updateNews(this.state.page + 1);
    //     this.setState({ page: this.state.page + 1 });
    // }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        });
    }

    render() {
        return (
            <>
                <div className="container my-5">
                    <h1 className="text-center bg-dark text-white rounded-pill py-2 mb-4">Another News App - Trending news</h1>
                    {this.state.loading && <Spinner/>}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner/>}
                    >
                        {<div className="row mx-1">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 my-2" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>}
                    </InfiniteScroll>
                </div>
                {/* <div className="container d-flex justify-content-between mb-5">
                    <button disabled={this.state.page <= 1 ? true : false} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) ? true : false} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
                </div> */}
            </>
        )
    }
}
