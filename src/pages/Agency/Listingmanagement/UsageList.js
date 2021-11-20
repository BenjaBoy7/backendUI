import React, { Component } from 'react';
import axios from 'axios'
//import swal from 'sweetalert';
import Swal from 'sweetalert2'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import cookie from 'js-cookie'

import i18next from 'i18next'
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import './UsageList.css'
import {Link} from 'react-router-dom'

import { baseurl } from '../../../Components/BaseUrl';


const lang =localStorage.getItem("lang") || "en";

class UsageList extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            locations:[],
            category_en:"",
            category_ar:"",
            isLoading:false,
            startDate: new Date(),
            agents:[],
            filterLocation:[],
            loc_tap:"nav-link active",
            day_tap:"nav-link",
            selected_item:1,
            selectedLocations:[],
            selectedUsers:[],
            
        }
    }

  

    componentDidMount(){
      
        
       this.setState({isLoading:true})

        this.fetchData();
        

        
    }

    fetchData =() =>{
      
        this.setState({isLoading:true})
        const token = cookie.get("token")
        axios.get(baseurl+"/api/users",{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
          }})
        .then(response =>{
          this.setState({agents:lang=="en"? response.data.agents_en:response.data.agents_ar})
        })

        .catch(e=>console.log('error'))

        axios.get(baseurl+"/api/filterLocation",{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
          }})
        .then(response =>{
          this.setState({filterLocation:lang=="en"? response.data.locations_en:response.data.locations_ar})
        })

        .catch(e=>console.log('error'))


        axios.get(baseurl+"/api/agencypackegedetailswithusage",{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
          }})
        .then(response =>{
   
         this.setState({isLoading:false,locations:response.data.locations})
            if (this.state.locations.length == 0) {
                console.log("length = 0")
            } else {

                $(document).ready(function () {

                    $('#myTable').DataTable();

                });
                this.setState({ isLoading: false })
            }
    
      
        })
        .catch(e =>console.log("error"))

    

    }

    fetchLocationsbyuser =(newValue) =>{
      const data = {"users":newValue ,"locations":this.state.selectedLocations}
      const token = cookie.get("token")
      this.setState({ isLoading: true })
        axios.post(baseurl+"/api/filterusagepackage",data,{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
          }})
        .then(response =>{
          console.log("server response",response.data)
          this.setState({locations:response.data.locations,isLoading:false})
        })

        .catch(e=> e =>console.log("error"))

    }
  // select by location name
    fetchLocationsbylocation =(newValue) =>{
      const data = {"users":this.state.selectedUsers ,"locations":newValue}
      const token = cookie.get("token")
      this.setState({ isLoading: true })
        axios.post(baseurl+"/api/filterusagepackage",data,{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
          }})
        .then(response =>{
          console.log("server response",response.data)
          this.setState({locations:response.data.locations,isLoading:false})
        })

        .catch(e=> e =>console.log("error"))

    }


    selectLocation = (e)=>{
      this.setState({loc_tap:"nav-link active",day_tap:"nav-link",selected_item:1})
    }

    selectDay = (e) =>{
      this.setState({loc_tap:"nav-link",day_tap:"nav-link active",selected_item:2})
    }
   
    render() {
        return (
 <div>
  <div className="container-fluid">            
   <div className=" page-titles">
    <ol className="breadcrumb">
      <li className=" active"><a href="javascript:void(0)">{i18next.t("listing")}</a></li> / 
      <li className=""><a href="javascript:void(0)">{i18next.t("quotausage")}</a></li>
    </ol>
    <div className="row" style={{marginTop:'20px'}}>
    <div className="col-md-3">
      <label>{i18next.t("users")}</label>
                    <Autocomplete
                      multiple

                      options={this.state.agents}
                      onChange={(event, newValue) => {
                         this.setState({selectedUsers:newValue})
                         this.fetchLocationsbyuser(newValue)
                   
                      }}
                      getOptionLabel={(option) => option.name}
                      // defaultValue={[top100Films[13],]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label=""
                          placeholder=""
                        />
                      )}
                    />
   
