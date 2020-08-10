import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// POST will be fired on "FEEDBACK" actions
function* addFeedback(action) {
  try {
    yield axios.post('/api/feedback/send', action.payload);

  } catch (error) {
      console.log('Error with user feedback:', error); 
  }
}

function* removeFeedback(action) {
  try{
    console.log('in delete feedback saga', action.payload);
    yield axios.delete('/api/feedback/delete/' + action.payload);

  } catch (error) {
    console.log('Error with user feedback:', error); 
  }
}

function* fetchFeedback(action) {
  try {
    console.log('in feedback saga fetch:', action.payload);
    const response = yield axios.get('/api/feedback/' + action.payload.user);
    yield put({ type: 'SET_FEEDBACK', payload: response.data });

  } catch (error) {
      console.log('Error with user feedback:', error);   
  }
}

function* feedbackSaga() {
  yield takeLatest('ADD_FEEDBACK', addFeedback);
  yield takeLatest('FETCH_FEEDBACK', fetchFeedback);
  yield takeLatest('REMOVE_FEEDBACK', removeFeedback);
}

export default feedbackSaga;


