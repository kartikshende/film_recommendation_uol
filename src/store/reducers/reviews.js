import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    reviews:[],
    error: null, 
    loading: false
}

const getReviewsStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const getReviewsSuccess = (state, action) => {
    return updateObject(state, {
        reviews: action.reviews,
        
        error: null,
        loading: false
    });
}

const getReviewsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

/*----------------------Create Review ------------*/

const createReviewsStart = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: true
    });
  };
  
  const createReviewsSuccess = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: false
    });
  };
  
  const createReviewsFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false
    });
  };
  


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_REVIEWS_START: return getReviewsStart(state, action);
        case actionTypes.GET_REVIEWS_SUCCESS: return getReviewsSuccess(state, action);
        case actionTypes.GET_REVIEWS_FAIL: return getReviewsFail(state, action);
        
        case actionTypes.CREATE_REVIEWS_START: return createReviewsStart(state, action);
        case actionTypes.CREATE_REVIEWS_SUCCESS: return createReviewsSuccess(state, action);
        case actionTypes.CREATE_REVIEWS_FAIL: return createReviewsFail(state, action);

        default:
            return state;
    }
}
export default reducer;