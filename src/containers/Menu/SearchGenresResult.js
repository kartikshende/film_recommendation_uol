import React from 'react';

import {
    List, Icon,message, Avatar, Spin,Rate
  } from 'antd';
import jquery from 'jquery';
  
import InfiniteScroll from 'react-infinite-scroller';
import reqwest from 'reqwest';
import {Link} from 'react-router-dom';


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class SearchGenresResult extends React.Component {
    state = {
      data: [],
      loading: false,
      hasMore: true,
    }
  
    componentDidMount() {
      this.fetchData((res) => {
        this.setState({
          data: res.sort((a, b) => (b.movie.average_rating - a.movie.average_rating)),  
        });
      });
    }
  
    fetchData = (callback) => {
    const movie_id = this.props.location.state.movie_id;
    const DataUrl = `http://127.0.0.1:8000/api/links/?search=${movie_id}`;
    reqwest({
        url: DataUrl,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: (res) => {
          callback(res);
          console.log(res);
        },
      });
    }
  
    handleInfiniteOnLoad = () => {
      let data = this.state.data;
      this.setState({
        loading: true,
      });
      if (data.length > 14) {
        message.warning('Infinite List loaded all');
        this.setState({
          hasMore: false,
          loading: false,
        });
        return;
      }
      this.fetchData((res) => {
        data = data.concat(res.results);
        this.setState({
          data,
          loading: false,
        });
      });
    }
  
    render() {
      return (
        <div className="demo-infinite-container">
        {this.state.data.length === 0 ?
                    <Spin indicator={antIcon} />  
                    
                    :
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
          >
            <List
              dataSource={this.state.data}
              renderItem={item => (
                <List.Item key={item.movie.id}>
                  <List.Item.Meta
                    
                    title={<Link to={{
                        pathname:`/moviedetail/${item.tmdb_id}`,
                        state:{movie_id: item.tmdb_id}
                        }}  >{item.movie.title}</Link>}
                    description={item.movie.genres}
                    
                  />
                 <div><Rate allowHalf disabled value={item.movie.average_rating}/></div>
                </List.Item>
              )}
            >
              {this.state.loading && this.state.hasMore && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
            </List>
          </InfiniteScroll>
        }
        </div>
      );
    }
  }
  
export default SearchGenresResult;