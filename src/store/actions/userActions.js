export const createUser = user => ({type: "CREATE_USER", user})

export const loginUser = user => ({type: "LOGIN_USER", user})

export const signUpUser = (user) => {
    return (dispatch) => {
        return fetch("http://localhost:3000/api/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: user.username,
                password_digest: user.password,
                email: user.email
            })
        })
        .then(res => res.json())
        .then((res) => {
            if (res.error){
                res.error.forEach(error => {
                    alert(error)
                })
            } else {
                dispatch(createUser(res))
            }
        })
        .catch(console.error)
    }
}

export const createSession = user => {
    return (dispatch) => {
        return fetch("http://localhost:3000/api/v1/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user: user
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.error){
                res.error.forEach(error => {
                    alert(error)
                })
            } else {
                dispatch(loginUser(res))
            }
        })
        .catch(console.error)
    }
}

