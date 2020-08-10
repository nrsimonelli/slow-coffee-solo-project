import React, { Component } from 'react';
import { connect } from 'react-redux';
import AboutContent from '../AboutContent/AboutContent';
import LearnContent from '../LearnContent/LearnContent';
import BrewContent from '../BrewContent/BrewContent';

class Home extends Component {

  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div>
        <h1>Home</h1>
        
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
export default connect(mapStateToProps)(Home);
