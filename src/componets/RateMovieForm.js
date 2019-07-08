import React from 'react';
//import MovieList from '../componets/MovieList';
import { Card, Rate, Form, Input, Button } from 'antd';

import { connect } from 'react-redux';

import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const FormItem = Form.Item;



class RateMovieForm extends React.Component {

    state = {
        value: 3,
        movies: [],
        commentmessage:"",
        disabled:false,
        aftercommentmsg:"",
    }
    
    handlesubmit = (event,requestType,movie_id,title) =>{
        event.preventDefault()
        const comment = event.target.elements.comment.value;
        const rate = this.state.value;
        const date = new Date();
        //const movie_id = this.props.location.state.movie_id;
        console.log(comment,rate,date);
        this.setState({disabled:true});
        this.setState({aftercommentmsg:"Thank you! for comment and rate this movie"});
        switch(requestType){
            case 'post':
              return  axios.post(`http://127.0.0.1:8000/api/ReviewFromMovieDBViewSet/`,{
                    movieid : movie_id, 
                    title: title,
                    pub_date : date,
                    user_id : this.props.userID,
                    //user_name :this.props.username,
                    comment : comment,    
                    rating : rate,
                    
                })
                .then(res => console.log(res))
                .catch(error => console.err(error));

            case 'put':

              return  axios.post(`http://127.0.0.1:8000/api/reviews/`,{
                    rating : rate,
                    comment : comment,
                    user_id : this.props.userID,
                    user_name :this.props.username,
                    pub_date : date ,
                    movie : movie_id
                })
                .then(res => console.log(res))
                .catch(error => console.err(error));


        }
      
        


    }
    handleRateSubmit = (value) => {
        this.setState({ value });
        this.setState({
            commentmessage:"Please Comment below as well to submit your rating",
        });
       // console.log(rate);
   
   
   }
    

    

    render() {
        const { value } = this.state;
        return (
            <div>
                <Form onSubmit={(event) => this.handlesubmit(
                    event,
                    this.props.requestType,
                    this.props.movie_id,
                    this.props.title)}>
                    <FormItem>
                    <FormHelperText>Please Rate and comment this movie</FormHelperText>
                    <span>
               <Rate name="rate" tooltips={desc} onChange={this.handleRateSubmit} value={value}/>
               {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
               </span>
               <Typography color='error'> {this.state.commentmessage}</Typography> 
               </FormItem>
               <FormItem>
                  <Input required name ="comment" placeholder="Write your comment"/>
               </FormItem>
               <FormItem>
                 <Button disabled={this.state.disabled} type="primary" htmlType="submit">Comment</Button>
                 <Typography color='primary'> {this.state.aftercommentmsg}</Typography> 
               </FormItem>
               </Form>
            </div>

        )

    }
}

const mapStateToProps = state => {
    return {
      userID: state.auth.userID,
      token: state.auth.token,
      username: state.auth.username,
     
    };
  };
  

export default connect(mapStateToProps,null) (RateMovieForm);