import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';
import LogOutButton from '../LogOutButton/LogOutButton';

const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <h2 className="nav-title">Slow Coffee Solo Project</h2>
    </Link>
    <div className="nav-right">
      {props.user.id ? 
        <LogOutButton className='nav-link' />
        :
        <Link className='nav-link' to='/login'>Login / Register</Link>}
      
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <Link className="nav-link" to="/profile">
            My Coffee
          </Link>
          <Link className='nav-link' to='/setup'>
            Start
          </Link>
        </>
      )}
      {/* Always show this link since the about page is not protected */}
      
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
