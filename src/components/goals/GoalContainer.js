import React, { Component } from 'react'
import Goal from "./Goal"
import {connect} from "react-redux"

class GoalContainer extends Component {
    state = {
        clicked: false,
        formData: {
            title: ""
        }
    }

    buttonHandler = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    changeHandler = e => {
        this.setState({ formData: {
            [e.target.name]: e.target.value
            }
        })
    }

    submitHandler = e => {
        e.preventDefault()
        this.props.addGoal(this.state.formData)
        this.setState({ formData: { title: "" } })
    }

    renderForm = () => {
        return <form onSubmit={e => this.submitHandler(e)}>
                <label>Title</label>
                    <input type="text" name="title" value={this.state.formData.title} placeholder="Goal Title" onChange={e => this.changeHandler(e)}/>
                <input type="submit"></input>
                </form>
    }

    deleteGoal = (goal) => {
        this.props.deleteGoal(goal)
    }

  render() {
    console.log(this.props)
    // let allGoals = this.props.user.goals.map(goal => {
    //     return <Goal
    //             key={goal.id}
    //             goal={goal}
    //             deleteGoal={this.props.deleteGoal}
    //             />
    // })
    return (
      <div>
        This is the GoalContainer
        {this.state.clicked === false ? <button onClick={this.buttonHandler}>Add Goal</button>: null}
        <div>{this.state.clicked === true ? this.renderForm() : null}</div>
        <Goal />
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addGoal: goal => dispatch({type: "ADD_GOAL", goal})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalContainer)