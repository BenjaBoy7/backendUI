import React, { Component } from 'react'
import $ from 'jquery'
import cookie from 'js-cookie'
import axios from 'axios'
import i18next from 'i18next'
import { baseurl } from '../../../Components/BaseUrl'
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import MultiSelect from "react-multi-select-component";
import JoditEditor from "jodit-react";
import Swal from 'sweetalert2'
const lang =localStorage.getItem("lang") || "en";
const config = {
  readonly: false // all options from https://xdsoft.net/jodit/doc/
}
 class Newpage extends Component {
     constructor(props){
         super(props)
         this.state= {
            locations:[],
            filterLocation:[],
            propertytypes:[],
            features:[],
            selectedfeature:[],
            propertytype:0,
            purpose:0,
            selectedLocation:"",
            price_from:0,
            price_to:0,
            bath_room:-1,
            bed_room:0,
            rent_frequence:0,
            fulltext:"",
            description_en: "",
            description_ar: "",
            image:null,
            imageShow:null,
            //
            image_ar:null,
            imageShow_ar:null,

            alttext_en:"",
            focuskeyphrases_en:"",
            seotitle_en:"",
            metadescription_en:"",

            alttext_ar:"",
            focuskeyphrases_ar:"",
            seotitle_ar:"",
            metadescription_ar:"",
         }
     }
     componentDidMount() {
     // this.props.onInputChageEnglish("/newpage")
       //console.log(this.props.rent)
     //  this.handlePage()
        this.fetchData();
     }
     handlePage = () =>{
       console.log("ghhdghdd")
     }
     
    fetchData =() =>{
      
        this.setState({isLoading:true})
        const token = cookie.get("token")
        axios.get(baseurl+"/api/features",{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
          .then(response =>{
            this.setState({features:lang=="en"? response.data.allfeatures_en:response.data.allfeatures_ar})
          })
          .catch(err =>console.log("error"))


        axios.get(baseurl+"/api/propertytypes",{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
          }})
        .then(response =>{
          this.setState({propertytypes:response.data.propertytypes})
        })

        .catch(e=>console.log('error'))

        axios.get(baseurl+"/api/filterLocation",{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept':'application/json',
            'Content-Type':'application/json'
          }})
        .then(response =>{
          console.log(response.data)
          this.setState({filterLocation:lang=="en"? response.data.locations_en:response.data.locations_ar})
        })

        .catch(e=>console.log('error'))
    }

    handlePropertytype = (e) =>{
      this.setState({propertytype:e.target.value})
        // const data= {selectedLocation: this.state.selectedLocation, purpose: this.state.purpose,propertytype:e.target.value}
        // this.fetchProperty(data)
    }

    handlePurpose = (e) =>{
      e.preventDefault()
      
      this.setState({purpose:e.target.value})
      this.props.onInputChageEnglish("/newpage"+e.target.value)
        // const data= {selectedLocation: this.state.selectedLocation, purpose: e.target.value,propertytype:this.state.value}
         //this.fetchProperty(data)
    }

    setSelectedFeature = (e) =>{
        this.setState({selectedfeature:e})
    }

    handlePrice_from = (e) =>{
      this.setState({price_from:e.target.value})
    }
    handlePrice_to = (e) =>{
      this.setState({price_to:e.target.value})
    }

    handleBathroom = (e) =>{
      this.setState({bath_room:e.target.value})
    }
    handleBedroom = (e) =>{
      this.setState({bed_room:e.target.value})
    }

    handlePer = (e) =>{
      this.setState({rent_frequence:e.target.value})
    }

    // fetchProperty = (data) =>{
    //     console.log("data is ",data)
    // }

    
    handleFocuskeyphrases_en = (e) =>{
      e.preventDefault();
        this.setState({focuskeyphrases_en:e.target.value})
    }

    handleSeotitle_en = (e) =>{
      e.preventDefault();
        this.setState({seotitle_en:e.target.value})
    }
    handleMetadescription_en = (e) =>{
      e.preventDefault();
        this.setState({metadescription_en:e.target.value})
    }

    handleAlttext_en = (e) =>{
      e.preventDefault();
        this.setState({alttext_en:e.target.value})
    }
    // arabic
    handleFocuskeyphrases_ar = (e) =>{
      e.preventDefault();
        this.setState({focuskeyphrases_ar:e.target.value})
    }

    handleSeotitle_ar = (e) =>{
      e.preventDefault();
        this.setState({seotitle_ar:e.target.value})
    }

   
    handleMetadescription_ar = (e) =>{
      e.preventDefault();
        this.setState({metadescription_ar:e.target.value})
    }

    handleAlttext_ar = (e) =>{
      e.preventDefault();
        this.setState({alttext_ar:e.target.value})
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

    handleUpload_ar = (e) =>{
      e.preventDefault();

      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
            return;
      this.createImage_ar(files[0]);


      //console.log(e.target.files[0])
      this.setState({imageShow_ar:URL.createObjectURL(e.target.files[0])})
  }

  createImage_ar(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.setState({
          image_ar: e.target.result
        })
      };
      reader.readAsDataURL(file);
    }

    handleSaveData = (e) =>{
      const token = cookie.get("token")

     const data = {
       purpose:this.state.purpose,selectedLocation:this.state.selectedLocation,propertytype:this.state.propertytype,
       selectedfeature:this.state.selectedfeature,price_from:this.state.price_from,price_to:this.state.price_to,
       bath_room:this.state.bath_room,bed_room:this.state.bed_room,rent_frequence:this.state.rent_frequence,
       description_en:this.state.description_en,description_ar:this.state.description_ar,
       image:this.state.image,image_ar:this.state.image_ar,alttext_en:this.state.alttext_en,alttext_ar:this.state.alttext_ar,
       focuskeyphrases_en:this.state.focuskeyphrases_en, focuskeyphrases_ar:this.state.focuskeyphrases_ar,
       seotitle_en:this.state.seotitle_en,seotitle_ar:this.state.seotitle_ar,
       metadescription_en:this.state.metadescription_en,metadescription_ar:this.state.metadescription_ar
     }

     axios.post(baseurl+"/api/newpage", data  ,  {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
  }).then((response) =>{
      console.log(response.data)
      Swal.fire({
          title: "Done!",
          text: "Data updated",
          icon: "success",
          timer: 2000,
          button: false
        })
        // this.setState({     
        //   category_id: 0,
        //   title_en:"",
        //   title_ar:"",
        //   description_en: "",
        //   description_ar: "",
        //   image:null,
        //   imageShow:null,})
      //this.props.history.push("/blogs") 
  })
  .catch(err =>console.log("error"))
    }


    
    render() {
 
        return (
            <div className="container-fluid">
                <div className="row">
                <div className="col-sm-3">
                    <select  className="form-select " style={{ height: '3.5rem' }} aria-label="form-select" onChange={this.handlePurpose}>
                      <option selected value="0" >Purpose</option>
                      <option value="1">For Rent</option>
                      <option value='2'>For Sale</option>
                    </select>
                    </div>
                    <div className="col-md-6">
                    <Autocomplete
                      
                      options={this.state.filterLocation}
                      onChange={(event, newValue) => {
                        this.setState({ selectedLocation: newValue });
                     // const data= {selectedLocation: newValue, purpose: this.state.purpose,propertytype:this.state.propertytype}

                      //  this.fetchProperty(data)
                     
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
                    <div className="col-sm-3">
                    <select  className="form-select wizard-required" style={{ height: '2.75rem' }} aria-label="form-select" onChange={this.handlePropertytype}>
                      <option selected value="0" >Property Type</option>
                      {this.state.propertytypes.map((propertytype) =>(
                                <option value={propertytype.id}>{lang == "en"? propertytype.typeName_en:propertytype.typeName_ar}</option>
                      ))}
                      
                    </select>
                    </div>
                 
                </div>
                <div className="row mt-3">
                    <div className="col-sm-3">
                    <MultiSelect
                       options={this.state.features}
                       value={this.state.selectedfeature}
                       onChange={this.setSelectedFeature}
                       labelledBy={"Select"}
                      />
                    </div>
                    
                    <div className="col-sm-2">
                    
                    <input type="text" className="form-control" placeholder="price from"  style={{height:'40px'}} onChange={this.handlePrice_from} />   

                    </div>
                    <div className="col-sm-2">
                
                    <input type="text" className="form-control" placeholder="price to"  style={{height:'40px'}} onChange={this.handlePrice_to} />   

                    </div>
                    
                    <div className="col-sm-2">
                    <select className="form-select form-select-lg mb-3" style={{fontSize: 'unset',height: '2.75rem'}} aria-label="form-select-lg example" onChange={this.handleBathroom}>
                                            <option selected>Bath Room</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">1</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="20+">20+</option>
                                            </select>
                    </div>

                    <div className="col-sm-2">
                    <select className="form-select form-select-lg mb-3" style={{fontSize: 'unset',height: '2.75rem'}} aria-label="form-select-lg example" onChange={this.handleBedroom}>
                                            <option selected value="-1">Bed Room</option>
                                            <option value="0">Studio</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">1</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="20+">20+</option>
                                            </select>
                    </div>

                    <div className="col-sm-1">
                    <select  className="form-select " style={{ height: '3.5rem' }} aria-label="form-select" onChange={this.handlePer}>
                      <option selected value="0" >Per</option>
                      <option value="1">Yearly</option>
                      <option value='2'>Monthly</option>
                      <option value='2'>Weekly</option>
                      <option value='2'>Daily</option>
                    </select>
                    </div>

                </div>
                <div className="row mt-5">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">English</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Arabic</button>
                  </li>
                  
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                      <div className="row mt-5">
                                            <div className="col-md-4">
                                                <label><i className="bi bi-camera"></i>&nbsp;&nbsp; Add Media  </label>
                                                <input type="file" className="form-file-input form-control"  onChange={this.handleUpload} style={{height:'40px'}} />   
                                                <div className="mt-10" style={{margin:'20px'}}>                                       
                                                {this.state.image!=null? <img src={this.state.imageShow} style={{width:'700px',height:'350px'}}/>:null}
                                                </div>  
                                                </div>
                                                <div className="col-md-8">
                                                    <label>Alt Text</label>
                                                <input type="text" onChange={this.handleAlttext_en} className=" form-control"  />   
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                   
                                                <div className="mb-3">
                                                <label>Description</label>
                                                <JoditEditor
                                                //ref={editor}
                                                value={this.state.description_en}
                                                config={config}
                                                tabIndex={1} // tabIndex of textarea
                                                onBlur={newContent => this.setState({description_en:newContent})} // preferred to use only this option to update the content for performance reasons
                                                onChange={newContent => {}}
                                               />
                                                                
                                                    </div>
                                                   </div>
                                                </div>

                                    <div className="row">
                                      <div className="col-md-8">
                                        <div className="tab-content" id="nav-tabContent">
                                          <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                           <div className="mt-5">
                                           <label>Focus keyphrases</label>
                                           <input type="text" className="form-control m-2" onChange={this.handleFocuskeyphrases_en} /> 
                                           <label>SEO Title</label>
                                           <input type="text" className=" form-control m-2" onChange={this.handleSeotitle_en} /> 
                                           <label>Meta description</label>
                                           <textarea type="text" className=" form-control m-2" rows={3} onChange={this.handleMetadescription_en} /> 

                                       </div>
                                      </div>
                                      </div>
                                   </div>
                                  </div>

                  </div>
                  <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                  <div className="row mt-5" dir="rtl">
                                            <div className="col-md-4">
                                                <label><i className="bi bi-camera"></i>&nbsp;&nbsp; Add Media  </label>
                                                <input type="file" className="form-file-input form-control"  onChange={this.handleUpload_ar} style={{height:'40px'}} />   
                                                <div className="mt-10" style={{margin:'20px'}}>                                       
                                                {this.state.image_ar!=null? <img src={this.state.imageShow_ar} style={{width:'700px',height:'350px'}}/>:null}
                                                </div>  
                                                </div>
                                                <div className="col-md-8">
                                                    <label>Alt Text</label>
                                                <input type="text" onChange={this.handleAlttext_ar} className=" form-control"  />   
                                                </div>
                                            </div>
                                            <div className="row" dir="rtl">
                                                <div className="col-md-12">
                                                   
                                                <div className="mb-3">
                                                <label>Description</label>
                                                <JoditEditor
                                                //ref={editor}
                                                value={this.state.description_ar}
                                                config={config}
                                                tabIndex={1} // tabIndex of textarea
                                                onBlur={newContent => this.setState({description_ar:newContent})} // preferred to use only this option to update the content for performance reasons
                                                onChange={newContent => {}}
                                               />
                                                                
                                                    </div>
                                                   </div>
                                                </div>

                                    <div className="row" dir="rtl">
                                      <div className="col-md-8">
                                        <div className="tab-content" id="nav-tabContent">
                                          <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                           <div className="mt-5">
                                           <label>Focus keyphrases</label>
                                           <input type="text" className="form-control m-2" onChange={this.handleFocuskeyphrases_ar} /> 
                                           <label>SEO Title</label>
                                           <input type="text" className=" form-control m-2" onChange={this.handleSeotitle_ar} /> 
                                           <label>Meta description</label>
                                           <textarea type="text" className=" form-control m-2" rows={3} onChange={this.handleMetadescription_ar} /> 

                                       </div>
                                      </div>
                                      </div>
                                   </div>
                                  </div>
                  </div>
                  <div className="mb-3">
                     <button type="submit" className="btn btn-primary me-3 mb-3"  onClick={this.handleSaveData}> <i className="bi bi-plus"></i>  Create Page</button>
                </div>
                </div>
                </div>
              
            </div>
        )
    }
}

export default Newpage
