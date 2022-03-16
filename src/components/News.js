import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: 'in',
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string
    }
    constructor()
    {
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1,
            totalResults:0
        }
    }

    async componentDidMount()
    {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ddc051121a8b42b3b984371a90aa1372`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({articles: parsedData.articles})
    }
    handlePrevClick = async ()=>{

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ddc051121a8b42b3b984371a90aa1372&page=${this.state.page - 1}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
       
        
        this.setState({
            page: this.state.page -1,
            articles: parsedData.articles
        })

    }
    handleNextClick = async ()=>{

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ddc051121a8b42b3b984371a90aa1372&page=${this.state.page + 1}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
       
        
        this.setState({
            page: this.state.page +1,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults
        })
    }
    fetchMoreData = async() => {
        this.setState({page: this.state.page +1});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ddc051121a8b42b3b984371a90aa1372&page=${this.state.page + 1}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
      };
    render() {
        return (
            <div className="container my-3 text-center" >
            <h2 style={{margin: '35px 0px'}}>NewShots - Top Headlines </h2>
            
            <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          
        ></InfiniteScroll>
            <div className="row">
            
            {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage?element.urlToImage:"https://www.euractiv.com/wp-content/uploads/sites/2/2014/03/news-default.jpeg"} newsUrl={element.url} />
                </div>
            })}  

            </div>
            <div>
                <div className="container my-4"></div>
            </div>
            
        </div>
        )
    }
    }

export default News