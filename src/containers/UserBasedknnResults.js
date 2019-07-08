import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions/userbasedknn';


import axios from 'axios';
import { Link } from "react-router-dom";

import {Rate} from 'antd';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Icon,Spin,Alert} from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

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
    card: {
      minWidth: 'auto',
      hieght:'100%',
    },
  });

class MovieListView extends React.Component {
  state={loading:true,container : null,}
    componentDidMount() {
      if (this.props.token !== undefined && this.props.token !== null) {
        this.props.getUSERBASEDKNN(this.props.token);
      }
    }
  
    componentWillReceiveProps(newProps) {
      if (newProps.token !== this.props.token) {
        if (newProps.token !== undefined && newProps.token !== null) {
          this.props.getUSERBASEDKNN(newProps.token);
          

        }
      }
    }

    alertFunc=async ()=>{
      console.log('Hiiiii')
      this.setState({
        loading:false,
        container:(
          <Alert
            message="Sorry there is no recommendation for you"
            description="Please rate more movies for better recommmdetions"
            type="info"
            showIcon
          />
        ),
      })
      
    }
    
      
    

    render() {
        const { classes } = this.props;
    
        setTimeout(this.alertFunc, 40000)
   
        return (
            <div>
              {
                this.props.userbasedknn.length !== 0 || this.props.userbasedknn !== undefined ? (
                <div>
                <Typography align='center' color="primary" variant='h6'>Recommended movies based on your ratings</Typography> 
                  <div className={classes.root}>
                {this.props.userbasedknn.length === 0 ?
                    <Spin tip="Checking recommendation for you..." spinning={this.state.loading} indicator={antIcon} > 
                    {this.state.container} 
                    </Spin>
                    
                    :
                      <GridList className={classes.gridList} cols={4}>
                              {this.props.userbasedknn.map((movielist) => {
      
                            return (                                                         
                              <GridListTile key={movielist.title}>
                                                              
                                 <Card className={classes.card}>
                                  <CardContent>
                                        <Typography className={classes.title} color="secondary" gutterBottom component="h2" noWrap>
                                           <Link to={{
                                              pathname:`/moviedetail/${movielist.links[0].tmdb_id}`,
                                              state:{movie_id: movielist.links[0].tmdb_id,
                                                movieorgid : movielist.id}
                                              }}>{movielist.title} 
                                          </Link>
                                        </Typography>
                                    <Typography className={classes.pos} color="textSecondary" noWrap>
                                    Genres:{movielist.genres} 
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary" noWrap>
                                     Average Rating:{movielist.average_rating}
                                    </Typography>
                                   
                                    <Rate allowHalf disabled value={movielist.average_rating}/>
                                    
                                  </CardContent>
                                </Card>
      
                                    </GridListTile>
                                      
                                  );
                              }
                              )}
      
                      </GridList>
                  }
                  </div>
              </div>
                )
                :
                (<Typography className={classes.title} color="Secondary" gutterBottom component="h2">
                  No recommendation for you rate more movie 
                </Typography>)
              }
             
            </div>
            
        )

    }
}

const mapStateToProps = state =>{
  return{
     token: state.auth.token, 
     userbasedknn : state.userbasedknn.userbasedknn,
     error: state.userbasedknn.error,
  };
}
const mapDispatchToProps = dispatch => {
    return {
      getUSERBASEDKNN: token  => dispatch(actions.getUSERBASEDKNN(token)) 

    }
}

MovieListView.propTypes = {
    classes: PropTypes.object.isRequired,
  };


export default connect(mapStateToProps,mapDispatchToProps) (withStyles(styles)(MovieListView));
{/* <MovieList data={this.state.movies} /> */}