import React, { Component } from 'react'
import i18next from 'i18next'
//import { Multiselect } from 'multiselect-react-dropdown';
import MultiSelect from "react-multi-select-component";
import axios from   'axios';
import Swal from 'sweetalert2'
import { baseurl } from '../../../Components/BaseUrl';
import $ from 'jquery'
import Helmet from 'react-helmet'
import cookie from 'js-cookie'
import toast, { Toaster } from 'react-hot-toast';

const lang =localStorage.getItem("lang") || "en";

 class AddNewUser extends Component {
     constructor(props){
         super(props)
         this.state={
             name:"",
             name_ar:"",
             email:"",
             password:"",
             password_confirmation:"",
             mobile:"",
             land:"",
             whatsapp:"",
             gender:"",
             nationality:"",
             nationalityerror:false,
             experience:"",
             specialist:"",
             specialityarea:"",
             facebook:"",
             twitter:"",
             instegram:"",
             linkedin:"",
             image:null,
             imageShow:null,
             qouta:"",
             languages: [],
             countries:[],
             specialists:[],
             selected:[],
             selectedspecialists:[],
             emirates:[],
             address:0,
             input: {},
             errors: {},
             availablepackage:0


         }
     }

   
     componentDidMount(){
        const lang =localStorage.getItem("lang") || "en";
        const token = cookie.get("token")
        axios.get(baseurl+"/api/languages",{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
        .then(response =>{
           if(lang =="en"){
            this.setState({languages:response.data.languages_en})
           }else{
            this.setState({languages:response.data.languages_ar})
           }
        })
        .catch(e =>console.log("error"))
        axios.get(baseurl+"/api/countries",{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
        .then(response =>{
         this.setState({countries:response.data.countries})
        })
        .catch()
        axios.get(baseurl+"/api/specialist",{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
        .then(response =>{
            if(lang =="en"){
                this.setState({specialists:response.data.specialists_en})
               }else{
                this.setState({specialists:response.data.specialists_ar})
               }
        })
        .catch(e =>console.log("error"))
        axios.get(baseurl+"/api/cities",{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
        .then(response =>{
           // console.log("emirates",response.data.emirates)
         this.setState({emirates:response.data.emirates})
   
        })
        .catch(err =>console.log("error"))

        axios.get(baseurl+"/api/agencyavailablepackage",{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
        .then(response =>{
        this.setState({availablepackage:response.data.remainpackage})
   
        })
        .catch(err =>console.log("error"))
     }
    handleName = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({name:e.target.value,input})
    }
    handleName_ar = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({name_ar:e.target.value,input})
    }
    handleEmail = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({email:e.target.value,input})
    }
    handleMobile = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({mobile:e.target.value,input})
    }
    handlePassword = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({password:e.target.value,input})
    }
    handlePasswordConfirmation = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({password_confirmation:e.target.value,input})
    }
    handleWhatsapp = (e) =>{
        e.preventDefault();
        this.setState({whatsapp:e.target.value})
    }
    handleLanding = (e) =>{
        e.preventDefault();
        this.setState({land:e.target.value,})
    }
    handleGender = (e) =>{
        e.preventDefault();
        this.setState({gender:e.target.value})
    }
    handleAddress = (e) =>{
        e.preventDefault();
        this.setState({address:e.target.value})
    }
    handleNationality = (e) =>{
        e.preventDefault();
                if(e.target.value>0){
                    this.setState({nationalityerror:false})
                }
        this.setState({nationality:e.target.value})
        
    }
    handleExperience = (e) =>{
        e.preventDefault();
        this.setState({experience:e.target.value})
    }
    handleSpecialist = (e) =>{
        e.preventDefault();
        this.setState({specialist:e.target.value})
    }
 
    handleLanguages = (e) =>{
        e.preventDefault();
        this.setState({languages:e.target.value})
    }
    handleFacebook = (e) =>{
        e.preventDefault();
        this.setState({facebook:e.target.value})
    }
    handleTwitter = (e) =>{
        e.preventDefault();
        this.setState({twitter:e.target.value})
    }
    handleInstegram = (e) =>{
        e.preventDefault();
        this.setState({instegram:e.target.value})
    }
    handleLinkedin = (e) =>{
        e.preventDefault();
        this.setState({linkedin:e.target.value})
    }
    handleUpload = (e) =>{
        e.preventDefault();
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);
        this.setState({imageShow:URL.createObjectURL(e.target.files[0])})
    }
    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({
            image: e.target.result
          })
        };
        reader.readAsDataURL(file);
      }

    handleQouta = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({qouta:e.target.value,input})
    }

    setSelected = (e) =>{
        console.log("it is selected",e)
        this.setState({selected:e})
    }
    setSelectedSpecialist = (e) =>{
        
        this.setState({selectedspecialists:e})
    }

    saveData = (e) =>{
                e.preventDefault();
                const token = cookie.get("token")
                if (this.state.availablepackage < this.state.qouta ){
                  lang=="en"?  toast.error("No qouta available. you have"+this.state.availablepackage) : toast.error("لاتوجد كوتة متوفر . فقط متوفر "+this.state.availablepackage)
                    return
                }

                const data = {
                name:this.state.name, name_ar:this.state.name_ar, email:this.state.email,
                mobile:this.state.mobile, password:this.state.password, password_confirmation:this.state.password_confirmation,
                land:this.state.land,whatsapp:this.state.whatsapp,active:this.state.checked ==true?1:0,
                gender:this.state.gender, nationality:this.state.nationality, experience:this.state.experience,
                specialist:this.state.specialist, 
                facebook:this.state.facebook, twitter:this.state.twitter, instegram:this.state.instegram, linkedin:this.state.linkedin,
                qouta:this.state.qouta,selected:this.state.selected,selectedspecialists:this.state.selectedspecialists,image:this.state.image
                }
             if(this.validate()){
             axios.post(baseurl+"/api/agents", data,{
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept':'application/json',
                  'Content-Type':'application/json'
                }})
             .then(response =>{
              // console.log("agent data",response.data)
               let input = {};
               input["name"] = "";
               input["name_ar"] = "";
               input["email"] = "";
               input["password"] = "";
               input["password_confirmation"] = "";
               input["qouta"] = "";
               this.setState({input:input});
                Swal.fire({
                    title: "Done!",
                    text: "Category is added to database.",
                    icon: "success",
                    timer: 2000,
                    button: false
                  })
                  this.props.history.push("/agents")
                  
            })
            .catch(err =>console.log("error"))
        }

    
    }

        validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;    
        if (!input["name"]) {
          isValid = false;
          errors["name"] = "Please enter  name.";
          }
         
         if (!input["email"]) {
          isValid = false;
          errors["email"] = "Please enter your email Address.";
         }
        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
          }
          if (!input["password_confirmation"]) {
            isValid = false;
            errors["password_confirmation"] = "Please enter your password confirmation.";
          }

          if (input["password_confirmation"] != input["password"]) {
            isValid = false;
            errors["password_confirmation"] = "password confirmation not match.";
          }

          if (input["password_confirmation"] != input["password"]) {
            isValid = false;
            errors["password_confirmation"] = "password confirmation not match.";
          }

          if (!input["mobile"]) {
            isValid = false;
            errors["mobile"] = "Please enter your mobile .";
          }

          if (typeof input["mobile"] !== "undefined") {
            
            var pattern = new RegExp(/^\d{12,12}$/);
            if (!pattern.test(input["mobile"])) {
              isValid = false;
              errors["mobile"] = "Please use the correct format, add 971 before your number";
            }
          }


          if (!input["qouta"]) {
            isValid = false;
            errors["qouta"] = "Quota required";
          }

          if (this.state.nationality < 1) {
         
            //isValid = false;
            this.setState({nationalityerror:true})
            isValid =false
          //  nationalityerror:"nationality required"
           // errors["nationality"] = "nationality required";
          }

        if (typeof input["email"] !== "undefined") {
            
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(input["email"])) {
            isValid = false;
            errors["email"] = "Please enter valid email address.";
          }
        }
    
   
    
        this.setState({
          errors: errors
        });
    
        return isValid;
    }
 
    render() {
    
        
        return (
            <div className="container-fluid" >
            <Toaster />   
                <div className="row">
                <div className="col-xl-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">{i18next.t("accountinformation")}</h4>
                            </div>
                            <div className="card-body">
                                <div className="basic-form">
                                    <form >
                                        <div className="row">
                                        <div className="mb-3">
                                            <input type="text"  name="name" className="form-control input-default " placeholder={i18next.t("name")} onChange={this.handleName} />
                                            <div className="text-danger">{this.state.errors.name}</div>
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" name="name_ar" className="form-control input-rounded" placeholder={i18next.t("arabicname")} onChange={this.handleName_ar} />
                                            <div className="text-danger">{this.state.errors.name_ar}</div>
                                        </div>
                                        <div className="mb-3">
                                            <input type="email" name="email" className="form-control input-default " placeholder={i18next.t("email")} onChange={this.handleEmail}/>
                                            <div className="text-danger">{this.state.errors.email}</div>
                                        </div>
                                        <div className="mb-3">
                                            <input type="password" name="password" className="form-control input-default " placeholder={i18next.t("password")} onChange={this.handlePassword}/>
                                            <div className="text-danger">{this.state.errors.password}</div>
                                            <div className="text-danger">{this.state.errors.password_confirmation}</div>
                                        </div>
                                        <div className="mb-3">
                                            <input type="password" name="password_confirmation" className="form-control input-rounded" placeholder={i18next.t("passwordconfirmation")} onChange={this.handlePasswordConfirmation} />
                                        </div>

                                        <div className="mb-3">
                                            <input type="text" name="mobile" className="form-control input-default "  placeholder="9715XXXXXXXX" onChange={this.handleMobile} required />
                                            <div className="text-danger">{this.state.errors.mobile}</div>
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" name="land" className="form-control input-rounded" placeholder={i18next.t("landing")} onChange={this.handleLanding} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" name="whatsapp" className="form-control input-default " placeholder={i18next.t("whatsapp")} onChange={this.handleWhatsapp} />
                                        </div>
                                        <h3>{i18next.t("agentprofiledetails")}</h3>
                                        <hr />
                                        <div className="mb-3">
                                        <select className="default-select form-control wide mb-3" onChange={this.handleGender}>
											<option>{i18next.t("gender")}</option>
											<option value="1">
                                            {i18next.t("male")}
                                                </option>
											<option value="2">
                                            {i18next.t("female")}
                                                </option>
										</select>
                                        </div>
                                   
                                        <div className="mb-3">
                                        <select className="default-select form-control wide mb-3" onChange={this.handleNationality}>
											<option>{i18next.t("nationality")}</option>
                                            {this.state.countries.map((country) =>(
                                                <option value={country.id}>{lang =="en"? country.country_enNationality:country.country_arNationality}</option>
                                            ))}
                                         
										</select>
                                        {this.state.nationalityerror?   <div className="text-danger">nationality required</div>:null}

                                        </div>

                                        <div className="mb-3">
                                            <input type="text" name="experience"  className="form-control input-default"  placeholder={i18next.t("experience")} onChange={this.handleExperience} />
                                        </div>
                                        <div className="mb-3">
                                            <label>{i18next.t("specialist")}</label>
                                            
                                        <MultiSelect
                                            options={this.state.specialists}
                                            value={this.state.selectedspecialists}
                                            onChange={this.setSelectedSpecialist}
                                            labelledBy={"Select"}
                                        />
                                          </div>
                                     
                                        <div className="mb-3">
                                        <label>{i18next.t("languages")}</label>
                                        <MultiSelect
                                            options={this.state.languages}
                                            value={this.state.selected}
                                            onChange={this.setSelected}
                                            labelledBy={"Select"}
                                        />
                                          </div>
                                        </div>

                                        <div className="row">
                                        <div className="col-md-3">
                                            <input type="text" name="facebook" className="form-control input-default " placeholder={i18next.t("facebook")} onChange={this.handleFacebook} />
                                            <div className="text-danger">{this.state.errors.facebook}</div>
                                            </div>
                                            <div className="col-md-3">
                                            <input type="text" name="twitter" className="form-control input-default " placeholder={i18next.t("twitter")} onChange={this.handleTwitter}/>
                                            <div className="text-danger">{this.state.errors.twitter}</div>
                                            </div>
                                            <div className="col-md-3">
                                            <input type="text" name="instegram" className="form-control input-default " placeholder={i18next.t("instegram")} onChange={this.handleInstegram} />
                                            <div className="text-danger">{this.state.errors.instegram}</div>
                                            </div>
                                            <div className="col-md-3">
                                            <input type="text" name="linkedin" className="form-control input-default " placeholder={i18next.t("linkedin")} onChange={this.handleLinkedin} />
                                            <div className="text-danger">{this.state.errors.linkedin}</div>
                                            </div>
                                      

                                        </div>
                                        <div className="row mt-3">
                                            {this.state.image!=null? <img src={this.state.imageShow} style={{width:'80px',height:'80px',borderRadius:'35px'}}/>:null}
                                           
                                            
                                        <div className="input-group mb-3">
											<span className="input-group-text">{i18next.t("upload")}</span>
                                            <div className="form-file">
                                                <input type="file" className="form-file-input form-control"  onChange={this.handleUpload} />
                                            </div>
                                        </div>
                                        </div>
                                      

                                        <div className="row mt-3">
                                        <div className="col-md-12">
                                        <h3>{i18next.t("asignlistingquotainfo")}</h3>
                                        <hr />
                                        <div className="mb-3">
                                            <input type="number" name="qouta" className="form-control input-default"  placeholder={i18next.t("asignlistingquota")} onChange={this.handleQouta} />
                                            <div className="text-danger">{this.state.errors.qouta}</div>
                                        </div>
                                        </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-md-4">
                                            <button type="submit" className="btn btn-primary" onClick={this.saveData}>{i18next.t("submit")}</button>
                                            </div>
                                        </div>

                                  
                                        
                                    </form>
                                </div>

                            </div>
                        </div>
					</div>
                </div>
            </div>
        )
    }
}

export default AddNewUser
