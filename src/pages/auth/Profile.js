import React, { Component } from 'react'
import cookie from 'js-cookie'
import { baseurl } from '../../Components/BaseUrl';
export class Profile extends Component {
    componentDidMount(){
        var loadScript = function(src) {
            var tag = document.createElement('script');
            tag.async = false;
            tag.src = src;
            document.getElementsByTagName('body')[0].appendChild(tag);
            }
        //     loadScript('./vendor/global/global.min.js')
        //     loadScript('./vendor/chart.js/Chart.bundle.min.js')
        //     loadScript('./vendor/apexchart/apexchart.js')
        //     loadScript('./vendor/peity/jquery.peity.min.js')
        //     loadScript('./js/dashboard/dashboard-1.js')
        //     loadScript('./vendor/dotted-map/js/contrib/jquery.smallipop-0.3.0.min.js')
        //     loadScript('./vendor/dotted-map/js/contrib/suntimes.js')
        //     loadScript('./vendor/dotted-map/js/contrib/color-0.4.1.js')
        //     loadScript('./vendor/dotted-map/js/world.js')
        //     loadScript('./vendor/dotted-map/js/smallimap.js')
      
            loadScript('./js/dashboard/dotted-map-init.js')
           // loadScript('./js/custom.min.js')
            loadScript('./js/deznav-init.js')
            loadScript('./vendor/jquery-nice-select/js/jquery.nice-select.min.js')
           // this.fetchData()
    }
    fetchData = ()=> {


    }
    render() {
        // const lang =localStorage.getItem("lang") || "en";
	    	// const name = cookie.get("name");
		    // const email = cookie.get("email");
        const profile = cookie.get("profile");
        return (
          
              <div className="container-fluid">

  {/* row */}
  <div className="row">
    <div className="col-lg-12">
      <div className="profile card card-body px-3 pt-3 pb-0">
        <div className="profile-head">
          <div className="photo-content">
            <div className="cover-photo rounded" />
          </div>
          <div className="profile-info">
            <div className="profile-photo">
              <img src={baseurl + '/uploads/profiles/' + profile} className="img-fluid rounded-circle" alt="" />
            </div>
            <div className="profile-details">
              <div className="profile-name px-3 pt-2">
                <h4 className="text-primary mb-0">Mitchell C. Shay</h4>
                <p></p>
              </div>
              <br />
              <div className="profile-email px-2 pt-2">
                <h4 className="text-muted mb-0">info@example.com</h4>
                <p></p>
              </div>
    
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="row">
  
    <div className="col-xl-8">
      <div className="card">
        <div className="card-body">
          <div className="profile-tab">
            <div className="custom-tab-1">
              <ul className="nav nav-tabs">
                {/* <li className="nav-item"><a href="#my-posts" data-bs-toggle="tab" className="nav-link active show">Posts</a>
                </li> */}
                {/* <li className="nav-item"><a href="#about-me" data-bs-toggle="tab" className="nav-link active show">About Me</a>
                </li> */}
                <li className="nav-item"><a href="#profile-settings" data-bs-toggle="tab" className="nav-link">Setting</a>
                </li>
              </ul>
              <div className="tab-content">
           
           
                <div id="profile-settings" className="tab-pane fade active show">
                  <div className="pt-3">
                    <div className="settings-form">
                      <h4 className="text-primary">Account Setting</h4>
                      <form>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" placeholder="Email" className="form-control" />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" placeholder="Password" className="form-control" />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Address</label>
                          <input type="text" placeholder="1234 Main St" className="form-control" />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Address 2</label>
                          <input type="text" placeholder="Apartment, studio, or floor" className="form-control" />
                        </div>
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label className="form-label">City</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="mb-3 col-md-4">
                            <label className="form-label">State</label>
                            <select className="form-control default-select wide" id="inputState">
                              <option selected>Choose...</option>
                              <option>Option 1</option>
                              <option>Option 2</option>
                              <option>Option 3</option>
                            </select>
                          </div>
                          <div className="mb-3 col-md-2">
                            <label className="form-label">Zip</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="form-check custom-checkbox">
                            <input type="checkbox" className="form-check-input" id="gridCheck" />
                            <label className="form-check-label form-label" htmlFor="gridCheck"> Check me out</label>
                          </div>
                        </div>
                        <button className="btn btn-primary" onClick={()=>alert("comming soon")} >Sign
                          in</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Modal */}
            <div className="modal fade" id="replyModal">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Post Reply</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" />
                  </div>
                  <div className="modal-body">
                    <form>
                      <textarea className="form-control" rows={4} defaultValue={"Message"} />
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger light" data-bs-dismiss="modal">btn-close</button>
                    <button type="button" className="btn btn-primary">Reply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

       
            
        )
    }
}

export default Profile
