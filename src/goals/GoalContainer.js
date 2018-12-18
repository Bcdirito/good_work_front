import React, { Component } from 'react'
import Goal from "./Goal"
import {connect} from "react-redux"
import {Button, Form, Grid} from "semantic-ui-react"
import {createGoal} from "../store/actions/goalActions"
import GoalTile from './GoalTile';

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

  render() {
    const goals = Array.from(this.props.goals[0])

    const goalComps = goals.map(goal => {
        return (<div className="goalTiles">
                    <Grid.Column>
                        <GoalTile
                        key={goal.id}
                        goal={goal}
                        deleteGoal={this.props.deleteGoal}
                        history={this.props.history}
                        />
                    </Grid.Column>
                </div>)
    })

    return (
      <div>
          <h2>My Goals</h2>
            <div className="goalContainer">
                <Grid>
                    <Grid.Row>
                        {goalComps}
                    </Grid.Row>
                </Grid>
            </div>
            <div>{this.state.clicked === true ? this.renderForm() : null}</div>
            <br></br>
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