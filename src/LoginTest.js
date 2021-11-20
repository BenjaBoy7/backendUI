import React, { Component } from 'react'
import axios from 'axios'
import { baseurl } from "../../Components/BaseUrl";
import cookie from 'js-cookie'
import { connect } from 'react-redux';
import '../../pages/Admin/Settings/MyProfile'
 class LoginTest extends Component {
    constructor(props)
    {
        super(props);
        this.state= {
            fullName: '',
            email: '',
            password: '',
            loginUser: '',
            loginPass: ''
        }
    }
    handleInput = (e) =>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value})
    }
   
    fullNameChangeHandle =(e)=>{
       this.setState({fullName:e.target.value}) 
    }
    emailChangeHandle =(e)=> {
        this.setState({email:e.target.value}) 
    }
    passwordChangeHandle=(e)=>{
        this.setState({password:e.target.value}) 
    }
    
    handleReg =()=>{
        const data = {email:this.state.email,password:this.state.password, fullName: this.state.fullName}
        console.log(data)
        axios.post(baseurl+"register",data)
        .then(res =>   {
                        console.log("register", res)
        cookie.set("token",res.data.access_token);
        cookie.set("role",res.data.user.role);
        cookie.set("user_id",res.data.user.id);
        cookie.set("name",res.data.user.name);
        cookie.set("name_ar",res.data.user.name_ar);
        cookie.set("email",res.data.user.email);
        cookie.set("profile",res.data.user.profile);
        this.props.setLogin(res.data.user)
        // this.props.history.push('/myProfile')
        }
    )
        .catch()
        // e =>this.setState({errors:e.res.data})
        //this.props.history.push('/profile')
    }
    handleLogin =()=>{
        const data = {email:this.state.loginUser, password:this.state.loginPass}
        console.log("login data", data)
        axios.post(baseurl+"login",data)
        .then(res => {   
            cookie.set("token",res.data.access_token);
            cookie.set("role",res.data.user.role);
            cookie.set("user_id",res.data.user.id);
            cookie.set("name",res.data.user.name);
            cookie.set("name_ar",res.data.user.name_ar);
            cookie.set("email",res.data.user.email);
            cookie.set("profile",res.data.user.profile);
            this.props.setLogin(res.data.user)
            console.log("response login", res.data)
        })
    }
    loginUserName =(e)=>{
       this.setState({
        loginUser: e.target.value
       })
    }
    loginPassword =(e)=>{
       this.setState({
        loginPass: e.target.value
       })
    }
    handleLogout = (e) =>{
        e.preventDefault();
          cookie.remove("token")
          cookie.remove("role")
          cookie.remove("name")
          cookie.remove("name_ar")
          cookie.remove("profile")
          cookie.remove("email")
          this.props.logout();              
       
    // this.props.history.push('/login')
    }
    render() {
        return (
            <div>
                {/* Log In Modal */}
                <div className="modal fade" id="login" tabIndex={-1} role="dialog" aria-labelledby="registermodal" aria-hidden="true">
                <div className="modal-dialog modal-xl login-pop-form" role="document">
                    <div className="modal-content overli" id="registermodal">
                    <div className="modal-body p-0">
                        <div className="resp_log_wrap">
                        <div className="resp_log_thumb" style={{background: 'url(../../../frontendUI/img/register-findproperties.jpg)no-repeat'}} />
                        <div className="resp_log_caption">
                            <span className="mod-close" data-bs-dismiss="modal" aria-hidden="true"><i className="ti-close" /></span>
                            <div className="edlio_152">
                            <ul className="nav nav-pills tabs_system center" id="pills-tab" role="tablist">
                                <li className="nav-item">
                                <a className="nav-link active" id="pills-login-tab" data-bs-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true"><i className="fas fa-sign-in-alt mr-2" />Login</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link" id="pills-signup-tab" data-bs-toggle="pill" href="#pills-signup" role="tab" aria-controls="pills-signup" aria-selected="false"><i className="fas fa-user-plus mr-2" />Register</a>
                                </li>
                            </ul>
                            </div>
                            <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                                <div className="login-form">
                                <form>
                                    <div className="form-group">
                                    <label>User Name</label>
                                    <div className="input-with-icon">
                                        <input onChange= {this.loginUserName} type="text" value={this.state.loginUser} className="form-control" />
                                        <i className="ti-user" />
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <label>Password</label>
                                    <div className="input-with-icon">
                                        <input onChange= {this.loginPassword} type="password" value={this.state.loginPass} className="form-control" />
                                        <i className="ti-unlock" />
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <div className="eltio_ol9">
                                        <div className="eltio_k1">
                                        <input id="dd" className="checkbox-custom" name="dd" type="checkbox" />
                                        <label htmlFor="dd" className="checkbox-custom-label">Remember Me</label>
                                        </div>  
                                        <div className="eltio_k2">
                                        <a href="#">Lost Your Password?</a>
                                        </div>  
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <button onClick={this.handleLogin} type="button" className="btn btn-md full-width pop-login">Login</button>
                                    </div>
                                </form>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-signup" role="tabpanel" aria-labelledby="pills-signup-tab">
                                <div className="login-form">
                                <form method="post"> 
                                    <div className="form-group">
                                    <label>Full Name</label>
                                    <div className="input-with-icon">
                                        <input type="text" onChange={this.fullNameChangeHandle} className="form-control" />
                                        <i className="ti-user" />
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <label>Email ID</label>
                                    <div className="input-with-icon">
                                        <input type="email" onChange={this.emailChangeHandle} className="form-control" />
                                        <i className="ti-user" />
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <label>Password</label>
                                    <div className="input-with-icon">
                                        <input type="password"onChange={this.passwordChangeHandle} className="form-control" />
                                        <i className="ti-unlock" />
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <div className="eltio_ol9">
                                        <div className="eltio_k1">
                                        <input id="dds" className="checkbox-custom" name="dds" type="checkbox" />
                                        <label htmlFor="dds" className="checkbox-custom-label">By using the website, you accept the terms and conditions</label>
                                        </div>  
                                    </div>
                                    </div>
                                    <div className="form-group">
                                    <button type="button" onClick={this.handleReg} className="btn btn-md full-width pop-login">Register</button>
                                    </div>
                                </form>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        setLogin: (user) => dispatch({type: "SET_LOGIN",payload:user}),
        logout: () => dispatch({type: "SET_LOGOUT"})
    }
  }
  
  export default connect(null,mapDispatchToProps)(LoginTest)