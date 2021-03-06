import React, { Component } from 'react'
import List from "./List"
import ListTile from "./ListTile"
import {connect} from "react-redux"
import {Button, Form, Grid, Loader} from "semantic-ui-react"
import { destroyGoal, selectGoal } from '../store/actions/goalActions'
import {createList, destroyList} from "../store/actions/listActions"
import NavContainer from "../navigation/NavContainer"


class Goal extends Component {
    state = {
        clicked: false,
        formData: {
            title: ""
        },
        featuredList: {},
        loading: false
    }

    componentDidMount = () => {
        if (this.props.lists.length > 0){
            this.props.clearLists()
        }
    }

    componentDidUpdate(prevProps){
        if (this.props !== prevProps && prevProps.user.id === undefined && this.props.lists === undefined){
            this.props.selectGoal(localStorage.getItem("goal"))
        }

        if ((prevProps.lists !== undefined && this.props.lists !== undefined) && (prevProps.lists.length !== this.props.lists.length)){
            this.props.selectGoal(localStorage.getItem("goal")).then(this.setState({...this.state, loading: false}))
            
        }
    }

    buttonHandler = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    deleteHandler = () => {
        if (this.props.lists.length > 0){
            this.unfinishedDelete()
        } else {
            this.finishedDelete()
        }
    }

    unfinishedDelete = () => {
        const result = window.confirm("Looks Like You Still Have Some Unfinished Lists. Are You Sure You're Finished With This Goal?")
        if (result === true){
            alert("You Got It! I Believe You Know Best!")
            this.props.deleteGoal(this.props.featuredGoal, this.props.lists)
            this.props.history.replace("/goals")
        } else {
            alert("Keep At It! Nothing Can Stop You!")
        }
    }

    finishedDelete = () => {
        const result = window.confirm("What is That? Did You Just Complete A Goal?")
        if (result === true){
            alert("This Is Why You Fill Me With Such Wonder!")
            this.props.deleteGoal(this.props.featuredGoal, this.props.lists)
            this.props.history.replace("/goals")
        } else {
            alert("Keep At It! Nothing Can Stop You!")
        }
    }

    changeHandler = e => {
        this.setState({
            formData: {
                [e.target.name]: e.target.value
            }
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.addList(this.state.formData, this.props.featuredGoal)
        this.loadState()
    }

    resetContainer = () => {
        this.setState({
            clicked: false,
            formData: {
                title: ""
            },
            featuredList: {},
            loading: false
        })
    }

    loadState = () => {
        this.setState({
            clicked: false,
            formData: {
                title: ""
            },
            featuredList: {},
            loading: true
        })
    }

    featureList = (list) => {
        this.setState({ featuredList: list})
    }

    finishGoal = () => {
        let result = window.confirm("Are You Proving Your Greatness Again by Completing This Goal?")
        if (result === true){
            alert("You Did It! You Deserve All of the High Fives!")
            this.deleteHandler()
        } else {
            alert("Sounds Good! We'll be Here Cheering You On!")
        }
    }

    finishList = () => {
        let result = window.confirm("Did You Accomplish Everything to Do on This List?")
        if (result === true){
            alert("Another One Down, Another Win for You!")
            this.loadState()
            this.props.deleteList(this.state.featuredList)
        } else {
            alert("No Worries! We'll be Here When You Finish!")
        }
    }

    renderForm = () => {
        return (<div>
                    <Form className="newListForm" onSubmit={e => this.submitHandler(e)}>
                        <Form.Field>
                            <label>List Title</label>
                            <input type="text" name="title" value={this.state.formData.title} placeholder="Enter Title Here" onChange={e => this.changeHandler(e)}/>
                        </Form.Field>
                        <Button type="submit" className="newListButton" id="newList">Create New List</Button>
                        <Button name="go back" className="newListButton" id="listGoBack" onClick={this.resetContainer}>Go Back</Button>
                    </Form>
                </div>)

    }



    render() {
        const goal = this.props.featuredGoal
        let listComps;

        if (goal !== undefined && goal.id){
            listComps = goal.lists.map(list => {
                return (<div className="listTiles">
                            <Grid.Column>
                                <ListTile
                                key={list.id}
                                listId={list.id}
                                list={list}
                                featureList={this.featureList}
                                resetContainer={this.resetContainer}
                                />
                            </Grid.Column>
                        </div>)
                }       
            )
        }
        
        return (
            <div className="goalPage">
                <NavContainer />
                
                <h2 id="goalHeader">{goal !== undefined ?  goal.name : null}</h2>
                    {this.state.featuredList.id ? <List list={this.state.featuredList}
                    resetContainer={this.resetContainer}
                    finishList={this.finishList}
                    tasks={this.state.featuredList.tasks}
                    /> : <div className="listContainer">
                        <Grid>
                            <Grid.Row>
                                {this.state.clicked === false ? listComps : this.renderForm()}
                            </Grid.Row>
                        </Grid>
                    </div>}
                <br></br>
                {this.state.clicked === false && this.state.featuredList.id === undefined ? <Button className="addList" onClick={this.buttonHandler}>Add List</Button>: null}
                {this.state.clicked === false && this.state.featuredList.id === undefined ? <Button className="finished" onClick={this.deleteHandler}>Finished!</Button> : null}
                {this.state.loading === true ? <Loader active inline='centered' size="large" /> : null}
            </div>
        )
  }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        featuredGoal: state.featuredGoal,
        lists: state.lists
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteGoal: (goal, lists) => dispatch(destroyGoal(goal, lists)),
        addList: (list, goal) => dispatch(createList(list, goal)),
        clearLists: () => dispatch({type: "CLEAR_LISTS"}),
        selectGoal: (id) => dispatch(selectGoal(id)),
        deleteList: (list) => dispatch(destroyList(list))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Goal)