export const addGoal = goal => ({type: "ADD_GOAL", goal})

export const deleteGoal = goal => ({type: "DELETE_GOAL", goal})

export const featureGoal = goal => ({type: "FEATURE_GOAL", goal})

export const loadGoal = goal => ({type: "LOAD_GOAL", goal})

export const selectGoal = id => {
    return (dispatch) => {
        return fetch(`http://localhost:3000/api/v1/goals/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            dispatch(featureGoal(data))
        })
    }
}

export const createGoal = (goal, user) => {
    return (dispatch) => {
        return fetch("http://localhost:3000/api/v1/goals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user_id: user.id,
                name: goal.title
            })
        })
        .then(res => res.json())
        .then((res) => {
            if (res.error){
                res.error.forEach(error => {
                    alert(error)
                })
            } else {
                dispatch(addGoal(res.data))
            }
        })
        .catch(console.error)
    }
}

export const destroyGoal = goal => {
    const id = Number(goal.id)
    return (dispatch) => {
        return fetch(`http://localhost:3000/api/v1/goals/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
        .then(res => res.json())
        .then((res) => {
            if (res.error){
                alert(res.error)
            } else {
                dispatch(deleteGoal(id))
            }
        })
    }
}

export const getGoals = user => {
    return (dispatch) => {
        return fetch("http://localhost:3000/api/v1/goals", {
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.errors){
                console.log(res.errors)
            } else {
                res.data.forEach(goal => {
                    if (Number(goal.relationships.user.data.id) === user.id){
                        dispatch(loadGoal(goal))
                    }
                })
            }
        })
    }
}