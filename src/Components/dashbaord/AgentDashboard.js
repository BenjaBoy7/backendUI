import React, { Component } from 'react'

export class AgentDashboard extends Component {
    componentDidMount(){
        var loadScript = function(src) {
            var tag = document.createElement('script');
            tag.async = false;
            tag.src = src;
            document.getElementsByTagName('body')[0].appendChild(tag);
            }
            loadScript('./vendor/global/global.min.js')
            loadScript('./vendor/chart.js/Chart.bundle.min.js')
            loadScript('./vendor/apexchart/apexchart.js')
            loadScript('./vendor/peity/jquery.peity.min.js')
            loadScript('./js/dashboard/dashboard-1.js')
            loadScript('./vendor/dotted-map/js/contrib/jquery.smallipop-0.3.0.min.js')
            loadScript('./vendor/dotted-map/js/contrib/suntimes.js')
            loadScript('./vendor/dotted-map/js/contrib/color-0.4.1.js')
            loadScript('./vendor/dotted-map/js/world.js')
            loadScript('./vendor/dotted-map/js/smallimap.js')
      
            loadScript('./js/dashboard/dotted-map-init.js')
            loadScript('./js/custom.min.js')
            loadScript('./js/deznav-init.js')
            loadScript('./vendor/jquery-nice-select/js/jquery.nice-select.min.js')
    }
    render() {
        return (
            <div>
                 agent dashboard
            </div>
        )
    }
}

export default AgentDashboard
