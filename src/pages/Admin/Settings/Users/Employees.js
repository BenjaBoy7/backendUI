import React, { Component } from 'react';
import axios from 'axios'
import i18next from 'i18next'
//import swal from 'sweetalert';
import Swal from 'sweetalert2'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import cookie from 'js-cookie'


import {Link} from 'react-router-dom'

import { baseurl } from '../../../../Components/BaseUrl';
//import { lang } from 'moment';


class Employees extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            employees:[]
        }
    }

    componentDidMount(){
      
     

        this.fetchData();
        

        
    }

    fetchData =() =>{
      const token = cookie.get("token")
        this.setState({isLoading:true})
        axios.get(baseurl+"/api/employees",{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
          }})
        .then(response =>{
             console.log("emp",response.data)
         this.setState({isLoading:false,employees:response.data.employees})
         if (this.state.employees.length == 0) {
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
                        axios.delete(baseurl+"/api/categories/"+cat,{
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
                  <div className="col-xl-12">
                        <div className="d-flex flex-wrap">
                            <Link to="/addemp" className="btn btn-primary mb-2" >+ {lang=="en"?" Add Employee":"اضافة موظف"}</Link>
                        </div>
                    </div>
                    {/*Modal to Add Category  */}
           


                    {this.state.employees.length !=0 && !this.state.isLoading? 
  
  <div className="row">
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">{i18next.t("employees")}</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table id="myTable" className="display" style={{minWidth: 845}}>
              <thead>
                <tr>
                  <th>{lang=="en"?"Employee Name":"اسم الموظف"} </th>
                  <th>{lang=="en"?"Employee Arabic Name ":"اسم الموظف بالعربية"}  </th>
                  <th>{lang=="en"?"Email":" البريد الالكتروني"} </th>
                  <th>{lang=="en"?"Mobile":"  الجوال"}</th>
                  <th>{lang=="en"?"Profile":"الملف "}</th>
                  <th>{lang=="en"?"Status":"الحالة"}</th>
                  <th>{lang=="en"?"Actions":"العمليات"}</th>
                </tr>
              </thead>
              <tbody>
                  
{this.state.employees.map((emp) =>(

                <tr>
                  <td>{emp.name_en}</td>
                  <td>{emp.name_ar}</td>
                  <td>{emp.email}</td>
                  <td>{emp.mobile}</td>
                  <td>
                  <img style={{ height: '70px', width: '70px' }} src={baseurl + '/uploads/profiles/' + emp.profile} />
                  </td>

                      <td>
                      {emp.active ==1? (<span className="badge light badge-success">{lang == "en"?"Active":"نشط"}</span>) :(<span className="badge light badge-danger">{lang == "en"?"No active":"غير نشط"}</span>)}
                      </td>
              
                  <td>
                  <div className="ms-auto">
                      
                  <Link  className="btn btn-primary shadow  sharp me-1" to={"edit-employee/"+emp.id} ><i className="fa fa-edit"></i></Link>
				 <a  className="btn btn-danger shadow  sharp" onClick={this.handelDelete.bind(this, emp.id)}><i className="fa fa-trash" ></i></a>
						</div>														
                  </td>
               
                </tr>
                  )

                  )}
     
 
              </tbody>
           
            </table>
          </div>
        </div>
      </div>
    </div>
   
   
   
  </div>:"loading"}
</div>

        </div>
        );
    }
}

export default Employees;