import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getFavouritemovieStart = () => {
    return {
        type: actionTypes.GET_FAVOURITEMOVIE_START
    }
}

export const getFavouritemovieSuccess = favouritemovie => {
    return {
        type: actionTypes.GET_FAVOURITEMOVIE_SUCCESS,
        favouritemovie
    }
}

export const getFavouritemovieFail = error => {
    return {
        type: actionTypes.GET_FAVOURITEMOVIE_FAIL,
        error: error
    }
}  

export const getFavouritemovie = token => {
    return dispatch => {
        dispatch(getFavouritemovieStart());
        axios.defaults.headers = {
            "Content-Type" : "application/json",
            Authorization: `Token ${token}`
        };
        axios.get("http://127.0.0.1:8000/api/newfavouritemovielist/")
        .then(res => {
            const favouritemovie = res.data;
            console.log(res.data);
            dispatch(getFavouritemovieSuccess(favouritemovie));
        })
        .catch(err => {
            dispatch(getFavouritemovieFail());

        });
    }
} 
/**-------------------Create Method ---------------------- */
const createFavouritemovieStart = () => {
    return {
      type: actionTypes.CREATE_FAVOURITEMOVIE_START
    };
  };
  
  const createFavouritemovieSuccess = favouritemovie => {
    return {
      type: actionTypes.CREATE_FAVOURITEMOVIE_SUCCESS,
      favouritemovie
    };
  };
  
  const createFavouritemovieFail = error => {
    return {
      type: actionTypes.CREATE_FAVOURITEMOVIE_FAIL,
      error: error
    };
  };
  
  export const createFavouritemovie = (token, fav) => {
    return dispatch => {
      dispatch(createFavouritemovieStart()); 
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios
        .post(`http://127.0.0.1:8000/api/newfavouritemovielist/`, fav)
        .then(res => {
          dispatch(createFavouritemovieSuccess());
        })
        .catch(err => {
          dispatch(createFavouritemovieFail());
        });
    };
  };

  /**-------------------Delete Method ---------------------- */
const deleteFavouritemovieStart = () => {
  return {
    type: actionTypes.DELETE_FAVOURITEMOVIE_START
  };
};

const deleteFavouritemovieSuccess = favouritemovie => {
  return {
    type: actionTypes.DELETE_FAVOURITEMOVIE_SUCCESS,
    favouritemovie
  };
};

const deleteFavouritemovieFail = error => {
  return {
    type: actionTypes.DELETE_FAVOURITEMOVIE_FAIL,
    error: error
  };
};

export const deleteFavouritemovie = (token, movieid) => {
  return dispatch => {
    //dispatch(deleteFavouritemovieStart()); 
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .delete(`http://127.0.0.1:8000/api/newfavouritemovielist/${movieid}`)
      .then(res => {
        console.log("Delete Success")
        //dispatch(deleteFavouritemovieSuccess());
      })
      .catch(err => {
        //dispatch(deleteFavouritemovieFail());
      });
  };
};
