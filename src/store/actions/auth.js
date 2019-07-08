import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = user => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}  

export const logout = () => {
    localStorage.removeItem("user");
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}


export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            username: username,
            password: password
        })
        .then(res => {
            console.log(res.data);
            const user = {
                token : res.data.key,
                username,
                userID:res.data.user,
                expirationDate : new Date(new Date().getTime() + 3600 * 1000),
            };
            // const token = res.data.key;
            //const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem("user", JSON.stringify(user));
            //localStorage.setItem('token', token);
           // localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(user));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        });
    };
};

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            const user = {
                token : res.data.key,
                username,
                userID:res.data.user,
                expirationDate : new Date(new Date().getTime() + 3600 * 1000),
            };
            //const token = res.data.key;
           // const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            //localStorage.setItem('token', token);
            localStorage.setItem("user", JSON.stringify(user));
            //localStorage.setItem('expirationDate', expirationDate);
           // dispatch(authSuccess(token));
            dispatch(authSuccess(user));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            const errmsg = err.response.data
            dispatch(authFail(errmsg));
        });
    };
};

export const authCheckState = () => {
    return dispatch => {
        //const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem("user"));
        if (user === undefined || user === null) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(user.expirationDate);
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(user));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
            }
        }
    };
};
