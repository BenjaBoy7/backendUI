import React, { Component } from 'react';
import axios from 'axios'
//import swal from 'sweetalert';
import Swal from 'sweetalert2'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'

import {Link} from 'react-router-dom'
import cookie from 'js-cookie'

import { baseurl, baseurlImg } from '../../../../Components/BaseUrl';
const lang =localStorage.getItem("lang") || "en";

class AgencyAgents extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            agencies:[],
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

        axios.get(baseurl+"/api/agency-agents",{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
          }})
        .then(response =>{
             console.log(response.data)
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

    handelDelete = (agent, e) =>{
      e.preventDefault();
      const token = cookie.get("token")
      if(!agent || agent <1)
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
                  axios.delete(baseurl+"/api/agents/"+agent,{
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
  {this.state.agencies.length !=0 && !this.state.isLoading?  <div className="row">
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">{lang == "en"?"Companies / Agents":"الشركة / الوسيط"}</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
              {this.state.agencies.length !=0 && !this.state.isLoading?     <table id="myTable" className="display" style={{minWidth: 845}}>
              <thead>
                <tr>
                  <th>{lang=="en"?"Company Name":"اسم الشركة"}</th>
                  <th>{lang=="en"?"Logo":"الشعار"}</th>
                  <th>{lang=="en"?"Agent Name":"اسم الوسيط"}</th>
                  <th>{lang=="en"?"Mobile":"الجوال"}</th>
                  <th>{lang=="en"?" Email":"البريد الالكتروني"}</th>
                  <th>{lang=="en"?"Profile ":"الملف"}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                  
            {this.state.agencies.map((agency) =>(

                <tr>
                  <td>{lang=="en"?agency.company_name_en:agency.company_name_ar}</td>
                  <td> <img style={{ height: '70px', width: '70px' }} src={baseurlImg + '/public/uploads/profiles/' + agency.logo} /></td>
                  <td>{lang=="en"?agency.name_en:agency.name_ar}</td>
                  <td>{agency.mobile}</td>
                  <td>{agency.email}</td>
                  <td> 
                  <img style={{ height: '70px', width: '70px',borderRadius:'35px' }} src={agency.profile==undefined ? baseurlImg + "/public/uploads/profiles/no_avatar.png": baseurlImg + "/public/uploads/profiles/" + agency.profile } />
                   

                      </td>

                      <td>
                      <Link className="btn btn-sm btn-primary shadow m-2" to={"admin-edit-agent/" + agency.id}><i className="fa fa-edit"></i></Link>

                      <a className="btn btn-danger btn-sm shadow  m-2" onClick={this.handelDelete.bind(this, agency.id)}><i className="fa fa-trash" ></i></a>
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

export default AgencyAgents;