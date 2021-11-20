import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import NavHeader from "./Components/NavHeader";
import Footer from "./Components/Footer";
import Categories from "./pages/Admin/Settings/Categories/Categories";
import EditCategory from "./pages/Admin/Settings/Categories/EditCategory";
import Login from "./pages/auth/Login";

import Dashboard from "./Components/dashbaord/Dashboard";
import PrivateRoute from "./Components/protectRoutes/PrivateRoute";
import PublicRoute from "./Components/protectRoutes/PublicRoute";
import MainSideBarComponent from "./Components/dashbaord/MainSideBarComponent";
import AddNewUser from "./pages/Agency/Usermanagement/AddNewUser";
import NewUser from "./pages/Admin/Settings/Users/NewUser";
import Employees from "./pages/Admin/Settings/Users/Employees";
import Agents from "./pages/Agency/Usermanagement/Agents";
import EditEmployee from "./pages/Admin/Settings/Users/EditEmployee";
import EditAgent from "./pages/Agency/Usermanagement/EditAgent";
import Profile from "./pages/auth/Profile";
import Managelisting from "./pages/Agency/Listingmanagement/Managelisting";
import NewAgency from "./pages/Admin/Settings/Agencies/NewAgency";
import ListAgencies from "./pages/Admin/Settings/Agencies/ListAgencies";
import EditAgency from "./pages/Admin/Settings/Agencies/EditAgency";
import ShowAgency from "./pages/Admin/Settings/Agencies/ShowAgency";
import PropertyType from "./pages/Admin/Settings/Type/PropertyType";
import EditPropertyType from "./pages/Admin/Settings/Type/Edit";
import AddProperty from "./pages/Property/AddProperty";
import EditProperty from "./pages/Property/EditProperty";
import Listblogs from "./pages/Blogs/Listblogs";
import Newblog from "./pages/Blogs/Newblog";
import AgencyAgents from "./pages/Admin/Settings/AgencyModule/AgencyAgents";
import AgencyProperties from "./pages/Admin/Settings/AgencyModule/AgencyProperties";
import AgencyAgentsAndProperties from "./pages/Admin/Settings/AgencyModule/AgencyAgentsAndProperties";
import ShowAgencyDetails from "./pages/Admin/Settings/AgencyModule/ShowAgencyDetails";
import UsageList from "./pages/Agency/Listingmanagement/UsageList";
import Notfound from "./pages/errors/Notfound";
import AgentManagelisting from "./pages/Agent/Listing/AgentManagelisting";
import Editblog from "./pages/Blogs/Editblog";
import Listpages from "./pages/Blogs/Pages/Listpages";
import Newpage from "./pages/Blogs/Pages/Newpage";
import Editpage from "./pages/Blogs/Pages/Editpage";
// import blog from './blog'
import TechSupport from "./TechSupport";
import Changepassword from "./Components/Changepassword";
import AgentProperty from "./pages/Property/AgentProperty";
import EditAgentProperty from "./pages/Property/EditAgentProperty";
import AdminManagelist from "./pages/Admin/Settings/Listing/AdminManagelist";
import SeoManagelisting from "./pages/Admin/Settings/Seo/SeoManagelisting";
import AdminEditList from "./pages/Admin/Settings/Listing/AdminEditList";
import SeoEditList from "./pages/Admin/Settings/Seo/SeoEditList";
import AdminEditAgent from "./pages/Admin/Settings/AgencyModule/AdminEditAgent";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: "",
      newpageroute: "/newpage",
      loaded: false,
    };
  }

  onInputChageEnglish = (newroue) => {
    this.setState({ newpageroute: newroue, loaded: true });
  };

  render() {
    const lang = localStorage.getItem("lang") || "en";

    return (
      <div
        dir= {lang=="en"?'ltr': 'rtl'}
        data-typography="poppins"
        data-theme-version="light"
        data-layout="vertical"
        data-nav-headerbg="color_1"
        data-headerbg="color_1"
        data-sidebar-style="full"
        data-sibebarbg="color_1"
        data-sidebar-position="fixed"
        data-header-position="fixed"
        data-container="wide"
        data-primary="color_1"
      >
        <div>
          <Router>
            <Switch>
              <Route exact path="/tech-support" component={TechSupport} />
              <PublicRoute exact path="/" component={Login} />
              <PublicRoute
                exact
                path="/forgot-password"
                component={ForgotPassword}
              />
              <PublicRoute
                exact
                path="/reset-password/:id"
                component={ResetPassword}
              />

              <div id="main-wrapper" className="show">
                <Header />
                <NavHeader />

                <MainSideBarComponent />
                <div className={lang=="en"?"content-body": "content-body-ar"}  style={{ minHeight: "1100px" }}>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute exact path="/profile" component={Profile} />
                  <PrivateRoute
                    exact
                    path="/change-password"
                    component={Changepassword}
                  />
                  {/* admin routes */}
                  <PrivateRoute
                    exact
                    path="/categories"
                    roles={[1]}
                    component={Categories}
                  />
                  {/* <PrivateRoute exact  path="/addCategory" roles={[1]} component={AddCategory} /> */}
                  <PrivateRoute
                    exact
                    path="/edit-categories/:id"
                    roles={[1]}
                    component={EditCategory}
                  />
                  <PrivateRoute
                    exact
                    exact
                    path="/propertytypes"
                    component={PropertyType}
                  />
                  <PrivateRoute
                    exact
                    path="/edit-propertytype/:id"
                    component={EditPropertyType}
                  />
                  <PrivateRoute exact path="/addemp" component={NewUser} />
                  <PrivateRoute exact path="/employees" component={Employees} />
                  <PrivateRoute
                    exact
                    path="/edit-employee/:id"
                    component={EditEmployee}
                  />
                  <PrivateRoute
                    exact
                    path="/agencies"
                    component={ListAgencies}
                  />
                  <PrivateRoute
                    exact
                    path="/add-agency"
                    component={NewAgency}
                  />
                  <PrivateRoute
                    exact
                    path="/company-agents"
                    component={AgencyAgents}
                  />
                  <PrivateRoute
                    exact
                    path="/company-properties"
                    component={AgencyProperties}
                  />
                  <PrivateRoute
                    exact
                    path="/company-agents-properties"
                    component={AgencyAgentsAndProperties}
                  />
                  <PrivateRoute
                    exact
                    path="/show-agency-details/:id"
                    component={ShowAgencyDetails}
                  />
                  {/* agencies route */}
                  <PrivateRoute exact path="/agents" component={Agents} />
                  <PrivateRoute
                    exact
                    path="/addnewuser"
                    component={AddNewUser}
                  />
                  <PrivateRoute
                    exact
                    path="/edit-agent/:id"
                    component={EditAgent}
                  />

                  <PrivateRoute
                    exact
                    path="/admin-edit-agent/:id"
                    component={AdminEditAgent}
                  />

                  <PrivateRoute
                    exact
                    path="/managelistings"
                    component={Managelisting}
                  />
                  <PrivateRoute
                    exact
                    path="/usage-quota"
                    component={UsageList}
                  />
                  <PrivateRoute
                    exact
                    path="/edit-agency/:id"
                    component={EditAgency}
                  />
                  <PrivateRoute
                    path="/show-agency/:id"
                    component={ShowAgency}
                  />
                  <PrivateRoute
                    exact
                    path="/addProperty"
                    component={AddProperty}
                  />
                  <PrivateRoute
                    exact
                    path="/editProperty/:id"
                    component={EditProperty}
                  />

                  <PrivateRoute
                    exact
                    path="/agentProperty"
                    component={AgentProperty}
                  />
                  <PrivateRoute
                    exact
                    path="/editagentProperty/:id"
                    component={EditAgentProperty}
                  />

                  <PrivateRoute exact path="/blogs" component={Listblogs} />
                  <PrivateRoute exact path="/newblog" component={Newblog} />
                  <PrivateRoute
                    exact
                    path="/edit-blog/:id"
                    component={Editblog}
                  />
                  <PrivateRoute
                    exact
                    path="/agentmanagelistings"
                    component={AgentManagelisting}
                  />
                  <PrivateRoute exact path="/pages" component={Listpages} />
                  {/* <Redirect from="/newpage" to={this.state.newpageroute} />
                  <PrivateRoute exact  path={this.state.newpageroute}>
                     <Newpage onInputChageEnglish={this.onInputChageEnglish} />
                  </PrivateRoute> */}
                  {/* <PrivateRoute exact  path="/newpage" component={Newpage} /> */}
                  <PrivateRoute
                    exact
                    path="/edit-page/:id"
                    component={Editpage}
                  />
                  {/* agent routes */}
                  {/* <PrivateRoute  path="/status" component={Status} />
                  <PrivateRoute  path="/editStatus" component={EditStatus} />

                  <PrivateRoute  path="/agency" component={AgencyDashboard} />

                  <PrivateRoute  path="/agent" component={AgentDashboard} /> */}

                  <PrivateRoute
                    exact
                    path="/adminlisting"
                    component={AdminManagelist}
                  />
                  <PrivateRoute
                    exact
                    path="/admineditlist/:id"
                    component={AdminEditList}
                  />

                  <PrivateRoute
                    exact
                    path="/seolisting"
                    component={SeoManagelisting}
                  />
                  <PrivateRoute
                    exact
                    path="/seoeditlist/:id"
                    component={SeoEditList}
                  />
                </div>

                <Footer />
              </div>
              <PublicRoute exact path="*">
                <Notfound />
              </PublicRoute>
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
