import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './store'
import cookie from 'js-cookie'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import  ErrorBoundary from './ErrorBoundary'

//translation
import './i18n'
import i18next from 'i18next'
import { baseurl } from './Components/BaseUrl';
const lang = localStorage.getItem("lang") || "en";


//axios.defaults.headers.common["Accept-Language"] = lang;

i18next.changeLanguage(lang);
document.documentElement.lang=lang;


const jwt_secret = "uBL0VaXplO3mpO84EKvMB2Nq5kwfefx7SQ15dCN96JU7lT1Kit1IkNnNsA20kifI";
let token = cookie.get("token");

if(token)
{
  jwt.verify(token, jwt_secret, (err, decoded) => {
    if(err){
      token=null;
      cookie.remove("token")
    }else{
      if(decoded.iss !== baseurl+"/api/auth/login"){
        token=null;
        cookie.remove("token")
      }
    }
    //console.log(decoded)
  });
  
}
const render = () =>{
  
  ReactDOM.render(
    <React.Fragment>
      <Provider store={store}>
      <ErrorBoundary>
      <App />
      </ErrorBoundary>
      </Provider>
      </React.Fragment>,
    document.getElementById('root')
  );
}
if(token)
{
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.post(baseurl+"/api/auth/me")
.then(res =>{
  store.dispatch({type:"SET_LOGIN",payload:res.data});
  render();
})
.catch(err => {
  console.log("error"+err)},
 
  );


}else{
  render();
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

