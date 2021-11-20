import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { baseurl } from "./Components/BaseUrl";
import axios from "axios";
export default class Fadeslider extends Component {
  constructor(props)
  {
      super(props);
      this.state = {
          categories:[],
          category_en:"",
          category_ar:"",
          isLoading:false
      }
  }



  componentDidMount(){
    
      
     this.setState({isLoading:true})

      this.fetchData();
      

      
  }

  fetchData =() =>{
    
      this.setState({isLoading:true})


      axios.get("https://jsonplaceholder.typicode.com/todos/")
      .then(response =>{
           console.log(response.data)
       this.setState({isLoading:false,categories:response.data})
     
  
    
      })
      .catch()

  

  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };
    return (
      <div className="container">
        <h2> Single Item</h2>
        <Slider {...settings}>
        {this.state.categories.length > 0
          ? this.state.categories.map((cate) =>(
        <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
    )

    ): ""}


        </Slider>
      </div>
    );
  }
}