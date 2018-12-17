export const addList = list => ({type: "ADD_LIST", list})

export const deleteList = list => ({type: "DELETE_LIST", list})

export const loadList = list=> ({type: "LOAD_LIST", list})

// export const getLists = goal => {
//     const id = goal.id
//     return (dispatch) => {
//         return fetch("http://localhost:3000/api/v1/lists", {
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accepts": "application/json"
//             }
//         })
//         .then(res => res.json())
//         .then(res => {
//             if (res.errors){
//                 console.log(res.errors)
//             } else {
//                 res.data.forEach(list => {
//                     if (Number(list.relationships.goal.data.id)
//                     === id){
//                         dispatch(loadList(list))
//                     }
//                 })
//             }}
//         )
//         .catch(console.error)
//     }
// }

export const createList = (list, goal) => {
    return (dispatch) => {
        return fetch("http://localhost:3000/api/v1/lists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
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