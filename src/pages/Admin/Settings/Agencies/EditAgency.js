import React, { Component } from 'react'
import i18next from 'i18next'
//import { Multiselect } from 'multiselect-react-dropdown';
import MultiSelect from "react-multi-select-component";
import axios from   'axios';
import Swal from 'sweetalert2'
import { baseurl, baseurlImg } from '../../../../Components/BaseUrl';
import ClipLoader from "react-spinners/ClipLoader";
import cookie from 'js-cookie'

 class EditAgency extends Component {
     constructor(props){
         super(props)
         this.state={
             agency:{},
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


         }
     }

     componentDidMount(){
        let id = this.props.match.params.id;
        const token = cookie.get("token")

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

        axios.get(baseurl+"/api/edit-agency/" + id,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
            .then(response => {
                console.log("response data",response.data)
                this.setState({
                    agency: response.data,input: response.data, name: response.data.name_en,
                    name_ar: response.data.name_ar, email: response.data.email,
                     mobile: response.data.mobile, tradelicense: response.data.tradelicense,
                     paytype: response.data.paytype, address: response.data.address,
                     totalpackage: response.data.totalpackage,
                     basic: response.data.basic, featured: response.data.featured,premium:response.data.premium,
                     profile: response.data.profile,
                     active:response.data.active,checked:response.data.active==1?true:false
                })
                //this.setState({categories:response.data.categories})
            })
            .catch(e =>console.log("error"))


     }
     onSelect(selectedList, selectedItem) {
      console.log("selectedList",selectedList)
      console.log("selectedItem",selectedItem)
      console.log("selectedValues",this.state.selected)
    }
    
    onRemove(selectedList, removedItem) {
        console.log("selectedList",selectedList)
        console.log("removedItem",removedItem)
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
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({tradelicense:e.target.value,input})
    }
    handlePaytype = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({paytype:e.target.value,input})
    }
    handleAddress = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({address:e.target.value,input})
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
        const token = cookie.get("token")
       // console.log(this.state.input)
       let id = this.props.match.params.id;
        if(this.validate()){
           // alert("begin")
            //console.log(this.state);
      
            let input = {};
            input["name"] = "";
            input["name_ar"] = "";
            input["email"] = "";
            input["password"] = "";
            input["password_confirmation"] = "";
            input["mobile"] = "";
        
            this.setState({input:input});

            const data = {
                name:this.state.name,  name_ar:this.state.name_ar, email:this.state.email,address:this.state.address,
                mobile:this.state.mobile, password:this.state.password, password_confirmation:this.state.password_confirmation,
                tradelicense:this.state.tradelicense,paytype:this.state.paytype,address:this.state.address,
                totalpackage:this.state.totalpackage,basic:this.state.basic,featured:this.state.featured,premium:this.state.premium,
               
                image:this.state.image,active:this.state.checked ==true?1:0
    
    
            }
            console.log('data befor server',data)
            this.setState({isLoading:true})
            axios.put(baseurl+"/api/agency/" + id, data,{
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept':'application/json',
                  'Content-Type':'application/json'
                }})
            .then(response =>{
           console.log(response.data)
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
                   
                   
                  
                    qouta:'',selected:'',isLoading:false})
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
    
       // console.log("data",data)
    }

    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;
    
        if (!input["name_en"]) {
          isValid = false;
          errors["name_en"] = "Please enter  name.";
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
                                            <input type="text" name="tradelicense" value={this.state.tradelicense}  className="form-control input-default " placeholder={i18next.t("tradelicense")} onChange={this.handleTradelicense} />
                                        </div>
                                

                            
                        
                                  

                                        <h3>{i18next.t("package")}</h3>
                                        <hr />

                                        <div className="row">
                                            <div className="col-md-3">
                                            <div className="mb-3">
                                            <input type="text" name="totalpackage" value={this.state.totalpackage}   className="form-control input-default " placeholder={i18next.t("totalpackage")} onChange={this.handleTotalpackage} />
                                        </div>
                                            </div>
                                            <div className="col-md-3">
                                            <div className="mb-3">
                                            <input type="text" name="basic" value={this.state.basic}  className="form-control input-default " placeholder={i18next.t("basic")} onChange={this.handleBasic} />
                                        </div>
                                            </div>
                                            <div className="col-md-3">
                                            <div className="mb-3">
                                            <input type="text" name="featured" value={this.state.featured}  className="form-control input-default " placeholder={i18next.t("featured")} onChange={this.handleFeatured} />
                                        </div>
                                            </div>
                                            <div className="col-md-3">
                                            <div className="mb-3">
                                            <input type="text" name="premium" value={this.state.premium}  className="form-control input-default " placeholder={i18next.t("premium")} onChange={this.handlePremium} />
                                        </div>
                                            </div>

                                        </div>

                              

                                        <div className=" ">
                                        {this.state.image ==null?
                                   <img style={{ height: '100px', width: '100px', }} src={this.state.agency.logo==undefined ? baseurlImg + "/public/uploads/profiles/no_logo.png": baseurlImg + "/public/uploads/profiles/" + this.state.agency.logo } />
                   
                   
                                         :null}
                                            {this.state.image!=null? <img src={this.state.imageShow} style={{width:'100px',height:'100px',borderRadius:'50px'}}/>:null}
                                           
                                            
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

export default EditAgency
