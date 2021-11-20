import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import cookie from 'js-cookie'
import {connect} from 'react-redux'
import i18next from 'i18next'
import { baseurl ,baseurlImg } from './BaseUrl'
import axios from 'axios'
import Pusher from 'pusher-js'
import Moment from 'react-moment';
import Profileheader from './Profileheader'
import Swal from 'sweetalert2'
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import MultiSelect from "react-multi-select-component";
import JoditEditor from "jodit-react";
import parse from 'html-react-parser';
 function Header() {
  const lang =localStorage.getItem("lang") || "en";
  const activeUser = cookie.get("user_id");
		const name = cookie.get("name");
		const email = cookie.get("email");
		const name_ar = cookie.get("name_ar");
		const profile = cookie.get("profile");

    const [count,setCount] = useState(0)
    const [users,setUsers] = useState([])
    const [messages,setMessages] = useState([])
    const [firsttab,setFirsttab] = useState("card mb-sm-3 mb-md-0 contacts_card dz-chat-user-box")
    const [secondtab,setSecondtab] = useState("card chat dz-chat-history-box d-none")

    const [liveUser,setLiveUser] = useState("")
    const [messageBody,setMessageBody] = useState("")
    const [liveUser_id,setLiveUser_id] = useState(0)
    const [locations,setLocations] = useState([])
    const [selectedlocations,setSelectedlocations] = useState([])
    const [languages,setLanguages] = useState([])
    const [selectedLanguages,setSelectedLanguages] = useState([])
    const [description_en,setDescription_en] = useState("")
    const [nationalities,setNationalities] = useState([])
    const [selectednationality,setSelectedNationality] = useState(0)
    const [agents,setAgents] = useState([])
    const [propertytypes,setPropertytypes] = useState([])
    const [selectedAgents,setSelectedAgents] = useState([])
        const token = cookie.get("token")
    const config = {
      readonly: false, // all options from https://xdsoft.net/jodit/doc/
      uploader: {
        url: baseurl+'/api/uploader'
    },
      // enableDragAndDropFileToEditor: true,        
      // uploader: { url: baseurl+"/api/blogs",method:"post"}
      // uploader: {
      //     url: 'https://xdsoft.net/jodit/finder/?action=fileUpload'
      // },
      // filebrowser: {
      //     ajax: {
      //         url: 'https://xdsoft.net/jodit/finder/'
      //     },
      //     height: 580,
      // }
  }

    useEffect(() => {
      var loadScript = function(src) {
        var tag = document.createElement('script');
        tag.async = false;
        tag.src = src;
        document.getElementsByTagName('body')[0].appendChild(tag);
        }
      loadScript('./vendor/global/global.min.js')
    //     loadScript('./vendor/chart.js/Chart.bundle.min.js')
    //    loadScript('./vendor/apexchart/apexchart.js')
    //     loadScript('./vendor/peity/jquery.peity.min.js')
    //     loadScript('./js/dashboard/dashboard-1.js')
    //     loadScript('./vendor/dotted-map/js/contrib/jquery.smallipop-0.3.0.min.js')
    //    loadScript('./vendor/dotted-map/js/contrib/suntimes.js')
    //   loadScript('./vendor/dotted-map/js/contrib/color-0.4.1.js')
    //   loadScript('./vendor/dotted-map/js/world.js')
    //   loadScript('./vendor/dotted-map/js/smallimap.js')
  
       // loadScript('./js/dashboard/dotted-map-init.js')
       loadScript('./js/custom.js')
         loadScript('./js/deznav-init.js')
     //  loadScript('./vendor/jquery-nice-select/js/jquery.nice-select.min.js')

      axios.get(baseurl+"/api/users/"+activeUser)
      .then(response =>{
        setUsers(response.data.users)
      }
      
        )
      .catch(e => console.log("error"))
    }, [])

    useEffect(() => {
      axios.get(baseurl+"/api/locations")
      .then(response =>{
        setLocations(response.data.locations)
      }
      
        )
      .catch(e => console.log("error"))

    },[])
    useEffect(() => {
      axios.get(baseurl+"/api/languages")
      .then(response =>{
        setLanguages(lang=="en"?response.data.languages_en:response.data.languages_ar)
       // console.log("lang",response.data.languages)
      }
      
        )
      .catch(e => console.log("error"))

    },[])

    useEffect(() => {
      axios.get(baseurl+"/api/agentinfo")
      .then(response =>{
        setNationalities(response.data.nationality)
       // console.log("lang",response.data.languages)
      }
      
        )
      .catch(e => console.log("error"))

    },[])

    useEffect(() => {
     // const token = cookie.get("token")
     const data = {selectedlocations:selectedlocations,selectednationality:selectednationality,selectedLanguages:selectedLanguages}

      fetchAgents(data)

    },[])

    function fetchAgents(data){
      console.log("data before and after",data)
      axios.post(baseurl+"/api/brokeragents", data ,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
    })
      .then(response =>{
        //console.log("response before and after",response.data)
        setAgents(lang=="en"?response.data.agents_en:response.data.agents_ar)
       // console.log("lang",response.data.languages)
      }
      
        )
      .catch(e => console.log("error"))

      axios.get(baseurl+"/api/propertytypes")
      .then(response =>{
        // console.log("it is property ",response.data)
        setPropertytypes(response.data.propertytypes)
        
      }
        //setPropertytypes(response.data.propertytypes)
       // console.log(response.data.agencies)
        )
      .catch(e => console.log("error"))
    }

    useEffect(() => {
     // const token = cookie.get("token")
      const activeUser = cookie.get("user_id");
      const pusher = new Pusher('2955db0221fb16cb6441', {
        cluster: 'ap2'
      });
      const channel = pusher.subscribe('chat');
      channel.bind('message', (newMessage) =>{
      setCount(count+1)

       // alert(JSON.stringify(data));
      //  if(newMessage.sender == activeUser|| newMessage.reciever == activeUser){
        setMessages([...messages,newMessage])
      //  }
       
      });
  
     return () => {
        channel.unbind_all();
        channel.unsubscribe();
      }
    }, [messages])


    useEffect(() => {
      axios.get(baseurl+"/api/users/"+activeUser)
      .then(response =>
        setUsers(response.data.users)
       // console.log(response.data.agencies)
        )
      .catch(e => console.log("error"))

    


    }, [])


    function change (option) {
      localStorage.setItem("lang",option.target.value);
      window.location.reload();
    }

 function changeToArabic (e){
    e.preventDefault();
    const oldlang = localStorage.getItem("lang");
    if(oldlang !="ar"){
    localStorage.setItem("lang","ar");
    window.location.reload();
  }

      
    }
 function changeToEnglish (e){
  e.preventDefault();
  const oldlang = localStorage.getItem("lang");
  if(oldlang !="en"){
    localStorage.setItem("lang","en");
    window.location.reload();
  }

}

