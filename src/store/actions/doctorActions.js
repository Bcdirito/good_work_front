export const addDoctors = doctors => ({type: "ADD_DOCTORS", doctors})

export const addPersonalDoctor = doctor => ({type: "ADD_PERSONAL", doctor})

export const editDoctor = doctor => ({type: "EDIT_DOCTOR", doctor})

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
    debugger
    const name = practice.name
    const address = `${practice.visit_address.street}, ${practice.vist_address.city}, ${practice.visit_address.state} ${practice.visit_address.zip}`
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
            if (res.error){
                res.error.forEach(error => {
                    alert(error)
                })
            } else {
                dispatch(addPersonalDoctor(res.data))
            }
        })
        .catch(console.error)
    }
}
