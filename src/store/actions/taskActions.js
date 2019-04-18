export const addTask = task => ({type: "ADD_TASK", task})

export const deleteTask = task => ({type: "DELETE_TASK", task})

export const storeTasks = tasks => ({type: "STORE_TASKS", tasks})

export const editTask = task => ({type: "EDIT_TASK", task})

const TASK_URL = "https://good-work-backend.herokuapp.com/api/v1/tasks"

export const createTask = (task, list) => {
    return (dispatch) => {
        return fetch(TASK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `${localStorage.token}`
        },
        body: JSON.stringify({
            list_id: list.id,
            title: task.title,
            content: task.content
        })
    })
    .then(res => res.json())
    .then(res => dispatch(addTask(res)))
    .catch(console.error)
}}

export const destroyTask = (id) => {
    return (dispatch) => {
        return fetch(`${TASK_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${localStorage.getItem("token")}`
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

export const updateTask = (data, id) => {
    return (dispatch) => {
        return fetch(`${TASK_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${localStorage.token}`
            },
            body: JSON.stringify({
                title: data.title,
                content: data.content
            })
        })
        .then(res => res.json())
        .then(res => {dispatch(editTask(res))})
        .catch(console.error)
    }
}