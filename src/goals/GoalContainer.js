import React, { Component } from 'react'
import {connect} from "react-redux"
import {Button, Form, Grid, Loader} from "semantic-ui-react"
import {createGoal, getGoals} from "../store/actions/goalActions"
import GoalTile from './GoalTile';
import NavContainer from "../navigation/NavContainer"

class GoalContainer extends Component {
    state = {
        clicked: false,
        formData: {
            title: ""
        },
        loading: true
    }

    componentDidMount(){
        if (this.props.goals.length === 0 && this.props.user.id){
            this.props.getGoals(this.props.user)
        }
        // this.setState({...this.state, loading: false})
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props && this.props.goals.length === 0){
            this.props.getGoals(this.props.user)
            this.setState({...this.state, loading: false})
        }
        if(prevProps.goals.length !== this.props.goals.length && this.props.length !== 0) {
            this.setState({...this.state, loading: false})
        }
    }

    buttonHandler = (e) => {
        if (e.target.name === "add goal"){
            this.setState({ clicked: !this.state.clicked})
        } else if (e.target.name === "go back"){
            this.setState({ clicked: false, formData: { title: "" } })
        }
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
        return <Form id="goalForm" onSubmit={e => this.submitHandler(e)}>
                    <Form.Field>
                        <label>Title</label>
                        <input type="text" name="title" value={this.state.formData.title} placeholder="Goal Title" onChange={e => this.changeHandler(e)}/>
                    </Form.Field>
                    <Button className="formButton" type="submit">Create New Goal</Button>
                    <Button className="goalGoBack" name="go back" onClick={e => this.buttonHandler(e)}>Go Back</Button>

                </Form>
    }

    deleteGoal = (goal) => {
        this.props.deleteGoal(goal)
    }

  render() {
    let goals;
    let goalComps

    goals = this.props.goals

    if (goals !== undefined || goals.length > 0) {
        goalComps = goals.map(goal => {
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
    }

    return (
      <div className="goals">
        <NavContainer />
          <h2 id="goalContainerHeader">My Goals</h2>
            <div className="goalContainer">
                {this.state.clicked === false && this.state.loading === false ?<Grid>
                    <Grid.Row>
                        {goalComps}
                    </Grid.Row>
                </Grid> : null}
            </div>
            <div>{this.state.clicked === true ? this.renderForm() : null}</div>
            <br></br>
            {this.state.clicked === false && this.state.loading === false ? <Button name="add goal" className="addGoal" onClick={e => this.buttonHandler(e)}>Add Goal</Button>: null}
            {this.state.loading === true ? <Loader active inline='centered' size="large" /> : null}
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
        getGoals: (user) => dispatch(getGoals(user)),
        createGoal: (goal, user) => dispatch(createGoal(goal, user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoalContainer)