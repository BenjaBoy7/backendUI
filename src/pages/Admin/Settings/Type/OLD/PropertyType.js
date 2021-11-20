import React, { Component } from 'react';
import axios from 'axios'
//import swal from 'sweetalert';
import Swal from 'sweetalert2'
// import Pagination from './Pagination';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import { baseurl } from '../../../../Components/BaseUrl';

class PropertyType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            propertytypes: [],
            propertyType_en: "",
            propertyType_ar: "",
            // currentPage: 1,
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
        $(document).ready(function () {
            setTimeout(function () {
                $('#myTable').DataTable();
            }, 1000);
        });
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


        axios.get(baseurl + "propertytypes")
            .then(response => {
                //    console.log(response.data)
                this.setState({ isLoading: false, propertytypes: response.data.propertytypes })
                $(document).ready(function () {
                    setTimeout(function () {
                        $('#myTable').DataTable();
                    }, 1000);
                });
            })
            .catch()



    }
    // handle text input from english category 
    property_enHandle = (e) => {
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
        const data = {
            typeName_en: this.state.propertyType_en,
            typeName_ar: this.state.propertyType_ar
        }
        axios.post("http://10.39.1.76/findproperties/public/api/propertytypes", data)
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
            .catch()
    }

    handelEdit = (propertyType, e) => {

        axios.get(baseurl + "propertytype/" + propertyType)
            .then(response => {
                console.log(response.data)
                //this.setState({categories:response.data.categories})
            })
            .catch()
    }
    handelDelete = (propertyType, e) => {
        e.preventDefault();



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
                    axios.delete(baseurl + "propertytypes/" + propertyType)
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
                    <div class="col-xl-12">
                        <div class="d-flex flex-wrap">
                            <button type="button" class="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#AddCategoryModal">+ Add Property Type</button>
                        </div>
                    </div>
                    {/*Modal to Add Category  */}
                    <div class="modal fade" id="AddCategoryModal" style={{ display: 'none' }} aria-modal="true" >
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Add Property Type</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal">
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="basic-form">
                                        <form>
                                            <div class="mb-3">
                                                <input type="text" name="typeName_en" class="form-control input-default" placeholder="Property Type" onChange={this.property_enHandle} value={this.state.propertyType_en} />
                                            </div>
                                            <div class="mb-3">
                                                <input type="text" name="typeName_ar" class="form-control input-rounded" placeholder="Arabic Property Type" onChange={this.property_arHandle} value={this.state.propertyType_ar} />
                                            </div>
                                            <div class="mb-3">
                                                <button type="submit" class="btn btn-primary me-3 mb-3" placeholder="Arabic Property Type" onClick={this.saveData}>Submit Property Type</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* row */}

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Property Types</h4>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
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
                                                            <td>
                                                                <div class="ms-auto">
                                                                    <a class="btn btn-primary shadow sharp me-1" onClick={this.handelEdit.bind(this, ppty.id)}><i class="fa fa-edit"></i></a>
                                                                    <a class="btn btn-danger shadow sharp"><i class="fa fa-trash" onClick={this.handelDelete.bind(this, ppty.id)}></i></a>
                                                                </div>
                                                            </td>

                                                        </tr>
                                                    )

                                                    )}
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>

            </div>
        );
    }
}

export default PropertyType;