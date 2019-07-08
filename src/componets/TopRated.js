import React from 'react';
//import MovieList from '../componets/MovieList';

import TopRatedResult from './TopRatedResult';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

class TopRated extends React.Component {

    state = {

        movies: []
    }

    componentDidMount() {

        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
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
            <TopRatedResult topratedmovie={this.state.movies} />
            </div>

        )

    }
}

export default TopRated;