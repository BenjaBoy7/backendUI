import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'js-cookie'
import { baseurl } from '../BaseUrl'
import GoogleMapReact from 'google-map-react'
import Marker from 'google-map-react'
import InfoWindow from 'google-map-react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell,Tooltip ,Legend} from "recharts";
import ProgressBar from 'react-customizable-progressbar'
import './Examples.css'
import { Loader } from '@googlemaps/js-api-loader';
import ReactDOMServer from 'react-dom/server';
import AdminView from './AdminView'
import AgencyView from './AgencyView'
import AgentView from './AgentView'
import SeoView from './SeoView'

const google = window.google;
    // The location of Uluru
    const loader = new Loader({
      apiKey: "AIzaSyCq6FzlBsSuT-S2zaRh2Rd-i4205DCu57s",
      // libraries: ["places"]
    });
    const mapOptions = {
      center: { lat: 23.024, lng: 53.887 },
      zoom: 7,
 
    };

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
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


const AnyReactComponent = ({ text }) => <div>{text}</div>;
export class AdminDashboard extends Component {
  constructor(props){
    super(props)
    this.state ={
      isLoading: false,
      purposeArr:[],
      purposebymonthArr:[],
      rents:0,
      sales:0,
      agents:0,
    
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
      // loadScript('./js/custom.min.js')
         loadScript('./js/deznav-init.js')
       loadScript('./vendor/jquery-nice-select/js/jquery.nice-select.min.js')
    }


  
    render() {
    const role= cookie.get("role")
    // if (role == 2) {
    //   // Simulate a JS error
    //   throw new Error('I crashed!');
    // }
        return (
            <div>
            {role == 1?  <AdminView />:null}
            {role == 2?  <AgencyView />:null}
            {role == 3?  <AgentView />:null}
            {role == 6?  <SeoView />:null}
            </div>
        )
    }
}

export default AdminDashboard
