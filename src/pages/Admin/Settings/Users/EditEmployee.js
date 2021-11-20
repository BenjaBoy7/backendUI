import React, { Component } from 'react'
import i18next from 'i18next'
//import { Multiselect } from 'multiselect-react-dropdown';
import MultiSelect from "react-multi-select-component";
import axios from 'axios';
import Swal from 'sweetalert2'
import { baseurl } from '../../../../Components/BaseUrl';
import cookie from 'js-cookie'
import ClipLoader from "react-spinners/ClipLoader";

class EditEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roles: [],
            name: "",
            name_ar: "",
            email: "",
            password: "",
            password_confirmation: "",
            mobile: "",
            role: 0,
            active: 0,
            employee: {},
            selected: [],
            image:null,
            imageShow:null,
            profile:null,
            input: {},
            errors: {},
            isLoading: false,
            newerrors: {},
            checked:false


        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        const token = cookie.get("token")
        axios.get(baseurl+"/api/edit-employee/" + id,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
            .then(response => {
                this.setState({
                    employee: response.data, name: response.data.name_en,
                    name_ar: response.data.name_ar, email: response.data.email,
                     mobile: response.data.mobile, role: response.data.role,
                     profile: response.data.profile,
                     active:response.data.active,checked:response.data.active==1?true:false
                })
                this.setState({categories:response.data.categories})
            })
            .catch(e =>console.log("error"))


        axios.get(baseurl + "/api/roles",{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
            .then(response => {
                this.setState({ roles: response.data.roles })

            })
            .catch(e =>console.log("error"))
    }
    onSelect(selectedList, selectedItem) {
        console.log("selectedList", selectedList)
        console.log("selectedItem", selectedItem)
        console.log("selectedValues", this.state.selected)
    }

    onRemove(selectedList, removedItem) {
        console.log("selectedList", selectedList)
        console.log("removedItem", removedItem)
    }

    handleName = (e) => {
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({ name: e.target.value, input })

    }
    handleName_ar = (e) => {
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({ name_ar: e.target.value, input })
    }
    handleEmail = (e) => {
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({ email: e.target.value, input })
    }
    handleMobile = (e) => {
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({ mobile: e.target.value, input })
    }
    handlePassword = (e) => {
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({ password: e.target.value, input })
    }
    handlePasswordConfirmation = (e) => {
        e.preventDefault();
        let input = this.state.input;
        input[e.target.name] = e.target.value;
        this.setState({ password_confirmation: e.target.value, input })
    }
    handleRole = (e) => {
        e.preventDefault();
        this.setState({ role: e.target.value })
    }

    handleUpload = (e) => {
        e.preventDefault();

        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        this.createImage(files[0]);


        //console.log(e.target.files[0])
        this.setState({ imageShow: URL.createObjectURL(e.target.files[0]) })
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

    handleQouta = (e) => {
        e.preventDefault();
        this.setState({ qouta: e.target.value })
    }

    setSelected = (e) => {

        this.setState({ selected: e })
    }

    saveData = (e) => {
        let id = this.props.match.params.id;
        e.preventDefault();
        const token = cookie.get("token")
        const data = {
                        name: this.state.name, name_ar: this.state.name_ar, email: this.state.email,
                        mobile: this.state.mobile, password: this.state.password, password_confirmation: this.state.password_confirmation,
                        role: this.state.role,image:this.state.image,active:this.state.checked ==true?1:0
                     }
        this.setState({ isLoading: true })
        axios.put(baseurl+"/api/employee/" + id, data,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
            .then(response => {
                console.log(response.data)
                Swal.fire({
                    title: "Done!",
                    text: "Sucessfully updated.",
                    icon: "success",
                    timer: 2000,
                    button: false
                  })
                  this.setState({ name:'',  name_ar:'', email:'',
                    mobile:'', password:'', password_confirmation:'',
                   whatsapp:'',facebook:'', twitter:'',
                    instegram:'', linkedin:'',
                    selected:'',isLoading:false})
                    this.props.history.push("/employees")
            })
            .catch(error => {
                if (!error.response) {
                    // network error
                    this.setState({ newerrors: JSON.stringify({ "errors": "Error: Network Error" }), isLoading: false })
                } else {
                    this.setState({ newerrors: error.response.data, isLoading: false })
                }
            })





        // console.log("data",data)
    }


    buttonRender = () => {
        if (this.state.isLoading) {
            return <div className="row">
                <div className="col-md-4"></div>
            <div className="col-md-4">
                <ClipLoader color={"blue"} loading={true} size={30} /></div>
                <div className="col-md-4"></div>
                </div>
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
        const lang = localStorage.getItem("lang") || "en";
        console.log("checked or not",this.state.checked)
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
                                                <input type="text" defaultValue={this.state.employee.name_en} name="name" className="form-control input-default " placeholder={i18next.t("name")} onChange={this.handleName} />
                                                <div className="text-danger">{this.state.errors.name}</div>
                                            </div>
                                            <div className="mb-3">
                                                <input type="text" defaultValue={this.state.employee.name_ar} name="name_ar" className="form-control input-rounded" placeholder={i18next.t("arabicname")} onChange={this.handleName_ar} />
                                                <div className="text-danger">{this.state.errors.name_ar}</div>
                                            </div>
                                            <div className="mb-3">
                                                <input type="email" defaultValue={this.state.employee.email} name="email" className="form-control input-default " placeholder={i18next.t("email")} onChange={this.handleEmail} />
                                                <div className="text-danger">{this.state.errors.email}</div>
                                            </div>
                                            <div className="mb-3">
                                                <input type="password" name="password" value={this.state.password} className="form-control input-default " placeholder={i18next.t("password")} onChange={this.handlePassword} />
                                                <div className="text-danger">{this.state.errors.password}</div>
                                            </div>
                                            <div className="mb-3">
                                                <input type="password" value={this.state.password_confirmation} name="password_confirmation" className="form-control input-rounded" placeholder={i18next.t("passwordconfirmation")} onChange={this.handlePasswordConfirmation} />
                                            </div>
                                            <div className="mb-3">
                                                <input type="text" name="mobile" defaultValue={this.state.employee.mobile} className="form-control input-default " placeholder={i18next.t("mobile")} onChange={this.handleMobile} />
                                            </div>
                                            <div className="mb-3">
                                                <select value={this.state.role} className="default-select form-control wide mb-3" onChange={this.handleRole}>
                                                    <option value={this.state.employee.role_id}>{lang == "en" ? this.state.employee.role_name_en : this.state.employee.role_name_ar}</option>
                                                    {this.state.roles.map((role) => (
                                                        <option value={role.id}>{role.role_name_en}</option>
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

                                            <div className="row mt-5">
                                                {this.state.image ==null? <img src={baseurl+'/uploads/profiles/'+this.state.profile} style={{ width: '80px', height: '80px' }} />:null}
                                                {this.state.image != null ? <img src={this.state.imageShow} style={{ width: '80px', height: '80px' }} /> : null}
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">{i18next.t("upload")}</span>
                                                    <div className="form-file">
                                                        <input type="file" className="form-file-input form-control" onChange={this.handleUpload} />
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

export default EditEmployee
