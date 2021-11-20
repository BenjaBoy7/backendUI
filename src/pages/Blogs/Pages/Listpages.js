import React, { Component } from 'react';
import axios from 'axios'
import i18next from 'i18next'
import Swal from 'sweetalert2'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import * as $ from 'jquery'
import cookie from 'js-cookie'

import {Link} from 'react-router-dom'

import { baseurl } from '../../../Components/BaseUrl';



class Listpages extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            pages:[],
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

        axios.get(baseurl+"/api/pages",{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
        .then(response =>{
         //    console.log(response.data)
         this.setState({isLoading:false,pages:response.data.pages})
         if (this.state.pages.length == 0) {
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
        handelDelete = (page, e) =>{
            e.preventDefault();
            const token = cookie.get("token")
            if(!page || page <1)
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
                        axios.delete(baseurl+"/api/page/"+page,{
                            headers: {
                              'Authorization': `Bearer ${token}`,
                              'Accept':'application/json',
                              'Content-Type':'application/json'
                            }})
                        .then(response =>{
                            console.log(response.data)
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
         
           
    





{this.state.pages.length !=0 && !this.state.isLoading? 
 <div className="row">
<div className="col-12">
<div className="card">
  <div className="card-header">
    <h4 className="card-title">Pages</h4>
  </div>
  <div className="card-body">
    <div className="table-responsive">
        {this.state.pages.length !=0 && !this.state.isLoading?     <table id="myTable" className="display" style={{minWidth: 845}}>
        <thead>
          <tr>
          <th>Page Name </th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            
 {this.state.pages.map((page) =>(

<tr>

<td>{page.seotitle_en}</td>
<td>
<img style={{ height: '90px', width: '120px' }} src={baseurl + '/public/uploads/pages/' + page.image} alt={page.image} />
</td>


<td>
    <div className="ms-auto">

        <Link className="btn btn-sm btn-primary shadow  " to={"edit-page/" + page.id} ><i className="fa fa-edit"></i></Link>
        <a className="btn btn-danger btn-sm shadow  " onClick={this.handelDelete.bind(this, page.id)}><i className="fa fa-trash" ></i></a>
    </div>
</td>

</tr>
            )

            )}


        </tbody>
     
      </table>:"loading"}
  
    </div>
  </div>
</div>
</div>



</div>:
      <div className="row" style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
      <div className="col-md-4"></div>

      <div className="col-md-4" style={{position: 'absolute', top: '50%',margin: '0 auto',left: '50%'}}>
      <div class="lds-ripple"><div></div><div></div></div>
      </div>

      <div className="col-md-4"></div>
  </div>


}

</div>

  </div>
        );
    }
}

export default Listpages;