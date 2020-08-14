import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// lead to get 
function* fetchCoffee(action) {
  try {
    console.log('in coffee saga fetch:', action.payload);
    const response = yield axios.get('/api/coffee/' + action.payload.user)
    
    yield put({ type: 'SET_COFFEE', payload: response.data });
  } catch (error) {
    console.log('coffee get request failed', error);
  }
}


// lead to delete then get
function* removeCoffee(action) {
    try {
        console.log('in delete coffee saga', action.payload);
        yield axios.delete('/api/coffee/delete/' + action.payload);
    } catch (error) {
        console.log('error with delete coffee', error);
    }

}

// lead to post then get
function* addCoffee(action) {
    try{
        yield axios.post('api/coffee/add', action.payload);

    } catch (error) {
        console.log('error with post', error);
    }
    
}

function* updateCoffee(action) {
  try{
      console.log('in update coffee saga', action.payload);
      yield axios.put('api/coffee/update', action.payload);
  } catch (error) {
      console.log('error with update coffee', error);
  }
}

function* coffeeSaga() {
  yield takeLatest('FETCH_COFFEE', fetchCoffee);
  yield takeLatest('REMOVE_COFFEE', removeCoffee);
  yield takeLatest('ADD_COFFEE', addCoffee);
  yield takeLatest('UPDATE_COFFEE', updateCoffee);
}

export default coffeeSaga;