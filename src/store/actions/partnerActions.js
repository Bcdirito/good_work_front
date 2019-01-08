export const addPartner = partner => ({type: "ADD_PARTNER", partner})

export const editPartner = partner => ({type: "EDIT_PARTNER", partner})

export const deletePartner = partner => ({type: "DELETE_PARTNER", partner})

export const getPartner = user => {
    const userId = user.id
    return (dispatch) => {
        return fetch("http://localhost:3000/api/v1/partners", {
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
                const partner = res.data.filter(partner => {
                  return Number(partner.relationships.user.data.id
                    ) === userId
                })
                if (partner.length > 0){
                    const userPartner = partner[0]
                    dispatch(addPartner(userPartner))
                }
            }
        })
    }
}

export const createPartner = (data, user) => {
    return (dispatch) => {
        return fetch("http://localhost:3000/api/v1/partners", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${user.token}`
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                user_id: user.id
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.error){
                alert(res.message)
            } else {
                dispatch(addPartner(res.data))
            } 
        })
    }
}

export const updatePartner = (data, partner, user) => {
    return (dispatch) => {
        return fetch(`http://localhost:3000/api/v1/partners/${partner.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${user.token}`
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.error){
                alert(res.error)
            } else {
                dispatch(editPartner(res.data))
            }
        })
    }
}

export const destroyPartner = (partner, user) => {
    return (dispatch) => {
        return fetch(`http://localhost:3000/api/v1/partners/${partner.id}`, {
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
                dispatch(deletePartner(partner))
            }
        })
    }
}

export const messagePartner = (subject, message, partner, user) => {
    return (dispatch) => {
        return fetch(`http://localhost:3000/api/v1/partners/${partner.id}/message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${user.token}`
            },
            body: JSON.stringify({
                subject: subject,
                message: message
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.error){
                alert(res.error)
            } else {
                alert(res.message)
            }
        })
    }
}