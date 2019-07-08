import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


//import Main_router from './componets/Main_router';
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import authReducer from './store/reducers/auth';
import userbasedknnReducer from './store/reducers/userbasedknn';
import itembasedknnReducer from './store/reducers/itembasedknn';
import reviewsReducer from './store/reducers/reviews';
import genreschoicesReducer from './store/reducers/genreschoices';
import favouritemovieReducer from './store/reducers/favouritemovie';
import ratingsReducer from './store/reducers/rating';
import favouritemovielensReducer from './store/reducers/favouritemovieLens';

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
     auth : authReducer,
     reviews : reviewsReducer,
     userbasedknn: userbasedknnReducer, 
     itembasedknn: itembasedknnReducer,
     genreschoices: genreschoicesReducer,
     favouritemovie: favouritemovieReducer,
     ratings: ratingsReducer,
     favouritemovielens: favouritemovielensReducer,

 });

const store = createStore(rootReducer, composeEnhances(
    applyMiddleware(thunk)
));
const app = (
    <Provider store={store}>
       <App />   
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

serviceWorker.register();