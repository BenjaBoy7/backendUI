import React, { Component } from 'react'
import i18next from 'i18next'
//import { Multiselect } from 'multiselect-react-dropdown';
import MultiSelect from "react-multi-select-component";
import axios from   'axios';
import Swal from 'sweetalert2'
import { baseurl, baseurlImg } from '../../../Components/BaseUrl';
import cookie from 'js-cookie'

const lang =localStorage.getItem("lang") || "en";

 class EditAgent extends Component {
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
             experience:"",
             specialist:"",
             specialityarea:"",
             facebook:"",
             twitter:"",
             instegram:"",
             linkedin:"",
             image:null,
             imageShow:null,
             nationalityerror:false,
             qouta:"",
             languages: [],
             countries:[],
             specialists:[],
             agent:{},
             selected:[],
             selectedspecialists:[],
             input: {},
             errors: {},
             checked:false,
             active:0,
             emirates:[],
             address:0,


         }
     }

     componentDidMount(){

        let id = this.props.match.params.id;
        const token = cookie.get("token")

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

        axios.get(baseurl+"/api/agents/" + id,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
            .then(response => {
                console.log("lisr agents",response.data)
                this.setState({
                     agent: response.data.agents,input: response.data.agents, name: response.data.agents['name_en'],
                     name_ar: response.data.agents['name_ar'], email: response.data.agents['email'],
                     mobile: response.data.agents['mobile'],gender: response.data.agents['gender'],
                     qouta: response.data.agents['qouta'],
                     profile: response.data.agents.profile, address: response.data.agents['address'],
                     emirate_en: response.data.agents['emirate_en'], emirate_ar: response.data.agents['emirate_ar'],
                     nationality: response.data.agents.nationality,nationalityerror:response.data.agents.nationality > 0 ? false:true,
                     active:response.data.agents['active'],checked:response.data.agents['active']==1?true:false,
                     selected:lang=="en"? response.data.languages_en:response.data.languages_ar,
                     selectedspecialists:lang=="en"? response.data.specialists_en:response.data.specialists_ar,
                     languages:lang=="en"? response.data.alllanguages_en:response.data.alllanguages_ar,
                     specialists:lang=="en"? response.data.allspecialists_en:response.data.allspecialists_ar,
                   
                })
                this.setState({categories:response.data.categories})
            })
            .catch(err =>console.log("error"))

        // axios.get(baseurl+"/api/languages")
        // .then(response =>{
        //  this.setState({languages:response.data.languages_en})
   
        // })
        .catch()
        axios.get(baseurl+"/api/countries",{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
        .then(response =>{
         this.setState({countries:response.data.countries})
   
        })
        .catch(err =>console.log("error"))
        // axios.get(baseurl+"/api/specialist")
        // .then(response =>{
        //  this.setState({specialists:response.data.specialists_en})
   
        // })
        // .catch()
        
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
        this.setState({name:e.target.value})
      
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
        this.setState({mobile:e.target.value})
    }
    handlePassword = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({password:e.target.value})
    }
    handlePasswordConfirmation = (e) =>{
        e.preventDefault();
        this.setState({password_confirmation:e.target.value})
    }
    handleWhatsapp = (e) =>{
        e.preventDefault();
        this.setState({whatsapp:e.target.value})
    }
    handleLanding = (e) =>{
        e.preventDefault();
        this.setState({land:e.target.value})
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
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({experience:e.target.value,input})
    }
    handleSpecialist = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({specialist:e.target.value,input})
    }
    handleSpecialityarea = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({specialityarea:e.target.value,input})
    }
    handleLanguages = (e) =>{
        e.preventDefault();
        this.setState({languages:e.target.value})
    }
    handleFacebook = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({facebook:e.target.value,input})
    }
    handleTwitter = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({twitter:e.target.value,input})
    }
    handleInstegram = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({instegram:e.target.value,input})
    }
    handleLinkedin = (e) =>{
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({linkedin:e.target.value,input})
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
    setSelectedSpecialist = (e) =>{
        
        this.setState({selectedspecialists:e})
    }

    saveData = (e) =>{
        let id = this.props.match.params.id;
        e.preventDefault();
        const token = cookie.get("token")

            const data = {
                name:this.state.name,  name_ar:this.state.name_ar, email:this.state.email,
                mobile:this.state.mobile, password:this.state.password, password_confirmation:this.state.password_confirmation,
                land:this.state.land,whatsapp:this.state.whatsapp,address:this.state.address,
                gender:this.state.gender, nationality:this.state.nationality, experience:this.state.experience,
                specialist:this.state.specialist, 
                facebook:this.state.facebook, twitter:this.state.twitter, instegram:this.state.instegram, linkedin:this.state.linkedin,
                qouta:this.state.qouta,selected:this.state.selected,selectedspecialists:this.state.selectedspecialists,image:this.state.image,active:this.state.checked ==true?1:0
    
    
            }
            if(this.validate()){
            axios.put(baseurl+"/api/agents/" + id, data,{
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept':'application/json',
                  'Content-Type':'application/json'
                }})
            .then(response =>{
                Swal.fire({
                    title: "Done!",
                    text: "Data updated",
                    icon: "success",
                    timer: 2000,
                    button: false
                  })
                //   this.setState({ name:'',  name_ar:'', email:'',
                //     mobile:'', password:'', password_confirmation:'',
                //     land:'',whatsapp:'',
                //     gender:'', nationality:'', experience:'',
                //     specialist:'', specialityarea:'', languages:'',
                //     facebook:'', twitter:'', instegram:'', linkedin:'',
                //     qouta:'',selected:''})
                this.props.history.push("/agents")   
            })
            .catch(err =>console.log("error"))

      
           
        }
    
       // console.log("data",data)
    }

    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;    
     
         
         if (!input["email"]) {
          isValid = false;
          errors["email"] = "Please enter your email Address.";
         }
     

          if (input["qouta"] != input["qouta"]) {
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

    handleChecked= (e) =>{
        this.setState({checked:!this.state.checked})
     }
 
    render() {
        
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
                                            <input type="text" defaultValue={this.state.agent.name_en} name="name" className="form-control input-default " placeholder={i18next.t("name")} onChange={this.handleName} />
                                            <div className="text-danger">{this.state.errors.name}</div>
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" defaultValue={this.state.agent.name_ar} name="name_ar" className="form-control input-rounded" placeholder={i18next.t("arabicname")} onChange={this.handleName_ar} />
                                            <div className="text-danger">{this.state.errors.name_ar}</div>
                                        </div>
                                        <div className="mb-3">
                                            <input type="email" defaultValue={this.state.agent.email} name="email" className="form-control input-default " placeholder={i18next.t("email")} onChange={this.handleEmail}/>
                                            <div className="text-danger">{this.state.errors.email}</div>
                                        </div>
                                        {/* <div className="mb-3">
                                            <input type="password" name="password" className="form-control input-default " placeholder={i18next.t("password")} onChange={this.handlePassword}/>
                                            <div className="text-danger">{this.state.errors.password}</div>
                                        </div>
                                        <div className="mb-3">
                                            <input type="password" name="password_confirmation" className="form-control input-rounded" placeholder={i18next.t("passwordconfirmation")} onChange={this.handlePasswordConfirmation} />
                                        </div> */}

                                        <div className="mb-3">
                                            <input type="text" defaultValue={this.state.agent.mobile} name="mobile" className="form-control input-default " placeholder={i18next.t("mobile")} onChange={this.handleMobile} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" defaultValue={this.state.agent.land} name="land" className="form-control input-rounded" placeholder={i18next.t("landing")} onChange={this.handleLanding} />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" defaultValue={this.state.agent.whatsapp} name="whatsapp" className="form-control input-default " placeholder={i18next.t("whatsapp")} onChange={this.handleWhatsapp} />
                                        </div>
                                        <h3>{i18next.t("agentprofiledetails")}</h3>
                                        <hr />
                                        <div className="mb-3">
                                        <select className="default-select form-control wide mb-3" onChange={this.handleGender}>
										   {this.state.agent.gender ==1?
                                            <>
                                            	<option value="1">
                                                {i18next.t("male")}
                                                    </option>
                                                <option value="2">
                                                {i18next.t("female")}
                                                    </option></>:<>
                                                
											<option value="2">
                                            {i18next.t("female")}
                                                </option><option value="1">
                                            {i18next.t("male")}
                                                </option></>
                                            
                                        }
										
										</select>
                                        </div>


                                        <div className="mb-3">
                                        <select className="default-select form-control wide mb-3" onChange={this.handleNationality}>
											<option value={this.state.agent.country_id}>
                                                {lang=="en"?this.state.agent.country_enNationality
                                                :this.state.agent.country_arNationality}</option>
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
                                            {this.state.specialists.length > 0?
                                               <MultiSelect
                                               options={this.state.specialists}
                                               value={this.state.selectedspecialists}
                                               data={this.state.backdata}
                                               onChange={this.setSelectedSpecialist}
                                               labelledBy={"Select"}
                                           /> :null
                                            }
                                          </div>
                                      
                                        <div className="mb-3">
                                        <label>{i18next.t("languages")}</label>
                                        {this.state.languages.length > 0?
                                          <MultiSelect
                                          options={this.state.languages}
                                          value={this.state.selected}
                                          onChange={this.setSelected}
                                          labelledBy={"Select"}
                                      /> :null
                                        }
                                          </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-md-3">
                                            <input type="text" defaultValue={this.state.agent.facebook} name="facebook" className="form-control input-default " placeholder={i18next.t("facebook")} onChange={this.handleFacebook} />
                                           
                                            </div>
                                            <div className="col-md-3">
                                            <input type="text" defaultValue={this.state.agent.twitter} name="twitter" className="form-control input-default " placeholder={i18next.t("twitter")} onChange={this.handleTwitter}/>
                                       
                                            </div>
                                            <div className="col-md-3">
                                            <input type="text" defaultValue={this.state.agent.instegram} name="instegram" className="form-control input-default " placeholder={i18next.t("instegram")} onChange={this.handleInstegram} />
                                            
                                            </div>
                                            <div className="col-md-3">
                                            <input type="text" defaultValue={this.state.agent.linkedin} name="linkedin" className="form-control input-default " placeholder={i18next.t("linkedin")} onChange={this.handleLinkedin} />
                                    
                                            </div>
                                        </div>
                                        <div className="mb-3 mt-3">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={this.state.checked} onChange={this.handleChecked} />
                                                    <label className="form-check-label" for="flexSwitchCheckChecked">
                                                        {this.state.checked ==true? <span className="badge light badge-success">{i18next.t("active")}</span>
                                                        : <span className="badge light badge-danger">{i18next.t("inactive")}</span>}

                                                        </label>
                                                </div>
                                          
                                            </div>
                                        <div className="row mt-3">
                                            {this.state.image!=null? <img src={this.state.imageShow} style={{width:'80px',height:'80px',borderRadius:'35px'}}/>:(   <div>  {this.state.agent.profile !=null? 
                                                <img src={baseurlImg+"/public/uploads/profiles/"+this.state.agent.profile} style={{width:'80px',height:'80px',borderRadius:'35px'}}/>:
                                                null
                                            }
                                            </div>
                                            )}
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
                                            <input type="number" defaultValue={this.state.agent.qouta} name="qouta" className="form-control input-default"  placeholder={i18next.t("asignlistingquota")} onChange={this.handleQouta} />
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

export default EditAgent
