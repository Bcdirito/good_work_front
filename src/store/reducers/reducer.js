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
            debugger
            return {
                ...state,
                goals: [...state.goals, action.goal.data]
            }
    
        case "DELETE_GOAL":
            return {
                ...state,
                goals: [...state.goals].filter(goal => {
                    return goal.id !== action.goal.id
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
            console.log("Triggered Add Task", action.task)
            return state
        
        case "UPDATE_TASK":
            console.log("Triggered Edit Task", action.task)
            return state

        case "DELETE_TASK":
            console.log("Triggered Delete Task", action.task)
            return state

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