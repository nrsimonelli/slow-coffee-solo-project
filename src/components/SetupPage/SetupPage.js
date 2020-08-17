import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';




// for stepper theme
const styles = theme => ({
  root1: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: 'center',
  },
  menuSelect: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  noBackground: {
    backgroundColor: 'red',
    display: 'flex',
  },
  verticalButtonProfile: {
    display: 'flex'
  },
});

function getSteps() {
  return ['Select Coffee', 'Volume', 'Target Grind', 'Advanced Settings'];
}



function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Which coffee will you be using?';
    case 1:
      return 'How many cups will you be making?';
    case 2:
      return '~';
    case 3:
      return 'Sweetness-Acidity Profile'
    case 4:
      return 'Strength Profile'
    default:
      return 'Unknown step';
  }
}


class SetupPage extends Component {
  state = {
    name: '',
    date: '',
    user: this.props.user.id,
    addButton: false,
    activeStep: 0,
    targetVolume: '',
    coffeeSelection: '',
    profileOne: 0,
    profileTwo: 0,
    labelWidth: 0,
  };
  
  componentDidMount() {
    console.log('hi');
    this.getCoffee();
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
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
    this.setState({
      addButton: false
    })
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
    console.log(this.state.propertyName);
  }

  changeAddButton = (logic) => {
    this.setState({
      addButton: logic
    });
    console.log('add button show?', this.state.addButton);
    
  }

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleGo = () => {
    this.props.dispatch({
      type: 'SET_TIME',
      payload: {
        volume: this.state.targetVolume,
        title: this.state.coffeeSelection,
        profileOne: this.state.profileOne,
        profileTwo: this.state.profileTwo,
      }
    });
    this.props.history.push('/brew')
  }
  // for drop down menu select
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log('this.state', this.state);
    
  };


  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    const coffeeCollection = this.props.coffee;
  

    return (

      <div className='contentRootVerticalSetup'>
        <div className="nav set">
          <Link to="/home">
            <span className="nav-title">Slow</span>
            <span className='nav-title-two'>Coffee</span>
          </Link>
          <div className="nav-right">
            <Link className="nav-link" to="/profile">
              <i className='material-icons md-24'>person</i>
            </Link>
            <Link className='nav-link' to='/home'>
              <i className='material-icons md-24'>home</i>
            </Link>
          </div>
        </div>
        <div>
        <h1 id='welcome' className='setupSubhead'>Setup</h1>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
        <div>
          {activeStep === 2 && (
            <div>
              <h2>
                Grind coffee to {this.state.targetVolume * 15}g, bring water to a boil, and proceed to finish
              </h2>
              <div>

              </div>
              <Button onClick={this.handleReset} className='setupButton'>
                Reset
              </Button>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleGo}
                  className='setupButton'
                >
                Finish
                </Button>
                <Button
                  variant="contained"
                  onClick={this.handleNext}
                  className='setupButton'
                >
                Advanced
                </Button>
            </div>
          )}
          </div>
        </div>
        <div>
          {activeStep === 0 && (
            <form className={classes.menuSelect} autoComplete="off">
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                  ref={ref => {
                    this.InputLabelRef = ref;
                  }}
                  htmlFor='outlined-coffee-simple'
                >
                  Coffee
                </InputLabel>
                <Select
                  value={this.state.coffeeSelection}
                  onChange={this.handleChange}
                  input={
                    <OutlinedInput
                      labelWidth={this.state.labelWidth}
                      name='coffeeSelection'
                      id='outlined-coffee-simple'
                    />
                  }
                >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {coffeeCollection.map(i => (
              <MenuItem key={i.id} value={i.id}>{i.name} - {i.roast_date}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
        {activeStep === 0 && this.state.addButton && (
          <div className='setupInputContainer'>
            <Input 
            onChange={this.handleInputChangeFor('name')} 
            type='text' 
            name='name' 
            value={this.state.name}/>
            <Input
              onChange={this.handleInputChangeFor('date')} 
              type='date' 
              name='date' 
              value={this.state.date}/>
            <i className='material-icons space'
              onClick={this.addThisCoffee}>
                check
            </i>
            <i className='material-icons space'
              onClick={()=>this.changeAddButton(false)}>
                close
              </i>
          </div>
         )}
        {activeStep === 0 && this.state.addButton === false && (
            <i
            className='material-icons md-48 padding'
            onClick={()=>this.changeAddButton(true)}>
            add
          </i>
          )}
          </div>
        </form>
        )}
        {activeStep === 1 && (
            <form className={classes.menuSelect} autoComplete="off">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor='outlined-volume-simple'
              >
                Volume
              </InputLabel>
              <Select
                value={this.state.targetVolume}
                onChange={this.handleChange}
                input={
                  <OutlinedInput
                    labelWidth={this.state.labelWidth}
                    name='targetVolume'
                    id='outlined-volume-simple'
                  />
                }
              >
                <MenuItem value=''><em>-</em></MenuItem>
                <MenuItem value={1.0}>1.0</MenuItem>
                <MenuItem value={1.1}>1.1</MenuItem>
                <MenuItem value={1.2}>1.2</MenuItem>
                <MenuItem value={1.3}>1.3</MenuItem>
                <MenuItem value={1.4}>1.4</MenuItem>
                <MenuItem value={1.5}>1.5</MenuItem>
                <MenuItem value={1.6}>1.6</MenuItem>
                <MenuItem value={1.7}>1.7</MenuItem>
                <MenuItem value={1.8}>1.8</MenuItem>
                <MenuItem value={1.9}>1.9</MenuItem>
                <MenuItem value={2.0}>2.0</MenuItem>
                <MenuItem value={2.1}>2.1</MenuItem>
                <MenuItem value={2.2}>2.2</MenuItem>
                <MenuItem value={2.3}>2.3</MenuItem>
                <MenuItem value={2.4}>2.4</MenuItem>
                <MenuItem value={2.5}>2.5</MenuItem>
                <MenuItem value={2.6}>2.6</MenuItem>
                <MenuItem value={2.7}>2.7</MenuItem>
                <MenuItem value={2.8}>2.8</MenuItem>
                <MenuItem value={2.9}>2.9</MenuItem>
                <MenuItem value={3.0}>3.0</MenuItem>
                <MenuItem value={3.1}>3.1</MenuItem>
                <MenuItem value={3.2}>3.2</MenuItem>
                <MenuItem value={3.3}>3.3</MenuItem>
                <MenuItem value={3.4}>3.4</MenuItem>
                <MenuItem value={3.5}>3.5</MenuItem>
                <MenuItem value={3.6}>3.6</MenuItem>
                <MenuItem value={3.7}>3.7</MenuItem>
                <MenuItem value={3.8}>3.8</MenuItem>
                <MenuItem value={3.9}>3.9</MenuItem>
                <MenuItem value={4.0}>4.0</MenuItem>
              </Select>
            </FormControl>
            {this.state.targetVolume >= 0.1 && (<h3>Coffee Needed: {this.state.targetVolume * 15}g</h3>)}
            </form>
          )}
          {activeStep === 2 && (
            <div className='setupContainer'>
              <div className='setupImage'>
              </div>
            </div>
          )}
        </div>
        
       
          
          {activeStep === 3 && (
            
          <div>
          <div className={classes.verticalButtonProfile}>
            <Button
             variant="contained"
             color="primary"
             value={.05}
             onClick={()=> {this.handleInputChangeFor('profileOne'); this.handleNext();}}
             className={classes.button}
            >
            Sweet
            </Button>
            <Button
              
              variant="contained"
              color="primary"
              value={0}
              onClick={()=> {this.handleInputChangeFor('profileOne'); this.handleNext()}}
              className={classes.button}
            >
              Balanced
            </Button>
            <Button
              variant="contained"
              color="primary"
              value={-.05}
              onClick={()=> {this.handleInputChangeFor('profileOne'); this.handleNext()}}
              className={classes.button}
            >
              Acidic
            </Button>
          </div>
          </div>
          )}
          {activeStep === 4 && (
          <div className={classes.verticalButtonProfile}>
            <Button
             variant="contained"
             
             value={.05}
             onClick={()=> {this.handleInputChangeFor('profileTwo'); this.handleGo()}}
             className={classes.button}
            >
            Low
            </Button>
            <Button
              
              variant="contained"
              
              value={0}
              onClick={()=> {this.handleInputChangeFor('profileTwo'); this.handleGo()}}
              className={classes.button}
            >
              Balanced
            </Button>
            <Button
              variant="contained"
              
              value={-.05}
              onClick={()=> {this.handleInputChangeFor('profileTwo'); this.handleGo()}}
              className={classes.button}
            >
              High
            </Button>
          </div>
          )}
          {activeStep <= 1 && (
            <div>
            
              <Button
                disabled={activeStep === 0}
                onClick={this.handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={(activeStep === 0 && this.state.coffeeSelection === '') || (activeStep === 1 && this.state.targetVolume === '')}
                onClick={this.handleNext}
                className={classes.button}
              >
              Next
              </Button>
            
          </div>
          )}
            
        
      </div>
    );
  }
}

SetupPage.propTypes ={
  classes: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
  coffee: state.coffee
});

export default connect(mapStateToProps)(withStyles(styles)(SetupPage));