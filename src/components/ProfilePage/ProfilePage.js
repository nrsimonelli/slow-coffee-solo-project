import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from "../LogOutButton/LogOutButton";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    flexGrow: 1,
  },
  table: {
    minWidth: 700,
  },
});

class ProfilePage extends Component {

  state={
    user: this.props.user.id,
    value: 0,
    name: '',
    date: '',
    editMode: false,
    timing: '',
    temp: '',
    target: '',
    taste: '',
    comment: '',
  }

  componentDidMount() {
    console.log('your profile');
    this.getCoffee();
    this.getFeedback();
  }
  componentDidUpdate(prevProps) {
    console.log('didUpdate firing:', prevProps, this.props)

    if(prevProps.feedback.length !== this.props.feedback.length){
      this.getFeedback();
    }
    
    if(prevProps.coffee.length !== this.props.coffee.length){
      this.getCoffee();
    }
    
  }
  handleChange = event => {
    this.setState({ 
      [event.target.name]: event.target.value 
    });
    console.log('you are putting this in state:', event.target.value);
  }
  handleTabChange = (event, value) => {
    this.setState({ 
      value,
      editMode: false 
    });
  };

  getCoffee = () => {
    this.props.dispatch({
      type: 'FETCH_COFFEE',
      payload: {
        user: this.state.user
      }
    })
  }

  getFeedback = () => {
    this.props.dispatch({
      type: 'FETCH_FEEDBACK',
      payload: {
        user: this.state.user
      }
    })
  }
  toggleEdit = (row) => {
    console.log('row:', row);
    this.setState({
      editMode: row.id,
      name: row.name,
      date: row.roast_date,
      timing: row.timing,
      temp: row.temp,
      target: row.target,
      taste: row.taste,
      comment: row.comment,
    })
    console.log('editMode:', this.state.editMode);
    
  }

  deleteFeedback = (id) => {
    console.log('you clicked delete!', id)
    this.props.dispatch({
      type: 'REMOVE_FEEDBACK',
      payload: id
    })
    this.props.dispatch({
      type: 'CLEAR_FEEDBACK'
    })
  }

  deleteCoffee = (id) => {
    console.log('you delete coffee', id)
    this.setState({
      editMode: false
    })
    this.props.dispatch({
      type: 'REMOVE_COFFEE',
      payload: id
    })
    this.props.dispatch({
      type: 'CLEAR_COFFEE'
    })
  }

  updateCoffee = (id) => {
    console.log('you updated this row in coffee', id);
    this.setState({
      editMode: false
    })
    this.props.dispatch({
      type: 'UPDATE_COFFEE',
      payload: {
        name: this.state.name,
        date: this.state.date,
        id: id
      }
    })
    this.props.dispatch({
      type: 'CLEAR_COFFEE'
    })
  }
  updateFeedback = (id) => {
    console.log('you updated this row in feedback', id);
    this.setState({
      editMode: false
    })
    this.props.dispatch({
      type: 'UPDATE_FEEDBACK',
      payload: {
        timing: this.state.timing,
        temp: this.state.temp,
        target: this.state.target,
        taste: this.state.taste,
        comment: this.state.comment,
        id: id
      }
    })
    this.props.dispatch({
      type: 'CLEAR_FEEDBACK'
    })
  }

