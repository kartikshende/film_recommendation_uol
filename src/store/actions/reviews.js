import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getReviewsStart = () => {
    return {
        type: actionTypes.GET_REVIEWS_START
    }
}

export const getReviewsSuccess = reviews => {
    return {
        type: actionTypes.GET_REVIEWS_SUCCESS,
        reviews
    }
}

export const getReviewsFail = error => {
    return {
        type: actionTypes.GET_REVIEWS_FAIL,
        error: error
    }
}  

export const getREVIEWS = token => {
    return dispatch => {
        dispatch(getReviewsStart());
        axios.defaults.headers = {
            "Content-Type" : "application/json",
            Authorization: `Token ${token}`
        };
        axios.get("http://127.0.0.1:8000/api/reviewslist/")
        .then(res => {
            const reviews = res.data;
            console.log(res.data);
            dispatch(getReviewsSuccess(reviews));
        })
        .catch(err => {
            dispatch(getReviewsFail());

        });
    }
} 

/** ------------post request strart here */

const createReviewsStart = () => {
    return {
      type: actionTypes.CREATE_REVIEWS_START
    };
  };
  
  const createReviewsSuccess = review => {
    return {
      type: actionTypes.CREATE_REVIEWS_SUCCESS,
      review
    };
  };
  
  const createReviewsFail = error => {
    return {
      type: actionTypes.CREATE_REVIEWS_FAIL,
      error: error
    };
  };
  
  export const createReviews = (token, asnt) => {
    return dispatch => {
      dispatch(createReviewsStart());
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(`http://127.0.0.1:8000/api/reviews/`, asnt)
        .then(res => {
          dispatch(createReviewsSuccess());
        })
        .catch(err => {
          dispatch(createReviewsFail());
        });
    };
  };