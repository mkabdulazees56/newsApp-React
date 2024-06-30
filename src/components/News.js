import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes, { } from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        setloading(true);
        let data = await fetch(url);
        let parsedData = await data.json()
        props.setProgress(70);
        setarticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setloading(false);
        props.setProgress(100);

    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsFeeder`;
        updateNews();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        setpage(page + 1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        setarticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults)

    };

    return (
        <div className="container my-3">
            <h1 style={({ fontSize: '40px' })} className='text-center pt-5'>NewsFeeder - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner />}

            {articles.length !== 0 && (
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={articles.length < totalResults && <Spinner />}
                >
                    <div className="row">
                        {articles.map((element, index) => {
                            return (
                                <div className="col-md-3" key={`${index}-${element.url}`}>
                                    <NewsItem
                                        title={element.title ? element.title.slice(0, 45) : ""}
                                        description={element.description ? element.description.slice(0, 90) : ""}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </InfiniteScroll>
            )}

        </div>
    )
}

News.defaultProps = {
    country: 'us',
    pageSize: 20,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News


