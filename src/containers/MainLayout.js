import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/genreschoices';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import PopularMovie from '../componets/PopularMovie';
import TopRated from '../componets/TopRated';
import MovieListView from './UserBasedknnResults';

import TopReviewList from '../componets/ReviewList';

import GenresRecommendation from './GenresRecommendation';

import TredingNow from './Menu/TredingNow'

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    button: {
      margin: theme.spacing.unit,
    },
  });

  
class MainLayout extends React.Component {

  state={
    choices:[],
  }
    
  

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getGenreschoices(this.props.token);
    }
    
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getGenreschoices(newProps.token);
      }
    }   
  }

  


render() {
      const ch=[];
      for(let i=0;i<this.props.genreschoices.length;i++){
        ch.push(this.props.genreschoices[i].choices)
      }

      const ch_new = ch.sort(() => Math.random() - 0.5);
      console.log(ch_new)
        const { classes } = this.props;
         
        return (
          
           <div className={classes.root}>  
           
         <Grid container spacing={24}>     
               <Grid item xs={12}>
               <Paper className={classes.paper}>   <PopularMovie /></Paper>
               </Grid>
               <Grid item xs={12}>
               <Paper className={classes.paper}>    <TopRated /></Paper>
               </Grid>
           
           <Grid item xs={4} >
           <Paper className={classes.paper}>   <TopReviewList/></Paper>

           </Grid>
           
           <Grid item xs={8}>
                <Paper className={classes.paper}><TredingNow /></Paper>
            </Grid>

           <Grid container spacing={24}>   
              <Grid item xs={12}>
              <Paper className={classes.paper}> 
                   <MovieListView/>
                   </Paper>
                </Grid>
            </Grid>
            <Grid item xs={12}>
            <Paper className={classes.paper}> 
               <GenresRecommendation choices={ch_new}/>
            </Paper>
            </Grid>            
      </Grid>  
    </div>
            
        )

    }
} 

const mapStateToProps = state =>{
  return{
     token: state.auth.token , 
     genreschoices : state.genreschoices.genreschoices
  };
}
const mapDispatchToProps = dispatch => {
    return {
      getGenreschoices: token  => dispatch(actions.getGenreschoices(token)) 

    }
}

MainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default connect(mapStateToProps,mapDispatchToProps) (withStyles(styles)(MainLayout));
