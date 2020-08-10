import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const styles = theme => ({
  clockTitle: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginBottom: 40,
  },

  timerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    
  },

  timer: {
    fontFamily: 'Montserrat',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  text: {
    color: 'grey',
  },

  value: {
    fontSize: 40,
  },

  info: {
    maxWidth: 360,
    margin: 40,
    textAlign: 'center',
    fontSize: 16,
  },
})

const renderTime = ({ remainingTime }) => {
  return (
    <div className="timer">
      <div className="value">{remainingTime}</div>
    </div>
  );
};

function getStep() {
  return ['Bloom', 'First Pour', 'Second Pour', 'Final Pour'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Which coffee will you be using?';
    case 1:
      return 'How many cups are you making?';
    case 2:
      return 'Hit ready once you have grinded to the target amount';
    case 3:
      return 'tr';
    default:
      return 'Unknown step';
  }
}

class BrewPage extends Component {
  state = {
    activeStep: 0,
    clockStage: 0,
  }

  setClockStage = () => {
    this.setState({
      clockStage: this.state.clockStage + 1,
    })
  }

  render() {
    const { classes } = this.props;
    const step = getStep();
    const { activeStep } = this.state;
    const { clockStage } = this.state;

    return (
      <div>
       <h1>
        Cups of Coffee = {this.props.clock.volume}
        <br />
      </h1>
      <div className={classes.timerWrapper}>
        {clockStage === 0 ? (
          <CountdownCircleTimer
          duration={15}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={this.setClockStage}
        >
          {renderTime}
        </CountdownCircleTimer>

        ) : (
          false
        )}
        {clockStage === 1 ? (
          <CountdownCircleTimer
          isPlaying
          duration={15}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={this.setClockStage}
        >
          {renderTime}
        </CountdownCircleTimer>

        ) : (
          false
        )}
        {clockStage === 2 ? (
          <CountdownCircleTimer
          isPlaying
          duration={45}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={this.setClockStage}
        >
          {renderTime}
        </CountdownCircleTimer>

        ) : (
          false
        )}
      </div>
      {clockStage === 0 ? (
        <button
          onClick={this.setClockStage}
        >Go</button>
      ) : (
        false
      )}
      
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  clock: state.clock,
});

export default connect(mapStateToProps)(withStyles(styles)(BrewPage));

