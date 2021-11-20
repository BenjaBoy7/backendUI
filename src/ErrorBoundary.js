import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null, hasError: false  };
    }
    
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })

      console.log(`Cause: ${error}.\nStackTrace: ${errorInfo.componentStack}`);
      // You can also log error messages to an error reporting service here
    }
    
    render() {
      if (this.state.hasError) {
        // Error path
        return (
          <div className="container-fluid">
              <div className="m-5">
            <h2>Something went wrong</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
                <div className="alert alert-danger">
              {/* {this.state.error && this.state.error.toString()} */}
              <br />

              <br />

                  <h4>
                  <a href="/tech-support" target="_blank" >
                 
                  Technical support
                  </a>
                  </h4>


                    <h4>
                  <a href="/dashboard" >
                  <img src="/images/refresh.png" style={{height:'25px', width:'25px'}} />
                  &nbsp;&nbsp;
                  try again
                  </a>
                  </h4>
              {/* {this.state.errorInfo.componentStack} */}
              </div>
            </details>
            </div>
          </div>
        );
      }
      // Normally, just render children
      return this.props.children;
    }  
  }

export default ErrorBoundary