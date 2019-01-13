export const addList = list => ({type: "ADD_LIST", list})

export const deleteList = list => ({type: "DELETE_LIST", list})

export const loadLists = lists => ({type: "LOAD_LISTS", lists})

export const getLists = (goalId, user) => {
    return (dispatch) => {
        return fetch("http://localhost:3000/api/v1/lists", {
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
                "Authorization": `${user.token}`
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.errors){
                console.log(res.errors)
            } else {
                const filterArr = res.data.filter(list => {
                    return list.relationships.goal.data !== null && Number(list.relationships.goal.data.id)
                    === goalId
                })
                dispatch(loadLists(filterArr))
            }}
        )
        .catch(console.error)
    }
}

export const createList = (list, goal, user) => {
    return (dispatch) => {
        return fetch("http://localhost:3000/api/v1/lists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${user.token}`
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
                dispatch(addList(res.data))
            }
        })
    }
}

export const destroyList = (list, user) => {
    const id = list.id
    return (dispatch) => {
        return fetch(`http://localhost:3000/api/v1/lists/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${user.token}`
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