function handleUserChat  (user,e) {
  e.preventDefault();
  setFirsttab("card mb-sm-3 mb-md-0 contacts_card dz-chat-user-box d-none")
  setSecondtab("card chat dz-chat-history-box")
  setLiveUser(user.name)
  setLiveUser_id(user.id)
  axios.get(baseurl+"/api/allmessages/"+ user.id,{
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept':'application/json',
      'Content-Type':'application/json'
    }})
  .then(response =>
    setMessages(response.data.messages)
    )
  .catch(e => console.log("error"))
}

function handleSelectedLanguages  (e) {
        
  setSelectedLanguages(e)
  const data = {selectedlocations:selectedlocations,selectednationality:selectednationality,selectedLanguages:e}

      fetchAgents(data)
}

function selectNationality (e){
  setSelectedNationality(e.target.value)
  const data = {selectedlocations:selectedlocations,selectednationality:e.target.value,selectedLanguages:selectedLanguages}

      fetchAgents(data)
}

function handleSelectedAgents  (e) {
        
  setSelectedAgents(e)
}

function handleOwnerMessage (e){
  e.preventDefault()
  const data = {selectedAgents:selectedAgents,messageBody:description_en}

  axios.post(baseurl+"/api/sendallagents", data,{
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept':'application/json',
      'Content-Type':'application/json'
    }})
  .then(response =>{

    setDescription_en("")
    setSelectedlocations([])
    setSelectedNationality(0)
    setSelectedLanguages([])
    setSelectedAgents([])
  }
    )
  .catch(e => console.log("error"))
}

