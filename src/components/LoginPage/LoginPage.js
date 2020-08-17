import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input'


class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
      this.props.history.push('/home')
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className='contentRootLogin'>
        <div className='contentLoginImageContainer'>
          <div className='contentLoginImage'>
            <div className='contentLoginText'>

       
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <div>
          <p>Log In</p>
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
              value="Log In"
              onClick={this.login}
            >
              Log In
              </button>
              <span> | </span>
              <button
            type="button"
            className="link-button"
            onClick={() => {this.props.history.push('/register')}}
          >
            Register
          </button>
        </span>
        
       
          
        
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
