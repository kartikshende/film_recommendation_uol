import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    itembasedknn:[],
    error: null, 
    loading: false
}

const getItembasedknnStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const getItembasedknnSuccess = (state, action) => {
    return updateObject(state, {
        itembasedknn: action.itembasedknn,  
        error: null,
        loading: false
    });
}

const getItembasedknnFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ITEMBASEDKNN_START: return getItembasedknnStart(state, action);
        case actionTypes.GET_ITEMBASEDKNN_SUCCESS: return getItembasedknnSuccess(state, action);
        case actionTypes.GET_ITEMBASEDKNN_FAIL: return getItembasedknnFail(state, action);
        
        default:
            return state;
    }
}
export default reducer;