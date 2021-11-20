import React, { Component } from 'react'
import cookie from 'js-cookie'
import i18next from 'i18next'
//import { Multiselect } from 'multiselect-react-dropdown';
import MultiSelect from "react-multi-select-component";
import axios from   'axios';
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'

import { baseurl } from '../../../../Components/BaseUrl'
export class ShowAgency extends Component {
    constructor(props){
        super(props)
        this.state={
            id:"",
            agency:{},
            name:"",
            name_ar:"",
            email:"",
            password:"",
            password_confirmation:"",
            mobile:"",
            tradelicense:"",
            paytype:0,
            address_en:"",
            address_ar:"",
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
            checked:false


        }
    }
    componentDidMount(){
        let id = this.props.match.params.id;
        const token = cookie.get("token")

        axios.get(baseurl+"/api/edit-agency/" + id,{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
          }})
            .then(response => {
                this.setState({
                    agency: response.data,input: response.data, name: response.data.name_en,
                    name_ar: response.data.name_ar, email: response.data.email,
                     mobile: response.data.mobile, tradelicense: response.data.tradelicense,
                     paytype: response.data.paytype, totalpackage: response.data.totalpackage,
                     basic: response.data.basic, featured: response.data.featured,premium:response.data.premium,
                     profile: response.data.profile,id:id,
                     active:response.data.active,checked:response.data.active==1?true:false
                })
                //this.setState({categories:response.data.categories})
            })
            .catch(e =>console.log("error"))

     }

     
     handelDelete = (agency, e) =>{
        e.preventDefault();

   const token = cookie.get("token")
      
        if(!agency || agency <1)
        {
            return
        } else {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(baseurl+"/api/agency/"+agency,{
                      headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                      }})
                    .then(response =>{
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )
                          this.props.history.push("/agencies")
                     //this.fetchData();
                     //this.setState({categories:response.data.categories})
                    })
                    .catch(err => console.log(err))
                }
              })

       
   
    }
    }

    render() {
        const lang =localStorage.getItem("lang") || "en";
	
        return (
          
              <div className="container-fluid">

  {/* row */}
  <div className="row">
    <div className="col-lg-12">
      <div className="profile card card-body px-3 pt-3 pb-0">
        <div className="profile-head">
          <div className="photo-content">
            <div className="cover-photo rounded" />
          </div>
          <div className="profile-info">
            <div className="profile-photo">
              <img src={baseurl + 'uploads/profiles/' + this.state.profile} className="img-fluid rounded-circle" alt="image" />
            </div>
            <div className="profile-details">
              <div className="profile-name px-3 pt-2">
                <h4 className="text-primary mb-0">{lang=="en"? this.state.name:this.state.name_ar}</h4>
                <h4 className="text-muted mb-0">{this.state.email}</h4>
              </div>
              <div className="profile-email px-2 pt-2">
               <h4>{i18next.t("mobile")}:  {this.state.mobile}</h4>
              
              </div>
          
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-xl-4">
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
              <div className="card-header">{i18next.t("package")}</div>
            <div className="card-body">
              <div className="profile-statistics">
                <div className="text-center">
                  <div className="row">
                    <div className="col">
                      <h3 className="m-b-0">{this.state.basic}</h3><span>{i18next.t("basic")}</span>
                    </div>
                    <div className="col">
                      <h3 className="m-b-0">{this.state.featured}</h3><span>{i18next.t("featured")}</span>
                    </div>
                    <div className="col">
                      <h3 className="m-b-0">{this.state.premium}</h3><span>{i18next.t("premium")}</span>
                    </div>
                  </div>
              
                </div>
               
         
              </div>
            </div>
          </div>
        </div>
      


      </div>
    </div>
    <div className="col-xl-8">
      <div className="card">
        <div className="card-body">
          <div className="profile-tab">
            <div className="custom-tab-1">
              
              <div className="tab-content">
               <div id="about-me" className="tab-pane fade active show">
                  <div className="profile-about-me">
                    <div className="pt-4 border-bottom-1 pb-3">
                      <h4 className="text-primary">About Me</h4>
                      <p className="mb-2">A wonderful serenity has taken possession 
                      of my entire soul, like these sweet mornings of spring which I
                       enjoy with my whole heart.</p>
                   </div>
                  </div>
             
            
                  <div className="profile-personal-info">
                    <h4 className="text-primary mb-4">{i18next.t("personalinformation")}</h4>
                    <div className="row mb-2">
                      <div className="col-sm-3 col-5">
                        <h5 className="f-w-500">{i18next.t("name")} <span className="pull-end">:</span>
                        </h5>
                      </div>
                      <div className="col-sm-9 col-7"><span>{lang=="en"?this.state.name:this.state.name_ar}</span>
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-sm-3 col-5">
                        <h5 className="f-w-500">{i18next.t("email")} <span className="pull-end">:</span>
                        </h5>
                      </div>
                      <div className="col-sm-9 col-7"><span>{this.state.email}</span>
                      </div>
                    </div>
               
                    <div className="row mb-2">
                      <div className="col-sm-3 col-5">
                        <h5 className="f-w-500">{i18next.t("location")} <span className="pull-end">:</span></h5>
                      </div>
                      <div className="col-sm-9 col-7">
                          <span>{lang=="en"?this.state.agency.emirate_en:this.state.agency.emirate_ar}</span>
                      </div>
                    </div>
                
                  </div>
                </div>
               
              </div>
            </div>
            {/* Modal */}
            <div className="modal fade" id="replyModal">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Post Reply</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" />
                  </div>
                  <div className="modal-body">
                    <form>
                      <textarea className="form-control" rows={4} defaultValue={"Message"} />
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger light" data-bs-dismiss="modal">btn-close</button>
                    <button type="button" className="btn btn-primary">Reply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="" style={{justifyContent:'space-around'}}>
          <Link to={"/edit-agency/"+this.state.id} className="btn btn-info">
          <i className="fa fa-edit"></i>
          &nbsp;&nbsp;
          {i18next.t("edit")}</Link>
          
          <a href="#"  onClick={this.handelDelete.bind(this, this.state.id)} className="btn btn-danger m-5">
          <i className="fa fa-trash" ></i> 
          &nbsp;&nbsp;
          {i18next.t("delete")}</a>
          </div>
      
        </div>
        
      </div>
    </div>
  </div>
</div>

       
            
        )
    }
}

export default ShowAgency
