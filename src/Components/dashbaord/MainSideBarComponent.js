import React, { Component } from 'react'
import AdminSideBar from '../AdminSideBar'
import AgenciesSideBar from '../AgenciesSideBar'
import AgentSideBar from '../AgentSideBar'
import cookie from 'js-cookie'
import SeoSideBar from '../SeoSideBar'
 class MainSideBarComponent extends Component {
    render() {
        const role = cookie.get("role");
        return (
            <div>
                {role == 1?  <AdminSideBar />: null}
                {role == 2?  <AgenciesSideBar />: null}
                {role == 3?  <AgentSideBar />: null}
                {role == 6?  <SeoSideBar />: null}
            </div>
        )
    }
}

export default MainSideBarComponent
