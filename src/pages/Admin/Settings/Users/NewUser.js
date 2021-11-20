import React, { Component } from 'react'
import i18next from 'i18next'
//import { Multiselect } from 'multiselect-react-dropdown';
import MultiSelect from "react-multi-select-component";
import axios from   'axios';
import Swal from 'sweetalert2'
import { baseurl } from '../../../../Components/BaseUrl';
import ClipLoader from "react-spinners/ClipLoader";
import cookie from 'js-cookie'
 class NewUser extends Component {
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
             role:0,
             image:null,
             imageShow:null,
             selected:[],
             input: {},
             errors: {},
             isLoading:false,
             newerrors:{},
             checked:false


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
     handleRole = (e) =>{
        e.preventDefault();
        this.setState({role:e.target.value})
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

    handleQouta = (e) =>{
        e.preventDefault();
        this.setState({qouta:e.target.value})
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
      
         

            const data = {
                name:this.state.name,  name_ar:this.state.name_ar, email:this.state.email,
                mobile:this.state.mobile, password:this.state.password, password_confirmation:this.state.password_confirmation,
                role:this.state.role,image:this.state.image,active:this.state.checked ==true?1:0
    
    
            }
           // console.log('data befor server',data)
            this.setState({isLoading:true})
            if(this.validate()){

            axios.post(baseurl+"/api/employee", data,{
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
                this.setState({input:input});
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
                    land:'',whatsapp:'',
                    gender:'', nationality:'', experience:'',
                    specialist:'', specialityarea:'', languages:'',
                    facebook:'', twitter:'', instegram:'', linkedin:'',
                    qouta:'',selected:'',isLoading:false})
                    this.props.history.push("/employees")
                  
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
           
    
    
       // console.log("data",data)
    }

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
        if (typeof input["email"] !== "undefined") {
            
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
              isValid = false;
              errors["email"] = "Please enter valid email address.";
            }
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
                                        <select value={this.state.role}  className="default-select form-control wide mb-3" onChange={this.handleRole}>
                                        <option value="0">..{i18next.t("addrole")}..</option>
                                            {this.state.roles.map((role) =>(
                                                <option value={role.id}>{lang=="en"?role.role_name_en:role.role_name_ar}</option>
                                            ))}
									      </select>

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

                                        <div className="row mt-3">
                                            {this.state.image!=null? <img src={this.state.imageShow} style={{width:'80px',height:'80px',borderRadius:'35px'}}/>:null}
                                           
                                            
                                        <div className="input-group mb-3">
										                    	<span className="input-group-text">{i18next.t("upload")}</span>
                                            <div className="form-file">
                                                <input type="file" className="form-file-input form-control"  onChange={this.handleUpload} />
                                            </div>
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

export default NewUser
