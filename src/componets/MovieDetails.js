import React from 'react';
//import MovieList from '../componets/MovieList';
import { connect } from 'react-redux';
import { createFavouritemovie } from "../store/actions/favouritemovie";
import * as actions from '../store/actions/favouritemovie';


import PopularMovieResult from './PopularMovieResult';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Rate} from 'antd';

import RateMovieForm from './RateMovieForm';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import Button from '@material-ui/core/Button';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import FavouriteForm from './FavouriteForm';

import { Icon,Spin} from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
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

    paper: {
      padding: theme.spacing.unit * 2,
      margin: 'auto',
      maxWidth: 400,
      height: 'auto',
      textAlign: 'center',
    },
    paper1: {
      padding: theme.spacing.unit * 2,
      margin: 'auto',
      
      height: 'auto',
      
    },
    image: {
      width: 300,
      height: 370,
      
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    button: {
      margin: theme.spacing.unit,
    },
  });


class MovieDetails extends React.Component {
   
    state = {
        
        movielist:[],
        similarmovies: [],
        moviedetail:[],
        recommendedmovies:[],
        favdisabled:false,
        favAddmsg:"",

    }
    refreshPage = async (e) =>{ 
      window.location.reload();  
  }

    componentDidMount = async () =>{

      const movie_id = this.props.location.state.movie_id;
      
      console.log(movie_id);
               
        axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`)
            .then(res => {

                this.setState({
                  moviedetail: res.data
                });
                console.log(res.data);
                
            })
            .catch(err=> window.location.reload())


         axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
            .then(res => {

                this.setState({
                    recommendedmovies: res.data.results
                });
                console.log(res.data.results);
            })
          
            axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${API_KEY}&language=en-US&page=1`)
            .then(res => {

                this.setState({
                    similarmovies: res.data.results
                });
                console.log(res.data.results);
            })
            

    }
 
    favouritemovie = async(e)=>{
      e.preventDefault()
        //console.log(this.state.favouritemovie); 
        this.setState({favdisabled:'ture',
          favAddmsg:"Movie Added successfully"
        })
        const fav={
          user_id : this.props.userID,
          movieid:this.state.moviedetail.id,
          title:this.state.moviedetail.title,
        }
        this.props.createFavouritemovie(this.props.token,fav);
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


    render() {
        const { classes } = this.props;
        const movie_imagme = `https://image.tmdb.org/t/p/w500${this.state.moviedetail.poster_path}`;
        const rate_avg = this.state.moviedetail.vote_average;
        const fav = [];
        for(let i=0;i<this.props.favouritemovie.length;i++){
          fav.push(this.props.favouritemovie[i].movieid)
        }
        console.log(fav);

        const movieorgid = this.props.location.state.movieorgid;
        console.log(movieorgid); 
       

        return (
               
          <div className={classes.root}>
<Grid container spacing={16}>
               
  {/*----------------------- From Here movie detail start ----------------------- */}   

                <Grid item xs={12} sm={6}>
                {this.state.moviedetail.length === 0 ?
                    <Spin indicator={antIcon} />  
                    
                    :
                 <Paper className={classes.paper}> 
                    <Grid item>
                     <ButtonBase className={classes.image}>
                         <img className={classes.img} alt="complex" src={movie_imagme} />
                      </ButtonBase>
                    </Grid>
                    {movieorgid === 0 || movieorgid === undefined || movieorgid === null ?
                     <div>
                           {
                          fav.includes(this.state.moviedetail.id) ? 
                          (<div>
                            <Button onClick={this.favouritemovie}variant="contained" color="secondary" className={classes.button} disabled={true}>
                              <FavoriteIcon className={classes.title} /> Add Favorite
                          </Button>
                          <Typography component="p" color='error'>You already added this movie in Favorite list</Typography>
                        </div>)
                          :
                          (
                            <div>
                          <Button onClick={this.favouritemovie}variant="contained" color="secondary" className={classes.button} disabled={this.state.favdisabled}>
                            <FavoriteIcon className={classes.title} /> Add Favorite
                          </Button>
                          <Typography component="p" color='primary'>{this.state.favAddmsg}</Typography>
                          </div>)
                        }
                     </div>
                    :
                      <FavouriteForm movieorgid ={movieorgid}/>
                    }

                    
                      
                  </Paper>
                }
                </Grid>
                  <Grid item xs={12} sm={6}>
                     <Paper className={classes.paper1}>
                       
                       <Typography variant="h5" component="h3">
                          {this.state.moviedetail.title}
                          
                       </Typography>
                       <Rate allowHalf disabled value={this.state.moviedetail.vote_average}/>
                       {this.state.moviedetail.vote_average}
                       
                       <Typography component="p" >
                          {this.state.moviedetail.overview}
                          
                       </Typography>
                       <Typography component="h3">

                       <FavoriteIcon className={classes.title} />
                          {this.state.moviedetail.vote_count}
                          </Typography>
    {/*------------------------------rate form here  ---------------------------------*/ }
                         {movieorgid === 0 || movieorgid === undefined || movieorgid === null ?
                         <RateMovieForm requestType="post" movie_id ={this.state.moviedetail.id} title={this.state.moviedetail.title}/> 
                         :
                         <RateMovieForm requestType="put" movie_id ={movieorgid} title={this.state.moviedetail.title}/>
                         }
                      </Paper>
                  </Grid>

  {/* --------------From Here Recommendation movie start -------------------------------*/}

              <Grid item xs={12} sm={6}>
                <Typography variant="h5" color='primary' component="h3">
                     Because you are looking "{this.state.moviedetail.title}" 
               </Typography>
               {this.state.recommendedmovies.length ===0 ?
                <Typography  color='textPrimary' component="p">
                No movies found to "{this.state.moviedetail.title}"
               </Typography>
               :
               null
              }
               </Grid>
                <GridList className={classes.gridList} cols={8.0}>
                 
                 {this.state.recommendedmovies.map((movielist) => {
                            const img = `https://image.tmdb.org/t/p/w500${movielist.poster_path}`;
                            return (                            
                              
                             <GridListTile key={img}>
                                   
                                <img src={img} alt={movielist.title} />
                                <GridListTileBar
                                  title={movielist.title}
                                  classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                  }}
                                  actionIcon={
                                    
                                    <IconButton onClick={ this.refreshPage }>
                                      <Link to={{
                                      pathname:`/moviedetail/${movielist.id}`,
                                      state:{movie_id: movielist.id}
                                      }}  ><MoreVertIcon className={classes.title} /></Link>
                                    </IconButton>
                                  }
                                >
                               
                                </GridListTileBar>
                                
                              </GridListTile>
                                
                            );
                        }
                        )}

                 </GridList>
           
    {/*---------------------- From Here similar movie start---------------------------- */}

              <Grid item xs={12} sm={6}>
                <Typography variant="h5" color='primary' component="h3">
                     Movies Similar to "{this.state.moviedetail.title}"
               </Typography>
               {this.state.similarmovies.length ===0 ?
                <Typography  color='textPrimary' component="p">
                No Similar movies found to "{this.state.moviedetail.title}"
               </Typography>
               :
               null
              }
               </Grid>
                <GridList className={classes.gridList} cols={8.0}>
                 
                 {this.state.similarmovies.map((movielist) => {
                            const img = `https://image.tmdb.org/t/p/w500${movielist.poster_path}`;
                            return (                            
                              
                             <GridListTile key={img}>
                                   
                                <img src={img} alt={movielist.title} />
                                <GridListTileBar
                                  title={movielist.title}
                                  classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                  }}
                                  actionIcon={
                                    
                                    <IconButton onClick={ this.refreshPage }>
                                      <Link to={{
                                      pathname:`/moviedetail/${movielist.id}`,
                                      state:{movie_id: movielist.id}
                                      }}  ><MoreVertIcon className={classes.title} /></Link>
                                    </IconButton>
                                  }
                                >
                               
                                </GridListTileBar>
                                
                              </GridListTile>
                                
                            );
                        }
                        )}

                 </GridList>

           </Grid>
    </div>        

        )

    }
}

const mapStateToProps = state => {
  return {
    userID: state.auth.userID,
    token: state.auth.token,
    favouritemovie : state.favouritemovie.favouritemovie
  }; 
};

const mapDispatchToProps = dispatch => {
  return {
    getFavouritemovie: token  => dispatch(actions.getFavouritemovie(token)),
    createFavouritemovie: (token, fav) => dispatch(createFavouritemovie(token, fav))
  };
};

MovieDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(MovieDetails));