</div>
<div className="col-md-6">

</div>
<div className="col-md-3">
<label>{i18next.t("location")}</label>
                    <Autocomplete
                      multiple
                      options={this.state.filterLocation}
                      onChange={(event, newValue) => {
                        this.setState({ selectedLocations: newValue });
                        this.fetchLocationsbylocation(newValue)
                        //  const agentData= {selectedLanguage: this.selectedLanguage, selectedNationality: this.state.selectedNationality, selectedLocation: newValue, selectedArea: this.state.selectedArea}
                       // this.fetchLocations(newValue)
                        //console.log("selected Loca", this.state.locationValue)
                      }}
                      getOptionLabel={(option) => option.location}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label=""
                          placeholder=""
                        />
                      )}
                    />
   
</div>
    </div>
  </div>

  <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">                                
                                        <li className="nav-item" role="presentation">
                                            <a className={this.state.loc_tap} onClick={this.selectLocation}    role="tab" aria-controls="pills-home" aria-selected="true">{i18next.t("listingbylocation")}</a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a className={this.state.day_tap} onClick={this.selectDay}    role="tab" aria-controls="pills-profile" aria-selected="false">{i18next.t("listingbyuser")}</a>
                                        </li>
                                    </ul>

  {!this.state.isLoading?  
  <div className="row">
    <div className="col-12">
      <div className="card">
      
        <div className="card-body">
          <div className="table-responsive">
              { !this.state.isLoading?     <table id=""  className="display table table-striped" style={{minWidth: 845}}>
              <thead>
               
                <tr>
                  <th>
                  {this.state.selected_item ==1?( 
                    <>
                    {i18next.t("location")}
                    </>
                    
                    ):( 
                      <>{i18next.t("agent")}
                      </>
                      )}

                    </th>
                  <th>{i18next.t("forrent")}</th>
                  <th>{i18next.t("forbuy")}</th>
                  <th>{i18next.t("basic")}</th>
                  <th>{i18next.t("featured")}</th>
                  <th>{i18next.t("premium")}</th>
                  <th>{i18next.t("total")}</th>
                </tr>
              </thead>
              <tbody>
              
                {this.state.locations.length > 0 ? 
                <>
                   {this.state.locations.map((loc) =>(

<tr>
  <td>{lang=="en"?loc.area_en:loc.area_ar}</td>
      <td>

      {
        loc['rent'].length >0?(

      loc['rent'].map(rent =>(
          rent.rent_count
      
      ))
      ):0
  
      
      }
      </td>
      <td>
      {
         loc['buy'].length >0?
         (
      loc['buy'].map(buy =>(
        buy.buy_count
      ))):0
  
      
      }

     
      </td>

      <td>
      {
         loc['basic'].length >0?(
      loc['basic'].map(basic =>(
        basic.basic_count
      ))
         ):0
      
      }

  
      </td>

      <td>
      {
         loc['featured'].length >0?(
      loc['featured'].map(featured =>(
        featured.featured_count
      ))
         ):0
  
      
      }
      
      </td>

      <td>
      {
         loc['premium'].length >0?(
      loc['premium'].map(premium =>(
        premium.premium_count
      ))
         ):0
      
      }
      </td>

      <td>
         {loc.property_count}
      </td>


</tr>
  )

  )}
                </> :
                
                <tr >

                  <td colSpan="7" style={{ backgroundColor: '#fff',textAlign: 'center'}}>No data </td>
                  
                </tr>

                }
                
                  
    
     
 
              </tbody>
           
            </table>:"no data"}
        
          </div>
        </div>
      </div>
    </div>
   
   
   
  </div>:
       <div className="row" style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
       <div className="col-md-4"></div>

       <div className="col-md-4" style={{position: 'absolute', top: '50%',margin: '0 auto',left: '50%'}}>
       <div class="lds-ripple"><div></div><div></div></div>
       </div>

       <div className="col-md-4"></div>
   </div>
  }

</div>

        </div>
        );
    }
}

export default UsageList;