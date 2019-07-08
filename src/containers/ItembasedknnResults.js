import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions/itembasedknn';

import { Link } from "react-router-dom";

import {Rate} from 'antd';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
  });

class ItembasedknnResults extends React.Component {
  state={loading:true,container : null,}
    componentDidMount() {
      if (this.props.token !== undefined && this.props.token !== null) {
        this.props.getItemBASEDKNN(this.props.token);
      }
    }
  
    componentWillReceiveProps(newProps) {
      if (newProps.token !== this.props.token) {
        if (newProps.token !== undefined && newProps.token !== null) {
          this.props.getItemBASEDKNN(newProps.token);
          

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
          {this.props.favouritemovielens.length !== 0 ?
            <div className={classes.root}>
                {this.props.itembasedknn.length === 0 ?
                    <Spin tip="Checking recommendation for you..." spinning={this.state.loading} indicator={antIcon} > 
                    {this.state.container} 
                    </Spin>

                    :
                   
           
             
              <Paper className={classes.paper}>
              <Typography align='center' color="primary" variant='h6'>Recommended movies based on your favorite movie</Typography> 
                      <GridList className={classes.gridList} cols={4}>
                              {this.props.itembasedknn.map((movielist) => {
      
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
                  </Paper>
            
                  }
                  </div>
                  :
                  null
                  }
       </div> 
              
       )

    }
}

const mapStateToProps = state =>{
  return{
     token: state.auth.token, 
     itembasedknn : state.itembasedknn.itembasedknn,
     error: state.userbasedknn.error,
  };
}
const mapDispatchToProps = dispatch => {
    return {
      getItemBASEDKNN: token  => dispatch(actions.getItemBASEDKNN(token)) 

    }
}

ItembasedknnResults.propTypes = {
    classes: PropTypes.object.isRequired,
  };


export default connect(mapStateToProps,mapDispatchToProps) (withStyles(styles)(ItembasedknnResults));
{/* <MovieList data={this.state.movies} /> */}