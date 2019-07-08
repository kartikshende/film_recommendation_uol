import React from 'react';
//import MovieList from '../componets/MovieList';
import PopularMovieResult from './PopularMovieResult';
import axios from 'axios';
import dotenv from 'dotenv'

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

class PopularMovie extends React.Component {

    state = {

        movies: []
    }

    componentDidMount = async () => {
        
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
            .then(res => {

                this.setState({
                    movies: res.data.results
                });
                console.log(res.data.results);
            })

    }

    render() {

        return (
            <div>
            <PopularMovieResult popularmovie={this.state.movies} />
            </div>

        )

    }
}

export default PopularMovie;