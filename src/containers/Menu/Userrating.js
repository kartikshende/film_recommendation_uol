import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/rating';

import {Rate} from 'antd'; 
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


import Card from '@material-ui/core/Card'; 
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Icon,Spin} from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      height: 500,
    },
    
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    card: {
      maxWidth: 300,
    },
  });

class UserRatingResult extends React.PureComponent {

    componentDidMount() {
      if (this.props.token !== undefined && this.props.token !== null) {
        this.props.getRATING(this.props.token);
      }
    }
  
    componentWillReceiveProps(newProps) {
      if (newProps.token !== this.props.token) {
        if (newProps.token !== undefined && newProps.token !== null) {
          this.props.getRATING(newProps.token);
        }
      }
    }

  render() {
        const { classes } = this.props;
    return (          
         <div >
          <h1>Your Rated movies </h1> 
                  {this.props.ratings.length === 0 ?
                     
                    <Typography color="secondary" gutterBottom component="h2">Your not rated any movie till now</Typography>
                    :
                    
                  
                  <div className={classes.root}>
                     <GridList cellHeight={220} className={classes.gridList}>
                     {this.props.ratings.map((movielist) => {
    
                            return (                                                         
                                                   
                              <Card className={classes.card}>
                              
                                  <CardContent>
                                          <Typography color="Secondary" gutterBottom component="h2" noWrap>
                                          {movielist.movie.title} 
                                          </Typography> 
                                    <Typography className={classes.pos} color="textSecondary">
                                    Genres:{movielist.movie.genres} </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                    Average Rating:{movielist.movie.average_rating}</Typography>
                                    <Rate allowHalf disabled value={movielist.movie.average_rating}/>
                                    
                                    <Typography className={classes.pos} color="textSecondary">
                                    Your rating:{movielist.rating} 
                                    </Typography>
                                    <Rate allowHalf disabled value={movielist.rating}/>
                                </CardContent>
                                  <CardActions>
                                  
                                  <Button color='primary'><Link to={{
                                      pathname:`/moviedetail/${movielist.movie.links[0].tmdb_id}`,
                                      state:{movie_id: movielist.movie.links[0].tmdb_id,
                                      movieorgid:movielist.movie.id}
                                      }}>View</Link></Button>
                                   
                                  </CardActions>
                               </Card>
                               );
                              }
                              )}
                       </GridList>
                         </div>
                     }
                  </div>     
             
        )

    }
}

const mapStateToProps = state =>{
  return{
     token: state.auth.token, 
     ratings : state.ratings.ratings
  };
}
const mapDispatchToProps = dispatch => {
    return {
      getRATING: token  => dispatch(actions.getRATING(token)) 

    }
}

UserRatingResult.propTypes = {
    classes: PropTypes.object.isRequired,
  };


export default connect(mapStateToProps,mapDispatchToProps) (withStyles(styles)(UserRatingResult));
{/* <MovieList data={this.state.movies} /> */}