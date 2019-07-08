import React from 'react';
import ReviewList from '../componets/ReviewList';
import axios from 'axios';



class ReviewListView extends React.Component {

    state = {

        movies: []
    }

    componentDidMount() {

        axios.get('http://127.0.0.1:8000/api/reviews/')
            .then(res => {

                this.setState({
                    movies: res.data
                });
                console.log(res.data);
            })

    }

    render() {

        return (
            <div></div>
            
        )

    }
}

export default ReviewListView;