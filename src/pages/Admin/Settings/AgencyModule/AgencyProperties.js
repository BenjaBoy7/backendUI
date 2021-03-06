import React, { Component } from 'react';
import axios from 'axios'
//import swal from 'sweetalert';
import Swal from 'sweetalert2'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import cookie from 'js-cookie'
import {Link} from 'react-router-dom'

import { baseurl, baseurlImg } from '../../../../Components/BaseUrl';
const lang =localStorage.getItem("lang") || "en";

class AgencyProperties extends Component {
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

        axios.get(baseurl+"/api/agency-properties",{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
          }})
        .then(response =>{
            // console.log(response.data.agencies[0].rent)
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
  
        return (
            <div>
                  <div className="container-fluid">
            
                    {/*Modal to Add Category  */}
 



  {this.state.agencies.length !=0 && !this.state.isLoading?  <div className="row">
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Companies / Properties</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
              {this.state.agencies.length !=0 && !this.state.isLoading?     <table id="myTable" className="display" style={{minWidth: 845}}>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Logo</th>
                  <th>Basic</th>
                  <th>Featured</th>
                  <th>Premium</th>
                  <th>Mobile</th>
                  <th>For Buy</th>
                  <th>For Rent</th>
                </tr>
              </thead>
              <tbody>
                  
       {this.state.agencies.map((agency,index) =>(

                <tr>
                  <td>{lang=="en"?agency.name_en:agency.name_ar}</td>
                  <td> 
                     
                      <img style={{ height: '70px', width: '70px',borderRadius:'35px' }} src={agency.logo==undefined ? baseurlImg + "/public/uploads/profiles/no_logo.png": baseurlImg + "/public/uploads/profiles/" + agency.logo } />
                   
                      </td>
                  <td>{agency.basic}</td>
                  <td>{agency.featured}</td>
                  <td>{agency.premium}</td>
                  <td>{agency.mobile}</td>
                  <td>
                    {agency.buy.length> 0? agency.buy[0].buy_count:0}
                    </td>
                  <td>
                    {agency.rent.length > 0?agency.rent[0].rent_count:0}
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

export default AgencyProperties;