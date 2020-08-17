import React, { Component } from 'react';
import {connect} from 'react-redux';
import Input from '@material-ui/core/Input';


class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
      this.props.history.push('/home')
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className='contentRootRegister'>
        <div className='contentRegisterImageContainer'>
          <div className='contentRegisterImage'>
            <div className='contentRegisterText'>  


        
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <div>
          <p>Register User</p>
          <div>
            <label htmlFor="username">
              Username:
              <Input
                type="text"
                name="username"
                id='username'
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <Input
                type="password"
                name="password"
                id='password'
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
        </div>
          <span>
            <button
              className="link-button"
              type="submit"
              name="submit"
              value='Register'
              onClick={this.registerUser}
            >
              Register
              </button>
              <span> | </span>
            <button
              type="button"
              className="link-button"
              onClick={() => {this.props.history.push('/login')}}
            >
            Login
          </button>
          </span>
        
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

