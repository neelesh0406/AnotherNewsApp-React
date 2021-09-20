import React, {useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
        setLoading(true);
        props.setProgress(40);
        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);

        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${props.category.toUpperCase()} - AnotherNewsApp`
        updateNews(); 
        // eslint-disable-next-line
    }, [])

    // handlePrevClick = async () => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8e15772165bf46f48429f53c3e947f4f&page=${page - 1}&pageSize=${props.pageSize}`;
    //     // this.setState({loading: true});
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // this.setState({
    //     //     page: page - 1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // });
    //     this.updateNews(page - 1);
    //     this.setState({ page: page - 1 });
    // }
    // handleNextClick = async () => {
    //     // if(!(page + 1 > Math.ceil(totalResults/props.pageSize))){
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8e15772165bf46f48429f53c3e947f4f&page=${page + 1}&pageSize=${props.pageSize}`;
    //     //     this.setState({loading: true});
    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json();
    //     //     this.setState({
    //     //         page: page + 1,
    //     //         articles: parsedData.articles,
    //     //         loading: false
    //     //     });
    //     // }
    //     this.updateNews(page + 1);
    //     this.setState({ page: page + 1 });
    // }

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    }

        return (
            <>
                <div className="container" style={{marginTop: "90px"}}>
                    <h1 className="text-center bg-dark text-white rounded-pill py-2 px-2 mb-4 text-capitalize">Another News App - {props.category} Top headlines</h1>
                    {loading && <Spinner/>}
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length !== totalResults}
                        loader={<Spinner/>}
                    >
                        {<div className="row mx-1">
                            {articles.map((element) => {
                                return <div className="col-md-4 my-2" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>}
                    </InfiniteScroll>
                </div>
                {/* <div className="container d-flex justify-content-between mb-5">
                    <button disabled={page <= 1 ? true : false} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={(page + 1 > Math.ceil(totalResults / props.pageSize)) ? true : false} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
                </div> */}
            </>
        )
}

News.defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}