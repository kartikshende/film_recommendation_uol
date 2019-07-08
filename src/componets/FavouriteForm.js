import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../store/actions/favouritemovieLens';
import { createFavouritemovieLens } from "../store/actions/favouritemovieLens";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';



const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    title: {
        color: theme.palette.primary.light,
      },
  });


class FavouriteForm extends React.PureComponent {
     
    state={
        favAddmsg:null,
    }
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

      favouritemovie = async(e)=>{
        e.preventDefault()
          //console.log(this.state.favouritemovie); 
          this.setState({favdisabled:'ture',
            favAddmsg:"Movie Added successfully"
          })
          const fav={
            user_id : this.props.userID,
            movie : this.props.movieorgid,  
            order : 5,
          }
          this.props.createFavouritemovieLens(this.props.token,fav);
      }
   
      

    render() {
        const { classes } = this.props;
        const fav = [];
        for(let i=0;i<this.props.favouritemovielens.length;i++){
          fav.push(this.props.favouritemovielens[i].movie.id)
        }
        
        console.log(this.props.movieorgid); 
        return (
            <div>
            {
                      fav.includes(this.props.movieorgid) ? 
                      (<div>
                        <Button variant="contained" color="secondary" className={classes.button} disabled={true}>
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

        )

    }
}
const mapStateToProps = state =>{
    return{
       userID: state.auth.userID,
       token: state.auth.token, 
       favouritemovielens : state.favouritemovielens.favouritemovielens
       
    };
  }
  const mapDispatchToProps = dispatch => {
      return {
        getFavouritemovieLens: token  => dispatch(actions.getFavouritemovieLens(token)), 
        createFavouritemovieLens: (token, fav) => dispatch(createFavouritemovieLens(token, fav))
  
        
      }
  }
  FavouriteForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(FavouriteForm));