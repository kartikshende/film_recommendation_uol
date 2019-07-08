import React from 'react';
//import MovieList from '../componets/MovieList';
import { Link } from "react-router-dom";

import axios from 'axios';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Rate,Icon ,Spin} from 'antd';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import { Card } from 'antd';

const { Meta } = Card;
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
    
    height: 550,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
});


class TredingNowResult extends React.Component {

    

    render() {
        const { classes } = this.props;
        return (
          
         <div className={classes.root}>
         {this.props.movies.length === 0 ?
                    <Spin indicator={antIcon} />  
                    
                    :
                    
                <GridList cellHeight='auto' spacing={5} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">MOVIES TRENDING NOW</ListSubheader>
                </GridListTile>
                
                        {this.props.movies.map(movielist => {
                        const img = `https://image.tmdb.org/t/p/w500${movielist.poster_path}`
                            return(

                                <Card
                                    hoverable
                                    style={{hight:100,width:200}}
                                    cover={<img alt={movielist.title} src={img} />}
                                    extra={[<Link to={{
                                        pathname:`/moviedetail/${movielist.id}`,
                                        state:{movie_id: movielist.id}
                                        }}  ><Icon type="more" /></Link>]}
                                    size= 'small'
                                    title={movielist.title}
                                    type='inner'
                                >
                                    <Meta
                                    description={<Rate disabled value={movielist.vote_average} />}
                                    />
                                </Card>
                                
                            );


                    }
                        
                    
                    )}
                </GridList>
         }
         </div>
           

        )

    }
}

export default withStyles(styles)(TredingNowResult);