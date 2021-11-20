import React, { Component } from 'react'
import './Tech.css'
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
import i18next from 'i18next'
import { baseurl } from './Components/BaseUrl';
import toast, { Toaster } from 'react-hot-toast';

 class TechSupport extends Component {
     constructor(props){
         super(props)
         this.state={
             phone:"",
             email:"",
             message:"",
             message_status:"",
             isLoading:false,
             status:false,
             msg:""
         }
     }

     handlePhone = (e) =>{
         this.setState({phone:e})
     }
     handleEmail = (e) =>{
        this.setState({email:e.target.value})
    }
    handleMessage = (e) =>{
        this.setState({message:e.target.value})
    }
    handleSubmit = (e) =>{
        e.preventDefault()
       if(this.state.phone == "" || this.state.email == "" || this.state.message == "")
       return;
        const data = {phone:this.state.phone,email:this.state.email,message:this.state.message}
         this.setState({isLoading:true})
        axios.post(baseurl+"/api/technicalmessage", data)
        .then(response =>{
          console.log(response.data)
            toast.success(response.data.msg)
            this.setState({ 
            isLoading:false,
            phone:"",
            email:"",
            message:"",
            status:true,
            msg:response.data.msg,
           // buttonstatus:"blo"
        })
  
           //this.setState({input:input});
            // Swal.fire({
            //     title: "Done!",
            //     text: "Category is added to database.",
            //     icon: "success",
            //     timer: 2000,
            //     button: false
            //   })
            //   this.props.history.push("/agents")
              
        })
        .catch(err =>{
            this.setState({isLoading:false})
            console.log("error",err)
            toast.error("Something wrong.",err)
        })

       // console.log("data",data)


       
    }

    buttonRender =() => {
        if(this.state.isLoading){
            return (
                <button type="button" class="btn btn-outline-primary" disabled onClick={this.handleSubmit}><ClipLoader color={"white"} loading={true}  size={25} /> Send Message</button>
            
            )
        }
        return (
            <button type="button" class="btn btn-outline-primary" onClick={this.handleSubmit}>Send Message</button>
        )
        
    }

    render() {
        return (
            <div>
                <div className="alert alert-primary ">
                <Toaster />
                   <h1>Technical support</h1>
               </div>
           <div class="container">
          
              
          
    <div class="content m-5">
      <div class="left-side">
        <div class="address details">
          <i class="fas fa-map-marker-alt"></i>
          <div class="topic">Address</div>
          <div class="text-one">UAE, Ajman</div>
          <div class="text-two">Alrashdia , Howrizon tower , B2 , office 707</div>
        </div>
        {/* <div class="phone details">
          <i class="fas fa-phone-alt"></i>
          <div class="topic">Phone</div>
          <div class="text-one">+0098 9893 5647</div>
          <div class="text-two">+0096 3434 5678</div>
        </div> */}
        <div class="email details">
          <i class="fas fa-envelope"></i>
          <div class="topic">Email</div>
          <div class="text-one">info@findproperties.com</div>
          <div class="text-two">support@findproperties.com</div>
        </div>
      </div>
      <div class="right-side">
        <div class="topic-text">Send us a message </div>
        <p>If you have any problem, you can send me message from here. It's my pleasure to help you.</p>
      <form action="#">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="example@example.com" onChange={this.handleEmail}  value={this.state.email} />
        </div>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Mobile</label>
            <ReactPhoneInput
          inputExtraProps={{
            name: "phone",
            required: true,
            autoFocus: true
          }}
          //defaultCountry={"ae"}
          value={this.state.phone}
          onChange={this.handlePhone}
          country={"ae"}
          inputStyle={{    marginLeft: '24px'
            }}
          
        />
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Message</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.handleMessage}  value={this.state.message}></textarea>
      </div>
      
        <div class="">
        {this.buttonRender()}
        
        </div>
      </form>
    </div>
    </div>
  </div>
            </div>
        )
    }
}

export default TechSupport
