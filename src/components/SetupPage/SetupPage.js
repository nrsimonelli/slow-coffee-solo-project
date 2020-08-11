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



// for stepper theme
const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
  return ['Select Coffee', 'Volume', 'Target Grind', 'Advanced Stettings'];
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
    profileOne: 1,
    profileTwo: 2,
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
    console.log(this.state);
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
      <div className={classes.root}>
        <div>
        <h1>setup</h1>
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
        <div>
          {activeStep === 2 ? (
            <div>
              <Typography className={classes.instructions}>
                Grind on a coarse setting to the perscribed amount
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleGo}
                  className={classes.button}
                >
                Finish
                </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
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
            </div>
          )}
          </div>
        </div>
        <div>
          {activeStep === 0 ? (
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
        </form>
        ) : (
          activeStep === 1 ? (
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
                <MenuItem value={1}>1.0</MenuItem>
                <MenuItem value={1.5}>1.5</MenuItem>
                <MenuItem value={2}>2.0</MenuItem>
                <MenuItem value={2.5}>2.5</MenuItem>
                <MenuItem value={3}>3.0</MenuItem>
                <MenuItem value={3.5}>3.5</MenuItem>
                <MenuItem value={4}>4.0</MenuItem>
              </Select>
            </FormControl>
            </form>
    
          ) : (
            <div className='gramAmount'>
              {this.state.targetVolume * 15}g
            </div>
          )
          )}
        </div>
        <div>
        {activeStep === 0 && this.state.addButton ? (
          <div>
            <input 
            onChange={this.handleInputChangeFor('name')} 
            type='text' 
            name='name' 
            value={this.state.name}/>
            <input
              onChange={this.handleInputChangeFor('date')} 
              type='date' 
              name='date' 
              value={this.state.date}/>
            <button
              onClick={this.addThisCoffee}>
                Add
            </button>
            <button
              onClick={()=>this.changeAddButton(false)}>
                x
              </button>
          </div>
         ) : (
          false
          )}
        </div>
        <div>
          {activeStep === 0 && this.state.addButton === false ? (
            <button
            className={classes.button}
            onClick={()=>this.changeAddButton(true)}>
            New Coffee? Click to add to your collection
          </button>
          ) : (
            false
          )}
          </div>
          
          {activeStep === 3 && (
          <div className={classes.verticalButtonProfile}>
            <Button
             variant="contained"
             color="primary"
             value={1}
             onClick={this.handleInputChangeFor('profileOne')}
             className={classes.button}
            >
            Sweet
            </Button>
            <Button
              
              variant="contained"
              color="primary"
              value={0}
              onClick={this.handleInputChangeFor('profileOne')}
              className={classes.button}
            >
              Balanced
            </Button>
            <Button
              variant="contained"
              color="primary"
              value={2}
              onClick={this.handleInputChangeFor('profileOne')}
              className={classes.button}
            >
              Acidic
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

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(SetupPage));
