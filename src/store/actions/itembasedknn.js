import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getItembasedknnStart = () => {
    return {
        type: actionTypes.GET_ITEMBASEDKNN_START,
    }
}

export const getItembasedknnSuccess = itembasedknn => {
    return {
        type: actionTypes.GET_ITEMBASEDKNN_SUCCESS,
        itembasedknn
    }
}

export const getItembasedknnFail = error => {
    return {
        type: actionTypes.GET_ITEMBASEDKNN_FAIL,
        error: error
    }
}  

export const getItemBASEDKNN = token => {
    return dispatch => {
        dispatch(getItembasedknnStart());
        axios.defaults.headers = {
            "Content-Type" : "application/json",
            Authorization: `Token ${token}`
        };
        axios.get("http://127.0.0.1:8000/api/getmovie_itembased_knn/")
        .then(res => {
            const itembasedknn = res.data;
            console.log(res.data);
            dispatch(getItembasedknnSuccess(itembasedknn));
        })
        .catch(err => {
            dispatch(getItembasedknnFail());

        });
    }
}