
// reference with yield put
const feedbackReducer = (state = {}, action) => {
    switch (action.type) {
      case 'PULL_FEEDBACK':
        return action.payload;
      default:
        return state;
    }
  };
  
  
  export default feedbackReducer;