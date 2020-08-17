import React, { Component } from 'react';
import { connect } from 'react-redux';
import AboutContent from '../AboutContent/AboutContent';
import LearnContent from '../LearnContent/LearnContent';
import BrewContent from '../BrewContent/BrewContent';
import Nav from '../Nav/Nav';
import { withRouter } from 'react-router-dom'

class Home extends Component {

  render() {
    return (
      <div className='myTheme'>
        <Nav />
        
        <div className='contentRootHome'>
          <p className='contentHomeText'></p>
          </div>
        
        <AboutContent />
        <LearnContent />
        <BrewContent />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(Home));
