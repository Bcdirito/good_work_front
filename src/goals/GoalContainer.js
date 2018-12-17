import React, { Component } from 'react'
import Goal from "./Goal"
import {connect} from "react-redux"
import {Button, Form} from "semantic-ui-react"
import {createGoal} from "../store/actions/goalActions"

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

        this.props.createGoal(this.state.formData, this.props.user)

        this.setState({ clicked: false, formData: { title: "" } })
    }

    renderForm = () => {
        return <Form onSubmit={e => this.submitHandler(e)}>
                    <Form.Field>
                        <label>Title</label>
                        <input type="text" name="title" value={this.state.formData.title} placeholder="Goal Title" onChange={e => this.changeHandler(e)}/>
                    </Form.Field>
                    <Button type="submit">Create New Goal</Button>
                </Form>
    }

    deleteGoal = (goal) => {
        this.props.deleteGoal(goal)
    }
    
    createGoalComps = () => {
        if (this.props.goals.length > 0){
            const goals = Array.from(this.props.goals[0])
            return goals.map(goal => {
                return <Goal
                        key={goal.id}
                        goal={goal}
                        deleteGoal={this.props.deleteGoal}
                        />
            })
        }
    }

  render() {
    let allGoals = this.createGoalComps()

    return (
      <div>
          <h2>My Goals</h2>
            {allGoals}
            <div>{this.state.clicked === true ? this.renderForm() : null}</div>
            {this.state.clicked === false ? <Button onClick={this.buttonHandler}>Add Goal</Button>: <Button onClick={this.buttonHandler}>Go Back</Button> }
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        goals: state.goals
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createGoal: (goal, user) => dispatch(createGoal(goal, user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalContainer)