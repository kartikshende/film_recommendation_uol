import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/favouritemovie';
import { deleteFavouritemovie } from "../../store/actions/favouritemovie";



import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import { Button, Radio, Icon ,Alert} from 'antd';

import { Link } from "react-router-dom";

import Card from '@material-ui/core/Card'; 
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FavouriteMovieLensResult from './FavouriteMoviesLensResult'
import Grid from '@material-ui/core/Grid';



const styles = theme => ({
    root: {
      
      justifyContent: 'space-around',
      
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    card: {
      maxWidth: 400,
      hieght:'100%',
    },
  });

class FavouriteMovieResult extends React.PureComponent {
  state = {
    favdisabled:false,
    favdeletemsg:null,
}
refreshPage = async (e) =>{ 
  window.location.reload();  
}
    componentDidMount() {
      if (this.props.token !== undefined && this.props.token !== null) {
        this.props.getFavouritemovie(this.props.token);
      }
    }
  
    componentWillReceiveProps(newProps) {
      if (newProps.token !== this.props.token) {
        if (newProps.token !== undefined && newProps.token !== null) {
          this.props.getFavouritemovie(newProps.token);
        }
      }
    }

    deletefavouritemovie = async(e)=>{
      e.preventDefault()

      const movieid = e.target.value;

      console.log(movieid); 
        this.setState({favdisabled:'ture',
          favdeletemsg:(<Alert message="movie remove successfully" type="success" />)
        })
        
        this.props.deleteFavouritemovie(this.props.token,movieid);
        
        setTimeout(this.refreshPage,500)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
              
               <h1>Your Favourite movies </h1> 
               {this.state.favdeletemsg}   
                <div >
                   <GridList>
                      
                              {this.props.favouritemovie.map((movielist) => {
      
                            return (                                                                                      
                                 <Card className={classes.card}>
                                  <CardContent>
                                          <Typography className={classes.title} color="Secondary" gutterBottom component="h2">
                                          {movielist.title} 
                                          </Typography>                                    
                                  </CardContent>
                                  <CardActions>
                                    <Button type="primary"><Link to={{
                                      pathname:`/moviedetail/${movielist.movieid}`,
                                      state:{movie_id: movielist.movieid}
                                      }}>View</Link></Button>
                                    <Radio.Button onClick={this.deletefavouritemovie} value={movielist.id}>Remove
                                    </Radio.Button> 
                                  </CardActions>
                                </Card>
              
                                  );
                              }
                              )}
                   </GridList>

                 </div>
                 
               <FavouriteMovieLensResult favouritemovie={this.props.favouritemovie}/>
            
            </div>
            
        )

    }
}

const mapStateToProps = state =>{
  return{
     token: state.auth.token, 
     favouritemovie : state.favouritemovie.favouritemovie,
     
  };
}
const mapDispatchToProps = dispatch => {
    return {
      getFavouritemovie: token  => dispatch(actions.getFavouritemovie(token)), 
      deleteFavouritemovie: (token, movieid) => dispatch(deleteFavouritemovie(token,movieid)),

     
    }
}
 
FavouriteMovieResult.propTypes = {
    classes: PropTypes.object.isRequired,
  };


export default connect(mapStateToProps,mapDispatchToProps) (withStyles(styles)(FavouriteMovieResult));
{/* <MovieList data={this.state.movies} /> */}