import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    favouritemovie:[],
    favouritemovielens:[],
    error: null, 
    loading: false
}

const getFavouritemovieStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const getFavouritemovieSuccess = (state, action) => {
    return updateObject(state, {
        favouritemovie: action.favouritemovie,
        
        error: null,
        loading: false
    });
}

const getFavouritemovieFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

/*----------------------Create Review ------------*/

const createFavouritemovieStart = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: true
    });
  };
  
  const createFavouritemovieSuccess = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: false
    });
  };
  
  const createFavouritemovieFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false
    });
  };
  





const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_FAVOURITEMOVIE_START: return getFavouritemovieStart(state, action);
        case actionTypes.GET_FAVOURITEMOVIE_SUCCESS: return getFavouritemovieSuccess(state, action);
        case actionTypes.GET_FAVOURITEMOVIE_FAIL: return getFavouritemovieFail(state, action);
        
        case actionTypes.CREATE_FAVOURITEMOVIE_START: return createFavouritemovieStart(state, action);
        case actionTypes.CREATE_FAVOURITEMOVIE_SUCCESS: return createFavouritemovieSuccess(state, action);
        case actionTypes.CREATE_FAVOURITEMOVIE_FAIL: return createFavouritemovieFail(state, action);

       

        default:
            return state;
    }
}
export default reducer; 