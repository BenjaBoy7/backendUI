import React, { Component } from 'react'
import axios from   'axios';
import Swal from 'sweetalert2'
import { baseurl } from './BaseUrl';
import cookie from 'js-cookie'
import toast, { Toaster } from 'react-hot-toast';
import {connect} from 'react-redux'

 class Changepassword extends Component {
     constructor(props){
         super(props)
         this.state={
            oldPassword:"",
            newPassword:"",
            confirmPassword:""
         }
     }

     componentDidMount(){
        var loadScript = function(src) {
            var tag = document.createElement('script');
            tag.async = false;
            tag.src = src;
            document.getElementsByTagName('body')[0].appendChild(tag);
            }
          loadScript('./vendor/global/global.min.js')
        //     loadScript('./vendor/chart.js/Chart.bundle.min.js')
        //    loadScript('./vendor/apexchart/apexchart.js')
        //     loadScript('./vendor/peity/jquery.peity.min.js')
        //     loadScript('./js/dashboard/dashboard-1.js')
        //     loadScript('./vendor/dotted-map/js/contrib/jquery.smallipop-0.3.0.min.js')
        //    loadScript('./vendor/dotted-map/js/contrib/suntimes.js')
        //   loadScript('./vendor/dotted-map/js/contrib/color-0.4.1.js')
        //   loadScript('./vendor/dotted-map/js/world.js')
        //   loadScript('./vendor/dotted-map/js/smallimap.js')
      
            loadScript('./js/dashboard/dotted-map-init.js')
           loadScript('./js/custom.min.js')
             loadScript('./js/deznav-init.js')
         //  loadScript('./vendor/jquery-nice-select/js/jquery.nice-select.min.js')
     }

     handleOldpassword =(e) =>{
         e.preventDefault();
         this.setState({oldPassword:e.target.value})
     }
     handleNewpassword =(e) =>{
        e.preventDefault();
        this.setState({newPassword:e.target.value})
    }
    handleConfirmpassword =(e) =>{
        e.preventDefault();
        this.setState({confirmPassword:e.target.value})
    }

    handleSubmit =(e)=>{
        //e.preventDefault();
        const token = cookie.get("token")
        const data = {oldPassword:this.state.oldPassword,newPassword:this.state.newPassword,confirmPassword:this.state.confirmPassword}

        axios.post(baseurl+"/api/changePassword", data,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
        .then(response =>{
    //   console.log(response.data)
    toast.success(response.data.msg)
   
             
              this.setState({ oldPassword:'',  newPassword:'', confirmPassword:''
              })
              setTimeout(() => {
                this.handleLogout() 
 
              }, 2000);
                 
              
        })
        .catch(error => {
            console.log("error",error)
            toast.error("Something wrong.",error)
        })

    }

    handleLogout = () =>{
     //   e.preventDefault();
      
          cookie.remove("token")
          cookie.remove("role")
          cookie.remove("name")
          cookie.remove("user_id")
          cookie.remove("name_ar")
          cookie.remove("profile")
          cookie.remove("email")
          this.props.logout();
      
              
       
		// this.props.history.push('/login')

    }

    render() {
        return (
            <div className="container-fluid">
                <Toaster />
                <div className="card">
                    <div className="card-header">
                    <h1>Change Your Password</h1>
                    </div>
                    <div className="card-body">
                    <div className="mb-3">
                    <label className="form-label">Old Password</label>
                    <input type="password" class="form-control"  value={this.state.oldPassword} onChange={this.handleOldpassword}  />
                    </div>
                    <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input type="password" className="form-control"  value={this.state.newPassword} onChange={this.handleNewpassword} />
                    </div>
                    <div className="mb-3">
                    <label  className="form-label">Confirm password</label>
                    <input type="password" className="form-control"  value={this.state.confirmPassword} onChange={this.handleConfirmpassword}/>
                    </div>
                    <div className="mb-3">
                    <button type="button" className="btn btn-outline-primary" onClick={this.handleSubmit}>Save Changes</button>
                    </div>

                   
                 
                    </div>
                    </div>
            </div>
        )
    }
}

//export default Changepassword

const mapDispatchToProps = dispatch =>{
    return {
        logout: () => dispatch({type: "SET_LOGOUT"})
    }
  }
  
  export default connect(null,mapDispatchToProps)(Changepassword)
