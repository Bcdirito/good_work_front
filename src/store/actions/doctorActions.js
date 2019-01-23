export const addDoctors = doctors => ({type: "ADD_DOCTORS", doctors})

export const addPersonalDoctor = doctor => ({type: "ADD_PERSONAL", doctor})

export const storePersonalDoctors = doctors => ({ type: "STORE_PERSONAL", doctors})

export const deleteDoctor = doctor => ({type: "DELETE_DOCTOR", doctor})

const DOCTOR_URL = "https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=psychologist"

const skipLimit = "&skip=0&limit=100"

const API_KEY = "&user_key=" + process.env.REACT_APP_API_KEY

export const getDoctors = location => {
    const FETCH_URL = DOCTOR_URL + "&location=" + location + skipLimit + API_KEY
    return (dispatch) => {
        return fetch(FETCH_URL)
        .then(res => res.json())
        .then(doctors => {
            dispatch(addDoctors(doctors.data))
        })
        .catch(error => alert(error))
    }
}

export const saveDoctor = (user, doctor) => {
    const practices = doctor.practices
    const name = `${doctor.profile.first_name} ${doctor.profile.last_name}`
    const bio = doctor.profile.bio
    return (dispatch) => {
        return fetch("http://localhost:3000/api/v1/doctors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${user.token}`
            },
            body: JSON.stringify({
                user_id: user.id,
                name: name,
                bio: bio
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.error){
                alert(res.error)
            } else {
                practices.forEach(practice => {
                    savePractice(user, practice, res.data)
                })
                dispatch(addPersonalDoctor(res.data))
            }
        })
        .catch(console.error)
    }
}

export const savePractice = (user, practice, doctor) => {
    const name = practice.name
    const address = `${practice.visit_address.street}, ${practice.visit_address.city}, ${practice.visit_address.state} ${practice.visit_address.zip}`
    const phone = practice.phones[0].number
    return (dispatch) => {
        return fetch("http://localhost:3000/api/v1/practices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${user.token}`
            },
            body: JSON.stringify({
                doctor_id: doctor.id,
                name: name,
                address: address,
                phone: phone
            })
        })
        .then(res => res.json())
        .then(res => {
            debugger
            if (res.error){
                res.error.forEach(error => {
                    alert(error)
                })
            } else {
                debugger
                let filterMyDocs
                dispatch(storePersonalDoctors)
            }
        })
        .catch(console.error)
    }
}

export const fetchMyDoctors = user => {
    return (dispatch) => {
        return fetch("http://localhost:3000/api/v1/doctors", {
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json",
                "Authorization": `${user.token}`
            }
        })
        .then(res => res.json())
        .then(res => {
            if (res.message){
                alert(res.message)
            } else if (res.error) {
                alert (res.error)
            } else {
                let filterArr = res.data.map(doc => {
                    let users = doc.relationships.users.data
                    let userIds = users.map(ind => {
                        return Number(ind.id)
                    })
                    if (userIds.includes(user.id)){
                        return doc
                    }
                })
                dispatch(storePersonalDoctors(filterArr))
            }
        })
        .catch(error => alert(error))
    }
}
