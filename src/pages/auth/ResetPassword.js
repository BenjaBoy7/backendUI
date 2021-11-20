import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import cookie from 'js-cookie'
import ClipLoader from "react-spinners/ClipLoader";
import i18next from 'i18next'
import { baseurl } from '../../Components/BaseUrl';
import { Link } from 'react-router-dom';

const lang =localStorage.getItem("lang") || "en";
export class ResetPassword extends Component {
    constructor(props)
    {
        super(props);
        this.state= {
            email:'',
            password: '',
            password_confirmation: '',
            errors:{},
            isLoading:false,
            msg:"",
            success:false,
            hasError:false
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
        if(this.state.email=="" || this.state.password=="" || this.state.password_confirmation == ""){
            return
        }
        const data = {email:this.state.email,password:this.state.password,password_confirmation:this.state.password_confirmation,token:this.props.match.params.id}
     //   console.log("data is",data)
      //  this.setState({isLoading:true})
        axios.post(baseurl+"/api/change-password",data)
        .then(res => {   
           console.log("after update",res.data)
        this.setState({isLoading:false,email:"",password:"",password_confirmation:"",success:res.data.success,hasError:res.data.hasError,msg:res.data.msg})
    })
    .catch(error => {
          this.setState({isLoading:false})
      })
        
    }

    buttonRender =() => {
        if(this.state.isLoading){
            return <ClipLoader color={"blue"} loading={true}  size={30} />
        }
        return (
            <button type="submit" className="btn btn-primary btn-block">{lang=="en"?"Update password":"تعديل كلمة المرور"}</button>
        )
        
    }
    render() {
        const error= this.state.errors
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
                                        <Link to="/"><img src="/images/conpanylogo/findproperties.png" style={{height:'100px'}} alt="Findproperties" /></Link>
									</div>
                                   
                                    <h4 className="text-center mb-4">{lang=="en"?"Update password":"اعادة تعين كلمة السر"}</h4>

                                    
                                  {this.state.success?<div className="alert alert-success">{this.state.msg}</div>:null}

                                  {this.state.hasError?<div className="alert alert-danger">{this.state.msg}</div>:null}


                                    <h5 className="text-center mb-4"> {error ? <p className="text-red">{error.errors}</p> :("")}</h5>
                                   
                                    <form onSubmit={this.handleForm}>
                                        <div className="mb-3">
                                            <label className="mb-1"><strong>{i18next.t("email")}</strong></label>
                                            <input type="email" value={this.state.email} className="form-control" name="email"  onChange={this.handleInput}  required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="mb-1"><strong>{i18next.t("password")}</strong></label>
                                            <input type="password" value={this.state.password} className="form-control" name="password"  onChange={this.handleInput} required />
                                        </div>
                                        <div className="mb-3">
                                            <label className="mb-1"><strong>{lang=="en"?"Password confirmation":"تاكيد كلمة السر"}</strong></label>
                                            <input type="password" value={this.state.password_confirmation} className="form-control" name="password_confirmation"  onChange={this.handleInput} required />
                                        </div>
                                    
                                        <div className="text-center">
                                            {this.buttonRender()}
                                   
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


   
    
	
</body>
        </div>
        )
    }
}


  
  export default ResetPassword