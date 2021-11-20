import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import i18next from 'i18next'
class SeoSideBar extends Component {
render() {
    const lang =localStorage.getItem("lang") || "en";
    return (
        <div>
            <div className="deznav">
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
                            <i className="flaticon-381-menu"></i>
                            <span className="nav-text">Blogs </span>
                        </a>
                            <ul aria-expanded="false" className="mm-collapse" >
                                <li><Link to="/blogs">{lang=="en"?"List Blogs ":" المقالات"}</Link></li>
                                <li><Link to="/newblog"> {lang=="en"?" New Blog":"اضافة موضوع "}</Link></li>
                                
                         
                            </ul>
                        </li>

                        <li className=""><a className="has-arrow " href="javascript:void();" aria-expanded="false">
                            <i className="flaticon-381-menu"></i>
                            <span className="nav-text"> {lang=="en"?"Pages":"الصفحات"}</span>
                        </a>
                            <ul aria-expanded="false" className="mm-collapse" >
                                <li><Link to="/pages"> {lang=="en"?"List Pages":" كل الصفحات"}</Link></li>
                                <li><Link to="/newpage"> {lang=="en"?" New Page":" انشاء صفحة"}</Link></li>
                                
                         
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
                    <div className="ps__rail-x" style={{ left: '0px', bottom: '0px' }}><div className="ps__thumb-x" tabIndex="0" style={{ left: '0px', width: '0px' }}></div></div><div className="ps__rail-y" style={{ top: '0px', height: '762px', right: '0px' }}><div className="ps__thumb-y" tabIndex="0" style={{ top: '0px', height: '535px' }}></div></div></div>
            </div>
        </div>
    )
}
}

export default SeoSideBar
