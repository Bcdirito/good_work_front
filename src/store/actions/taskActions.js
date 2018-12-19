export const addTask = task => ({type: "ADD_TASK", task})

export const deleteTask = task => ({type: "DELETE_TASK", task})

export const loadTask = task => ({type: "LOAD_TASK", task})

export const editTask = task => ({type: "EDIT_TASK", task})

export const getTasks = list => {
    const id = list.id
    return (dispatch) => {
        return fetch ("http://localhost:3000/api/v1/tasks", {
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
                res.data.forEach(task => {
                    if (task.relationships.list.data.id === id){
                        dispatch(loadTask(task))
                    }
                })
            }
        })
    }
}

export const createTask = (task, list) => {
    return (dispatch) => {
        return fetch("http://localhost:3000/api/v1/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            list_id: list.id,
            title: task.title,
            content: task.content
        })
    })
    .then(res => res.json())
    .then(res => dispatch(addTask(res.data)))
    .catch(console.error)
}}

export const destroyTask = id => {
    return (dispatch) => {
        return fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
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
                dispatch(deleteTask(id))
            }
        })
    }
}

export const updateTask = (data, id, listId) => {
    return (dispatch) => {
        return fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                list_id: listId,
                title: data.title,
                content: data.content
            })
        })
        .then(res => res.json())
        .then(res => {
            dispatch(editTask(res.data))})
        .catch(console.error)
    }
}