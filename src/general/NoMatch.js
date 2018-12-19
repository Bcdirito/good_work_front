import React from 'react'
import wrongMap from "../media/noMatchMap.jpeg"

const NoMatch = props => {
    return (
        <div id="noMatch">
            <div className="header"><h1>My Friend, You Seem To Have Gotten Lost</h1></div>
            <br></br>
            <div id="wrongPlace"></div><img src={wrongMap} alt="no match"></img>
        </div>  
    )
}

export default NoMatch