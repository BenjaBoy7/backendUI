import React from 'react'

function Footer() {
    const lang =localStorage.getItem("lang") || "en";

    return (
        <div className="footer">
            <div className="copyright">
                <p>Copyright © Designed &amp; Developed by <a href="https://findproperties.ae/" target="_blank">FindProperties</a> 2021</p>
            </div>
        </div>
    )
}

export default Footer
