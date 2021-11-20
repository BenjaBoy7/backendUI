import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'js-cookie'
import { baseurl } from '../BaseUrl'
import {BarChart, Bar ,LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell,Tooltip ,Legend} from "recharts";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042","#8A2BE2","#A52A2A","#D2691E","#2F4F4F"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
 class AgencyView extends Component {
     constructor(props){
         super(props)
         this.state = {
         agents:[],
         properties:[],
         propertyviews:[],
         total_agents:0,
         rents:0,
         sales:0,
         total_agents:0,
         groupdatabyArr:[],
         selectedTime:1
         }
     }
     componentDidMount(){
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
  
        loadScript('./js/dashboard/dotted-map-init.js')
        loadScript('./js/custom.min.js')
      //    loadScript('./js/deznav-init.js')
      //  loadScript('./vendor/jquery-nice-select/js/jquery.nice-select.min.js')
       const data = {selectedTime:this.state.selectedTime}

      this.fetchData(data)
   
     }

     fetchData(data){
  
      const token = cookie.get("token")
      axios.post(baseurl+"/api/dashboard",data,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept':'application/json',
          'Content-Type':'application/json'
        }})
    .then(response =>{
      
    this.setState({agents:response.data.agents,properties:response.data.properties,
      total_agents:response.data.total_agents,
      rents:response.data.rents.length > 0 ?response.data.rents[0].property_count:0,
      sales:response.data.sales.length > 0? response.data.sales[0].property_count:0,
      groupdatabyArr:response.data.groupdataby,propertyviews:response.data.propertyviews})    
    })
    // .catch(error => {
    //   if (!error.response) {
    //     console.log("errors",error.response.data)
    //       // network error
    //      // this.setState({errors:JSON.stringify({"errors":"Error: Network Error"}),isLoading:false})
    //   } else {
    //     console.log("error",error.response.data)
    //      // this.setState({errors:error.response.data,isLoading:false})
    //   }
    // })
     }


        
     handleByYear = (e) =>{
       this.setState({selectedTime:1})
       const data = {selectedTime:1}

       this.fetchData(data)


     }
     handleByMonth = (e) =>{
      this.setState({selectedTime:2})
      const data = {selectedTime:2}

      this.fetchData(data)

    }

    handleByWeek = (e) =>{
      this.setState({selectedTime:3})
      const data = {selectedTime:3}

      this.fetchData(data)
    }

    handleByDay = (e) =>{
      this.setState({selectedTime:4})
      const data = {selectedTime:4}

      this.fetchData(data)
    }


    render() {
        var loopData = []
       
        let data = this.state.groupdatabyArr
        let i ;
        
        for(i=0; i < data.length; i++){
          var loopObject = {}
             loopObject["name"] = data[i].name
             loopObject["rent"] = data[i].rent.length> 0? data[i].rent[0].rent_count :0
             loopObject["sale"] = data[i].sale.length> 0? data[i].sale[0].sale_count :0
         
              loopData.push(loopObject)
     
  
        
        }
        return (
            <div>
                 <div className="container-fluid" style={{backgroundColor:'#edf2f6'}}>
  <div className="mb-sm-4 d-flex flex-wrap align-items-center text-head">
    <h2 className="mb-3 me-auto">Dashboard</h2>
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
        <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
      </ol>
    </div>
  </div>	
  <div className="row">
	<div className="col-xl-4 col-sm-6">
						<div className="card align-items-center">
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="card-data me-2 text-center">
									<h5>Propeties for Sale</h5>
									<h2 className="fs-40 font-w600">{this.state.sales}</h2>
								</div>
						
							</div>
						</div>
					</div>
    <div className="col-xl-4 col-sm-6">
      <div className="card align-items-center">
        <div className="card-body d-flex align-items-center justify-content-between">
          <div className="card-data me-2 text-center">
            <h5>Propeties for Rent</h5>
            <h2 className="fs-40 font-w600">{this.state.rents }</h2>
          </div>
      
        </div>
      </div>
    </div>
    <div className="col-xl-4 col-sm-6">
      <div className="card align-items-center" >
        <div className="card-body d-flex align-items-center justify-content-between ">
          <div className="card-data text-center">
            <h5>Total Agents</h5>
            <h2 className="fs-40 font-w600 text-center">{this.state.total_agents }</h2>
          </div>
       
        </div>
      </div>
    </div>

  </div>
  <div className="row">
    <div className="col-xl-9 col-xxl-8">
      <div className="row">
  
        <div className="col-xl-6 col-xxl-12">
          <div className="card">
            <div className="card-header d-block border-0">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h4 className="fs-20">Properties By Emirates</h4>
                <div className="dropdown custom-dropdown mb-0">
                  <div className="btn sharp tp-btn dark-btn" data-bs-toggle="dropdown">
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#342E59" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#342E59" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#342E59" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#;">Details</a>
                    <a className="dropdown-item text-danger" href="#;">Cancel</a>
                  </div>
                </div>
              </div>
              <div className="row">
             
        <BarChart
          width={500}
          height={300}
          data={this.state.properties}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
      
              </div>
            </div>
            <div className="card-body py-0 px-sm-3 px-2">
            {/* <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={loopData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {}

          <Line type="monotone" dataKey="rent" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="sale" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer> */}
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-xxl-12">
          <div className="card">
            <div className="card-header border-0">
              <h4 className="fs-20">Agencies By Emirate</h4>
            </div>
            <div className="card-body pt-0 text-center">
            <PieChart width={400} height={400}>
            
         
          <Tooltip />
          <Legend />
      <Pie
        data={this.state.agents}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        
        {this.state.agents.map((entry, index) => (
          <Cell key={index} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
             
            </div>	
          </div>
        </div>
        <div className="col-xl-12">
          <div className="card" id="responsive-map">
            <div className="card-header border-0">
              <h4 className="fs-20">Propeties By Months</h4>
              <div className="dropdown">
  <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    {this.state.selectedTime ==1? "By Year":""}
    {this.state.selectedTime ==2? "By Month":""}
    {this.state.selectedTime ==3? "By Week":""}
    {this.state.selectedTime ==4? "By Day":""}

  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item" onClick={this.handleByYear}>By Year </a></li>
    <li><a className="dropdown-item" onClick={this.handleByMonth}>By Month</a></li>
    <li><a className="dropdown-item" onClick={this.handleByWeek}>By Week</a></li>
    <li><a className="dropdown-item" onClick={this.handleByDay}>By Day</a></li>
  </ul>
</div>




            </div>
            <div className="card-body">
              <div className="property-map">
              
        <LineChart
          width={1000}
          height={300}
          data={loopData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {}

          <Line type="monotone" dataKey="rent" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="sale" stroke="#82ca9d" />
        </LineChart>
              {/* <div style={{ height: '50vh', width: '100%' }}>
              <GoogleMapReact
               bootstrapURLKeys={{ key: "AIzaSyCq6FzlBsSuT-S2zaRh2Rd-i4205DCu57s" }}
               defaultCenter={this.state.center}
               defaultZoom={this.state.zoom}
               >
                 {propertiesLocations}
        
        </GoogleMapReact>
        </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-3 col-xxl-4">
      <div className="row">

        {/* start */}
        <div className="col-xl-12">
          <div className="card">
          <div className="card-header border-0">
            Views
            </div>
            <div className="card-body pb-3">
             <table className="table table-bordered">
               <thead>
                 <tr>
                   <th>Country Name</th>
                   <th>Views</th>
                 </tr>
                 </thead>
               <tbody>
                 {this.state.propertyviews && this.state.propertyviews.map((propertyview) =>(
                  <tr key={propertyview.country}>
                   <td>{propertyview.country}</td>
                   <td>{propertyview.count_property_viewed}</td>
                 </tr>
                 ))}
                 
               
               </tbody>
             </table>
            </div>
          </div>
        </div>
        {/* end */}

   
      </div>
    </div>
  </div>
</div> 
            </div>
        )
    }
}

export default AgencyView
