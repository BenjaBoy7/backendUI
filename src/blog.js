import React, { Component } from 'react'
import axios from 'axios'
import { baseurl } from './Components/BaseUrl'
import parse from 'html-react-parser';
 class blog extends Component {
     constructor(props){
         super(props)
         this.state = {
             blogs:[]
         }
     }
     componentDidMount(){
        axios.get(baseurl+"/api/blogs")
        .then(response =>{
            console.log(response.data)
         this.setState({isLoading:false,blogs:response.data.blogs})
      
        })
        .catch()
     }
    render() {
        return (
            <div>
                {this.state.blogs.map((blog) =>(
                    <div>
                        {parse(blog.description_en) } 
                    </div>
                        
                   

                ))}
            </div>
        )
    }
}

export default blog
