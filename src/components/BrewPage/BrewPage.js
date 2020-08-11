import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

const styles = theme => ({
  clockTitle: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginBottom: 40,
  },
  timerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 40,
    
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
  root: {
    width: '100%',

  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
});

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

  handleReset = () => {
    this.setState({
      clockStage: 0,
      activeStep: 0,
    });
  }

  setClockStage = () => {
    if(this.state.clockStage === 1){
      this.nextStep();
      console.log('1 was caught');
    }
    if(this.state.clockStage === 3){
      this.nextStep();
      console.log('3 was caught');
    }
    if(this.state.clockStage === 5){
      this.nextStep();
      console.log('5 was caught');
    }
    this.setState({
      clockStage: this.state.clockStage + 1,
    });
  }

  nextStep = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  }

  render() {
    const { classes } = this.props;
    const steps = getStep();
    const { activeStep } = this.state;
    const { clockStage } = this.state;

    return (
      <div>
       <h1>
        Cups of Coffee = {this.props.clock.volume}
        <br />
      </h1>
      <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                 
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {/* <div>
          {activeStep === 0 ? (
            <div>
              <Typography className={classes.instructions}>
                
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            false
          )}
      </div> */}
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={this.BrewPagehandleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
      <div className={classes.timerWrapper}>
        {clockStage === 0 ? (
          <CountdownCircleTimer
          duration={10}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        >
          {renderTime}
        </CountdownCircleTimer>

        ) : (
          false
        )}
        {clockStage === 1 && (
          <CountdownCircleTimer
          isPlaying
          duration={10}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={this.setClockStage}
        >
          {renderTime}
        </CountdownCircleTimer>
        )}
        {clockStage === 2 && (
          <CountdownCircleTimer
          isPlaying
          duration={35}
          colors={[["#121212", 0.33], ["#454545", 0.33], ["#787878"]]}
          onComplete={this.setClockStage}
        >
          {renderTime}
        </CountdownCircleTimer>
        )}
        {clockStage === 3 && (
          <CountdownCircleTimer
          isPlaying
          duration={8}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={this.setClockStage}
        >
          {renderTime}
        </CountdownCircleTimer>
        )}
        {clockStage === 4 && (
          <CountdownCircleTimer
          isPlaying
          duration={32}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={this.setClockStage}
        >
          {renderTime}
        </CountdownCircleTimer>
        )}
        {clockStage === 5 && (
          <CountdownCircleTimer
          isPlaying
          duration={8}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={this.setClockStage}
        >
          {renderTime}
        </CountdownCircleTimer>
        )}
        {clockStage === 6 && (
          <CountdownCircleTimer
          isPlaying
          duration={32}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={this.setClockStage}
        >
          {renderTime}
        </CountdownCircleTimer>
        )}
        {clockStage === 7 && (
          <CountdownCircleTimer
          isPlaying
          duration={8}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={this.setClockStage}
        >
          {renderTime}
        </CountdownCircleTimer>
        )}
        {clockStage === 8 && (
          <CountdownCircleTimer
          isPlaying
          duration={32}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={this.setClockStage}
        >
          {renderTime}
        </CountdownCircleTimer>
        )}
        {clockStage === 9 && (
          <CountdownCircleTimer
          isPlaying
          duration={8}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={this.setClockStage}
        >
          {renderTime}
        </CountdownCircleTimer>
        )}
        {clockStage === 10 && (
          <CountdownCircleTimer
          isPlaying
          duration={30}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={this.setClockStage}
        >
          {renderTime}
        </CountdownCircleTimer>
        )}
        
        
      </div>
      {clockStage === 0 ? (
        <Button
          onClick={this.setClockStage}
          className={classes.button}
          variant="contained"
          color="primary"
        >Go</Button>
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

