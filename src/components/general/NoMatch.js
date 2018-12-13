import React from 'react'
import wrongPup from "/Users/BrianDiRito/Development/Flatiron/good_work_front/src/media/wrongPup.jpg"

const NoMatch = props => {
    return (
        <div>
            <h1>Oops! There's Nothing Here Silly</h1>
            <img id="wrongPlace" src={wrongPup} alt="no match"></img>
        </div>  
    )
}

export default NoMatch