import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ratings:[],
    error: null, 
    loading: false
}

const getRatingStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const getRatingSuccess = (state, action) => {
    return updateObject(state, {
        ratings: action.ratings,
        
        error: null,
        loading: false
    });
}

const getRatingFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_RATING_START: return getRatingStart(state, action);
        case actionTypes.GET_RATING_SUCCESS: return getRatingSuccess(state, action);
        case actionTypes.GET_RATING_FAIL: return getRatingFail(state, action);
        
        default:
            return state;
    }
}
export default reducer;