import React, { Component } from 'react'
import axios  from 'axios';
import Swal from 'sweetalert2'
import { baseurl } from '../../../../Components/BaseUrl';
import cookie from 'js-cookie'
 class EditCategory extends Component {
   constructor(props){
       super(props)
       this.state={
           category:{},
           category_en:"",
           category_ar:"",

       }
   }

   componentDidMount()
   {
       let id = this.props.match.params.id;
       const token = cookie.get("token")
       axios.get(baseurl+"/api/categories/"+id,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept':'application/json',
          'Content-Type':'application/json'
        }})
       .then(response =>{
        
        this.setState({category_en:response.data.name_en,category_ar:response.data.name_ar})
        //this.setState({categories:response.data.categories})
       })
       .catch(e =>console.log("error"))
   }

   category_enHandle = (e) =>{
    e.preventDefault();
 this.setState({category_en:e.target.value})

}

 // handle text input from english category 
 category_arHandle = (e) =>{
     e.preventDefault();
  
     this.setState({category_ar:e.target.value})

 }

   saveData =(e) =>{
    let id = this.props.match.params.id;
    e.preventDefault();
    const token = cookie.get("token")
    const data = {
        name_en:this.state.category_en,
        name_ar:this.state.category_ar
    }
    console.log(data)
    axios.put(baseurl+"/api/categories/"+id, data,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept':'application/json',
          'Content-Type':'application/json'
        }})
    .then(response =>{
        this.props.history.push("/categories")
        
        Swal.fire({
            title: "Done!",
            text: "Category successfully  Updated .",
            icon: "success",
            timer: 2000,
            button: false
          })
          this.setState({category_ar:"",category_en:""})
         
    })
    .catch(e =>console.log("error"))
}

    render() {
        return (
            <div>
            <div className="container-fluid">
             
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Edit Categories</h4>
                                </div>
                                <div className="card-body">
                                    <div className="basic-form">
                                        <form>
                                            <div className="mb-3">
                                                <input type="text" className="form-control input-default " placeholder="English Category" onChange={this.category_enHandle} defaultValue={this.state.category_en} />
                                            </div>
                                            <div className="mb-3">
                                                <input type="text" className="form-control input-rounded" placeholder="Arabic Category" onChange={this.category_arHandle} defaultValue={this.state.category_ar} />
                                            </div>

                                            <div className="mb-3">
                                            <button type="submit" className="btn btn-primary me-3 mb-3" onClick={this.saveData} >Update Category</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        )
    }
}

export default EditCategory
