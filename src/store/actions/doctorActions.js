export const addDoctors = doctors => ({type: "ADD_DOCTORS", doctors})

export const addPersonalDoctor = doctor => ({type: "ADD_PERSONAL", doctor})

export const editDoctor = doctor => ({type: "EDIT_DOCTOR", doctor})

export const deleteDoctor = doctor => ({type: "DELETE_DOCTOR", doctor})

// const DOCTOR_URL = "https://api.betterdoctor.com/2016-03-01/doctors?query=anxiety"

const skipLimit = "&skip=0&limit=100"

const API_KEY = "&user_key=" + process.env.REACT_APP_API_KEY

export const getDoctors = location => {
    // const FETCH_URL = DOCTOR_URL + "&location=" + location + skipLimit + API_KEY
    return (dispatch) => {
        return fetch(`https://api.betterdoctor.com/2016-03-01/doctors?query=anxiety&location=${location}${skipLimit}${API_KEY}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        .then(res => res.json())
        .then(doctors => {
            console.log(doctors)
            dispatch(addDoctors(doctors))
        })
        .catch(error => alert(error))
    }
}