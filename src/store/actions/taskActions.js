export const addTask = task => ({type: "ADD_TASK", task})

export const deleteTask = task => ({type: "DELETE_TASK", task})

export const storeTasks = tasks => ({type: "STORE_TASKS", tasks})

export const editTask = task => ({type: "EDIT_TASK", task})

const TASK_URL = "https://git.heroku.com/good-work-backend.git/api/v1/tasks"

// export const getTasks = (list, user) => {
//     const id = list.id
//     return (dispatch) => {
//         return fetch (TASK_URL, {
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accepts": "application/json",
//                 "Authorization": `${user.token}`
//             }
//         })
//         .then(res => res.json())
//         .then(res => {
//             if (res.errors){
//                 console.log(res.errors)
//             } else {
//                 res.data.forEach(task => {
//                     if (task.relationships.list.data !== null && task.relationships.list.data.id === id){
//                         dispatch(loadTask(task))
//                     }
//                 })
//             }
//         })
//     }
// }

export const createTask = (task, list, user) => {
    return (dispatch) => {
        return fetch(TASK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `${user.token}`
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

export const destroyTask = (id, user) => {
    return (dispatch) => {
        return fetch(`${TASK_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${user.token}`
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

export const updateTask = (data, id, listId, user) => {
    return (dispatch) => {
        return fetch(`${TASK_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${user.token}`
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