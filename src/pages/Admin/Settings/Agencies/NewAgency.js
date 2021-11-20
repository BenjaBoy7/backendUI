import React, { Component } from 'react'
import i18next from 'i18next'
//import { Multiselect } from 'multiselect-react-dropdown';
import MultiSelect from "react-multi-select-component";
import axios from   'axios';
import Swal from 'sweetalert2'
import { baseurl } from '../../../../Components/BaseUrl';
import ClipLoader from "react-spinners/ClipLoader";
import cookie from 'js-cookie'
 class NewAgency extends Component {
     constructor(props){
         super(props)
         this.state={
             roles:[],
             name:"",
             name_ar:"",
             email:"",
             password:"",
             password_confirmation:"",
             mobile:"",


             tradelicense:"",
             paytype:0,
             totalpackage:0,
             basic:0,
             featured:0,
             premium:0,

             image:null,
             imageShow:null,
             selected:[],
             input: {},
             errors: {},
             isLoading:false,
             newerrors:{},
             checked:false,
             emirates:[],
             address:0,
             agency_summary_en:"",
             agency_summary_ar:""


         }
     }

     componentDidMount(){
        const token = cookie.get("token")

        axios.get(baseurl+"/api/roles",{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
        .then(response =>{
         this.setState({roles:response.data.roles})
   
        })
        .catch(e =>console.log("error"))

        // emirates
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
        .catch(e =>console.log("error"))
     }
     onSelect(selectedList, selectedItem) {
    }
    
    onRemove(selectedList, removedItem) {
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

    // only agencies
    handleTradelicense = (e) =>{
        e.preventDefault();
        this.setState({tradelicense:e.target.value})
    }
    handlePaytype = (e) =>{
        e.preventDefault();
        this.setState({paytype:e.target.value})
    }


    handleAddress = (e) =>{
        e.preventDefault();
        this.setState({address:e.target.value})
    }

    handleTotalpackage = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({totalpackage:e.target.value,input})
    }
    handleBasic = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({basic:e.target.value,input})
    }
   
    handleFeatured = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({featured:e.target.value,input})
    }
    handlePremium = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({premium:e.target.value,input})
    }
    handleUpload = (e) =>{
        e.preventDefault();

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
              return;
        this.createImage(files[0]);


        //console.log(e.target.files[0])
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



    setSelected = (e) =>{
        this.setState({selected:e})
    }

    saveData = (e) =>{
        e.preventDefault();
       // console.log(this.state.input)
       const token = cookie.get("token")
        
            // alert("begin")
            //console.log(this.state);
            // let input = {};
            // input["name"] = "";
            // input["name_ar"] = "";
            // input["email"] = "";
            // input["password"] = "";
            // input["password_confirmation"] = "";
            // input["mobile"] = "";
            //this.setState({input:input});
            const data = {
                name:this.state.name,  name_ar:this.state.name_ar, email:this.state.email,
                mobile:this.state.mobile, password:this.state.password, password_confirmation:this.state.password_confirmation,
                tradelicense:this.state.tradelicense,paytype:this.state.paytype,address:this.state.address,
                totalpackage:this.state.totalpackage,basic:this.state.basic,featured:this.state.featured,premium:this.state.premium,
                image:this.state.image,active:this.state.checked ==true?1:0,agency_summary_en:this.state.agency_summary_en,agency_summary_ar:this.state.agency_summary_ar
            }
           // console.log('data befor server',data)
            this.setState({isLoading:true})
            if(this.validate()){
            axios.post(baseurl+"/api/agencies", data,{
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept':'application/json',
                  'Content-Type':'application/json'
                }})
            .then(response =>{
            let input = {};
            input["name"] = "";
            input["name_ar"] = "";
            input["email"] = "";
            input["password"] = "";
            input["password_confirmation"] = "";
            input["mobile"] = "";
            input["totalpackage"] = "";
            input["basic"] = "";
            input["featured"] = "";
            input["premium"] = "";
        
           this.setState({input:input,isLoading:false});
                Swal.fire({
                    title: "Done!",
                    text: "Category is added to database.",
                    icon: "success",
                    timer: 2000,
                    button: false
                  })
                  this.setState({ name:'',  name_ar:'', email:'',
                  image:null, imageShow:null,
                    mobile:'', password:'', password_confirmation:'',
                  selected:'',isLoading:false})
                    this.props.history.push("/agencies")
                  
            })
            .catch(error => {
              if (!error.response) {
                  // network error
                  this.setState({newerrors:JSON.stringify({"errors":"Error: Network Error"}),isLoading:false})
              } else {
                  this.setState({newerrors:error.response.data,isLoading:false})
              }
            })

        }
           
        }
    
       // console.log("data",data)
    

    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;
    
        if (!input["name"]) {
          isValid = false;
          errors["name"] = "Please enter  name.";
        }
        if (!input["name_ar"]) {
            isValid = false;
            errors["name_ar"] = "Please enter  arabic name.";
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
 // packages
          if (!input["totalpackage"]) {
            isValid = false;
            errors["totalpackage"] = "Please enter your total package.";
          }

          if (!input["basic"]) {
            isValid = false;
            errors["basic"] = "Please enter your basic package.";
          }
          if (!input["featured"]) {
            isValid = false;
            errors["featured"] = "Please enter your featured package.";
          }
          if (!input["premium"]) {
            isValid = false;
            errors["premium"] = "Please enter your premium package.";
          }
          // social
        //   if (typeof input["facebook"] !== "undefined") {
            
        //     var pattern = new RegExp(/^(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?$/);
        //     if (!pattern.test(input["facebook"])) {
        //       isValid = false;
        //       errors["facebook"] = "Please enter valid facebook account.";
        //     }
        //   }

        //   if (typeof input["twitter"] !== "undefined") {
            
        //     var pattern = new RegExp(/^(?:(?:http|https):\/\/)?(?:www.)?twitter.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?$/);
        //     if (!pattern.test(input["twitter"])) {
        //       isValid = false;
        //       errors["twitter"] = "Please enter valid twitter account.";
        //     }
        //   }

        //   if (typeof input["instegram"] !== "undefined") {
            
        //     var pattern = new RegExp(/^(?:(?:http|https):\/\/)?(?:www.)?instegram.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?$/);
        //     if (!pattern.test(input["instegram"])) {
        //       isValid = false;
        //       errors["instegram"] = "Please enter valid instegram account.";
        //     }
        //   }

        //   if (typeof input["linkedin"] !== "undefined") {
            
        //     var pattern = new RegExp(/^(?:(?:http|https):\/\/)?(?:www.)?linkedin.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?$/);
        //     if (!pattern.test(input["linkedin"])) {
        //       isValid = false;
        //       errors["linkedin"] = "Please enter valid linkedin account.";
        //     }
        //   }
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
    buttonRender =() => {
        if(this.state.isLoading){
            return <ClipLoader color={"blue"} loading={true}  size={30} />
        }
        return (
            <button type="submit" className="btn btn-primary" onClick={this.saveData}>{i18next.t("submit")}</button>
        )
        
    }

    
    handleagencySummaryEn= (e) =>{
        //console.log(e.target.checked)
        this.setState({agency_summary_en:e.target.value})
     }
     handleagencySummaryAr= (e) =>{
        //console.log(e.target.checked)
        this.setState({agency_summary_ar:e.target.value})
     }

    handleChecked= (e) =>{
        //console.log(e.target.checked)
        this.setState({checked:!this.state.checked})
     }
 
    render() {
        const lang =localStorage.getItem("lang") || "en";
        return (
            <div className="container-fluid">
   
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
                                            <input type="text" value={this.state.name}  name="name" className="form-control input-default " placeholder={i18next.t("name")} onChange={this.handleName} />
                                            <div className="text-danger">{this.state.errors.name}</div>
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" value={this.state.name_ar}  name="name_ar" className="form-control input-rounded" placeholder={i18next.t("arabicname")} onChange={this.handleName_ar} />
                                            <div className="text-danger">{this.state.errors.name_ar}</div>
                                        </div>
                                        <div className="mb-3">
                                            <input type="email" value={this.state.email}  name="email" className="form-control input-default " placeholder={i18next.t("email")} onChange={this.handleEmail}/>
                                            <div className="text-danger">{this.state.errors.email}</div>
                                        </div>
                                        <div className="mb-3">
                                            <input type="password" name="password" value={this.state.password}  className="form-control input-default " placeholder={i18next.t("password")} onChange={this.handlePassword}/>
                                            <div className="text-danger">{this.state.errors.password}</div>
                                        </div>
                                        <div className="mb-3">
                                            <input type="password" value={this.state.password_confirmation}  name="password_confirmation" className="form-control input-rounded" placeholder={i18next.t("passwordconfirmation")} onChange={this.handlePasswordConfirmation} />
                                        </div>

                                        <div className="mb-3">
                                            <input type="text" name="mobile" value={this.state.mobile}  className="form-control input-default " placeholder={i18next.t("mobile")} onChange={this.handleMobile} />
                                        </div>

                                        <div className="mb-3">
                                        <textarea type="text" className="form-control wizard-required" id="agency_summary_en" placeholder={i18next.t("agency_summary_en")}  rows={5}  onChange={this.handleagencySummaryEn}  />
                                        
                                        </div>

                                        <div className="mb-3">
                                        <textarea type="text" className="form-control" id="agency_summary_ar" placeholder={i18next.t("agency_summary_ar")} rows={5} onChange={this.handleagencySummaryAr}   />
                                        
                                        </div>
                                    

                                        <div className="mb-3">
                                            <input type="text" name="tradelicense" value={this.state.tradelicense}  className="form-control input-default " placeholder={i18next.t("tradelicense")} onChange={this.handleTradelicense} />
                                        </div>
                                  

                                 
                        
                                     

                                        <h3>{i18next.t("package")}</h3>
                                        <hr />

                                        <div className="row">
                                            <div className="col-md-3">
                                            <div className="mb-3">
                                            <input type="text" name="totalpackage"   className="form-control input-default " placeholder={i18next.t("totalpackage")} onChange={this.handleTotalpackage} />
                                            <div className="text-danger">{this.state.errors.totalpackage}</div>
                                        </div>
                                            </div>
                                            <div className="col-md-3">
                                            <div className="mb-3">
                                            <input type="text" name="basic"   className="form-control input-default " placeholder={i18next.t("basic")} onChange={this.handleBasic} />
                                            <div className="text-danger">{this.state.errors.basic}</div>
                                        </div>
                                            </div>
                                            <div className="col-md-3">
                                            <div className="mb-3">
                                            <input type="text" name="featured"   className="form-control input-default " placeholder={i18next.t("featured")} onChange={this.handleFeatured} />
                                            <div className="text-danger">{this.state.errors.featured}</div>
                                        </div>
                                            </div>
                                            <div className="col-md-3">
                                            <div className="mb-3">
                                            <input type="text" name="premium"  className="form-control input-default " placeholder={i18next.t("premium")} onChange={this.handlePremium} />
                                            <div className="text-danger">{this.state.errors.premium}</div>
                                        </div>
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

                                        <div className="mb-3">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={this.state.checked} onChange={this.handleChecked} />
                                                    <label className="form-check-label" for="flexSwitchCheckChecked">
                                                        {this.state.checked ==true? <span className="badge light badge-success">{i18next.t("active")}</span>
                                                        : <span className="badge light badge-danger">{i18next.t("inactive")}</span>}

                                                        </label>
                                                </div>
                                          
                                            </div>

                                        </div>

                                        <div className="row">
                                        <div className="col-md-4">
                                        {this.buttonRender()}
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

export default NewAgency
