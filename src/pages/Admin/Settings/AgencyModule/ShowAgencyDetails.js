import React, { Component } from 'react';
import axios from 'axios'
//import swal from 'sweetalert';
import Swal from 'sweetalert2'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'

import {Link} from 'react-router-dom'
import cookie from 'js-cookie'
import { baseurl } from '../../../../Components/BaseUrl';


class ShowAgencyDetails extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            categories:[],
            agency:{},
            agent_count:0,
            total_rent:0,
            total_buy:0,
            isLoading:false
        }
    }

  

    componentDidMount(){
      
        
       this.setState({isLoading:true})
       const token = cookie.get("token")
        this.fetchData();

        let id = this.props.match.params.id;
        axios.get(baseurl+"/api/agency-agentdetails/"+id,{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
          }})
        .then(response =>{
            //console.log(response.data.total_rent[0].property_count)
         
        this.setState({agency:response.data.agency,agent_count:response.data.agents[0].agent_count,
            total_rent:response.data.total_rent[0].property_count,
            total_buy:response.data.total_buy[0].property_count
          
           })
         //this.setState({categories:response.data.categories})
        })
        .catch(e =>console.log("error"))
        

        
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



    render() {
  
        return (
            <div>
                  <div className="container-fluid">
               
        



                  <div className="col-12">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Details</h4>
        </div>
        <div className="card-body">
  <div className="table table-bordered">
      <tbody>
          
          <tr>
              <td>Agency Name</td>
              <td>{this.state.agency.name_en}</td>
              <td>Total Agents</td>
              <td>{this.state.agent_count}</td>

              <td>Total Packege</td>
              <td>{this.state.agency.totalpackage}</td>
          </tr>

    
          <tr>
              <td>Basic</td>
              <td>{this.state.agency.basic}</td>
              <td>Featured</td>
              <td>{this.state.agency.featured}</td>
              <td>Premium</td>
              <td>{this.state.agency.premium}</td>
          </tr>
    
          <tr>
              <td>Total Rent</td>
              <td>{this.state.total_rent}</td>
              <td>Total Buy</td>
              <td>{this.state.total_buy}</td>
          </tr>

       
         
      </tbody>
      
  </div>

        </div>
        </div>
        </div>

  {this.state.categories.length !=0 && !this.state.isLoading?  <div className="row">
    <div className="col-12">
      <div className="card">
      
        <div className="card-body">
          <div className="table-responsive">
              {this.state.categories.length !=0 && !this.state.isLoading?     <table id="myTable" className="display" style={{minWidth: 845}}>
              <thead>
                <tr>
                  <th>Agent Name</th>
                  <th>Property Title</th>
                  <th>Property Type</th>
                  <th>Purpose</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                  
       {this.state.categories.map((cate) =>(

                <tr>
                  <td>Mohamed osman ali</td>
                  <td>Apartment in ajman</td>
                  <td>Apartment</td>
                  <td>For Rent</td>
                  <td>In active</td>
              
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

export default ShowAgencyDetails;