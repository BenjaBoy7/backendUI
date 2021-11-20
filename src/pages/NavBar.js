import React from 'react';
import {Link } from 'react-router-dom';
 
function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        <Link className="nav-link" to="/agents">Agents</Link>
                        <Link className="nav-link" to="/properties">Properties</Link>
                        <Link className="nav-link disabled" to="#" tabindex="-1" aria-disabled="true">Disabled</Link>
                    </div>
                    </div>
                </div>
                </nav>
        </div>
    )
}

export default NavBar