  render() {
    const {classes} = this.props;
    const { value } = this.state;
    const coffeeRows = this.props.coffee;
    const feedbackRows = this.props.feedback;

    return (
      <div className='myTheme'>
        <Nav />
        <h1 id="welcome">{this.props.user.username}</h1>
        
        <div className={classes.root}>
          <AppBar color='default' position='static'>
            <Tabs value={value} onChange={this.handleTabChange} indicatorColor="primary"
          textColor="primary" variant='fullWidth'>
              <Tab label="Coffee" />
              <Tab label="Feedback" />
              <Tab label="Info" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer>
                            <Paper className={classes.root}>
                              <Table className={classes.table}>
                                <TableHead>
                                  <TableRow>
                                    <TableCell >Name</TableCell>
                                    <TableCell align='right'>Roast Date</TableCell>
                                    <TableCell align='right'><i className='material-icons'>create</i></TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {coffeeRows.map(row => (
                                    <TableRow key={row.id}>
                                      <TableCell component='th' scope='row'>
                                        {this.state.editMode === row.id ? (
                                          <Input 
                                          type='text' 
                                          name='name'
                                          value={this.state.name} 
                                          placeholder={row.name}
                                          onChange={this.handleChange}>
                                            
                                          </Input>
                                        ) : (
                                          <>
                                          {row.name}
                                          </>
                                        )}
                                      </TableCell>
                                      <TableCell align='right'>
                                        {this.state.editMode === row.id ? (
                                          <Input 
                                          type='date'
                                          name='date' 
                                          value={this.state.date} 
                                          onChange={this.handleChange}>
                                            
                                          </Input>
                                        ) : (
                                          <>
                                          {row.roast_date}
                                          </>
                                        )}
                                      </TableCell>
                                      <TableCell align='right'>
                                        {this.state.editMode === row.id ? (
                                          <>
                                          <i
                                            className='material-icons'
                                            
                                            
                                            onClick={()=>this.updateCoffee(row.id)}>
                                            done
                                          </i>
                                          <i 
                                            className='material-icons'
                                            
                                            
                                            onClick={()=>this.deleteCoffee(row.id)}>
                                              delete
                                          </i>
                                          <i
                                            className='material-icons' 
                                            
                                            onClick={()=>this.toggleEdit(false)}>
                                              close
                                          </i>
                                          </>
                                        ) : (
                                          <Button 
                                            className='button'
                                            variant='contained'
                                            color='primary'
                                            onClick={()=>this.toggleEdit(row)}>
                                              edit
                                          </Button>
                                        )}
                                        </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Paper>
                          </TabContainer>}

          {value === 1 && <TabContainer>
                            <Paper className={classes.root}>
                              <Table className={classes.table}>
                                <TableHead>
                                  <TableRow>
                                    <TableCell >Notes</TableCell>
                                    <TableCell align='right'>Timing</TableCell>
                                    <TableCell align='right'>Temperature</TableCell>
                                    <TableCell align='right'>Target</TableCell>
                                    <TableCell align='right'>Taste</TableCell>
                                    {/* <TableCell align='right'>Date</TableCell> */}
                                    <TableCell align='right'><i className='material-icons'>create</i></TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {feedbackRows.map(row => (
                                    <TableRow key={row.id}>
                                      <TableCell component='th' scope='row'>
                                      {this.state.editMode === row.id ? (
                                          <Input
                                          className='notes'
                                          type='textarea' 
                                          name='comment'
                                          value={this.state.comment} 
                                          placeholder={row.comment}
                                          onChange={this.handleChange}>
                                          
                                            
                                          </Input>
                                        ) : (
                                          <>
                                          {row.comment}
                                          </>
                                        )}
                                        
                                      </TableCell>
                                      <TableCell align='right'>
                                      {this.state.editMode === row.id ? (
                                          <Input 
                                          type='number'
                                          name='timing'
                                          min='1'
                                          max='5'
                                          value={this.state.timing} 
                                          placeholder={row.timing}
                                          onChange={this.handleChange}>
                                            
                                          </Input>
                                        ) : (
                                          <>
                                          {row.timing}
                                          </>
                                        )}
                                        
                                        </TableCell>
                                      <TableCell align='right'>
                                      {this.state.editMode === row.id ? (
                                          <Input 
                                          type='number'
                                          name='temp'
                                          min='1'
                                          max='5'
                                          value={this.state.temp} 
                                          placeholder={row.temp}
                                          onChange={this.handleChange}>
                                            
                                          </Input>
                                        ) : (
                                          <>
                                          {row.temp}
                                          </>
                                        )}
                                        
                                        </TableCell>
                                      <TableCell align='right'>
                                      {this.state.editMode === row.id ? (
                                          <Input 
                                          type='number'
                                          name='target'
                                          min='1'
                                          max='5'
                                          value={this.state.target} 
                                          placeholder={row.target}
                                          onChange={this.handleChange}>
                                            
                                          </Input>
                                        ) : (
                                          <>
                                          {row.target}
                                          </>
                                        )}
                                        
                                        </TableCell>
                                      <TableCell align='right'>
                                      {this.state.editMode === row.id ? (
                                          <Input 
                                          type='number'
                                          name='taste'
                                          min='1'
                                          max='5'
                                          value={this.state.taste} 
                                          placeholder={row.taste}
                                          onChange={this.handleChange}>
                                            
                                          </Input>
                                        ) : (
                                          <>
                                          {row.taste}
                                          </>
                                        )}
                                        
                                        </TableCell>
                                      {/* <TableCell align='right'>{row.date}</TableCell> */}
                                      <TableCell align='right' className='tableIcons'>
                                        {this.state.editMode === row.id ? (
                                          <>
                                          <i
                                            className='material-icons'                                            
                                            onClick={()=>this.updateFeedback(row.id)}>
                                            done
                                          </i>
                                          <i 
                                            className='material-icons'
                                            onClick={()=>this.deleteFeedback(row.id)}>
                                              delete
                                          </i>
                                          <i 
                                            className='material-icons' 
                                            onClick={()=>this.toggleEdit(false)}>
                                              close
                                          </i>
                                          </>
                                        ) : (
                                          <Button 
                                            className='button'
                                            variant='contained'
                                            color='primary'
                                            onClick={()=>this.toggleEdit(row)}>
                                              edit
                                          </Button>
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Paper>
                          </TabContainer>}
          {value === 2 && <TabContainer>
            <div>Name: {this.props.user.username}</div>
            <div>Member#: {this.props.user.id}</div>
            </TabContainer>}
        </div>
        

        <Footer />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  coffee: state.coffee,
  feedback: state.feedback
});

export default connect(mapStateToProps)(withStyles(styles)(ProfilePage));