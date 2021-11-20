import React, { Component } from 'react';
import axios from 'axios'
//import swal from 'sweetalert';
import Swal from 'sweetalert2'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import cookie from 'js-cookie'
import {Link} from 'react-router-dom'

import { baseurl } from '../../../../Components/BaseUrl';


class Categories extends Component {
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
        const token = cookie.get("token")

        axios.get(baseurl+"/api/categories",{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
        .then(response =>{
         //    console.log(response.data)
         this.setState({isLoading:false,categories:response.data.categories})
            if (this.state.categories.length == 0) {
                console.log("length = 0")
            } else {

                $(document).ready(function () {

                    $('#myTable').DataTable();

                });
                this.setState({ isLoading: false })
            }
    
      
        })
        .catch(e =>console.log("error"))

    

    }
    // handle text input from english category 
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
            e.preventDefault();
            const token = cookie.get("token")
            const data = {
                name_en:this.state.category_en,
                name_ar:this.state.category_ar
            }
            axios.post(baseurl+"/api/categories", data,{
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept':'application/json',
                  'Content-Type':'application/json'
                }})
            .then(response =>{
                
                Swal.fire({
                    title: "Done!",
                    text: "Category is added to database.",
                    icon: "success",
                    timer: 2000,
                    button: false
                  })
                  this.setState({category_ar:"",category_en:""})
                  this.fetchData();
            })
            .catch(e =>console.log("error"))
        }

        handelEdit = (cat, e) =>{
            const token = cookie.get("token")
            axios.get(baseurl+"/api/categories/"+cat,{
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept':'application/json',
                  'Content-Type':'application/json'
                }})
            .then(response =>{
             console.log(response.data)
             //this.setState({categories:response.data.categories})
            })
            .catch()
        }
        handelDelete = (cat, e) =>{
            e.preventDefault();

            const token = cookie.get("token")
          
            if(!cat || cat <1)
            {
                return
            } else {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(baseurl+"api/categories/"+cat,{
                            headers: {
                              'Authorization': `Bearer ${token}`,
                              'Accept':'application/json',
                              'Content-Type':'application/json'
                            }})
                        .then(response =>{
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                              )
                         this.fetchData();
                         //this.setState({categories:response.data.categories})
                        })
                        .catch(err => console.log(err))
                    }
                  })

           
       
        }
        }

    render() {
  
        return (
            <div>
                  <div className="container-fluid">
                  <div className="col-xl-12">
                        <div class="d-flex flex-wrap">
                            <button type="button" className="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#AddCategoryModal">+ Add Category</button>
                        </div>
                    </div>
                    {/*Modal to Add Category  */}
                    <div className="modal fade" id="AddCategoryModal" style={{display: 'none'}} aria-modal="true" >
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add Category</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal">
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="basic-form">
                                        <form>
                                            <div className="mb-3">
                                                <input type="text" name="category_en" className="form-control input-default" placeholder="Category" onChange={this.category_enHandle} value={this.state.category_en} />
                                            </div>
                                            <div className="mb-3">
                                                <input type="text" name="category_ar" class="form-control input-rounded" placeholder="Arabic Category" onChange={this.category_arHandle} value={this.state.category_ar} />
                                            </div>
                                            <div className="mb-3">
                                                <button type="submit" class="btn btn-primary me-3 mb-3" placeholder="Arabic Category" onClick={this.saveData}>Submit Category</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="modal fade" id="EditCategoryModal" style={{display: 'none'}} aria-modal="true" >
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add Category</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal">
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="basic-form">
                                        <form>
                                            <div className="mb-3">
                                                <input type="text" name="category_en" className="form-control input-default" placeholder="Category" onChange={this.category_enHandle} value={this.state.category_en} />
                                            </div>
                                            <div className="mb-3">
                                                <input type="text" name="category_ar" className="form-control input-rounded" placeholder="Arabic Category" onChange={this.category_arHandle} value={this.state.category_ar} />
                                            </div>
                                            <div className="mb-3">
                                                <button type="submit" className="btn btn-primary me-3 mb-3" placeholder="Arabic Category" onClick={this.saveData}>Submit Category</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


  {this.state.categories.length !=0 && !this.state.isLoading?  <div className="row">
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Categories</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
              {this.state.categories.length !=0 && !this.state.isLoading?     <table id="myTable" className="display" style={{minWidth: 845}}>
              <thead>
                <tr>
                  <th>English Category</th>
                  <th>Arabic Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                  
       {this.state.categories.map((cate) =>(

                <tr>
                  <td>{cate.name_en}</td>
                  <td>{cate.name_ar}</td>
              
                  <td>
                  <div className="ms-auto">
                      
                  <Link  className="btn btn-primary shadow  sharp me-1" to={"edit-categories/"+cate.id} id="EditCategoryModal"><i className="fa fa-edit"></i></Link>
				 <a  className="btn btn-danger shadow  sharp" onClick={this.handelDelete.bind(this, cate.id)}><i className="fa fa-trash" ></i></a>
						</div>														
                  </td>
               
                </tr>
                  )

                  )}
     
 
              </tbody>
           
            </table>:"no data"}
        
          </div>
        </div>
      </div>
    </div>
   
   
   
  </div>:"no data"}

</div>

        </div>
        );
    }
}

export default Categories;