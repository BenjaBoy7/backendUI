import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import cookie from 'js-cookie'
import {connect} from 'react-redux'
import i18next from 'i18next'
import { baseurl ,baseurlImg } from './BaseUrl'
import axios from 'axios'
import Pusher from 'pusher-js'
 class Profileheader extends Component {
     constructor(props){
         super(props)
         
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

    handleLogout = (e) =>{
        e.preventDefault();
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
        const lang =localStorage.getItem("lang") || "en";
        const activeUser = cookie.get("user_id");
              const name = cookie.get("name");
              const email = cookie.get("email");
              const name_ar = cookie.get("name_ar");
              const profile = cookie.get("profile");
        return (
            <div>
             <li className="nav-item dropdown header-profile">
              <Link className="nav-link" to="/logout"   onClick={this.handleLogout} role="button" data-bs-toggle="dropdown">
                <div className="header-info me-3">
                  <span className="fs-18 font-w400 text-end">{lang =="en"? name:name_ar}</span>
                  <small className="text-end fs-14 font-w400">{email}</small>
                </div>
                <img src={baseurlImg+'/public/uploads/profiles/'+profile} width="20" alt="" />
              </Link>
              <div className="dropdown-menu dropdown-menu-end">
                <Link to="/change-password" className="dropdown-item ai-icon">
                <i className="bi bi-key text-info"></i>
                   
                    <span className="ms-2">{lang=="en"?"Change Password":"تغير كلمة السر"}</span>
                </Link>
                <Link to="#" className="dropdown-item ai-icon">
                <i className="bi bi-person text-success"></i>
                  <span className="ms-2">{i18next.t("profile")} </span>
                </Link>
                <Link to="/logout"   className="dropdown-item ai-icon" onClick={this.handleLogout}>
                  <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  <span className="ms-2">{i18next.t("logout")} </span>
                </Link>

              </div>
            </li> 
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        logout: () => dispatch({type: "SET_LOGOUT"})
    }
  }
  
  export default connect(null,mapDispatchToProps)(Profileheader)