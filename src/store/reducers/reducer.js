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

        default:
            return state
    }
}

export default reducer