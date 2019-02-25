export const logoutUser = () => ({type: "LOGOUT_USER"})

export const loginUser = user => ({type: "LOGIN_USER", user})

const BASE_URL = "https://git.heroku.com/good-work-backend.git/api/v1"

export const signUpUser = (user, props) => {
    let FETCH_URL = `${BASE_URL}/users`
    return (dispatch) => {
        return fetch(FETCH_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password,
                name: user.name,
                email: user.email
            })
        })
        .then(res => res.json())
        .then((res) => {
            if (res.error){
                if (res.error.length === 1){
                    alert(res.error)
                    props.history.replace("/login")
                } else {
                    res.error.forEach(error => {
                        alert(error)
                    })
                    props.history.replace("/login")
                }
            } else {
                dispatch(createSession(res))
            }
        })
        .catch(console.error)
    }
}

export const createSession = user => {
    let FETCH_URL = `${BASE_URL}/login`
    return (dispatch) => {
        return fetch(FETCH_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                user: user
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.message){
                alert(res.message)
                dispatch(logoutUser(user))
            } else if (res.error) {
                alert("Invalid Username or Password")
                dispatch(logoutUser(user))     
            } else {
                dispatch(loginUser(res))
            }
        })
        .catch(console.error)
    }
}

