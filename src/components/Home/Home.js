import React, { Component } from 'react';
import { connect } from 'react-redux';
import AboutContent from '../AboutContent/AboutContent';
import LearnContent from '../LearnContent/LearnContent';
import BrewContent from '../BrewContent/BrewContent';
import Nav from '../Nav/Nav';
import { withRouter } from 'react-router-dom'

class Home extends Component {

  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div className='myTheme'>
        <Nav />
        
        <div className='contentRootHome'>
          <p className='contentHomeText'>Yes.</p>
          </div>
        
        <AboutContent />
        <LearnContent />
        <BrewContent />
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default withRouter(connect(mapStateToProps)(Home));
