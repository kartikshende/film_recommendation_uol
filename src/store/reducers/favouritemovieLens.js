import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

/**-----------------------Movie Lens Favourite movie starts here--------------  */
const initialState = {
    
    favouritemovielens:[],
    error: null, 
    loading: false
}


const getFavouritemovieLensStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
  }
  
  const getFavouritemovieLensSuccess = (state, action) => {
    return updateObject(state, {
        favouritemovielens: action.favouritemovielens,
        
        error: null,
        loading: false
    });
  }
  
  const getFavouritemovieLensFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
  }
  
  /*----------------------Create Review ------------*/
  
  const createFavouritemovieLensStart = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: true
    });
  };
  
  const createFavouritemovieLensSuccess = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: false
    });
  };
  
  const createFavouritemovieLensFail = (state, action) => {
    return updateObject(state, {
      error: action.error,
      loading: false
    });
  };
  


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_FAVOURITEMOVIELENS_START: return getFavouritemovieLensStart(state, action);
        case actionTypes.GET_FAVOURITEMOVIELENS_SUCCESS: return getFavouritemovieLensSuccess(state, action);
        case actionTypes.GET_FAVOURITEMOVIELENS_FAIL: return getFavouritemovieLensFail(state, action);
        
        case actionTypes.CREATE_FAVOURITEMOVIELENS_START: return createFavouritemovieLensStart(state, action);
        case actionTypes.CREATE_FAVOURITEMOVIELENS_SUCCESS: return createFavouritemovieLensSuccess(state, action);
        case actionTypes.CREATE_FAVOURITEMOVIELENS_FAIL: return createFavouritemovieLensFail(state, action);

        default:
            return state;
    }
}
export default reducer;