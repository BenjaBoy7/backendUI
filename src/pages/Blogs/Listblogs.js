import React, { Component } from 'react';
import axios from 'axios'
import i18next from 'i18next'
import Swal from 'sweetalert2'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import * as $ from 'jquery'
import cookie from 'js-cookie'

import {Link} from 'react-router-dom'

import { baseurl } from '../../Components/BaseUrl';



class Listblogs extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            blogs:[],
            isLoading:false
        }
    }



    componentDidMount(){
        setTimeout(() => {
            this.fetchData();

        }, 500);
        
    }
 
    fetchData =() =>{
      
        this.setState({isLoading:true})
        const token = cookie.get("token")

        axios.get(baseurl+"/api/blogs",{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
        .then(response =>{
         //    console.log(response.data)
         this.setState({isLoading:false,blogs:response.data.blogs})
         if (this.state.blogs.length == 0) {
            console.log("length = 0")
        } else {

            $(document).ready(function () {

                $('#myTable').DataTable();

            });
            this.setState({ isLoading: false })
        }
        })
        .catch(err =>console.log("error"))
    }
        handelDelete = (blog, e) =>{
            e.preventDefault();
            const token = cookie.get("token")
            if(!blog || blog <1)
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
                        axios.delete(baseurl+"/api/blog/"+blog,{
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
        const lang =localStorage.getItem("lang") || "en";
        return (
            <div> 
            <div className="container-fluid">
         
           
    






 <div className="row">
<div className="col-12">
<div className="card">
  <div className="card-header">
    <h4 className="card-title">Blogs</h4>
  </div>
  <div className="card-body">
    <div className="table-responsive">
       <table id="myTable" className="display" style={{minWidth: 845}}>
        <thead>
          <tr>
          <th>Title </th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!this.state.isLoading? <>
          {this.state.blogs.length > 0 ? <>
            { this.state.blogs.map((blog) =>(

              <tr>

              <td>{blog.title_en}</td>
              <td>
              <img style={{ height: '90px', width: '120px' }} src={baseurl + '/public/uploads/blogs/' + blog.image} />
              </td>


              <td>
                  <div className="ms-auto">

                      <Link className="btn btn-sm btn-primary shadow  " to={"edit-blog/" + blog.id} ><i className="fa fa-edit"></i></Link>
                      <a className="btn btn-danger btn-sm shadow  " onClick={this.handelDelete.bind(this, blog.id)}><i className="fa fa-trash" ></i></a>
                  </div>
              </td>

              </tr>
                          )

                          )}
          </>:
          <tr>
          <td className="mt-5">
           no posts
          </td>
          </tr>
          }

          </>:   
          <tr>
            <td>
        </td>
          </tr>
  }
            



        </tbody>
     
      </table>
  
    </div>
  </div>
</div>
</div>



</div>
   




</div>

  </div>
        );
    }
}

export default Listblogs;