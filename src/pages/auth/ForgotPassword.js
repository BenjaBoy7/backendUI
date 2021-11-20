import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import cookie from 'js-cookie'
import ClipLoader from "react-spinners/ClipLoader";
import i18next from 'i18next'
import axios  from 'axios';
import { baseurl } from '../../Components/BaseUrl';
const lang =localStorage.getItem("lang") || "en";
 class ForgotPassword extends Component {
    constructor(props)
    {
        super(props);
        this.state= {
            email:'',
       
            isLoading:false,
            msg:"",
            hasMessage:false,
            errormsg:"",
            hasError:false
        }
    }


    buttonRender =() => {
        if(this.state.isLoading){
            return <ClipLoader color={"blue"} loading={true}  size={30} />
        }
        return (
            <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>{lang=="en"? "Send":"ارسال"}</button>
        )
        
    }

    handleEmail = (e) =>{
        e.preventDefault()
        this.setState({email:e.target.value})
    }

    handleSubmit = () =>{
        const data = {email:this.state.email}
        this.setState({isLoading:true})
        axios.post(baseurl+"/api/reset-password-request",data)
        .then(res => {   
            this.setState({isLoading:false,hasMessage:true, msg: res.data.message,email:""})
      
    })
    .catch(error => {
       // console.log("my error",error.response.data.message)
       this.setState({isLoading:false,hasError:true, errormsg: error.response.data.message})
      })
    }

    render() {
     
     
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
                                   
                                    <h4 className="text-center mb-4">Forgot Password</h4>

                                  {this.state.hasMessage?<div className="alert alert-success">{this.state.msg}</div>
                                         :     <>{this.state.hasError?<div className="alert alert-danger">{this.state.errormsg}</div>
                                         :null}</>}

                    
                                  
                                   
                                        <div className="mb-3">
                                            <label className="mb-1"><strong>{i18next.t("email")}</strong></label>
                                            <input type="email" value={this.state.email} className="form-control" name="email" onChange={this.handleEmail}  />
                                        </div>
                                     
                                  
                                        <div className="text-center">
                                            {this.buttonRender()}
                                   
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

export default ForgotPassword
