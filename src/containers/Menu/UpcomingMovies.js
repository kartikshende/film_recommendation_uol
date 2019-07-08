import React from 'react';
//import MovieList from '../componets/MovieList';
import { Link } from "react-router-dom";

import axios from 'axios';

import { Rate,Icon } from 'antd';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Card } from 'antd';

const { Meta } = Card;


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    
    //height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
});

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

class UpComingMovies extends React.Component {

    state = {

        movies: [],
        moviegenres:"",
    }

    componentDidMount() {
        //cols={movielist.featured ? 2 : 1} rows={movielist.featured ? 2 : 1}
        const movie_id = this.props.location.state.movie_id;
        console.log(movie_id);
        axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US&page=1`)
            .then(res => {

                this.setState({
                    movies: res.data.results
                });
                console.log(res.data.results);
            })
          if (movie_id=="upcoming"){
            this.setState({
                moviegenres:"UP COMING",
            });
        }
        else{
            this.setState({
                moviegenres:"NOW PLAYING",
            });
        }
    }

    render() {
        const { classes } = this.props;
        return (
          
         <div className={classes.root}>
                <GridList cellHeight='auto' spacing={5} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">{this.state.moviegenres} MOVIES </ListSubheader>
                </GridListTile>
                    {this.state.movies.map(movielist => {
                        const img = `https://image.tmdb.org/t/p/w500${movielist.poster_path}`
                            return(

                                <Card
                                    hoverable
                                    style={{hight:100,width:200}}
                                    cover={<img alt={movielist.title} src={img} />}
                                    extra={[<Link to={{
                                        pathname:`/moviedetail/${movielist.id}`,
                                        state:{movie_id: movielist.id}
                                        }}  ><Icon type="more" /></Link>]}
                                    size= 'small'
                                    title={movielist.title}
                                    type='inner'
                                >
                                    <Meta
                                    description={<Rate disabled value={movielist.vote_average} />}
                                    />
                                </Card>
                                
                            );


                    }
                        
                    
                    )}
                </GridList>
         </div>
           

        )

    }
}

export default withStyles(styles)(UpComingMovies);