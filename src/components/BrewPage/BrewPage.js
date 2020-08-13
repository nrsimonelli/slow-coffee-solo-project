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

const styles = theme => ({
  clockTitle: {
    fontFamily: 'lato',
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
    width: '90%',

  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  buttonBlue: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: '#07C8F9',
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  smallItalic: {
    marginBottom: 40,

  },
  smallRegular: {
    marginBottom: 40,
  }
  
});

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Enjoy...</div>;
  }
  return (
    <div className="timer">
      <div className="value">{remainingTime}</div>
    </div>
  );
}

function getStep() {
  return ['Bloom', 'First Pour', 'Second Pour', 'Third Pour', 'Final Pour'];
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
  handleFinish = () => {
    this.props.history.push('/feedback')
  }

  getStepContent = (step) => {
    // end volume
    const v = this.props.clock.volume * 240
    // constant
    const n = 0.2
    // first modifier
    const x = this.props.clock.profileOne
    // second modifier
    const y = this.props.clock.profileTwo

    switch (step) {
      case 0:
        return `target = ${v * (n - x)}g`;
      case 1:
        return `target = ${v * 2 * n}g`;
      case 2:
        return `target = ${v * 3 * n}g`;
      case 3:
        return `target = ${v * 4 * n}g`;
      case 4:
        return `target = ${v}g`;
      default:
        return 'Unknown step';
    }
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
    if(this.state.clockStage === 7){
      this.nextStep();
      console.log('7 was caught');
    }
    if(this.state.clockStage === 9){
      this.nextStep();
      console.log('7 was caught');
    }
    this.setState({
      clockStage: this.state.clockStage + 1,
    });
  }
  isOdd = (num) => {
    return num % 2
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
      <div className='myTheme'>
       <center>
       <h1>
        Brew Time
       </h1>
       </center>
      <div className='contentRootHorizontal'>
        <div calssName='contentThird'>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{this.getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                 
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      </div>


    
    <div className='contentThird'>
    <div className={classes.timerWrapper}>
      {clockStage  >= 1 && clockStage <= 9 && this.isOdd(clockStage) === 0 && (
        <div className={classes.smallItalic}>wait...</div>
      )}
      {clockStage  >= 1 && this.isOdd(clockStage) === 1 && (
        <div className={classes.smallRegular}>Pour</div>
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
        {clockStage >= 10 && (
          <CountdownCircleTimer
          isPlaying
          duration={5}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={[false, 0]}
        >
          {renderTime}
        </CountdownCircleTimer>
        )}
        
        
      </div>
      {clockStage === 0 && (
        <Button
          onClick={this.setClockStage}
          className={classes.buttonBlue}
          variant="contained"
          
        >Go</Button>
      )}
      {clockStage >=1 && (
        <>
        <Button
          onClick={this.handleReset}  
          className={classes.button}
        >Reset</Button>
        <Button
          disabled={clockStage <= 9} 
          onClick={this.handleFinish}
          className={classes.button}
          variant="contained"
          color="primary"
        >Finish</Button>
        </>
      )}

      </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  clock: state.clock,
});

export default connect(mapStateToProps)(withStyles(styles)(BrewPage));

