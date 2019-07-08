import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions/genreschoices';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Rate} from 'antd';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import NavigationIcon from '@material-ui/icons/Navigation';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
//import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { Icon,Spin} from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const styles = theme =>({ 
  root: {
    width:'100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    margin: theme.spacing.unit,
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
    
  },
  
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  
});


//const [expanded, setExpanded] = React.useState(false);

class GenresRecommendation extends React.PureComponent {
 
    state={
        movie:[],
        movietwo:[],
        moviethree:[],
        disabled:false,
        disabled2:false,
        disabled3:false,
        
    }
   
   

 onClick = async (e,value)=>{
    e.preventDefault();
     const movie_id =this.props.choices[0] //this.props.location.state.movie_id;//this.props.choices[0]; //
     console.log(movie_id)
         axios.get(`http://127.0.0.1:8000/api/links/?search=${movie_id}`)
          .then(res => {
                 this.setState({
                     movie: res.data.sort((a, b) => (b.movie.average_rating - a.movie.average_rating)),
                     disabled:true,
                     
                 });
                 console.log(res.data);
             })
             
      }


 onClickSec = async (e,value)=>{
    e.preventDefault();
   
    const movie_id = this.props.choices[1]//this.props.location.state.movie_id;//this.props.choices[0]; //
    console.log(movie_id)
    axios.get(`http://127.0.0.1:8000/api/links/?search=${movie_id}`)
         .then(res => {
             this.setState({
                   movietwo: res.data.sort((a, b) => (b.movie.average_rating - a.movie.average_rating)),
                   disabled2:true,
                     });
                    console.log(res.data);
                     })
           }

    onClick_three =async (e)=>{
      e.preventDefault();
   
    const movie_id = this.props.choices[2]//this.props.location.state.movie_id;//this.props.choices[0]; //
    console.log(movie_id)
    axios.get(`http://127.0.0.1:8000/api/links/?search=${movie_id}`)
         .then(res => {
             this.setState({
                   moviethree: res.data.sort((a, b) => (b.movie.average_rating - a.movie.average_rating)),
                   disabled3:true,
                     });
                    console.log(res.data);
                     })
      
    }

render() {
      
    const { classes } = this.props;
    return (    
    <div className={classes.root}>
   {/**-----------------------Choice one -------------------------------------------- */}
  <Grid item xs={12}>
                                 
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<IconButton disabled={this.state.disabled} onClick={this.onClick} >
            <ExpandMoreIcon /></IconButton>
            }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.pos} align='center' color="primary" variant='h6' onClick={this.onClick}>
                "{this.props.choices[0]}" Movies Based on your choices
           </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        {this.state.movie.length === 0 ?
                    <Spin indicator={antIcon} />  
                    
                    :
                <GridList className={classes.gridList} cols={5}>
                
                {this.state.movie.slice(0, 20).map((movielist) => {
                            const img = `https://image.tmdb.org/t/p/w500`;
                   return (                            
                              
                     <GridListTile key={movielist.movie.title}>            
                                
                           <Card className={classes.card}>
                            <CardContent>
                                    <Typography color="secondary" gutterBottom component="h2" noWrap>
                                    <Link to={{
                                      pathname:`/moviedetail/${movielist.tmdb_id}`,
                                      state:{movie_id: movielist.tmdb_id,
                                      movieorgid : movielist.movie.id}
                                      }}  >{movielist.movie.title} </Link>
                                    </Typography>
                              <Typography className={classes.pos} color="textSecondary" noWrap>
                              Genres:{movielist.movie.genres} 
                              </Typography>
                              <Typography className={classes.pos} color="textSecondary" noWrap>
                              Average Rating:{movielist.movie.average_rating}
                              </Typography>
                             
                              <Rate allowHalf disabled value={movielist.movie.average_rating}/>
                              
                            </CardContent>
                          </Card>                                  
                         </GridListTile>
                            );
                        }
                        )}

                </GridList>
              }
                </ExpansionPanelDetails>
      </ExpansionPanel>
                
            
     </Grid>
          
 {/**-----------------------Choice Two -------------------------------------------- */}

  <Grid item xs={12}>
    <ExpansionPanel>
        
