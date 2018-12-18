import React, { Component } from 'react'

const GoalTile = props => {
    return (
        <div className="ui card three wide column">
            <div className="content">
                {props.goal.name}
            </div>
        </div>
    )
}
export default GoalTile