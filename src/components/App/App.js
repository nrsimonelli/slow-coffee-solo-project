import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import RegisterPage from '../RegisterPage/RegisterPage';
import Home from '../Home/Home';

import ProfilePage from '../ProfilePage/ProfilePage';
import FeedbackPage from '../FeedbackPage/FeedbackPage';
import BrewPage from '../BrewPage/BrewPage';
import SetupPage from '../SetupPage/SetupPage';

import './App.css';
import LoginPage from '../LoginPage/LoginPage';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div className='myTheme'>
          
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
          
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <Route
              exact
              path="/home"
              component={Home}
            />
            <Route 
              exact
              path='/login'
              component={LoginPage}
            />
            <Route 
              exact
              path='/register'
              component={RegisterPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/profile"
              component={ProfilePage}
            />
            <ProtectedRoute
              exact
              path="/setup"
              component={SetupPage}
            />
            <ProtectedRoute
              exact
              path="/brew"
              component={BrewPage}
            />
            <ProtectedRoute
              exact
              path="/feedback"
              component={FeedbackPage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
  )}
}

export default connect()(App);
