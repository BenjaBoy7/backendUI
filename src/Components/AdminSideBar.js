import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import i18next from 'i18next'
import $ from 'jquery'
class AdminSideBar extends Component {

 
render() {
    const lang =localStorage.getItem("lang") || "en";
    return (
        <div>
            <div   className={lang=="en"?'deznav deznav_en': 'deznav deznav_ar'}>
                <div className="deznav-scroll mm-active ps ps--active-y">
                <ul className="metismenu mm-show" >
                <li className="">
                      <Link to="/dashboard" className="" aria-expanded="false">
                        <i className="flaticon-025-dashboard"></i>
                        <span className="nav-text">{i18next.t("dashboard")}</span>
                        </Link>
                        </li>
                        </ul>
                    <ul className="metismenu mm-show" id="menu">
                
                        

                        <li className=""><a className="has-arrow " href="javascript:void();" aria-expanded="false">
                            <i className="ti-user"></i>
                            <span className="nav-text">{i18next.t("empmanagement")}</span>
                        </a>
                            <ul aria-expanded="false"  >
                                <li><Link to="/employees">{i18next.t("employees")}</Link></li>
                                <li><Link to="/addemp">{i18next.t("adduser")}</Link></li>
                            </ul>
                        </li>

                        <li className=""><a className="has-arrow " href="javascript:void();" aria-expanded="false">
                            <i className="fa fa-list"></i>
                            <span className="nav-text">{lang=="en"?"Manage List":"ادارة العقارات"}</span>
                        </a>
                            <ul aria-expanded="false"  >
                                <li><Link to="/adminlisting">{lang=="en"?"Listing":"العقارات"}</Link></li>
                            </ul>
                        </li>

                        <li className=""><a className="has-arrow " href="javascript:void();" aria-expanded="false">
                            <i className="flaticon-041-graph"></i>
                            <span className="nav-text">{i18next.t("agencies")}</span>
                        </a>
                            <ul aria-expanded="false"  >
                                <li><Link to="/agencies">{i18next.t("manageagency")}</Link></li>
                              

                                <li><Link to="/company-agents">{i18next.t("agencyagents")}</Link></li>
                              
                            </ul>
                        </li>

                        <li className=""><a className="has-arrow " href="javascript:void();" aria-expanded="false">
                            <i className="flaticon-041-graph"></i>
                            <span className="nav-text">{lang=="en"?"agencies properties":"عقارات الشركات"}</span>
                        </a>
                            <ul aria-expanded="false"  >
                         
                               <li><Link to="/company-properties">{i18next.t("agencyproperties")}</Link></li>
                               <li><Link to="/company-agents-properties">{i18next.t("agencyagentsandproperties")}</Link></li>
                              
                            </ul>
                        </li>

                        <li className=""><a className="has-arrow " href="javascript:void();" aria-expanded="false">
                            <i className="far fa-newspaper"></i>
                            <span className="nav-text">{lang=="en"?"Blogs":"المقالات"} </span>
                        </a>
                            <ul aria-expanded="false" className="mm-collapse" >
                                <li><Link to="/blogs">{lang=="en"?"List Blogs ":" المقالات"}</Link></li>
                                <li><Link to="/newblog"> {lang=="en"?" New Blog":"اضافة موضوع "}</Link></li>
                            </ul>
                        </li>
                    <li>
                    <a className="has-arrow " href="javascript:void();" aria-expanded="false"><i className="flaticon-021-command">
                        </i><span className="nav-text">{lang=="en"?"Settings":"الاعدادت"}</span></a>
                    <ul aria-expanded="false" >
                        <li><Link to="/propertytypes">{lang=="en"?"Property Type":"انواع العقارات"} </Link></li>
                        <li><Link to="/status">{lang=="en"?"Property Status":"حالات العقار"} </Link></li>
                    </ul>
                    </li>      
                
                    </ul>
                    <div className="plus-box">
                        <p className="fs-14 font-w600 mb-2">Generata monthly <br />report more easier <br />than before</p>
                        <a className="btn btn-light btn-sm fs-14 text-black" href="#">Learn more</a>
                    </div>
                    <div className="copyright">
                        <p><strong>FindProperties Admin</strong> © 2021 All Rights Reserved</p>
                    </div>
                    <div className="ps__rail-x" style={{ left: '0px', bottom: '0px' }}><div className="ps__thumb-x" tabindex="0" style={{ left: '0px', width: '0px' }}></div></div><div className="ps__rail-y" style={{ top: '0px', height: '762px', right: '0px' }}><div className="ps__thumb-y" tabindex="0" style={{ top: '0px', height: '535px' }}></div></div></div>
            </div>
        </div>
    )
}
}

export default AdminSideBar
