import React from 'react'
import wrongMap from "../media/noMatchMap.jpeg"

const NoMatch = props => {
    return (
        <div id="noMatch">
            <div className="header"><h1>Oops! There's Nothing Here Silly</h1></div>
            <br></br>
            <div id="wrongPlace"></div><img src={wrongMap} alt="no match"></img>
        </div>  
    )
}

export default NoMatch