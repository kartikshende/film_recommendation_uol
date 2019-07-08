import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    userbasedknn:[],
    error: null, 
    loading: false
}

const getUserbasedknnStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const getUserbasedknnSuccess = (state, action) => {
    return updateObject(state, {
        userbasedknn: action.userbasedknn,
        
        error: null,
        loading: false
    });
}

const getUserbasedknnFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USERBASEDKNN_START: return getUserbasedknnStart(state, action);
        case actionTypes.GET_USERBASEDKNN_SUCCESS: return getUserbasedknnSuccess(state, action);
        case actionTypes.GET_USERBASEDKNN_FAIL: return getUserbasedknnFail(state, action);
        
        default:
            return state;
    }
}
export default reducer;