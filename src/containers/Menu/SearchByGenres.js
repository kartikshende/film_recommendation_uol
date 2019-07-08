import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import TredingNow from './TredingNow'

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

import {Link} from 'react-router-dom';

const styles = theme => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
     
      color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing.unit,
      },
      input: {
        display: 'none',
      },

  });


class SeachByGenres extends React.Component {

  refreshPage = async (e) =>{ 
    window.location.reload();  
}
  
  
  render() {
    const { classes } = this.props;
    return (
        <div className={classes.root}>
        <Grid container spacing={24}>
            
            <Grid item xs={4} className={classes.gridList}>
            <Paper className={classes.paper}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader color="default" variant="h5" component="h3">
                    
                    GET MOVIES BY GENTRES
                  
                </ListSubheader>
            </GridListTile>
               
                  
                    <Button size="large" color="primary" className={classes.button}>
                    <Link to={{pathname:"/searchgenresresult/action",state:{movie_id: 'action'}}}>Actions</Link>
                    </Button>
                  
                  
                    <Button size="large" color="primary" className={classes.button}>
                     <Link to={{pathname:"/searchgenresresult/adventure",state:{movie_id: 'adventure'}}}>Adventure</Link>
                    </Button>
                    
                    <Button size="large" color="primary" className={classes.button}>
                   <Link to={{pathname:"/searchgenresresult/Animation",state:{movie_id: 'Animation'}}}>Animation</Link> 
                    </Button>
                    <Button size="large" color="primary" className={classes.button}>
                    <Link to={{pathname:"/searchgenresresult/Comedy",state:{movie_id: 'Comedy'}}} >Comedy</Link>
                    </Button>
                    <Button size="large" color="primary" className={classes.button}>
                    <Link to={{pathname:"/searchgenresresult/Crime",state:{movie_id: 'Crime'}}}>Crime</Link>
                    </Button>
                    <Button size="large" color="primary" className={classes.button}>
                    <Link to={{pathname:"/searchgenresresult/Documentary",state:{movie_id: 'Documentary'}}}>Documentary</Link>
                    </Button>
                   
                    <Button size="large" color="primary" className={classes.button}>
                    <Link to={{pathname:"/searchgenresresult/drama",state:{movie_id: 'drama'}}}> Drama</Link>
                    </Button>
                    
                    <Button size="large" color="primary" className={classes.button}>
                  <Link to={{pathname:"/searchgenresresult/Fantasy",state:{movie_id: 'Fantasy'}}}> Fantasy</Link>
                    </Button>
                    <Button size="large" color="primary" className={classes.button}>
                    <Link to={{pathname:"/searchgenresresult/Horror",state:{movie_id: 'Horror'}}}> Horror</Link>
                    </Button>
                    <Button size="large" color="primary" className={classes.button}>
                    <Link to={{pathname:"/searchgenresresult/Romance",state:{movie_id: 'Romance'}}}> Romance </Link>
                    </Button>
                    <Button size="large" color="primary" className={classes.button}>
                    <Link to={{pathname:"/searchgenresresult/science-fiction",state:{movie_id: 'sci'}}}>Science Fiction</Link>
                    </Button>
                    <Button size="large" color="primary" className={classes.button}>
                    <Link to={{pathname:"/searchgenresresult/Thriller",state:{movie_id: 'Thriller'}}}>Thriller</Link>
                    </Button>
                    
                  </Paper>
               
            </Grid>
            <Grid item xs={8}>
                <Paper className={classes.paper}><TredingNow /></Paper>
            </Grid>
           
         </Grid>
         
      </div>
    );
  }
}


SeachByGenres.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(SeachByGenres);


