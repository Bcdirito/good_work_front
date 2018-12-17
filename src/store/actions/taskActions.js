export const addTask = task => ({type: "ADD_TASK", task})

export const deleteTask = task => ({type: "DELETE_TASK", task})

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
    .then(data => dispatch(data))
    .catch(console.error)
}}

export const destroyTask = task => {
    
}