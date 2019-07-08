import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Rate,Icon } from 'antd';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import { Card } from 'antd';

const { Meta } = Card;


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    
    //height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  
  
});



class MovieSearchRow extends React.Component {

    refreshPage = async (e) =>{ 
        window.location.reload(); 
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <GridList cellHeight='auto' spacing={5} className={classes.gridList}>
                {this.props.searchmovies.map(movielist => {
                    const img = `https://image.tmdb.org/t/p/w500${movielist.poster_path}`
                        return(

                            <Card
                                hoverable
                                style={{hight:100,width:200}}
                                cover={<img alt={movielist.title} src={img} />}
                                actions={[<Link to={{
                                    pathname:`/moviedetail/${movielist.id}`,
                                    state:{movie_id: movielist.id}
                                    }}  ><Icon type="ellipsis" /></Link>]}
                                size= 'small'
                                title={movielist.title}
                                type='inner'
                                onClick={this.refreshPage}
                            >
                                <Meta
                                description={<Rate disabled value={movielist.vote_average} />}
                                />
                            </Card>
                            
                        );


                }
                    
                
                )}
            </GridList>
     </div>
       

        );
    }
}

export default withStyles(styles)(MovieSearchRow);
