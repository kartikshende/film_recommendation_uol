import * as actionTypes from './actionTypes';
import axios from 'axios';

/**-------------------MovieLens favrourite starts---------------- -----------------------------------*/

export const getFavouritemovieLensStart = () => {
    return {
        type: actionTypes.GET_FAVOURITEMOVIELENS_START
    }
  }
  
  export const getFavouritemovieLensSuccess = favouritemovielens => {
    return {
        type: actionTypes.GET_FAVOURITEMOVIELENS_SUCCESS,
        favouritemovielens
    }
  }
  
  export const getFavouritemovieLensFail = error => {
    return {
        type: actionTypes.GET_FAVOURITEMOVIELENS_FAIL,
        error: error
    }
  }  
  
  export const getFavouritemovieLens = token => {
    return dispatch => {
        dispatch(getFavouritemovieLensStart());
        axios.defaults.headers = {
            "Content-Type" : "application/json",
            Authorization: `Token ${token}`
        };
        axios.get("http://127.0.0.1:8000/api/favouritemovielist/")
        .then(res => {
            const favouritemovielens = res.data;
            console.log(res.data);
            dispatch(getFavouritemovieLensSuccess(favouritemovielens));
        })
        .catch(err => {
            dispatch(getFavouritemovieLensFail());
  
        });
    }
  } 
  /**-------------------Create Method ---------------------- */
  const createFavouritemovieLensStart = () => {
    return {
      type: actionTypes.CREATE_FAVOURITEMOVIELENS_START
    };
  };
  
  const createFavouritemovieLensSuccess = favouritemovielens => {
    return {
      type: actionTypes.CREATE_FAVOURITEMOVIELENS_SUCCESS,
      favouritemovielens
    };
  };
  
  const createFavouritemovieLensFail = error => {
    return {
      type: actionTypes.CREATE_FAVOURITEMOVIELENS_FAIL,
      error: error
    };
  };
  
  export const createFavouritemovieLens = (token, fav) => {
    return dispatch => {
      dispatch(createFavouritemovieLensStart()); 
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(`http://127.0.0.1:8000/api/favouritemovie/`, fav)
        .then(res => {
          dispatch(createFavouritemovieLensSuccess());
        })
        .catch(err => {
          dispatch(createFavouritemovieLensFail());
        });
    };
  };
  
  /**-------------------Delete Method ---------------------- */
  const deleteFavouritemovieLensStart = () => {
  return {
    type: actionTypes.DELETE_FAVOURITEMOVIE_START
  };
  };
  
  const deleteFavouritemovieLensSuccess = favouritemovie => {
  return {
    type: actionTypes.DELETE_FAVOURITEMOVIE_SUCCESS,
    favouritemovie
  };
  };
  
  const deleteFavouritemovieLensFail = error => {
  return {
    type: actionTypes.DELETE_FAVOURITEMOVIE_FAIL,
    error: error
  };
  };
  
  export const deleteFavouritemovieLens = (token, movieid) => {
  return dispatch => {
    //dispatch(deleteFavouritemovieLensStart()); 
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .delete(`http://127.0.0.1:8000/api/favouritemovie/${movieid}`)
      .then(res => {
        console.log("Delete Success")
        //dispatch(deleteFavouritemovieLensSuccess());
      })
      .catch(err => {
        //dispatch(deleteFavouritemovieLensFail());
      });
  };
  };