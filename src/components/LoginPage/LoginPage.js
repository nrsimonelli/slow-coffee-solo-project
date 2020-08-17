import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


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
          <Link className='home-light' to='/home'>
              <i className='material-icons md-36 light'>home</i>
            </Link>
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
            <Button
              className="login-button"
              variant='contained'
              color='primary'
              type="submit"
              name="submit"
              value="Log In"
              onClick={this.login}
            >
              Log In
              </Button>
              <span className='pipe'> | </span>
              <button
            type="button"
            className="link-button"
            id='register-button'
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
