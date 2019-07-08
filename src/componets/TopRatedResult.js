import React from 'react';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';

import { Icon,Spin} from 'antd';
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
  });
class TopRatedResult extends React.Component {
    render() {
        const { classes } = this.props;
        return (
          <div>
            <Typography align='center' color="primary" variant='h6'>Top Rated Movies</Typography>
          {this.props.topratedmovie.length === 0 ?
                    <Spin indicator={antIcon} />  
                    
                    :
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={8}>
                        {this.props.topratedmovie.map((movielist) => {
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
                                    <IconButton>
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
            </div>
            }
            </div>
        );
    }
}
TopRatedResult.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(TopRatedResult);
