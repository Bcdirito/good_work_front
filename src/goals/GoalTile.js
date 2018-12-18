import React, { Component } from 'react'

class GoalTile extends Component {

    pushToGoal = () => {
        this.props.history.replace(`/goals/${this.props.goal.id}`)
    }

    render() {
        return (
            <div className="ui card three wide column" onClick={this.pushToGoal}>
                <div className="content">
                    {this.props.goal.name}
                </div>
            </div>
        )
    }
}
export default GoalTile