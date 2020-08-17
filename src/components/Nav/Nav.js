import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';

const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <span className="nav-title">Slow</span><span className='nav-title-two'>Coffee</span>
    </Link>
    <div className="nav-right">
      {props.user.id ? 
        <div className='nav-link' onClick={() => props.dispatch({ type: 'LOGOUT' })}>
          <i className='material-icons md-24'>power_settings_new</i>
          </div>
        :
        <Link className='nav-link' to='/login'>
          <i className='material-icons md-24'>login</i>
        </Link>}
      
      {props.user.id && (
        <>
          <Link className="nav-link" to="/profile">
            <i className='material-icons md-24'>person</i>
          </Link>
          <Link className='nav-link' to='/setup'>
            <i className='material-icons md-24'>local_cafe</i>
          </Link>
        </>
      )}
      {/* Always show this link since the about page is not protected */}
      
    </div>
  </div>
);

const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(Nav));
