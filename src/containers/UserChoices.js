import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import Hoc from "../hoc/hoc";

import { createGenreschoices } from "../store/actions/genreschoices";

import { withStyles } from '@material-ui/core/styles';

import { Checkbox,List } from 'antd';
import { Button } from '@material-ui/core';

import TredingNow from './ChoicesTrendingNow'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Link } from 'react-router-dom';

const CheckboxGroup = Checkbox.Group;

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
    
  });

  const ranges = [
    {
      value: 'Action',
      label: 'Action',
    },
    {
      value: 'Adventure',
      label: 'Adventure',
    },
    {
      value: 'Animation',
      label: 'Animation',
    },
    {
        value: 'Comedy',
        label: 'Comedy',
      },
      {
        value: 'Crime',
        label: 'Crime',
      },
      {
        value: 'Documentary',
        label: 'Documentary',
      },
      {
        value: 'Drama',
        label: 'Drama',
      },
      {
        value: 'Fantasy',
        label: 'Fantasy',
      },
      {
        value: 'Horror',
        label: 'Horror',
      },
      {
        value: 'Romance',
        label: 'Romance',
      },
      {
        value: 'Science Fiction',
        label: 'Science Fiction',
      },
      {
        value: 'Thriller',
        label: 'Thriller',
      },
  ];

class UserChoices extends React.Component {
  state = {
    choices:[],
    genreslist:[],
  };

  // componentDidMount = async() =>{

  //   axios.get(`http://127.0.0.1:8000/api/genreschoices/`)
  //           .then(res => {
  //               this.setState({
  //                 genreslist: res.data
  //               });
  //               console.log(res.data);
  //           })
      
  // }

  onChange = (checkedValues) =>{
    
    this.setState({
      choices : checkedValues,
    })
    console.log('checked = ', checkedValues);
   }

   

   handlesubmit=(e)=>{
    e.preventDefault()
    console.log(this.state.choices);
    const choicesloop = this.state.choices;
    
     const choices = [];
      for (let i=0;i<choicesloop.length;i+=1){
          choices.push({
            choices:choicesloop[i]})
      }
     const choice={
      user_id : this.props.userID,
      choices,
     }; 

     this.props.createGenreschoices(this.props.token,choice);

    
    }

    


  render() {
    const { classes } = this.props;
    
    return (
        
          <div className={classes.root}>
          <Dialog
          open={true}
          onClose={this.handleClose}
          maxWidth={'xl'}
          fullWidth= {true}
          aria-labelledby="form-dialog-title"
        >
         <DialogTitle id="form-dialog-title">Please Select Your Choices Before Proceed</DialogTitle>
            <Grid container spacing={24}>
                
                  <Grid item xs={5} className={classes.gridList}>
                  <Paper className={classes.paper}>
                  <GridListTile key="Subheader"  style={{ height: 'auto' }}>
                      <ListSubheader color="default" variant="h5" component="h3">
                          
                          GET MOVIES BY GENTRES
                        
                      </ListSubheader>
                  </GridListTile>
                  
                  <List itemLayout="vertical"
                        size="large"
                        bordered>
                          <List.Item>
                            <CheckboxGroup options={ranges} onChange={this.onChange} />
                            {this.state.choices.length === 0 ?
                            <Button variant="contained" color="primary" disabled={true} onClick={this.handlesubmit} className={classes.button}>
                            <Link to="/main/">Submit</Link>
                          </Button>
                            :
                            <Button variant="contained" color="primary" disabled={false} onClick={this.handlesubmit} className={classes.button}>
                            <Link to="/main/">Submit</Link>
                          </Button>
                            }
                           
                          </List.Item>
                    </List>
                  </Paper>
                  </Grid>

                  <Grid item xs={7}>
                      <Paper className={classes.paper}><TredingNow /></Paper>
                  </Grid>
                 
                </Grid>
                </Dialog>
              </div>
          
       
    );
  }
}

const mapStateToProps = state => {
  return {
    userID: state.auth.userID,
    token: state.auth.token,
   
  }; 
};

const mapDispatchToProps = dispatch => {
  return {
    createGenreschoices: (token, choice) => dispatch(createGenreschoices(token, choice))
  };
};


UserChoices.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserChoices));