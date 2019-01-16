const initialState = {
    user: {},
    partner: {},
    goals: [],
    featuredGoal: {},
    lists: [],
    tasks: [],
    doctors: [],
    myDoctors: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "LOAD_GOAL":
            return {
                ...state,
                goals: [...state.goals, action.goal]
            }

        case "ADD_GOAL":
            return {
                ...state,
                goals: [...state.goals, action.goal]
            }
    
        case "DELETE_GOAL":
            console.log(action.goal)
            return {
                ...state,
                goals: state.goals.filter(goal => {
                    return Number(goal.id) !== action.goal
                }),
                featuredGoal: {}
            }
        
        case "FEATURE_GOAL":
            return {
                ...state,
                featuredGoal: action.goal.data
            }

        case "LOAD_LISTS":
            return {
                ...state,
                lists: action.lists
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
            return {
                ...state,
                lists: state.lists.filter(list => {
                    return list.id !== action.list
                })
            }
        
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
            const editedTasks = state.tasks.map(task => {
                if (action.task.id === task.id) {
                    return {...task, ...action.task}
                }
                return task
            })
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
                    user: action.user.user.username,
                    name: action.user.user.name,
                    token: action.user.jwt
                },
            }

        case "LOGOUT_USER":
            console.log("Made It Here")
            localStorage.clear()
            return {
                user: {},
                goals: [],
                featuredGoal: {},
                lists: [],
                tasks: [], 
            }

        case "ADD_PARTNER":
            const partner = action.partner
            return {
                ...state,
                partner: {
                    id: partner.id,
                    name: partner.attributes.name
                    ,
                    email: partner.attributes.email
                }
            }

        case "EDIT_PARTNER":
            const partnerEdit = action.partner.attributes
            return {
                ...state,
                partner: {
                    id: action.partner.id,
                    name: partnerEdit.name,
                    email: partnerEdit.email
                }
            }

        case "DELETE_PARTNER":
            return {
                ...state,
                partner: {}
            }

        case "ADD_DOCTORS":
            let fetchedDoctors;
            if (action.doctors.length > 0) {
                fetchedDoctors = action.doctors.map(doctor => {
                    return {
                        practices: doctor.practices,
                        profile: doctor.profile,
                    }
                })
            } else {
                fetchedDoctors = ["Sorry, no doctors found. Please try again"]
            }
            return {
                ...state,
                doctors: fetchedDoctors
            }

        default:
            return state
    }
}

export default reducer