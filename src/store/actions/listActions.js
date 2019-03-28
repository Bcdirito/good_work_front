export const addList = list => ({type: "ADD_LIST", list})

export const deleteList = list => ({type: "DELETE_LIST", list})

export const loadLists = lists => ({type: "LOAD_LISTS", lists})

const LIST_URL = "http://localhost:3000/api/v1/lists"

// https://good-work-backend.herokuapp.com/api/v1/lists

export const createList = (list, goal) => {
    return (dispatch) => {
        return fetch(LIST_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${localStorage.token}`
            },
            body: JSON.stringify({
                goal_id: goal.id,
                name: list.title
            })
        })
        .then(res => res.json())
        .then((res) => {
            if (res.error){
                res.error.forEach(error => {
                    alert(error)
                })
            } else {
                dispatch(addList(res))
            }
        })
    }
}

export const destroyList = (list) => {
    const id = list.id
    return (dispatch) => {
        return fetch(`${LIST_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${localStorage.token}`
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.error){
                alert(res.error)
            } else {
                dispatch(deleteList(id))
            }
        })
    }
}