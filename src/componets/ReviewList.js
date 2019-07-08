import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions/reviews';
import {Rate} from 'antd';
import { Link } from "react-router-dom";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import ListSubheader from '@material-ui/core/ListSubheader';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

const styles = theme =>({ 
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 250,
    height: 550,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  card: {
    minWidth: 275,
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class TopReviewsList extends React.PureComponent {

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getREVIEWS(this.props.token);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getREVIEWS(newProps.token);
      }
    }
  }



    render() {
      
        const { classes } = this.props;
        return (
          
      
            <div className={classes.root}>
            
          <GridList cellHeight={180} className={classes.gridList}>
              <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div">Latest Reviews by People</ListSubheader>
              </GridListTile>
              {this.props.reviews.map((movielist) => { 
                return (
                  <Card className={classes.card} key={movielist.movie.links[0].tmdb_id}>
                    <CardContent>
                            <Typography className={classes.title} color="secondary" gutterBottom component="h2">
                            <Link to={{
                                      pathname:`/moviedetail/${movielist.movie.links[0].tmdb_id}`,
                                      state:{movie_id: movielist.movie.links[0].tmdb_id,
                                        movieorgid : movielist.movie.id}
                                      }}  >{movielist.movie.title} </Link>
                             </Typography>
                             
                      <Typography className={classes.pos} color="textSecondary">
                       Genres:{movielist.movie.genres} Average Rating:{movielist.movie.average_rating}
                      </Typography>
                      <Typography component="p">
                        {movielist.comment}  
                      </Typography>
                      <Rate allowHalf disabled value={movielist.rating}/>
                      <Typography className={classes.title} color="Secondary" gutterBottom component="p"> 
                             By:{movielist.user_name} </Typography>
                    </CardContent>
              </Card>


                );
              
              }
              )}
              </GridList>
          </div>
        );
    }
}

const mapStateToProps = state =>{
  return{
     token: state.auth.token , 
     reviews : state.reviews.reviews
  };
}
const mapDispatchToProps = dispatch => {
    return {
      getREVIEWS: token  => dispatch(actions.getREVIEWS(token)) 

    }
}

TopReviewsList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default connect(mapStateToProps,mapDispatchToProps) (withStyles(styles)(TopReviewsList));
