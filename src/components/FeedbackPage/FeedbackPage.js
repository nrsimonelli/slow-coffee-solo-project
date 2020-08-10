import React, { Component } from 'react';
import { connect } from 'react-redux';

class FeedbackPage extends Component {
  
  componentDidMount() {
    console.log('in feedback');
  }

  state = {
    timing: '',
    temp: '',
    target: '',
    taste: '',
    comment: '',
    user: this.props.user.id
  };

  sendFeedback = (event) => {
    event.preventDefault();
      this.props.dispatch({
        type: 'ADD_FEEDBACK',
        payload: {
          timing: this.state.timing,
          temp: this.state.temp,
          target: this.state.target,
          taste: this.state.taste,
          comment: this.state.comment,
          user: this.state.user
        },
      });
      alert('feedback sent');
  } // end sendFeedback

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.sendFeedback}>
          <h1>Feedback</h1>
          <div>
            <label htmlFor="timing">
              Timing
              <input onChange={this.handleInputChangeFor('timing')} type='radio' name='timing' id='1' value='1'/>
              <input onChange={this.handleInputChangeFor('timing')} type='radio' name='timing' id='2' value='2'/>
              <input onChange={this.handleInputChangeFor('timing')} type='radio' name='timing' id='3' value='3'/>
              <input onChange={this.handleInputChangeFor('timing')} type='radio' name='timing' id='4' value='4'/>
              <input onChange={this.handleInputChangeFor('timing')} type='radio' name='timing' id='5' value='5'/>
            </label>
          </div>
          <div>
            <label htmlFor="temp">
              Temperature
              <input onChange={this.handleInputChangeFor('temp')} type='radio' name='temp' id='1' value='1'/>
              <input onChange={this.handleInputChangeFor('temp')} type='radio' name='temp' id='2' value='2'/>
              <input onChange={this.handleInputChangeFor('temp')} type='radio' name='temp' id='3' value='3'/>
              <input onChange={this.handleInputChangeFor('temp')} type='radio' name='temp' id='4' value='4'/>
              <input onChange={this.handleInputChangeFor('temp')} type='radio' name='temp' id='5' value='5'/>
            </label>
          </div>
          <div>
            <label htmlFor="target">
              Target
              <input onChange={this.handleInputChangeFor('target')} type='radio' name='target' id='1' value='1'/>
              <input onChange={this.handleInputChangeFor('target')} type='radio' name='target' id='2' value='2'/>
              <input onChange={this.handleInputChangeFor('target')} type='radio' name='target' id='3' value='3'/>
              <input onChange={this.handleInputChangeFor('target')} type='radio' name='target' id='4' value='4'/>
              <input onChange={this.handleInputChangeFor('target')} type='radio' name='target' id='5' value='5'/>
            </label>
          </div>
          <div>
            <label htmlFor="taste">
              Taste
              <input onChange={this.handleInputChangeFor('taste')} type='radio' name='taste' id='1' value='1'/>
              <input onChange={this.handleInputChangeFor('taste')} type='radio' name='taste' id='2' value='2'/>
              <input onChange={this.handleInputChangeFor('taste')} type='radio' name='taste' id='3' value='3'/>
              <input onChange={this.handleInputChangeFor('taste')} type='radio' name='taste' id='4' value='4'/>
              <input onChange={this.handleInputChangeFor('taste')} type='radio' name='taste' id='5' value='5'/>
            </label>
          </div>
          <div>
            <label htmlFor="comment">
              Comments
              <textarea onChange={this.handleInputChangeFor('comment')} type='textarea' name='comment' value={this.state.comment}/>
            </label>
          </div>
          <div>
            <input
              className="submit"
              type="submit"
              name="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(FeedbackPage);
