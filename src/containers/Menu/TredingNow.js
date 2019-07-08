import React from 'react';

import axios from 'axios';

import TredingNowResult from './TredingNowResult';



const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

class TredingNow extends React.Component {

    state = {

        movies: []
    }
    
    componentDidMount= async () => {
        //cols={movielist.featured ? 2 : 1} rows={movielist.featured ? 2 : 1}
        //const movie_id = this.props.location.state.movie_id;
       // console.log(movie_id);
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=1`)
            .then(res => {

                this.setState({
                    movies: res.data.results
                });
                console.log(res.data.results);
            })

    }

    render() {
        
        return (
          
         <TredingNowResult  movies={this.state.movies}/>
           

        )

    }
}

export default TredingNow;