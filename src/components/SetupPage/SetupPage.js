import React, { Component } from 'react';
import { connect } from 'react-redux';


class SetupPage extends Component {
  state = {
    name: '',
    date: '',
    user: this.props.user.id
  };
  
  componentDidMount() {
    console.log('hi');
    this.getCoffee();
    
  }

  getCoffee = () => {
    this.props.dispatch({
      type: 'FETCH_COFFEE',
      payload: {
        user: this.state.user
      }
    })
  }

  addThisCoffee = (event) => {
    event.preventDefault();
    console.log('clicked add coffee');
    this.props.dispatch({
      type: 'ADD_COFFEE',
      payload: {
        name: this.state.name,
        date: this.state.date,
        user: this.state.user
      }
    })
    this.getCoffee();
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
    console.log(this.state);
  }

  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div>
        <h1>setup</h1>
        <h6>coffee list</h6>
      {JSON.stringify(this.props.coffee)}

      <input 
        onChange={this.handleInputChangeFor('name')} 
        type='text' 
        name='name' 
        value={this.state.name}
      />
      <input
        onChange={this.handleInputChangeFor('date')} 
        type='date' 
        name='date' 
        value={this.state.date}
      />
      <button
        onClick={this.addThisCoffee}
      >Add</button>
        
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  user: state.user,
  coffee: state.coffee
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(SetupPage);
