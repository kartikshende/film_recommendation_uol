import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getRatingStart = () => {
    return {
        type: actionTypes.GET_RATING_START
    }
}

export const getRatingSuccess = ratings => {
    return {
        type: actionTypes.GET_RATING_SUCCESS,
        ratings
    }
}

export const getRatingFail = error => {
    return {
        type: actionTypes.GET_RATING_FAIL,
        error: error
    }
}  

export const getRATING = token => {
    return dispatch => {
        dispatch(getRatingStart());
        axios.defaults.headers = {
            "Content-Type" : "application/json",
            Authorization: `Token ${token}`
        };
        axios.get("http://127.0.0.1:8000/api/userrating/")
        .then(res => {
            const ratings = res.data;
            console.log(res.data);
            dispatch(getRatingSuccess(ratings));
        })
        .catch(err => {
            dispatch(getRatingFail());

        });
    }
}  