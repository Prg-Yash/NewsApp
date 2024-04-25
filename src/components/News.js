import React ,{Component}from 'react'
import NewsItem from './NewsItem'
export class News extends Component {
 
  constructor(){
    super();
   this.state={
    articles:[],
    loading:false,
    page:1,
    totalResults:null
   } 
  }
 async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=us&apiKey=9807d23ac8c84e2596f2103bff404fa4&pageSize=20"
    let data= await fetch(url)
    let parsedData= await data.json();
    this.setState({articles:parsedData.articles, totalResults:parsedData.totalResults})
  }
  onPreviousHandler=async()=>{

    let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=9807d23ac8c84e2596f2103bff404fa4&page=${this.state.page-1}&pageSize=20`
    let data= await fetch(url)
    let parsedData= await data.json();
   
    this.setState({page:this.state.page-1, articles:parsedData.articles})
  }
 onNextHandler=async()=>{
   let url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=9807d23ac8c84e2596f2103bff404fa4&page=${this.state.page+1}&pageSize=20`
   let data= await fetch(url)
   let parsedData= await data.json();
   
   this.setState({page:this.state.page+1,
     articles:parsedData.articles})

  
  }
  render() {

    return (

      <div className='container '>
         <h2>Top News headlines</h2>
         <div className='row'>
          {(this.state.articles.map((element)=>{
       return(<div className='col-md-3' key={element.url}>
       <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,93):""}  imgUrl={element.urlToImage} url={element.url}/>
       </div>)
          }))}
            
          
            
         </div>
        
        <div className='container d-flex justify-content-between my-4'>
          <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.onPreviousHandler}>&larr;Previous</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)}type="button" className="btn btn-primary" onClick={this.onNextHandler}>Next&rarr;</button>
          </div>
      </div>
    )
  }
}

export default News
