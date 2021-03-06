export const addGoal = goal => ({type: "ADD_GOAL", goal})

export const deleteGoal = goal => ({type: "DELETE_GOAL", goal})

export const featureGoal = goal => ({type: "FEATURE_GOAL", goal})

export const loadGoals = goals => ({type: "LOAD_GOALS", goals})

const GOAL_URL = "https://good-work-backend.herokuapp.com/api/v1/goals"

export const selectGoal = (id) => {
    let FETCH_URL = `${GOAL_URL}/${id}`

    return (dispatch) => {
        return fetch(FETCH_URL, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${localStorage.token}`
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
        return fetch(GOAL_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${localStorage.token}`
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
                dispatch(addGoal(res))
            }
        })
        .catch(console.error)
    }
}

export const destroyGoal = (goal, lists) => {
    const id = Number(goal.id)
    const complete = lists.length === 0
    let FETCH_URL = `${GOAL_URL}/${id}`
    return (dispatch) => {
        return fetch(FETCH_URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${localStorage.token}`
            },
            body: JSON.stringify({
                complete: complete
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.error){
                alert(res.error)
            } else {
                dispatch(deleteGoal(id))
            }
        })
    }
}

export const getGoals = () => {
    return (dispatch) => {
        return fetch(GOAL_URL, {
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
                "Authorization": `${localStorage.token}`
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.errors){
                alert(res.errors)
            } else if (res.message){
                alert(res.message)
            } else {
                dispatch(loadGoals(res))
            }
        })
    }
}