const initialState = {
    user: {},
    goals: [],
    featuredGoal: {},
    lists: [],
    tasks: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_GOAL":
            console.log("Made it to ADD_GOAL")
            const newGoals = state.goals[0].concat(action.goal)
            return {
                ...state,
                goals: newGoals
            }
    
        case "DELETE_GOAL":
            let goalsArray;
            if (state.goals.length === 1){
                goalsArray = state.goals[0]
            } else if (state.goals[state.goals.length -1].length !== undefined){
                const newArr = Array.from(state.goals.slice(0, (state.goals.length - 1)))
                goalsArray = newArr
            }
            return {
                ...state,
                goals: goalsArray.filter(goal => {
                    return goal.id !== action.goal
                })
            }
        
        case "FEATURE_GOAL":
            console.log("Made It To FEATURE_GOAL")
            return {
                ...state,
                featuredGoal: action.goal.data
            }

        case "LOAD_LIST":
            // debugger
            return {
                ...state,
                lists: [...state.lists, action.list]
            }
        
        case "ADD_LIST":
            return {
                ...state,
                lists: [...state.lists, action.list]
            }

        case "CLEAR_LISTS":
            console.log("Made It To CLEAR_LISTS")
            return {
                ...state,
                lists: []
            }
            
        
        case "DELETE_LIST":
            console.log("Triggered Delete List", action.list)
            return state
        
        case "LOAD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, action.task]
            }

        case "ADD_TASK":
            const newTasks = state.tasks.concat(action.task)
            return {
                ...state,
                tasks: newTasks
            }
        
        case "EDIT_TASK":
            console.log("Triggered Edit Task", action.task)
            const editedTasks = state.tasks.map(task => {
                if (action.task.id === task.id) {
                    return {...task, ...action.task}
                }
                return task
            })
            console.log(editedTasks)
            return {
                ...state,
                tasks: editedTasks
            }

        case "DELETE_TASK":
            console.log("Triggered Delete Task", action.task)
            return {
                ...state,
                tasks: state.tasks.filter(task => {
                    return Number(task.id) !== action.task
                })
            }

        case "LOGIN_USER":
            localStorage.setItem("token", action.user.jwt)
            return {
                ...state,
                user: {
                    id: action.user.user.id,
                    user: action.user.user.username
                },
                goals: [...state.goals, action.user.user.goals],
            }

        case "LOGOUT_USER":
            return {
                user: {},
                goals: [],
                featuredGoal: {},
                lists: [],
                tasks: [],
            

            }

        case "CREATE_USER":
            // console.log(action.user)
            localStorage.setItem("token", action.user.jwt)
            return {
                ...state,
                user: {
                    id: action.user.user.id,
                    user: action.user.user.username,
                }
            }

        default:
            return state
    }
}

export default reducer