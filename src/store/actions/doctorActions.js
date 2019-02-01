export const addDoctors = doctors => ({type: "ADD_DOCTORS", doctors})

export const addPersonalDoctor = doctor => ({type: "ADD_PERSONAL", doctor})

export const storePersonalDoctors = doctors => ({ type: "STORE_PERSONAL", doctors})

export const deleteDoctor = doctor => ({type: "DELETE_DOCTOR", doctor})

export const storePractices = practices =>({type: "STORE_PRACTICES", practices})

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
    const image_url = doctor.profile.image_url

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
                bio: bio,
                image: image_url,
                practices: practices,
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.error){
                alert(res.error)
            } else {
                dispatch(addPersonalDoctor(res.data))
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
            },
        })
        .then(res => res.json())
        .then(res => {
            if (res.message){
                alert(res.message)
            } else if (res.error) {
                alert (res.error)
            } else {
                dispatch(storePersonalDoctors(res))
            }
        })
        .catch(error => alert(error))
    }
}