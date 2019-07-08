import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    genreschoices:[],
    error: null, 
    loading: false
}

const getGenreschoicesStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const getGenreschoicesSuccess = (state, action) => {
    return updateObject(state, {
        genreschoices: action.genreschoices,
        
        error: null,
        loading: false
    });
}

const getGenreschoicesFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

/**-------------------Create Genres choices start------------- */

const createGenreschoicesStart = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: true
    });
  };
  

const createGenreschoicesSuccess = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: false
    });
  };
  
const createGenreschoicesFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false
    });
  };
  



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_GENRESCHOICES_START: return getGenreschoicesStart(state, action);
        case actionTypes.GET_GENRESCHOICES_SUCCESS: return getGenreschoicesSuccess(state, action);
        case actionTypes.GET_GENRESCHOICES_FAIL: return getGenreschoicesFail(state, action);
        
        case actionTypes.CREATE_GENRESCHOICES_START: return createGenreschoicesStart(state, action);
        case actionTypes.CREATE_GENRESCHOICES_SUCCESS: return createGenreschoicesSuccess(state, action);
        case actionTypes.CREATE_GENRESCHOICES_FAIL: return createGenreschoicesFail(state, action);

        default:
            return state;
    }
}
export default reducer;