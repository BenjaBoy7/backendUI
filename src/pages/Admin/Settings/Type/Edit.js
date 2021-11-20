import React, { Component } from 'react'
import axios  from 'axios';
import Swal from 'sweetalert2'
import cookie from 'js-cookie'
import { baseurl } from '../../../../Components/BaseUrl';
 class EditPropertyType extends Component {
   constructor(props){
       super(props)
       this.state={
        propertytypes: [],
        propertyType_en: "",
        propertyType_ar: "",
        categoryNameEn: "",
        categoryNameAr: "",
        categories: [],
        // occupancy: 0,
        // furnishedornot: 0,
        // rentornot: 0,
        // readyoffplan: 0,

      }
      
   }
   componentDidMount()
   {

       let id = this.props.match.params.id;

       const token = cookie.get("token")

       axios.get(baseurl+"/api/propertytypes/"+id,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
       .then(response =>{
           console.log(response.data)
         this.setState({             
             bedandbath:response.data.bedandbath ==1 ? true: false,
             occupancy:response.data.occupancy ==1 ? true: false,
             furnishedornot:response.data.furnishedornot ==1 ? true: false,
             rentornot:response.data.rentornot ==1 ? true: false,
             readyoffplan:response.data.readyoffplan ==1 ? true: false,
             propertyType_en:response.data.typeName_en,
             propertyType_ar:response.data.typeName_ar,
             categoryId:response.data.category_id, 
             categoryNameEn: response.data.name_en, 
             categoryNameAr: response.data.name_ar,
             })
        //this.setState({categories:response.data.categories})
       })
       .catch()
       //fetch categories
       axios.get(baseurl+"/api/categories",{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept':'application/json',
          'Content-Type':'application/json'
        }})
       .then(response => {
            //console.log(response.data)
           this.setState({ isLoading: false, categories: response.data.categories })
           // $(document).ready(function () {
           //     setTimeout(function () {
           //         $('#myTable').DataTable();
           //     }, 1000);
           // });
       })
       .catch()
   }
 furnishedornot_Handle = (e) => {
     this.setState({furnishedornot: !this.state.furnishedornot })
    }
 bedandbath_Handle = (e) => {
        this.setState({bedandbath: !this.state.bedandbath })
       } 
 occupancy_Handle = (e) => {
        this.setState({occupancy: !this.state.occupancy })
       }
  readyoffplan_Handle = (e) => {
        this.setState({readyoffplan: !this.state.readyoffplan })
    }
  rentornot_Handle = (e) => {
        this.setState({rentornot: !this.state.rentornot })
    }
property_enHandle = (e) =>{
    e.preventDefault();
    this.setState({propertyType_en:e.target.value})
}
 // handle text input from english category 
 property_arHandle = (e) =>{
     e.preventDefault();
     this.setState({propertyType_ar:e.target.value})
 }
 category_enHandle = (e) =>{
    e.preventDefault();
    this.setState({categoryId:e.target.value})
  }

 saveData =(e) =>{
    let id = this.props.match.params.id;

    const token = cookie.get("token")

    e.preventDefault();
    const data = {
        category_id: this.state.categoryId,
        typeName_en:this.state.propertyType_en,
        typeName_ar:this.state.propertyType_ar,
        furnishedornot: ~~this.state.furnishedornot,
        rentornot: ~~this.state.rentornot,
        occupancy: ~~this.state.occupancy,
        readyoffplan: ~~this.state.readyoffplan,
        bedandbath: ~~this.state.bedandbath

    }

    console.log(data)

    axios.put(baseurl+"/api/propertytypes/"+id, data,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept':'application/json',
          'Content-Type':'application/json'
        }})
    .then(response =>{
        this.props.history.push("/propertytypes")
        Swal.fire({
            title: "Done!",
            text: "Category successfully  Updated .",
            icon: "success",
            timer: 2000,
            button: false
          })
          this.setState({propertyType_en:"", propertyType_ar:""})
    })
    .catch()

}
    render() {
        return (
            <div>
            <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Edit Property Type</h4>
                                </div>
                                <div className="card-body">
                                    <div className="basic-form">
                                        <form>
                                            <div className="mb-3">
                                                <select onChange={this.category_enHandle} className="form-select select2-container--default" aria-label="form-select">
                                                    <option selected value={this.state.categoryId}>{this.state.categoryNameEn}</option>
                                                    {this.state.categories.map((cate) =>(
                                                        this.state.categoryId !==cate.id?
                                                        <option value={cate.id}>{cate.name_en}</option>:null
                                                      )
                                                    )}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <input type="text" className="form-control input-default " placeholder="English Property Type" onChange={this.property_enHandle} defaultValue={this.state.propertyType_en} />
                                            </div>
                                            <div className="mb-3">
                                                <input type="text" className="form-control input-rounded" placeholder="Arabic Property Type" onChange={this.property_arHandle} defaultValue={this.state.propertyType_ar} />
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={this.furnishedornot_Handle} checked={this.state.furnishedornot} />
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Furnished/UnFurnished Feature</label>
                                                </div>
                                            </div>   
                                            <div className="mb-3">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={this.rentornot_Handle} checked={this.state.rentornot}/>
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Rent Fields</label>
                                                </div>
                                            </div> 
                                            <div className="mb-3">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={this.occupancy_Handle} checked={this.state.occupancy}/>
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Occupancy Features</label>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={this.readyoffplan_Handle} checked={this.state.readyoffplan}/>
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Ready/Off Plan</label>
                                                </div>
                                            </div>   
                                            <div className="mb-3">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={this.bedandbath_Handle} checked={this.state.bedandbath}/>
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Bath/Bed Room field</label>
                                                </div>
                                            </div>   
                                            
                                            <div className="mb-3">
                                            <button type="submit" className="btn btn-primary me-3 mb-3" onClick={this.saveData} >Update Property Type</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        )
    }
}
export default EditPropertyType