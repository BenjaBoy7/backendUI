import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function NavHeader() {
    useEffect(() => {
        // var loadScript = function(src) {
        //     // const script = document.createElement("script");
        //     // script.async = true;
        //     // script.src = "https://some-scripturl.js";
        //     // //For head
        //     // document.head.appendChild(script);
            
        //     var tag = document.createElement('script');
        //     tag.async = false;
        //     tag.src = src;
        //     document.getElementsByTagName('body')[0].appendChild(tag);
        //     }
         
        //    loadScript(`${process.env.PUBLIC_URL}/vendor/global/global.min.js`)
        //    loadScript(`${process.env.PUBLIC_URL}/vendor/chart.js/Chart.bundle.min.js`)
          
        //     loadScript(`${process.env.PUBLIC_URL}/vendor/apexchart/apexchart.js`)
         
        //     loadScript(`${process.env.PUBLIC_URL}/vendor/peity/jquery.peity.min.js`)
          
        //     loadScript(`${process.env.PUBLIC_URL}/js/dashboard/dashboard-1.js`)
          
        //     loadScript(`${process.env.PUBLIC_URL}/vendor/dotted-map/js/contrib/jquery.smallipop-0.3.0.min.js`)
            
        //     loadScript(`${process.env.PUBLIC_URL}/vendor/dotted-map/js/contrib/suntimes.js`)
         
        //    loadScript(`${process.env.PUBLIC_URL}/vendor/dotted-map/js/contrib/color-0.4.1.js`)
           
        //    loadScript(`${process.env.PUBLIC_URL}/vendor/dotted-map/js/world.js`)
          
        //    loadScript(`${process.env.PUBLIC_URL}/vendor/dotted-map/js/smallimap.js`)
         
        //     loadScript(`${process.env.PUBLIC_URL}/js/dashboard/dotted-map-init.js`)
         
        //    loadScript(`${process.env.PUBLIC_URL}/js/custom.min.js`)
            
        //      loadScript(`${process.env.PUBLIC_URL}/js/deznav-init.js`)
         
        //    loadScript(`${process.env.PUBLIC_URL}/vendor/jquery-nice-select/js/jquery.nice-select.min.js`)
    }, [])
    return (
        <div>
            <div className="nav-header">
            <Link to="/dashboard" className="brand-logo d-none d-sm-block">
			    <img src="/logo.png" alt="Logo" />
            </Link>
			
            <div className="nav-control">
                <div className="hamburger">
                    <span className="line"></span><span className="line"></span><span className="line"></span>
                </div>
            </div>
        </div>
        </div>
    )
}

export default NavHeader
