import React, { Component } from 'react'

class GoalTile extends Component {

    pushToGoal = () => {
        this.props.select(this.props.goal.id)
        .then(() => this.props.history.replace("/featured_goal"))
    }

    render() {
        return (
            <div className="ui card three wide column" onClick={this.pushToGoal}>
                <div className="content" id="goalTile">
                    {this.props.goal.name}
                </div>
            </div>
        )
    }
}
export default GoalTile