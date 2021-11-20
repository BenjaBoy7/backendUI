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

class AgencyAgentsAndProperties extends Component {
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

        axios.get(baseurl+"/api/agency-agency",{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
          }})
        .then(response =>{
             console.log(response.data.agencies)
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


    render() {
      const lang =localStorage.getItem("lang") || "en";

  
        return (
            <div>
                  <div className="container-fluid">
            
                    {/*Modal to Add Category  */}
 



  {this.state.agencies.length !=0 && !this.state.isLoading?  <div className="row">
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">{lang == "en"?"Companies":"الشركات"}</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
              {this.state.agencies.length !=0 && !this.state.isLoading?     <table id="myTable" className="display" style={{minWidth: 845}}>
              <thead>
                <tr>
                  <th> {lang == "en"?"Company Name":"اسم الشركة"}</th>
                  <th>{lang == "en"?"Logo":"شعار"}</th>
                  <th>{lang == "en"?"Mobile":"الجوال"}</th>
                  <th>{lang == "en"?"Email":"البريد الالكتروني"}</th>
                  <th>{lang == "en"?"Number of Agents":"عدد الوسطاء"}</th>
                  <th>{lang == "en"?"Number of Propterties":"عدد العقارات"}</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody>
                  
       {this.state.agencies.map((agency,index) =>(

                <tr>
                  <td>{lang=="en"?agency.name_en:agency.name_ar}</td>
                  <td> 
                     
                      <img style={{ height: '70px', width: '70px',borderRadius:'35px' }} src={agency.logo==undefined ? baseurlImg + "/public/uploads/profiles/no_logo.png": baseurlImg + "/public/uploads/profiles/" + agency.logo } />
                   
                      </td>
               
                  <td>{agency.mobile}</td>
                  <td>{agency.email}</td>
                  <td>{agency.agent.length> 0 && agency.agent[0].agent_count}</td>
                  <td>{agency.property.length> 0 &&agency.property[0].property_count}</td>
                  {/* <td>
                  <Link  className="btn btn-sm btn-success shadow  " to={"show-agency-details/"+agency.id} ><i className="fa fa-eye"></i></Link>
                  </td> */}
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

export default AgencyAgentsAndProperties;