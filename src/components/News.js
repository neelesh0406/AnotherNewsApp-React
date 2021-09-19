import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

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
            loading: false,
            page: 1
            }
        document.title = `${this.props.category.toUpperCase()} - AnotherNewsApp`
    }

    async updateNews(pageNo){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8e15772165bf46f48429f53c3e947f4f&page=${pageNo}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
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
    
    handlePrevClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8e15772165bf46f48429f53c3e947f4f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // });
        this.updateNews(this.state.page - 1);
        this.setState({page: this.state.page - 1});
    }
    handleNextClick = async () => {
        // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8e15772165bf46f48429f53c3e947f4f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading: true});
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false
        //     });
        // }
        this.updateNews(this.state.page + 1);
        this.setState({page: this.state.page + 1});
    }

    render() {
        return (
            <>
                <div className="container my-5">
                    <h1 className="text-center bg-dark text-white rounded-pill py-2 mb-4">Another News App - Trending news</h1>
                    {this.state.loading && <Spinner/>}
                    {!this.state.loading && <div className="row mx-5">
                        {this.state.articles.map((element) => {
                            return  <div className="col-md-4 my-2" key={element.url}>
                                        <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>
                        })}
                    </div>}
                </div>
                <div className="container d-flex justify-content-between mb-5">
                <button disabled={this.state.page<=1 ? true:false} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))?true:false} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
                </div>
            </>
        )
    }
}
