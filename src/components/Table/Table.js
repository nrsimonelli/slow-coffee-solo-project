import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

class Table extends Component {
    render(){
        return(
            <div>
                <table>
                    
                </table>
            </div>
        )
    }
}
 

const putReduxStateOnProps =(reduxState)=>({
    reduxState
  })
  
  export default withRouter(connect(putReduxStateOnProps)(Table));