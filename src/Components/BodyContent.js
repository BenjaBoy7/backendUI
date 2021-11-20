import React from 'react'

const lang= localStorage.getItem("lang") || "en"
function BodyContent() {
    return (
        <div className={lang=="en"?"content-body": "cont   ent-body_ar"} style={{minHeight: '1100px'}}>

        </div>
    )
}

export default BodyContent
