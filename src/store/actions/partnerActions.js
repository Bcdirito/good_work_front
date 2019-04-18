export const addPartner = partner => ({type: "ADD_PARTNER", partner})

export const editPartner = partner => ({type: "EDIT_PARTNER", partner})

export const deletePartner = () => ({type: "DELETE_PARTNER"})

const PARTNER_URL = "https://good-work-backend.herokuapp.com/api/v1/partners"

export const createPartner = (data) => {
    return (dispatch) => {
        return fetch(PARTNER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${localStorage.token}`
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.error){
                alert(res.message)
            } else {
                dispatch(addPartner(res))
            } 
        })
    }
}

export const updatePartner = (data) => {
    return (dispatch) => {
        return fetch(`${PARTNER_URL}/update`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${localStorage.token}`
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
                dispatch(editPartner(res))
            }
        })
    }
}

export const destroyPartner = (partner) => {
    let FETCH_URL = `${PARTNER_URL}/delete`
    return (dispatch) => {
        return fetch(FETCH_URL, {
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
                dispatch(deletePartner())
            }
        })
    }
}

export const messagePartner = (subject, message) => {
    let MESSAGE_URL = `${PARTNER_URL}/message`
    return (dispatch) => {
        return fetch(MESSAGE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${localStorage.token}`
            },
            body: JSON.stringify({
                subject: subject,
                message: message
            })
        })
        .then(res => res.json())
        .then(res => {
            alert("Message Sending")
            if (res.error){
                alert(res.error)
            } else {
                alert(res.message)
            }
        })
    }
}