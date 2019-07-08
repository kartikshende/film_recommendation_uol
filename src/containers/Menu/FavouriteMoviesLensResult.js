import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../../store/actions/favouritemovieLens';
import { deleteFavouritemovieLens } from "../../store/actions/favouritemovieLens";

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

import ItembasedknnResults from '../ItembasedknnResults';

import Paper from '@material-ui/core/Paper';
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

class FavouriteMovieLensResult extends React.PureComponent {
  state = {
    favdisabled:false,
    favdeletemsg:null,
}
refreshPage = async (e) =>{ 
  window.location.reload();  
}
    
      /**------------------MvoieLens favourite Movies--------------- */

componentDidMount() {
  if (this.props.token !== undefined && this.props.token !== null) {
    this.props.getFavouritemovieLens(this.props.token);
  }
}

componentWillReceiveProps(newProps) {
  if (newProps.token !== this.props.token) {
    if (newProps.token !== undefined && newProps.token !== null) {
      this.props.getFavouritemovieLens(newProps.token);
    }
  }
}

deletefavouritemovielens = async(e)=>{
  e.preventDefault()

  const movieid = e.target.value;

  console.log(movieid); 
    this.setState({favdisabled:'ture',
      favdeletemsg:(<Alert message="movie remove successfully" type="success" />)
    })
    
    this.props.deleteFavouritemovieLens(this.props.token,movieid);
    
    setTimeout(this.refreshPage,500)
}

    render() {
        const { classes } = this.props;
        return (
            <div>
              
               
               {this.state.favdeletemsg} 
               {this.props.favouritemovie.length === 0 && this.props.favouritemovielens.length === 0  ?
                     
                     <Typography color='secondary' component='h1'>You don't have any movie in Favourite</Typography>
           
                     :
               null
               }
                <div >
                <GridList>
                      
                      {this.props.favouritemovielens.map((movielist) => {
       
                             return (                                                                                      
                                  <Card className={classes.card}>
                                   <CardContent>
                                           <Typography className={classes.title} color="Secondary" gutterBottom component="h2">
                                           {movielist.movie.title} 
                                           </Typography>                                    
                                   </CardContent>
                                   <CardActions>
                                     <Button type="primary"><Link to={{
                                       pathname:`/moviedetail/${movielist.movie.id}`,
                                       state:{movie_id: movielist.movie.links[0].tmdb_id,
                                      movieorgid:movielist.movie.id}
                                       }}>View</Link></Button>
                                     <Radio.Button onClick={this.deletefavouritemovielens} value={movielist.id}>Remove
                                     </Radio.Button> 
                                   </CardActions>
                                 </Card>
               
                                   );
                               }
                               )}
       
                    </GridList>
                </div>
                <Grid item xs={12}>
                <ItembasedknnResults favouritemovielens={this.props.favouritemovielens}/>
                </Grid>
            
            </div>
            
        )

    }
}

const mapStateToProps = state =>{
  return{
     token: state.auth.token, 
     favouritemovielens : state.favouritemovielens.favouritemovielens
     
  };
}
const mapDispatchToProps = dispatch => {
    return {
      getFavouritemovieLens: token  => dispatch(actions.getFavouritemovieLens(token)), 
      deleteFavouritemovieLens: (token, movieid) => dispatch(deleteFavouritemovieLens(token,movieid))

      
    }
}

FavouriteMovieLensResult.propTypes = {
    classes: PropTypes.object.isRequired,
  };


export default connect(mapStateToProps,mapDispatchToProps) (withStyles(styles)(FavouriteMovieLensResult));
{/* <MovieList data={this.state.movies} /> */}