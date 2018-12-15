import React, { Component } from 'react'
import Goal from "./Goal"
import {connect} from "react-redux"
import {Button, Form} from "semantic-ui-react"

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
        this.setState({ clicked: false, formData: { title: "" } })
    }

    renderForm = () => {
        return <Form onSubmit={e => this.submitHandler(e)}>
                    <Form.Field>
                        <label>Title</label>
                        <input type="text" name="title" value={this.state.formData.title} placeholder="Goal Title" onChange={e => this.changeHandler(e)}/>
                    </Form.Field>
                    <Button type="submit">Add Goal!</Button>
                </Form>
    }

    deleteGoal = (goal) => {
        this.props.deleteGoal(goal)
    }

  render() {
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
        {this.state.clicked === false ? <Button onClick={this.buttonHandler}>Add Goal</Button>: null}
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