function handleUserList (e) {
  setFirsttab("card mb-sm-3 mb-md-0 contacts_card dz-chat-user-box")
  setSecondtab("card chat dz-chat-history-box d-none")
 // this.setState({firsttab:"card mb-sm-3 mb-md-0 contacts_card dz-chat-user-box",secondtab:"card chat dz-chat-history-box d-none"})

}

function handleMessage  (e) {
  e.preventDefault();
  setMessageBody(e.target.value)
}

function handleSubmit (e) {
  e.preventDefault();
  if(messageBody==""){
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: 'Empty message',
      showConfirmButton: false,
      timer: 1500
    })
    return;
  }
  const data = {messageBody:messageBody,reciever:liveUser_id}
  axios.post(baseurl+"/api/newmessage", data,{
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept':'application/json',
      'Content-Type':'application/json'
    }})
.then(response =>{
setMessageBody("")    
})
}




  return (
    <div>
    <div className="header">
    <div className="header-content">
      <nav className="navbar navbar-expand">
        <div className="collapse navbar-collapse justify-content-between">
          <div className="header-left">
            {/* <div className="nav-item">
              <div className="input-group search-area">
                <input type="text" className="form-control" placeholder="Search here" />
                <span className="input-group-text"><a href="#"><i className="flaticon-381-search-2"></i></a></span>
              </div>
            </div> */}
          </div>
          <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" href="#" id="dropdown09" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {lang=="en"?<><span className="flag-icon flag-icon-us"> </span> English</>:<><span className="flag-icon flag-icon-ae"> </span> العربية</>}
              
              
              </a>
                          <div className="dropdown-menu" aria-labelledby="dropdown09">
                              <a className="dropdown-item" href="" onClick={changeToEnglish}><span className="flag-icon flag-icon-us"> </span>  English</a>
                              <a className="dropdown-item" href="" onClick={changeToArabic}><span className="flag-icon flag-icon-ae"> </span>  العربية</a>
                             
                          </div>
                      </li>
          
      
          <ul className="navbar-nav header-right">
            {/* <li className="nav-item dropdown notification_dropdown">
              <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown">
               <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.4524 25.6682C11.0605 27.0357 12.409 28 14.0005 28C15.592 28 16.9405 27.0357 17.5487 25.6682C16.4265 25.7231 15.2594 25.76 14.0005 25.76C12.7417 25.76 11.5746 25.723 10.4524 25.6682Z" fill="#737B8B"></path>
                  <path d="M26.3532 19.74C24.877 17.8785 22.3996 14.2195 22.3996 10.64C22.3996 7.09073 20.1193 3.89758 16.7996 2.72382C16.7593 1.21406 15.5183 0 14.0007 0C12.482 0 11.2422 1.21406 11.2018 2.72382C7.88101 3.89758 5.6007 7.09073 5.6007 10.64C5.6007 14.2207 3.1244 17.8785 1.64712 19.74C1.15433 20.3616 1.00197 21.1825 1.24058 21.9363C1.47354 22.6721 2.05367 23.2422 2.79288 23.4595C4.08761 23.8415 6.20997 24.2715 9.44682 24.491C10.8479 24.5851 12.3543 24.64 14.0008 24.64C15.646 24.64 17.1525 24.5851 18.5535 24.491C21.7915 24.2715 23.9128 23.8415 25.2086 23.4595C25.9478 23.2422 26.5268 22.6722 26.7598 21.9363C26.9983 21.1825 26.8449 20.3616 26.3532 19.74Z" fill="#737B8B"></path>
                </svg>
                <span className="badge light text-white bg-primary rounded-circle">4</span>
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <div id="DZ_W_Notification1" className="widget-media dz-scroll p-3 ps" style= {{height:'380px'}}>
                  <ul className="timeline">
                    <li>
                      <div className="timeline-panel">
                        <div className="media me-2">
                          <img alt="image" width="50" src="images/avatar/1.jpg" />
                        </div>
                        <div className="media-body">
                          <h6 className="mb-1">Dr sultads Send you Photo</h6>
                          <small className="d-block">29 July 2020 - 02:26 PM</small>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                        <div className="media me-2 media-info">
                          KG
                        </div>
                        <div className="media-body">
                          <h6 className="mb-1">Resport created successfully</h6>
                          <small className="d-block">29 July 2020 - 02:26 PM</small>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                        <div className="media me-2 media-success">
                          <i className="fa fa-home"></i>
                        </div>
                        <div className="media-body">
                          <h6 className="mb-1">Reminder : Treatment Time!</h6>
                          <small className="d-block">29 July 2020 - 02:26 PM</small>
                        </div>
                      </div>
                    </li>
                     <li>
                      <div className="timeline-panel">
                        <div className="media me-2">
                          <img alt="image" width="50" src="images/avatar/1.jpg" />
                        </div>
                        <div className="media-body">
                          <h6 className="mb-1">Dr sultads Send you Photo</h6>
                          <small className="d-block">29 July 2020 - 02:26 PM</small>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                        <div className="media me-2 media-danger">
                          KG
                        </div>
                        <div className="media-body">
                          <h6 className="mb-1">Resport created successfully</h6>
                          <small className="d-block">29 July 2020 - 02:26 PM</small>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="timeline-panel">
                        <div className="media me-2 media-primary">
                          <i className="fa fa-home"></i>
                        </div>
                        <div className="media-body">
                          <h6 className="mb-1">Reminder : Treatment Time!</h6>
                          <small className="d-block">29 July 2020 - 02:26 PM</small>
                        </div>
                      </div>
                    </li>
                  </ul>
                <div className="ps__rail-x" style = {{left: '0px', bottom: '0px'}}><div className="ps__thumb-x" tabIndex="0" style={{left: '0px', width: '0px'}}></div></div><div className="ps__rail-y" style={{top: '0px', right: '0px'}}><div className="ps__thumb-y" tabIndex="0" style={{top: '0px', height: '0px'}}></div></div></div>
                <a className="all-notification" href="#">See all notifications <i className="ti-arrow-end"></i></a>
              </div>
            </li> */}
             {/* <li className="nav-item dropdown notification_dropdown">
              <a className="nav-link " href="#" data-bs-toggle="dropdown">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.8257 17.5282C14.563 17.6783 14.2627 17.7534 14 17.7534C13.7373 17.7534 13.437 17.6783 13.1743 17.5282L0 9.49598V20.193C0 22.4826 1.83914 24.3217 4.12869 24.3217H23.8713C26.1609 24.3217 28 22.4826 28 20.193V9.49598L14.8257 17.5282Z" fill="#737B8B"></path>
                  <path d="M23.8713 3.67829H4.12863C2.17689 3.67829 0.525417 5.06703 0.112549 6.90617L13.9999 15.3887L27.8873 6.90617C27.4745 5.06703 25.823 3.67829 23.8713 3.67829Z" fill="#737B8B"></path>
                </svg>
                <span className="badge light text-white bg-success rounded-circle">15</span>
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <div id="DZ_W_TimeLine02" className="widget-timeline dz-scroll style-1 ps p-3 height370">
                <ul className="timeline">
                  <li>
                    <div className="timeline-badge primary"></div>
                    <a className="timeline-panel text-muted" href="#">
                      <span>10 minutes ago</span>
                      <h6 className="mb-0">Youtube, a video-sharing website, goes live <strong className="text-primary">$500</strong>.</h6>
                    </a>
                  </li>
                  <li>
                    <div className="timeline-badge info">
                    </div>
                    <a className="timeline-panel text-muted" href="#">
                      <span>20 minutes ago</span>
                      <h6 className="mb-0">New order placed <strong className="text-info">#XF-2356.</strong></h6>
                      <p className="mb-0">Quisque a consequat ante Sit amet magna at volutapt...</p>
                    </a>
                  </li>
                  <li>
                    <div className="timeline-badge danger">
                    </div>
                    <a className="timeline-panel text-muted" href="#">
                      <span>30 minutes ago</span>
                      <h6 className="mb-0">john just buy your product <strong className="text-warning">Sell $250</strong></h6>
                    </a>
                  </li>
                  <li>
                    <div className="timeline-badge success">
                    </div>
                    <a className="timeline-panel text-muted" href="#">
                      <span></span>
                      <h6 className="mb-0"> </h6>
                    </a>
                  </li>
                  <li>
                    <div className="timeline-badge warning">
                    </div>
                    <a className="timeline-panel text-muted" href="#">
                      <span></span>
                      <h6 className="mb-0"></h6>
                    </a>
                  </li>
                  <li>
                    <div className="timeline-badge dark">
                    </div>
                    <a className="timeline-panel text-muted" href="#">
                      <span></span>
                      <h6 className="mb-0"></h6>
                    </a>
                  </li>
                </ul>
              <div className="ps__rail-x" style= {{left: '0px', bottom: '0px'}}><div className="ps__thumb-x" tabIndex="0" style= {{left: '0px', width: '0px'}}></div></div><div className="ps__rail-y" style={{top: '0px', right: '0px'}}><div className="ps__thumb-y" tabIndex="0" style={{top: '0px', height: '0px'}}></div></div></div>
              </div>
            </li> */}
            <li className="nav-item dropdown notification_dropdown">
              <a className="nav-link bell-link ">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                <path d="M23.9161 4.16311C21.1983 1.41256 17.4654 -0.0936897 13.6016 0.00454401C5.90661 0.233756 -0.118391 6.61895 0.110821 14.3139C0.143566 15.9184 0.471011 17.4902 1.06041 18.9637C1.55158 20.208 2.20647 21.354 3.02509 22.4018L1.87903 25.1196C1.4206 26.1675 1.91177 27.379 2.9596 27.8374C3.31979 28.0012 3.74547 28.0339 4.1384 27.9684L9.44303 27.0516C11.3422 27.7065 13.3396 27.9357 15.337 27.7392C22.1807 27.0516 27.518 21.4522 27.8782 14.5759C28.0747 10.6793 26.6339 6.91365 23.9161 4.16311ZM12.9794 19.4548H9.34479C8.78813 19.4548 8.29697 18.9964 8.29697 18.407C8.29697 17.8503 8.75539 17.3592 9.34479 17.3592H12.9794C13.5361 17.3592 14.0273 17.8176 14.0273 18.407C14.0273 18.9964 13.5688 19.4548 12.9794 19.4548ZM18.6443 15.198H9.34479C8.78813 15.198 8.29697 14.7396 8.29697 14.1502C8.29697 13.5608 8.75539 13.1024 9.34479 13.1024H18.6443C19.2009 13.1024 19.6921 13.5608 19.6921 14.1502C19.6921 14.7396 19.2009 15.198 18.6443 15.198ZM18.6443 10.9085H9.34479C8.78813 10.9085 8.29697 10.4501 8.29697 9.86066C8.29697 9.304 8.75539 8.81284 9.34479 8.81284H18.6443C19.2009 8.81284 19.6921 9.27126 19.6921 9.86066C19.6921 10.4173 19.2009 10.9085 18.6443 10.9085Z" fill="#737B8B"></path>
                </g>
                <defs>
                <clipPath id="clip0">
                <rect width="28" height="28" fill="white"></rect>
                </clipPath>
                </defs>
              </svg>
                <span className="badge light text-white bg-orange rounded-circle">{count}</span>
              </a>
            </li> 
              <Profileheader />
            <li className="nav-item">
              
            </li>
          </ul>
        </div>
      </nav>
    </div>          
  </div>




  {/* chat */}
  <div className="chatbox">
<div className="chatbox-close" />
<div className="custom-tab-1">
  <ul className="nav nav-tabs">
 
    <li className="nav-item">
      <a className="nav-link" data-bs-toggle="tab" href="#alerts">{lang=="en"?"Group Message":"رسالة جماعية"}</a>
    </li>
    <li className="nav-item">
      <a className="nav-link active" data-bs-toggle="tab" href="#chat"> {lang=="en"?"Single Chat":"رسالة فردية"}</a>
    </li>
  </ul>
  <div className="tab-content">
    <div className="tab-pane fade active show" id="chat" role="tabpanel">
      <div className={firsttab}>
        <div className="card-header chat-list-header text-center">
          <div>
            <h6 className="mb-1"> {lang=="en"?"Chat List":"قائمة الدردشة"}</h6>
            <p className="mb-0"></p>
          </div>
        </div>
        <div className="card-body contacts_body p-0 dz-scroll  " id="DZ_W_Contacts_Body">
        {/* filter user */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false" style={{position: 'fixed',top: 0,right: 0,zIndex: 1050,display: 'none',width: '100%',height: '100%',overflow: 'hidden',outline: 0}}>
  <div className="modal-dialog chat-broker" style={{width: '21.25rem'}}>
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Find Brokers</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
  
    
    </div>
  </div>
</div>
          <ul className="contacts">
            <li className="name-first-letter">A</li>
      {users.map((user) =>(
       <li key={user.id} className="active dz-chat-user" onClick={handleUserChat.bind(this,user)}>
   <div className="d-flex bd-highlight">
     <div className="img_cont">
     <img src={user.profile ==null ?"/images/avatar/1.png":baseurlImg+"/public/uploads/profiles/"+user.profile} className="rounded-circle user_img" alt="profile" />
     <span className="online_icon" />
     </div>
     <div className="user_info">
     <span>{user.name}</span>
     {/* <p>Kalid is online</p> */}
     </div>
   </div>
   </li>
      ))}
   
   
          </ul>
        </div>
      </div>
      <div className={secondtab}>
        <div className="card-header chat-list-header text-center">
          <a href="#" className="dz-chat-history-back" onClick={handleUserList}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><polygon points="0 0 24 0 24 24 0 24" /><rect fill="#000000" opacity="0.3" transform="translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000) " x={14} y={7} width={2} height={10} rx={1} /><path d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z" fill="#000000" fillRule="nonzero" transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) " /></g></svg>
          </a>
          <div>
            <h6 className="mb-1">{liveUser}</h6>
            <p className="mb-0 text-success">Online</p>
          </div>							
      
        </div>
        <div className="card-body msg_card_body dz-scroll" id="DZ_W_Contacts_Body3">

          {messages.map((message) =>(
           
           <>
           {message.sender == activeUser || message.reciever ==activeUser?
                 <>
                 {message.reciever == activeUser?
                     <div className="d-flex justify-content-end mb-4">
                     <div className="msg_cotainer_send">
                     {parse(message.message)}
                       <span className="msg_time_send">
                       <Moment fromNow>
                       {message.created_at}
                       </Moment>
                         
                         </span>
                     </div>
                     <div className="img_cont_msg">
                   <img src="images/avatar/2.jpg" className="rounded-circle user_img_msg" alt=""/>
                     </div>
                   </div>:
                          <div className="d-flex justify-content-start mb-4">
                          <div className="img_cont_msg">
                            <img src="images/avatar/1.jpg" className="rounded-circle user_img_msg" alt="" />
                          </div>
                          <div className="msg_cotainer" style={{backgroundColor:'#edf2f6',color:"black"}}>
                            {parse(message.message)}
                            <span className="msg_time"  style={{backgroundColor:'#edf2f6',color:"black"}}>   
                            <Moment fromNow>
                            {message.created_at}
                            </Moment></span>
                          </div>
                        </div>
               }
                 </>:null
          } 
           </>
          )
          
          )}
    

        </div>
        <div className="card-footer type_msg">
          <div className="input-group">
            <textarea className="form-control" placeholder="Type your message..." value={messageBody} onChange={handleMessage} />
            <div className="input-group-append">
              <button type="button" className="btn btn-primary" onClick={handleSubmit}><i className="fa fa-location-arrow" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="tab-pane fade" id="alerts" role="tabpanel">
      <div className="card mb-sm-3 mb-md-0 contacts_card">
        <div className="card-header chat-list-header text-center">
          <div>
            <h6 className="mb-1">{lang=="en"?"Message multiple Agents":"مراسلة جميع الوسطاء"}</h6>
            <p className="mb-0"></p>
          </div>
        </div>
        <div className="card-body contacts_body p-0 dz-scroll" id="DZ_W_Contacts_Body1">
          <div style={{marginLeft:'5px',marginRight:'5px'}}>
        <div className="mb-3">
  <label  className="form-label">{lang=="en"?"Location":"المكان"}</label>
  <Autocomplete
                      options={locations}
                      onChange={(event, newValue) => {
                        setSelectedlocations(newValue)
                        // this.fetchLocationsbyuser(newValue)
                        const data = {selectedlocations:newValue,selectednationality:selectednationality,selectedLanguages:selectedLanguages}

                           fetchAgents(data)
                   
                      }}
                      getOptionLabel={(option) => option.location}
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

  <div className="mb-3">
  <label  className="form-label">{lang=="en"?"Nationality":"الجنسية"}</label>
  <select className="form-select" aria-label="Default select example" onChange={selectNationality}>
  <option value="0">{lang=="en"?"select":"اختر"}</option>
  {nationalities.map((nationality) =>(
    <option key={nationality.id} value={nationality.id}>{lang=="en"?nationality.country_enNationality:nationality.country_arNationality}</option>
    
  ))} 
</select>
  </div>
  <div className="mb-3">
  <label  className="form-label">{lang=="en"?"Languages":"اللغة"}</label>
  <MultiSelect
     options={languages}
     value={selectedLanguages}
     onChange={handleSelectedLanguages}
    labelledBy={lang=="en"?"Select":"اختر"}
    />
  </div>
  <div className="mb-3">
  <label  className="form-label"> {lang=="en"?"Agencies / Agents":"الشركات / الوسطاء"}</label>
  <MultiSelect
     options={agents}
     value={selectedAgents}
     onChange={handleSelectedAgents}
    labelledBy={lang=="en"?"Select":"اختر"}
    />

  </div>

  <div className="mb-3 mt-3">
                     <label> {lang=="en"?"Description":" الوصف "}</label>
                    <JoditEditor
                                                //ref={editor}
                      value={description_en}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={newContent => setDescription_en(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={newContent => {}}
                          />                                                    
      </div>
  <div className="mb-3">
  <button type="button" className="btn btn-primary" onClick={handleOwnerMessage}>
  <i className="bi bi-chat-square-text"></i>
        &nbsp;&nbsp;
           {lang=="en"?"Send Message":"ارسال رسالة"}
          </button>
  </div>
  </div>
        </div>
        <div className="card-footer" />
      </div>
    </div>
    <div className="tab-pane fade" id="notes">
      <div className="card mb-sm-3 mb-md-0 note_card">
        <div className="card-header chat-list-header text-center">
          <a href="#"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect fill="#000000" x={4} y={11} width={16} height={2} rx={1} /><rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) " x={4} y={11} width={16} height={2} rx={1} /></g></svg></a>
          <div>
            <h6 className="mb-1">Notes</h6>
            <p className="mb-0">Add New Nots</p>
          </div>
          <a href="#"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><rect x={0} y={0} width={24} height={24} /><path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fillRule="nonzero" opacity="0.3" /><path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fillRule="nonzero" /></g></svg></a>
        </div>
        <div className="card-body contacts_body p-0 dz-scroll" id="DZ_W_Contacts_Body2">
          <ul className="contacts">
            <li className="active">
              <div className="d-flex bd-highlight">
                <div className="user_info">
                  <span>New order placed..</span>
                  <p>10 Aug 2020</p>
                </div>
                <div className="ms-auto">
                  <a href="#" className="btn btn-primary btn-xs sharp me-1"><i className="fas fa-pencil-alt" /></a>
                  <a href="#" className="btn btn-danger btn-xs sharp"><i className="fa fa-trash" /></a>
                </div>
              </div>
            </li>
            <li>
              <div className="d-flex bd-highlight">
                <div className="user_info">
                  <span>Youtube, a video-sharing website..</span>
                  <p>10 Aug 2020</p>
                </div>
                <div className="ms-auto">
                  <a href="#" className="btn btn-primary btn-xs sharp me-1"><i className="fas fa-pencil-alt" /></a>
                  <a href="#" className="btn btn-danger btn-xs sharp"><i className="fa fa-trash" /></a>
                </div>
              </div>
            </li>
            <li>
              <div className="d-flex bd-highlight">
                <div className="user_info">
                  <span>john just buy your product..</span>
                  <p>10 Aug 2020</p>
                </div>
                <div className="ms-auto">
                  <a href="#" className="btn btn-primary btn-xs sharp me-1"><i className="fas fa-pencil-alt" /></a>
                  <a href="#" className="btn btn-danger btn-xs sharp"><i className="fa fa-trash" /></a>
                </div>
              </div>
            </li>
            <li>
              <div className="d-flex bd-highlight">
                <div className="user_info">
                  <span>Athan Jacoby</span>
                  <p>10 Aug 2020</p>
                </div>
                <div className="ms-auto">
                  <a href="#" className="btn btn-primary btn-xs sharp me-1"><i className="fas fa-pencil-alt" /></a>
                  <a href="#" className="btn btn-danger btn-xs sharp"><i className="fa fa-trash" /></a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
{/***********************************
    Chat box End
*/}

  </div>
  )
}

export default Header
