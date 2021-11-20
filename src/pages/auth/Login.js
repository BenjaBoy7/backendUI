import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import cookie from 'js-cookie'
import ClipLoader from "react-spinners/ClipLoader";
import i18next from 'i18next'
import { baseurl } from '../../Components/BaseUrl';
import { Link } from 'react-router-dom';
export class Login extends Component {
    constructor(props)
    {
        super(props);
        this.state= {
            email:'',
            password: '',
            errors:{},
            isLoading:false
        }
    }

    handleInput = (e) =>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value})

    }
    handleForm = (e) =>{
        e.preventDefault();
        const data = {email:this.state.email,password:this.state.password}
        this.setState({isLoading:true})
        axios.post(baseurl+"/api/auth/login",data)
        .then(res => {   
        cookie.set("token",res.data.access_token);
        cookie.set("role",res.data.user.role);
        cookie.set("user_id",res.data.user.id);
        cookie.set("name",res.data.user.name);
        cookie.set("name_ar",res.data.user.name_ar);
        cookie.set("email",res.data.user.email);
        cookie.set("profile",res.data.user.profile);
        this.props.setLogin(res.data.user)
        this.setState({isLoading:false})
        this.props.history.push('/dashboard')
    })
    .catch(error => {
        if (!error.response) {
            // network error
            this.setState({errors:JSON.stringify({"errors":"Error: Network Error"}),isLoading:false})
        } else {
            this.setState({errors:error.response.data,isLoading:false})
        }
      })
        
    }

    buttonRender =() => {
        if(this.state.isLoading){
            return <ClipLoader color={"blue"} loading={true}  size={30} />
        }
        return (
            <button type="submit" className="btn btn-primary btn-block">{i18next.t("signin")}</button>
        )
        
    }
    render() {
        const error= this.state.errors
        const lang =localStorage.getItem("lang") || "en";
        return (
            <div dir={lang =="ar"?"rtl":"ltr"}>
            <body className="vh-100">
    <div className="authincation h-100">
        <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
                <div className="col-md-6">
                    <div className="authincation-content">
                        <div className="row no-gutters">
                            <div className="col-xl-12">
                                <div className="auth-form">
									<div className="text-center mb-3">
										{/* <Link to="/login"><img src="images/logo-full.png" alt="" /></Link> */}
                                        <Link to="/login"><img src="images/conpanylogo/findproperties.png" style={{height:'100px'}} alt="Findproperties" /></Link>
									</div>
                                   
                                    <h4 className="text-center mb-4">{i18next.t("signintitle")}</h4>
                                    <h5 className="text-center mb-4"> {error ? <p className="text-red">{error.errors}</p> :("")}</h5>
                                   
                                    <form onSubmit={this.handleForm}>
                                        <div className="mb-3">
                                            <label className="mb-1"><strong>{i18next.t("email")}</strong></label>
                                            <input type="email" className="form-control" name="email"  onChange={this.handleInput} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="mb-1"><strong>{i18next.t("password")}</strong></label>
                                            <input type="password" className="form-control" name="password"  onChange={this.handleInput} />
                                        </div>
                                        <div className="row d-flex justify-content-between mt-4 mb-2">
                                            <div className="mb-3">
                                               <div className="form-check custom-checkbox ms-1">
													<input type="checkbox" className="form-check-input" id="basic_checkbox_1" style={{float:lang=="en"?'left':'right',marginLeft: '-1.5em'}} />
													<label className="form-check-label" for="basic_checkbox_1" style={{marginRight: '2.3125rem',marginTop: '0.1875rem'}}> {i18next.t("remember")} </label>
												</div>
                                            </div>
                                            <div className="mb-3">
                                                <Link to="/forgot-password">{i18next.t("forgetpassword")}</Link>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            {this.buttonRender()}
                                   
                                        </div>      
                                    </form>
                                    <div className="new-account mt-3">
                                        <p>{i18next.t("faceproblem")} <Link className="text-primary" to="/tech-support">{i18next.t("technicalsupport")}</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


   
    
	
</body>
        </div>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        setLogin: (user) => dispatch({type: "SET_LOGIN",payload:user})
    }
  }
  
  export default connect(null,mapDispatchToProps)(Login)