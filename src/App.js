import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
// import CustomLayout from './containers/Layout';
// import MovieListView from './containers/MovieListView';
import BaseRouter from './routes';
//import NormalLayout from './containers/NoramalLayout';
import MaterialUiLayout from './containers/NavBar';

import { connect } from 'react-redux';

import * as actions from './store/actions/auth';

import { Layout} from 'antd';
const { Content } = Layout;


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  
  render() {
    return (
      <Fragment >
         <Router>
            <Layout>
                 <MaterialUiLayout {...this.props}/>
                  <Content>
                     <BaseRouter/>
                  </Content>  
            </Layout> 
          </Router>   
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
