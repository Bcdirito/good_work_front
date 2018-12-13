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

        default:
            return state
    }
}

export default reducer