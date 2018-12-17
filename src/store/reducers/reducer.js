const initialState = {
    user: {},
    doctors: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_GOAL":
            console.log("Triggered Add Goal", action.goal)
            return state
    
        case "DELETE_GOAL":
            console.log("Triggered Delete Goal", action.goal)
            return state
        
        case "ADD_LIST":
            console.log("Triggered Add List", action.list)
            return state
        
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
            console.log("Triggered User Login", action)
            return state

        case "LOGOUT_USER":
            console.log("Triggered User Logout", action)
            return {
                user: {},
                doctors: []
            }

        case "CREATE_USER":
            console.log(action.user)
            return {
                ...state,
                user: {
                    id: action.user.user.id,
                    user: action.user.user.username,
                    token: action.user.jwt
                }
            }

        default:
            return state
    }
}

export default reducer