import React from 'react';



import { Switch, Route ,Redirect} from 'react-router-dom';
import Hoc from "./hoc/hoc";
import MovieDetailView from './containers/MovieDetailView';
import Login from './containers/Login';
import Signup from './containers/Signup';

import { connect } from 'react-redux';

import PrivateRoute from './helper/PrivateRoute'

import MainLayout from './containers/MainLayout'
import MovieSearchRow from './containers/MovieSearchRow';
import MovieDetails from './componets/MovieDetails';
import UpcomingMovies from './containers/Menu/UpcomingMovies';
import SeachByGenres from './containers/Menu/SearchByGenres';
import SearchGenresResult from './containers/Menu/SearchGenresResult';
import UserChoices from './containers/UserChoices';
import FavouriteMovieResult from './containers/Menu/FavouriteMoviesResult';
import UserRatingResult from './containers/Menu/Userrating';


const BaseRouter = (props) => (
  <Hoc>               
        <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/login/' component={Login} />
              <Route exact path='/signup/' component={Signup} />

              <PrivateRoute exact path='/main/' component={MainLayout} />
                     
              <Route exact path="/search/:id" component={MovieSearchRow} />
              <Route exact path="/moviedetail/:id" component={MovieDetails} />
              <Route exact path="/movies/:id" component={UpcomingMovies} />
              <Route exact path="/searchbygenres/" component={SeachByGenres} />                        <Route exact path="/userchoices/" component={UserChoices} />
              <Route exact path="/searchgenresresult/:id" component={SearchGenresResult} />
              <Route exact path="/favoritemovie/" component={FavouriteMovieResult} />
              <Route exact path="/userrating/" component={UserRatingResult} />
       </Switch>              
</Hoc>

);

const mapStateToProps = state => ({
       auth: state.auth 
     });
     
export default connect(mapStateToProps)(BaseRouter);