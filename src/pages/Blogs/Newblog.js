import React, { Component } from 'react'
import i18next from 'i18next'
import axios from   'axios';
// import SunEditor from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';
import { baseurl } from '../../Components/BaseUrl';
import { CKEditor } from 'ckeditor4-react';
import JoditEditor from "jodit-react";

import cookie from 'js-cookie'
import Swal from 'sweetalert2'
const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    // enableDragAndDropFileToEditor: true,        
    // uploader: { url: baseurl+"/api/blogs",method:"post"}
    uploader: {
        url:'https://services.findproperties.ae/api/uploader'
     //  url:'http://localhost/findproperties/public/api/uploader'
    },
    // filebrowser: {
    //     ajax: {
    //       //  url: 'https://xdsoft.net/jodit/finder/'
    //     },
    //    // height: 880,
    // }

    // zIndex: 0,
    // readonly: false,
    // activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
    // toolbarButtonSize: 'middle',
    // theme: 'default',
    // enableDragAndDropFileToEditor: true,
    // saveModeInCookie: false,
    // spellcheck: true,
    // editorCssClass: false,
    // triggerChangeEvent: true,
    // height: 220,
    // direction: 'ltr',
    // language: 'en',
    // debugLanguage: false,
    // i18n: 'en',
    // tabIndex: -1,
    // toolbar: true,
    // enter: 'P',
    // useSplitMode: false,
    // colorPickerDefaultTab: 'background',
    // imageDefaultWidth: 100,
    // removeButtons: ['source', 'fullsize', 'about', 'outdent', 'indent', 'video', 'print', 'table', 'fontsize', 'superscript', 'subscript', 'file', 'cut', 'selectall'],
    // disablePlugins: ['paste', 'stat'],
    // events: {},
    // textIcons: false,
    // uploader: {
    //   insertImageAsBase64URI: true
    // },
    // placeholder: '',
    // showXPathInStatusbar: false
}
 class Newblog extends Component {

    constructor(props){
        super(props)
        this.state = {
            blogcategories:[],
           // alldata:{},
            category_id: [],
            title_en:"",
            title_ar:"",
            description_en: "",
            description_ar: "",
            image:null,
            imageShow:null,
            image_ar:null,
            imageShow_ar:null,
            alttext_en:"",
            tag:"",
            tags:[],
            focuskeyphrases_en:"",
            seotitle_en:"",
            slug_en:"",
            metadescription_en:"",
            alttext_ar:"",
            tag_ar:"",
            tags_ar:[],
            focuskeyphrases_ar:"",
            seotitle_ar:"",
            slug_ar:"",
            metadescription_ar:"",
        }
    }

    componentDidMount(){
        // var loadScript = function(src) {
        //     var tag = document.createElement('script');
        //     tag.async = false;
        //     tag.src = src;
        //     document.getElementsByTagName('body')[0].appendChild(tag);
        //     }
        //    loadScript('https://cdn.ckeditor.com/4.16.2/standard/ckeditor.js')

        this.setState({ isLoading: true })
        axios.get(baseurl + "/api/blogcategories")
            .then(response => {
                var blogcategoriesdata = response.data.blogcategories
                var loopData = []
                var i ;
                for(i=0; i < blogcategoriesdata.length; i++){
                    blogcategoriesdata[i].checkedcheckbox=false
                  
                }

                this.setState({ isLoading: false, blogcategories: blogcategoriesdata })

          
            })
            .catch(err =>console.log("error"))

          //  var editor=   CKEDITOR.replace( 'editor1' );
    }
    handleTextarea =(e) =>{
        e.preventDefault()
        console.log(e.target.value)
    }
    // onEditorChange( evt ) {
    //    // evt.preventDefault()
    //     //console.log(evt.editor.getData())
    //     this.setState({ alldata: evt.editor.getData() })
    // }


    handleCategoryId = (blogcat,e) =>{
        let index= this.state.blogcategories.indexOf(blogcat);
   
      
        var i;
        for(i=0;i< this.state.blogcategories.length;i++){
            this.state.blogcategories[i].checkedcheckbox = false
            if(i == index){
                this.state.blogcategories[i].checkedcheckbox = true
                this.setState({})
                
            }
        }
        this.setState({category_id:blogcat.id})
    }

    handleTitle_en = (e) =>{
        this.setState({title_en:e.target.value})
    }

    handleTitle_ar = (e) =>{
        this.setState({title_ar:e.target.value})
    }

    handleDescription_en = (e) =>{
        this.setState({description_en:e.target.value})
    }

    handleDescription_ar = (e) =>{
        this.setState({description_ar:e.target.value})
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

      handleTag =(e) =>{
        // console.log(e.target.value)
      //  return
          this.setState({tag:e.target.value})
      }

      handleAddTag = (e) =>{
          e.preventDefault();
          if(this.state.tag == "")
          return
          const data = {tag:this.state.tag}
          this.setState({tags:[...this.state.tags,data]})
          this.setState({tag:""})
      }

      handleTag_ar =(e) =>{
        // console.log(e.target.value)
      //  return
          this.setState({tag_ar:e.target.value})
      }

      handleAddTag_ar = (e) =>{
          e.preventDefault();
          if(this.state.tag_ar == "")
          return
          const data = {tag_ar:this.state.tag_ar}
          this.setState({tags_ar:[...this.state.tags_ar,data]})
          this.setState({tag_ar:""})
      }

      handleFocuskeyphrases_en = (e) =>{
        e.preventDefault();
          this.setState({focuskeyphrases_en:e.target.value})
      }

      handleSeotitle_en = (e) =>{
        e.preventDefault();
          this.setState({seotitle_en:e.target.value})
      }

      handleSlug_en = (e) =>{
        e.preventDefault();
          this.setState({slug_en:e.target.value})
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

      handleSlug_ar = (e) =>{
        e.preventDefault();
          this.setState({slug_ar:e.target.value})
      }
      handleMetadescription_ar = (e) =>{
        e.preventDefault();
          this.setState({metadescription_ar:e.target.value})
      }

      handleAlttext_ar = (e) =>{
        e.preventDefault();
          this.setState({alttext_ar:e.target.value})
      }

      handleDelete = (tag,e) =>{
          e.preventDefault();
          let index = this.state.tags.indexOf(tag)
          
          var mydata = this.state.tags
          var loopData = []
          var i;
          for (i = 0; i < mydata.length; i++) {
              if (i == index) {
                  mydata.splice(index, 1);
              }
          }
          this.setState({tags:mydata})

      }

      handleDelete_ar = (tag,e) =>{
        e.preventDefault();
        let index = this.state.tags_ar.indexOf(tag)
        
        var mydata = this.state.tags_ar
        var loopData = []
        var i;
        for (i = 0; i < mydata.length; i++) {
            if (i == index) {
                mydata.splice(index, 1);
            }
        }
        this.setState({tags_ar:mydata})

    }


    handleSaveData = (e) =>{
        e.preventDefault();
        const data = {
         category_id:this.state.category_id,title_en:this.state.title_en,title_ar:this.state.title_ar,
         description_en:this.state.description_en,description_ar:this.state.description_ar,
         image:this.state.image,image_ar:this.state.image_ar,alttext_en:this.state.alttext_en,alttext_ar:this.state.alttext_ar,
         tags_en:this.state.tags,tags_ar:this.state.tags_ar,
         focuskeyphrases_en:this.state.focuskeyphrases_en, focuskeyphrases_ar:this.state.focuskeyphrases_ar,
         seotitle_en:this.state.seotitle_en,seotitle_ar:this.state.seotitle_ar,
         slug_en:this.state.slug_en, slug_ar:this.state.slug_ar,
         metadescription_en:this.state.metadescription_en,metadescription_ar:this.state.metadescription_ar
        }
        const token = cookie.get("token")
        axios.post(baseurl+"/api/newblog", data  ,  {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept':'application/json',
              'Content-Type':'application/json'
            }
        }).then((response) =>{
           
            Swal.fire({
                title: "Done!",
                text: "Data updated",
                icon: "success",
                timer: 2000,
                button: false
              })
              this.setState({     
                category_id: 0,
                title_en:"",
                title_ar:"",
                description_en: "",
                description_ar: "",
                image:null,
                imageShow:null,})
            this.props.history.push("/blogs") 
        })
        .catch(err =>console.log("error"))
    }

    
    render() {
        console.log(this.state.blogcategories)

        const lang =localStorage.getItem("lang") || "en";
        return (
            <div>
       
            <div className="container-fluid">
             
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">New Post</h4>
                                </div>
                                <div className="card-body">
                                    <div className="basic-form">
                                        <form>
                                    
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
                                                <div className="mt-5">
                                            <div className="col-md-12">
                                                   
                                                   <div className="mb-3">
                                                   <label>Title</label>
                                                   <input type="text" onChange={this.handleTitle_en}  className="form-control input-rounded" placeholder="Title" />
                                               </div>
                                            </div>
                                            <div className="row">
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

                                                <div className="row" style={{margin:'5px'}} >
                                                <div className="col-md-8">
                                       
                                                    <div className="tab-content" id="nav-tabContent">
                                                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

                                                    <div className="mt-5">
                                                    <label>Focus keyphrases</label>
                                                    <input type="text" className="form-control m-2" onChange={this.handleFocuskeyphrases_en} /> 

                                                    <label>SEO Title</label>
                                                    <input type="text" className=" form-control m-2" onChange={this.handleSeotitle_en} /> 

                                                    <label>Slug</label>
                                                    <input type="text" className=" form-control m-2"  onChange={this.handleSlug_en} /> 

                                                    <label>Meta description</label>
                                                    <textarea type="text" className=" form-control m-2" rows={3} onChange={this.handleMetadescription_en} /> 

                                                   </div>
                                                    </div>



                                                    
                                                        
                                              
                                                      
                                                 
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div>
                                                    <label>Categories</label>
                                                    <ul className="list-group m-3">
                                                    {this.state.blogcategories.map((blogcat) => (
                                                         <li class="list-group-item">
                                                              <input className="form-check-input" type="radio" name="flexRadioDefault" checked={blogcat.checkedcheckbox} onClick={this.handleCategoryId.bind(this, blogcat)} />
                                                         {/* <input className="form-check-input" type="checkbox" checked={blogcat.checkedcheckbox} onClick={this.handleCategoryId.bind(this, blogcat)}  /> */}
                                                         &nbsp;&nbsp;
                                                       {blogcat.name_en}
                                                         </li>

                                                     )
                                                      )}  
                                                 
                                               
                                               
                                                    </ul> 
                                                   </div>
                                                   <div className="row" style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                    <label>Tags</label>
                                                    <div style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                    <input type="text" value={this.state.tag} className="form-control" onChange={this.handleTag} /> 
                                                    <button type="submit" className="btn btn-outline-primary btn-sm m-1" onClick={this.handleAddTag}> Add</button>
                                                    </div>
                                                    <table className="table ">
                                                        <tbody>
                                                        {this.state.tags.map((tag) =>(
                                                            <tr>
                                                                <td>{tag.tag}</td>
                                                                    <td className="float-right"><i className="bi bi-x" style={{cursor:'pointer'}} onClick={this.handleDelete.bind(this,tag)}></i></td>
                                                            
                                                            </tr>
                                                        ))}
                                                    
                                               </tbody>
                                                    </table> 
                                                      </div>

                                                </div>
                                                </div>

                                           </div>
                                            </div>
                                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab" dir="rtl">

                                            <div className="mt-5">
                                            <div className="col-md-12">
                                                   
                                                   <div className="mb-3">
                                                   <label>العنوان</label>
                                                   <input type="text" onChange={this.handleTitle_ar}  className="form-control input-rounded" placeholder="Title" />
                                               </div>
                                            </div>
                                            <div className="row">
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
                                            <div className="row">
                                                <div className="col-md-12">
                                                   
                                                <div className="mb-3">
                                                <label>الوصف</label>
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

                                                <div className="row" style={{margin:'5px'}} >
                                                <div className="col-md-8">
                                       
                                                    <div className="tab-content" id="nav-tabContent">
                                                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

                                                    <div className="mt-5">
                                                    <label>Focus keyphrases</label>
                                                    <input type="text" className="form-control m-2" onChange={this.handleFocuskeyphrases_ar} /> 

                                                    <label>SEO Title</label>
                                                    <input type="text" className=" form-control m-2" onChange={this.handleSeotitle_ar} /> 

                                                    <label>Slug</label>
                                                    <input type="text" className=" form-control m-2"  onChange={this.handleSlug_ar} /> 

                                                    <label>Meta description</label>
                                                    <textarea type="text" className=" form-control m-2" rows={3} onChange={this.handleMetadescription_ar} /> 

                                                   </div>
                                                    </div>



                                                    
                                                        
                                              
                                                      
                                                 
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div>
                                                    <label>الفئات</label>
                                                    <ul className="list-group m-3">
                                                    {this.state.blogcategories.map((blogcat) => (
                                                         <li className="list-group-item">
                                                              <input className="form-check-input" type="radio" name="" checked={blogcat.checkedcheckbox} onClick={this.handleCategoryId.bind(this, blogcat)} />
                                                         {/* <input className="form-check-input" type="checkbox" checked={blogcat.checkedcheckbox} onClick={this.handleCategoryId.bind(this, blogcat)}  /> */}
                                                         &nbsp;&nbsp;
                                                       {blogcat.name_ar}
                                                         </li>

                                                     )
                                                      )}  
                                                 
                                               
                                               
                                                    </ul> 
                                                   </div>
                                                   <div className="row" style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                    <label>Tags</label>
                                                    <div style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                    <input type="text" value={this.state.tag_ar} className="form-control" onChange={this.handleTag_ar} /> 
                                                    <button type="submit" className="btn btn-outline-primary btn-sm m-1" onClick={this.handleAddTag_ar}> اضافة</button>
                                                    </div>
                                                    <table className="table ">
                                                        <tbody>
                                                        {this.state.tags_ar.map((tag) =>(
                                                            <tr>
                                                                <td>{tag.tag_ar}</td>
                                                                    <td className="float-right"><i className="bi bi-x" style={{cursor:'pointer'}} onClick={this.handleDelete_ar.bind(this,tag)}></i></td>
                                                            
                                                            </tr>
                                                        ))}
                                                    
                                               </tbody>
                                                    </table> 
                                                      </div>

                                                </div>
                                                </div>

                                           </div>
                                            </div>
                                            </div>
                                          

                                            <div className="mb-3">
                                            <button type="submit" className="btn btn-primary me-3 mb-3"  onClick={this.handleSaveData}> <i className="bi bi-plus"></i>  Add Post</button>
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

export default Newblog
