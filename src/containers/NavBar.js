import React from 'react';
import { connect } from 'react-redux';

import { NavLink,Link, withRouter } from 'react-router-dom';

import * as actions from '../store/actions/auth';
import Menu from '@material-ui/core/Menu';
import MovieSearchRow from './MovieSearchRow';
import MenuItem from '@material-ui/core/MenuItem';


import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const styles = theme => ({
    root: {
      width: '100%',
    },
    grow: {
      flexGrow: 1,
      color: '#fff',
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    }, 
  });

  class MaterialUiLayout extends React.PureComponent {
    
    
    state = {
        collapsed: false,
        searchmovies: [],
        anchorEl: null,
        searchvalue:"",
    }
     
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
      this.setState({ anchorEl: null });
    };
    getSearch = async (e) => {
        e.preventDefault();
        const searchValue = e.target.value;
        const api_call = await fetch(`https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchValue}`);
        const data = await api_call.json();
        console.log(data);
        console.log(searchValue);
        this.setState({
            searchmovies: data.results,
            searchvalue:searchValue,
        });
      
    }

    refreshPage = async (e) =>{ 
      window.location.reload(); 
  }

    render() {
        const {classes} =this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        
      return (
        
          <div>
        <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div>
          <IconButton 
          className={classes.menuButton}  
          color="inherit" 
          aria-label="Open drawer"
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}>
            
            <MenuIcon />
          </IconButton>
                <Menu
                 anchorEl={anchorEl}
                 open={open}
                  onClose={this.handleClose}>

                  <MenuItem onClick={this.handleClose}><NavLink to='/main/'>Home</NavLink></MenuItem>
                  <MenuItem onClick={this.handleClose}><NavLink to='/searchbygenres/'>Search By Genres</NavLink></MenuItem>
                  <MenuItem onClick={this.refreshPage}><NavLink to={{pathname:`/movies/nowplaying`,
                                      state:{movie_id: 'now_playing'}}} >Now Playing</NavLink></MenuItem>
                  <MenuItem onClick={this.refreshPage}><NavLink to={{pathname:`/movies/upcoming`,
                                      state:{movie_id:'upcoming'}}} >Upcoming Movies</NavLink></MenuItem>
                  <MenuItem onClick={this.handleClose}><NavLink to='/favoritemovie/'>Favourite Movies</NavLink></MenuItem>
                  <MenuItem onClick={this.handleClose}><NavLink to='/userrating'>Your Rated Movies</NavLink> </MenuItem>  
                  <MenuItem onClick={this.handleClose}>
                  { this.props.isAuthenticated ? (
                    <Button  color="inherit" onClick={this.props.logout}>
                       <NavLink to="/login/">Logout</NavLink>
                    </Button>
                    )
                    :
                    (
                    <Button color="inherit" >
                    <NavLink to="/login/">Login</NavLink>
                    </Button>

                    )}    
                   </MenuItem>      
                
                </Menu>
       </div>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            Film-Application
          </Typography>
          
          
         <div className={classes.grow} />  
         { this.props.isAuthenticated ? (
                    <Button  color="inherit" onClick={this.props.logout}>
                       <NavLink to="/login/">Logout</NavLink>
                    </Button>
                    )
                    :
                    (
                    <Button color="inherit" >
                    <NavLink to="/login/">Login</NavLink>
                    </Button>

                    )}    

          { this.props.isAuthenticated ? (
                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                      Hi {this.props.username}
                 </Typography>
                )
                : (
                    <Button>
                        <NavLink 
                            style={{marginRight: '10px'}} 
                            to='/signup/'> signup
                        </NavLink>
                    </Button>                  
                )}      

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <NavLink to={{ pathname: `/search/` }}> 
            <InputBase
              name="sea"
              placeholder="Search movie…"
              onChange={this.getSearch}
              value={this.state.searchvalue}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
            </NavLink>
          </div>
        </Toolbar>
      </AppBar>
    </div>

   <div><MovieSearchRow searchmovies={this.state.searchmovies} /></div>
    </div>
      );
    }
  }
const mapStateToProps = state => {
  return {
    userID: state.auth.userID,
    token: state.auth.token,
    username:state.auth.username,
   
  };
};
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    };
};

MaterialUiLayout.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MaterialUiLayout)));