import React, { Component } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import $ from 'jquery'
const animatedComponents = makeAnimated();
 class Autocomplete extends Component {
   constructor(props){
     super(props)
     this.state = {
      options :[
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ],

      properties:[],
      locations:[]
     }
   }

   componentDidMount(){
     axios.get("http://localhost:8000/api/autocomplete")
     .then(response => this.setState({properties:response.data.propertieslocations}))
     .catch(e  => console.log("error"))

   }

   handleSelect = (e) =>{
     //console.log("ddff")

    // axios.get("http://localhost:8000/api/autocomplete")
    // .then(response => console.log(response.data)
    // // this.setState({properties:response.data.propertieslocations})
    //   )
    // .catch(e  => console.log("error"))
 this.setState({locations:e})
   }

  //  handleLocation = (e) =>{
  //   axios.get("http://localhost:8000/api/autocomplete/"+e.target.value)
  //   .then(response => console.log("res",response.data.propertieslocations))
  //   .catch(e  => console.log("error"))
  //  }

   handleSave = (e) =>{
    e.preventDefault();
    const data = {
      locations:this.state.locations
    }
    axios.post("http://localhost:8000/api/filter",data)
    .then(response => console.log("from server",response.data))
    .catch(e  => console.log("error"))
   }


  render() {
    return (
      <div>
        {/* <input type="text" className="form-control js-example-basic-multiple-limit" onChange={this.handleLocation} /> */}
        {this.state.properties.length > 0?
            <Select options={this.state.properties}    components={animatedComponents} className="basic-multi-select" classNamePrefix="select" isMulti onChange={this.handleSelect} />
          :null}
     <button className="btn btn-primary" onClick={this.handleSave}> Save data</button>
      </div>
    )
  }
}

export default Autocomplete
