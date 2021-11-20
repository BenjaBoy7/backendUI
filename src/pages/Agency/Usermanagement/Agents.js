import React, { Component } from 'react';
import axios from 'axios'
import i18next from 'i18next'
import Swal from 'sweetalert2'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import * as $ from 'jquery'
import cookie from 'js-cookie'

import {Link} from 'react-router-dom'

import { baseurl, baseurlImg } from '../../../Components/BaseUrl';


class Agents extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            agents:[],
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

        axios.get(baseurl+"/api/agents",{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
        .then(response =>{
         //    console.log(response.data)
         this.setState({isLoading:false,agents:response.data.agents})
         if (this.state.agents.length == 0) {
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
         
           
    





{!this.state.isLoading? 
 <div className="row">
<div className="col-12">
<div className="card">
  <div className="card-header">
    <h4 className="card-title">Agents</h4>
  </div>
  <div className="card-body">
    <div className="table-responsive">
        {this.state.agents.length !=0 && !this.state.isLoading?     <table id="myTable" className="display" style={{minWidth: 845}}>
        <thead>
          <tr>
          <th>{i18next.t("agentname")} </th>
            <th>{i18next.t("email")}</th>
            <th>{i18next.t("mobile")}</th>
            <th>{i18next.t("profile")}</th>
            <th>{i18next.t("status")}</th>
            <th>{i18next.t("actions")}</th>
          </tr>
        </thead>
        <tbody>
            
 {this.state.agents.map((agent) =>(

<tr>
<td>{lang == "en" ? agent.name_en : agent.name_ar}</td>
<td>{agent.email}</td>
<td>{agent.mobile}</td>
{agent.profile != "" ? <td>
    <img style={{ height: '70px', width: '70px' }} src={baseurlImg + '/public/uploads/profiles/' + agent.profile} />
</td> : <td></td>}
<td>
    {agent.active == 1 ? (<span className="badge light badge-success">Active</span>) : (<span className="badge light badge-danger">No active</span>)}
</td>
<td>
    <div className="ms-auto">

        <Link className="btn btn-sm btn-primary shadow" to={"edit-agent/" + agent.id} ><i className="fa fa-edit"></i></Link>
        <a className="btn btn-danger btn-sm shadow  " onClick={this.handelDelete.bind(this, agent.id)}><i className="fa fa-trash" ></i></a>
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

export default Agents;