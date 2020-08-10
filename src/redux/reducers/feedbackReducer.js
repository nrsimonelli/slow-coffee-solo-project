
// reference with yield put
const feedbackReducer = (state = {}, action) => {
    switch (action.type) {
      // FETCH_FEEDBACK 
      case 'SET_FEEDBACK':
        return action.payload;
      case 'CLEAR_FEEDBACK':
        return [];
      default:
        return state;
    }
  };
  
  
  export default feedbackReducer;