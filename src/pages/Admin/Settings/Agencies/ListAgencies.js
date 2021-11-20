import React, { Component } from 'react';
import axios from 'axios'
import i18next from 'i18next'
//import swal from 'sweetalert';
import Swal from 'sweetalert2'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'

import {Link} from 'react-router-dom'
import cookie from 'js-cookie'

import { baseurl, baseurlImg } from '../../../../Components/BaseUrl';


class ListAgencies extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            agencies:[]
        }
    }

    componentDidMount(){
        this.fetchData();  
    }

    fetchData =() =>{
      const token = cookie.get("token")
        this.setState({isLoading:true})
        axios.get(baseurl+"/api/agencies",{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
          }})
        .then(response =>{
          console.log("agencies",response.data)
         this.setState({isLoading:false,agencies:response.data.agencies})
         if (this.state.agencies.length == 0) {
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


    


        handelDelete = (agency, e) =>{
            e.preventDefault();

      
            const token = cookie.get("token")

            if(!agency || agency <1)
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
                        axios.delete(baseurl+"/api/agency/"+agency,{
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
                  <div className="d-flex flex-wrap">
                  <Link to="/add-agency" className="btn btn-primary mb-2" >+ {i18next.t("addagency")} </Link>                  </div>
              </div>
            

              {/* row */}
              {this.state.agencies.length !=0 && !this.state.isLoading?
              <div className="row">
                  <div className="col-12">
                      <div className="card">
                          <div className="card-header">
                              <h4 className="card-title">{i18next.t("agencies")}</h4>
                          </div>
                          <div className="card-body">
                              <div className="table-responsive">
                              { !this.state.isLoading? 
                                  <table id="myTable" className="display" style={{ minWidth: 845 }}>
                                      <thead>
                                          <tr>
                                          <th> {i18next.t("name")} </th>
                                          <th> {i18next.t("arabicname")}</th>
                                          <th>{i18next.t("email")}</th>
                                          <th>{i18next.t("mobile")}</th>
                                          <th>{i18next.t("totalpackages")} </th>
                                          <th>{i18next.t("logo")}</th>
                                          <th>{i18next.t("status")}</th>
                                          <th>{i18next.t("actions")}</th>
                                         
                                          </tr>
                                      </thead>
                                      <tbody>
                                             {this.state.agencies.length> 0 && this.state.agencies.map((agency) =>(

                                          <tr>
                                            <td>{agency.name_en}</td>
                                            <td>{agency.name_ar}</td>
                                            <td>{agency.email}</td>
                                            <td>{agency.mobile}</td>
                                            <td>{agency.totalpackage}</td>
                                            <td>
                                            <img style={{ height: '70px', width: '70px',borderRadius:'35px' }} src={agency.logo==undefined ? baseurlImg + "/public/uploads/profiles/no_logo.png": baseurlImg + "/public/uploads/profiles/" + agency.logo } />
                                            
                                            </td>

                                                <td>
                                                {agency.active ==1? (<span className="badge light badge-success">{i18next.t("active")} </span>) :(<span className="badge light badge-danger">{i18next.t("inactive")} </span>)}
                                                </td>

                                            <td>
                                            <div className="ms-auto">
                                            {/* <Link  className="btn btn-sm btn-success shadow  " to={"show-agency/"+agency.id} ><i className="fa fa-eye"></i></Link> */}
                                            <Link  className="btn btn-sm btn-primary shadow  " to={"edit-agency/"+agency.id} ><i className="fa fa-edit"></i></Link>
                                          <a  className="btn btn-sm btn-danger shadow  " onClick={this.handelDelete.bind(this, agency.id)}><i className="fa fa-trash" ></i></a>
                                                  </div>                                                      
                                            </td>

                                          </tr>
  )

                                              )}
                                      </tbody>

                                  </table> :"nodata"}
                              </div>
                          </div>
                      </div>
                  </div>



              </div>:""}
          </div>

      </div>
        );
    }
}

export default ListAgencies;