      {
        this.props.choices[1] !== undefined ? (
             
                  <ExpansionPanelSummary
                    expandIcon={<IconButton disabled={this.state.disabled2} onClick={this.onClickSec} >
                      <ExpandMoreIcon /></IconButton>
                      }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.pos} align='center' color="primary" variant='h6' onClick={this.onClickSec}>
                          "{this.props.choices[1]}" Movies Based on your choices
                     </Typography>
                  </ExpansionPanelSummary>
            )
                  :
                  null

      }     
      <ExpansionPanelDetails>
        {this.state.movietwo.length === 0 ?
                    <Spin indicator={antIcon} />  
                    
                    :
             <GridList className={classes.gridList} cols={5}>
                
                {this.state.movietwo.slice(0, 20).map((movielist) => {
                            const img = `https://image.tmdb.org/t/p/w500`;
                   return (                            
                              
                     <GridListTile key={movielist.movie.title}>            
                                
                           <Card className={classes.card}>
                            <CardContent>
                                    <Typography  color="secondary" gutterBottom component="h2" noWrap>
                                    <Link to={{
                                      pathname:`/moviedetail/${movielist.tmdb_id}`,
                                      state:{movie_id: movielist.tmdb_id,
                                        movieorgid : movielist.movie.id}
                                      }}  >{movielist.movie.title} </Link>
                                    
                                    </Typography>
                               <Typography className={classes.pos} color="textSecondary" noWrap>
                              Genres:{movielist.movie.genres} 
                              </Typography>
                              <Typography className={classes.pos} color="textSecondary" noWrap>
                              Average Rating:{movielist.movie.average_rating}
                              </Typography>
                             
                              <Rate allowHalf disabled value={movielist.movie.average_rating}/>
                              
                            </CardContent>
                          </Card>                                  
                              </GridListTile>
                            );
                        }
                        )}

                </GridList>
        }
           </ExpansionPanelDetails>
          </ExpansionPanel>
          
       </Grid>
               
 {/**-----------------------Choice Three -------------------------------------------- */}
  <Grid item xs={12}>
  <ExpansionPanel>
{
  this.props.choices[2] !== undefined ? (
        <ExpansionPanelSummary
        expandIcon={<IconButton disabled={this.state.disabled3} onClick={this.onClick_three} >
          <ExpandMoreIcon /></IconButton>
          }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.pos} align='center' color="primary" variant='h6' onClick={this.onClick_three}>
              "{this.props.choices[2]}" Movies Based on your choices
         </Typography>
      </ExpansionPanelSummary>
            
        )
             :
             null

}
         <ExpansionPanelDetails>
        {this.state.moviethree.length === 0 ?
                    <Spin indicator={antIcon} />  
                    
                    :
            
             <GridList className={classes.gridList} cols={5}>
                
                {this.state.moviethree.slice(0, 20).map((movielist) => {
                            const img = `https://image.tmdb.org/t/p/w500`;
                   return (                            
                              
                     <GridListTile key={movielist.movie.title}>            
                                
                           <Card className={classes.card}>
                            <CardContent>
                                    <Typography color="secondary" gutterBottom component="h2" noWrap>
                                    <Link to={{
                                      pathname:`/moviedetail/${movielist.tmdb_id}`,
                                      state:{movie_id: movielist.tmdb_id,
                                        movieorgid : movielist.movie.id}
                                      }}  >{movielist.movie.title} </Link>
                                    </Typography>
                              <Typography className={classes.pos} color="textSecondary" noWrap>
                              Genres:{movielist.movie.genres} 
                              </Typography>
                              <Typography className={classes.pos} color="textSecondary" noWrap>
                              Average Rating:{movielist.movie.average_rating}
                              </Typography>
                             
                              <Rate allowHalf disabled value={movielist.movie.average_rating}/>
                              
                            </CardContent>
                          </Card>                                  
                              </GridListTile>
                            );
                        }
                        )}

                </GridList>
        }
        </ExpansionPanelDetails>
            </ExpansionPanel>
       </Grid>
          
    </div>
        );
    }
}



GenresRecommendation.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default (withStyles(styles)(GenresRecommendation));
