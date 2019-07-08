import React from 'react';
import { Form, Input, Icon, Button,  Spin } from 'antd';
import { connect } from 'react-redux';
import { NavLink,Redirect } from 'react-router-dom';
import * as actions from '../store/actions/auth';

import Dialog from '@material-ui/core/Dialog';

import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onAuth(
            values.userName,
            values.email,
            values.password,
            values.confirm
        );
        //this.props.history.push('/');
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  
  // handlepasschange =(e) =>{
  //     const pass = event.target.value;
  //      const reg = /^[A-Z]*$/;
  //      const test = reg.test(pass);
  //      if (test) {
  //         alert('pass');
  //         this.setState({value: pass});
  //      }else{
  //        alert('fail');
  //      }        
  // }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");            
    const test = strongRegex.test(value);
    if(test){
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
     
    }
  }else{
      callback('The Password must conatain 8 character long [one Lowercase & Uppercase letter, number & special character e.g.!,#,$]'
      );
    }
    callback(); 
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    let errorMessage = null;
    if (this.props.error) {  
      errorMessage = (
            <Typography component="p" color='error'>{this.props.error.username} <br/>{this.props.error.email}<br/>{this.props.error.password1}</Typography>
        );
    } 
     else if (this.props.token) {
       return <Redirect to='/userchoices/'/>;
    }
    return (
      <Dialog
          open={true}
          onClose={this.handleClose}
          maxWidth={'sm'}
          fullWidth= {true}
          aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">Please Login or Singup First</DialogTitle>
        {errorMessage}
     {
           this.props.loading ?

          <Spin indicator={antIcon} />

     
                :

      <Form onSubmit={this.handleSubmit}>
        
        <FormItem>
            {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
            })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
        </FormItem>
        
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
              
            }],
          })(
            <Input  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>

        <FormItem>
        <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
            Signup
        </Button>
        Or Already have an account? Please
        <NavLink 
            style={{marginRight: '10px'}} 
            to='/login/'>  Login
        </NavLink>
        </FormItem>

      </Form>
     }
      </Dialog>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token:state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);