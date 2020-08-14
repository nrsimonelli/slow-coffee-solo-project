import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';


class BrewContent extends Component{

  render(){
    return(
      <div className='contentRootBrew'>
        <div className='contentBrewImageContainer'>
          <div className='contentBrewImage'>
            <div className='contentBrewText'>
              <p>Are You Ready?</p>
            </div>
          </div>
          <Button
            variant='contained'
            onClick={()=>this.props.history.push('/setup')}
          >Start</Button>
        </div>
      </div>


   ); // end return
  } // end render
} // end class

const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default withRouter(connect(mapStateToProps)(BrewContent));
