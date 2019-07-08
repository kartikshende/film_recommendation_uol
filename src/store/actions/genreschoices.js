import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getGenreschoicesStart = () => {
    return {
        type: actionTypes.GET_GENRESCHOICES_START,
    }
}

export const getGenreschoicesSuccess = genreschoices => {
    return {
        type: actionTypes.GET_GENRESCHOICES_SUCCESS,
        genreschoices
    }
}

export const getGenreschoicesFail = error => {
    return {
        type: actionTypes.GET_GENRESCHOICES_FAIL,
        error: error
    }
}  

export const getGenreschoices = token => {
    return dispatch => {
        dispatch(getGenreschoicesStart());
        axios.defaults.headers = {
            "Content-Type" : "application/json",
            Authorization: `Token ${token}`
        };
        axios.get("http://127.0.0.1:8000/api/genreschoices/")
        .then(res => {
            const genreschoices = res.data;
            console.log(res.data);
            dispatch(getGenreschoicesSuccess(genreschoices));
        })
        .catch(err => {
            dispatch(getGenreschoicesFail());

        });
    }
}

/** ---------------Create choices starts post method ------------- */

const createGenreschoicesStart = () => {
    return {
      type: actionTypes.CREATE_GENRESCHOICES_START
    };
  };
  
  const createGenreschoicesSuccess = genreschoice => {
    return {
      type: actionTypes.CREATE_GENRESCHOICES_SUCCESS,
      genreschoice
    };
  };
  
  const createGenreschoicesFail = error => {
    return {
      type: actionTypes.CREATE_GENRESCHOICES_FAIL,
      error: error
    };
  };
  
export const createGenreschoices = (token, choice) => {
    return dispatch => {
      dispatch(createGenreschoicesStart());
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(`http://127.0.0.1:8000/api/genreschoices/`, choice)
        .then(res => {
          dispatch(createGenreschoicesSuccess());
        })
        .catch(err => {
          dispatch(createGenreschoicesFail());
        });
    };
  };