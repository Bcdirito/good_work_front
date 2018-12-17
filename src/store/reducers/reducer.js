const initialState = {
    user: {},
    goals: [],
    lists: [],
    tasks: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_GOAL":
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

        case "LOAD_LIST":
            return {
                ...state,
                lists: [...state.lists, action.list]
            }
        
        case "ADD_LIST":
            console.log("Triggered Add List", action.list)
            debugger
            return {
                ...state,
                lists: [...state.lists, action.list.data]
            }
        
        case "DELETE_LIST":
            console.log("Triggered Delete List", action.list)
            return state
        
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
                doctors: []
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