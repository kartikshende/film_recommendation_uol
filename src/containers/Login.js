import React from 'react';
import { Form, Icon, Input, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import { NavLink,Redirect } from 'react-router-dom';
import * as actions from '../store/actions/auth';

import Dialog from '@material-ui/core/Dialog';

import DialogTitle from '@material-ui/core/DialogTitle';

import Typography from '@material-ui/core/Typography';

const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class NormalLoginForm extends React.Component {
    state={
     errormsg:"",
    }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.userName, values.password);
        //this.props.history.push('/main/')        
      }
    });
  }

  render() {
    let errorMessage = null;
    if (this.props.error) {
        errorMessage = (
            <Typography component="p" color='error'>Username or password is incorrect</Typography>
        );
    } 
     else if (this.props.token) {
       return <Redirect to='/main/'/>;
    }

    const { getFieldDecorator } = this.props.form;
    return (
        <div>
         <Dialog
          open={true}
          onClose={this.handleClose}
          maxWidth={'sm'}
          fullWidth= {true}
          aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Please Login or Sign up First</DialogTitle>
            {errorMessage}
            {
                this.props.loading ?

                <Spin indicator={antIcon} />

                :

                <Form onSubmit={this.handleSubmit} className="login-form">

                    <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                    </FormItem>

                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                    </FormItem>

                    <FormItem>
                    
                    <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                       Login 
                    </Button>
                    <br/>
                    Don't have an account? Please
                    <NavLink 
                        style={{marginRight: '10px'}} 
                        to='/signup/'> Sign up
                    </NavLink>
                    </FormItem>
                </Form>
            }
            </Dialog>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token:state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);