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
    return (dispatch) => {
        return fetch("http://localhost:3000/api/v1/doctors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `${user.token}`
            },
            body: JSON.stringify({
                name: doctor.name,
                email: doctor.email
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