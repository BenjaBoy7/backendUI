import React, { Component } from 'react';
import axios from 'axios'
//import swal from 'sweetalert';
import Swal from 'sweetalert2'
// import Pagination from './Pagination';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import { baseurl } from '../../../../Components/BaseUrl';
import { Link } from 'react-router-dom';
import cookie from 'js-cookie'
class PropertyType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories:[],
            propertytypes: [],
            propertyType_en: "",
            propertyType_ar: "",
            categoryId: "",
            occupancy: 0,
            furnishedornot: 0,
            landornot: 0,
            comandresornot:0,
            rentornot: 0,
            readyoffplan: 0,
            bedandbath: 0
            // setCurrentPage: 1,
            // PerPage: 10,
            // isLoading: false
            // modalIntialState:"none", 
            // showModal:"modal fade show",
            // databsdismiss: ""
        }
    }

    componentDidMount() {

        this.fetchData();
       
        // var loadScript = function(src) {
        //     var tag = document.createElement('script');
        //     tag.async = false;
        //     tag.src = src;
        //     document.getElementsByTagName('body')[0].appendChild(tag);
        //     }

        //     loadScript('./vendor/datatables/js/jquery.dataTables.min.js')
        //     loadScript('./js/plugins-init/datatables.init.js')


    }

    fetchData = () => {

        this.setState({ isLoading: true })
        const token = cookie.get("token")

        axios.get(baseurl + "/api/propertytypes",{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
            .then(response => {
                //    console.log(response.data)
                this.setState({ isLoading: false, propertytypes: response.data.propertytypes })

                if (this.state.propertytypes.length == 0) {
                    console.log("length = 0")
                } else {
    
                    $(document).ready(function () {
    
                        $('#myTable').DataTable();
    
                    });
                    this.setState({ isLoading: false })
                }
              
            })
            .catch(e =>console.log("error"))
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
            .catch(e =>console.log("error"))


    }
    //handle select on Change
        category_enHandle = (e) => {
            e.preventDefault();
            this.setState({ categoryId: e.target.value })
    
        }

    // handle text input from english category 
    property_enHandle = (e) => {
        console.log(e)
        e.preventDefault();
        this.setState({ propertyType_en: e.target.value })

    }

    // handle text input from english category 
    property_arHandle = (e) => {
        e.preventDefault();

        this.setState({ propertyType_ar: e.target.value })

    }

    saveData = (e) => {
        e.preventDefault();
        const token = cookie.get("token")
        const data = {
            category_id: this.state.categoryId,
            typeName_en: this.state.propertyType_en,
            typeName_ar: this.state.propertyType_ar,
            furnishedornot: this.state.furnishedornot,
            landornot: this.state.landornot,
            comandresornot: this.state.comandresornot,
            rentornot: this.state.rentornot,
            occupancy: this.state.occupancy,
            readyoffplan: this.state.readyoffplan,
            bedandbath: ~~this.state.bedandbath

        }
        axios.post(baseurl+"/api/propertytypes", data,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
            .then(response => {
                console.log(response.data)
                Swal.fire({
                    title: "Done!",
                    text: "Property Type is added to database.",
                    icon: "success",
                    timer: 2000,
                    button: false
                })
                this.setState({ propertyType_en: "", propertyType_ar: "" })
                this.fetchData();
            })
            .catch(e =>console.log("error"))
    }
    furnishedornot_Handle = (e) => {
       // console.log(e.target.checked)
        this.setState({furnishedornot: ~~!this.state.furnishedornot })
       }

       landornot_Handle = (e) => {
        // console.log(e.target.checked)
         this.setState({landornot: ~~!this.state.landornot })
        }

        comandresornot_Handle = (e) => {
            // console.log(e.target.checked)
             this.setState({comandresornot: ~~!this.state.comandresornot })
            }

       bedandbath_Handle = (e) => {
        this.setState({bedandbath: !this.state.bedandbath })
       } 
    occupancy_Handle = (e) => {
           this.setState({occupancy: ~~!this.state.occupancy })
          }
     readyoffplan_Handle = (e) => {
           this.setState({readyoffplan: ~~!this.state.readyoffplan })
       }
     rentornot_Handle = (e) => {
           this.setState({rentornot: ~~!this.state.rentornot })
       }
   property_enHandle = (e) =>{
       e.preventDefault();
       this.setState({propertyType_en:e.target.value})
   }
    handelEdit = (propertyType, e) => {
        const token = cookie.get("token")
        axios.get(baseurl + "/api/propertytype/" + propertyType,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }})
            .then(response => {
                console.log(response.data)
                //this.setState({categories:response.data.categories})
            })
            .catch(e =>console.log("error"))
    }
    handelDelete = (propertyType, e) => {
        e.preventDefault();
        const token = cookie.get("token")
        if (!propertyType || propertyType < 1) {
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
                    axios.delete(baseurl + "/api/propertytypes/" + propertyType,{
                        headers: {
                          'Authorization': `Bearer ${token}`,
                          'Accept':'application/json',
                          'Content-Type':'application/json'
                        }})
                        .then(response => {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            this.fetchData();
                            //this.setState({categories:response.data.categories})
                        })
                        .catch(err => console.log(err))
                }
            })



        }
    }

    render() {
        // const {loading,categories,currentPage,categoriesPerPage}=this.state;

        // const indexOfLastCategory = currentPage * categoriesPerPage;
        // const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
        // const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

        // const paginate = (pageNumber) =>{
        //     this.setState({ currentPage: pageNumber})
        // }
        return (
            <div>
                <div className="container-fluid">
                    <div className="col-xl-12">
                        <div className="d-flex flex-wrap">
                            <button type="button" className="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#AddCategoryModal">+ Add Property Type</button>
                        </div>
                    </div>
                    {/*Modal to Add Category  */}
                    <div className="modal fade" id="AddCategoryModal" style={{ display: 'none' }} aria-modal="true" >
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add Property Type</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal">
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="basic-form">
                                        <form>
                                            <div className="mb-3">
                                                <select  onChange={this.category_enHandle} className="form-select select2-container--default" style= {{height: '2.75rem'}}aria-label="form-select">
                                                    <option selected>Select Category</option>
                                                    {this.state.categories.map((cate) =>(
                                                        <option value={cate.id}>{cate.name_en}</option>
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
                                                    <input className="form-check-input" type="checkbox"  onChange={this.furnishedornot_Handle} checked={this.state.furnishedornot} />
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Furnished/UnFurnished Feature</label>
                                                </div>
                                            </div>  
                                            <div className="mb-3">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox"  onChange={this.landornot_Handle} checked={this.state.landornot} />
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Land Feature</label>
                                                </div>
                                            </div>  
                                            <div className="mb-3">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" onChange={this.comandresornot_Handle} checked={this.state.comandresornot} />
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Comercial and Recedential Feature</label>
                                                </div>
                                            </div>  
                                            <div className="mb-3">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox"  onChange={this.rentornot_Handle} checked={this.state.rentornot}/>
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Rent Fields</label>
                                                </div>
                                            </div> 
                                            <div className="mb-3">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox"  onChange={this.occupancy_Handle} checked={this.state.occupancy}/>
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Occupancy Features</label>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox"  onChange={this.readyoffplan_Handle} checked={this.state.readyoffplan}/>
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Ready/Off Plan</label>
                                                </div>
                                            </div> 
                                            <div className="mb-3">
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox"  onChange={this.bedandbath_Handle} checked={this.state.bedandbath}/>
                                                    <label className="form-check-label" for="flexSwitchCheckDefault">Bath/Bed Room field</label>
                                             </div>
                                            </div>        
                                            <div className="mb-3">
                                                <button type="submit" className="btn btn-primary me-3 mb-3" placeholder="Arabic Property Type" onClick={this.saveData}>Submit Property Type</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* row */}
                    {this.state.propertytypes.length !=0 && !this.state.isLoading?
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Property Types</h4>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                    {this.state.propertytypes.length !=0 && !this.state.isLoading? 
                                        <table id="myTable" className="display" style={{ minWidth: 845 }}>
                                            <thead>
                                                <tr>
                                                    <th>Property Type English</th>
                                                    <th>Property Type Arabic</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                   {this.state.propertytypes.map((ppty) => (
                                                        <tr>
                                                            <td>{ppty.typeName_en}</td>
                                                            <td>{ppty.typeName_ar}</td>
                                                            {/* <td>{cate.categoryId}</td> */}
                                                            <td>
                                                                <div className="ms-auto">
                                                                <Link  className="btn btn-primary shadow  sharp me-1" to={"/edit-propertytype/"+ppty.id} id="EditCategoryModal"><i class="fa fa-edit"></i></Link>
                                                                    <Link className="btn btn-danger shadow sharp" onClick={this.handelDelete.bind(this, ppty.id)}><i class="fa fa-trash"></i></Link>
                                                                </div>
                                                            </td>

                                                        </tr>
                                                    )

                                                    )}
                                            </tbody>

                                        </table> :"nodata"}
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>:""}
                </div>

            </div>
        );
    }
}

export default PropertyType;