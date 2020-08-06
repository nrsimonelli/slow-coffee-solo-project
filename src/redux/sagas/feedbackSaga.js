import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// POST will be fired on "FEEDBACK" actions
function* handleFeedback(action) {
  try {
    yield axios.post('/api/feedback/send', action.payload);

  } catch (error) {
      console.log('Error with user feedback:', error);
      
  }
}

function* feedbackSaga() {
  yield takeLatest('FEEDBACK', handleFeedback);
}

export default feedbackSaga;


// function* getMemberSaga(action){
//   //us try/catch for errors - replaces promise .then & .catch
//   try {
//     const response = yield axios.get('/api/member/' + action.payload);
//     yield put({ type: 'SET_MEMBER', payload: response.data.results[0]});
//     console.log('putting this in the member reducer:', response.data.results[0])
//   } catch (error) {
//       console.log('error with member get request', error);
//   }
// }