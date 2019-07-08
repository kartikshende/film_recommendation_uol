import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getUserbasedknnStart = () => {
    return {
        type: actionTypes.GET_USERBASEDKNN_START,
    }
}

export const getUserbasedknnSuccess = userbasedknn => {
    return {
        type: actionTypes.GET_USERBASEDKNN_SUCCESS,
        userbasedknn
    }
}

export const getUserbasedknnFail = error => {
    return {
        type: actionTypes.GET_USERBASEDKNN_FAIL,
        error: error
    }
}  

export const getUSERBASEDKNN = token => {
    return dispatch => {
        dispatch(getUserbasedknnStart());
        axios.defaults.headers = {
            "Content-Type" : "application/json",
            Authorization: `Token ${token}`
        };
        axios.get("http://127.0.0.1:8000/api/getmovie_userbased_knn/")
        .then(res => {
            const userbasedknn = res.data;
            console.log(res.data);
            dispatch(getUserbasedknnSuccess(userbasedknn));
        })
        .catch(err => {
            dispatch(getUserbasedknnFail());

        });
    }
}