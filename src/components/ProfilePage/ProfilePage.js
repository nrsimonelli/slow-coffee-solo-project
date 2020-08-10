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

  handleTabChange = (event, value) => {
    this.setState({ value });
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
    this.props.dispatch({
      type: 'REMOVE_COFFEE',
      payload: id
    })
    this.props.dispatch({
      type: 'CLEAR_COFFEE'
    })
  }

  render() {
    const {classes} = this.props;
    const { value } = this.state;
    const coffeeRows = this.props.coffee;
    const feedbackRows = this.props.feedback;

    return (
      <div>
        <h1 id="welcome">Profile, {this.props.user.username}!</h1>
        
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
                                    <TableCell align='right'>Edit</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {coffeeRows.map(row => (
                                    <TableRow key={row.id}>
                                      <TableCell component='th' scope='row'>{row.name}</TableCell>
                                      <TableCell align='right'>{row.roast_date}</TableCell>
                                      <TableCell align='right'>
                                        <button className='deleteButton' onClick={()=>this.updateCoffee(row.id)}>/</button>
                                        <button className='deleteButton' onClick={()=>this.deleteCoffee(row.id)}>x</button></TableCell>
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
                                    <TableCell align='right'>Date</TableCell>
                                    <TableCell align='right'>Remove</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {feedbackRows.map(row => (
                                    <TableRow key={row.id}>
                                      <TableCell component='th' scope='row'>
                                        {row.comment}
                                      </TableCell>
                                      <TableCell align='right'>{row.timing}</TableCell>
                                      <TableCell align='right'>{row.temp}</TableCell>
                                      <TableCell align='right'>{row.target}</TableCell>
                                      <TableCell align='right'>{row.taste}</TableCell>
                                      <TableCell align='right'>{row.date}</TableCell>
                                      <TableCell align='right'><button className='deleteButton' onClick={()=>this.deleteFeedback(row.id)}>x</button></TableCell>
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

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(ProfilePage));
