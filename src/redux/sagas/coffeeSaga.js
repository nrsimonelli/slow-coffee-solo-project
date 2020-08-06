import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// lead to get 
function* fetchCoffee(action) {
  try {
    console.log('in coffee saga fetch:', action.payload);
    const response = yield axios.get('/api/setup/' + action.payload.user)
    
    yield put({ type: 'SET_COFFEE', payload: response.data });
  } catch (error) {
    console.log('coffee get request failed', error);
  }
}

// lead to update then get
function* changeCoffee(action) {
    try{
        const response = yield axios.update('api/setup' + action.payload);
        yield put ({type: 'UPDATE_COFFEE'});
    } catch (error) {
        console.log('error with update', error);
    }
}

// lead to delete then get
function* dumpCoffee(action) {
    try {
        const response = yield axios.delete('api/setup' + action.payload);
        yield put ({type: 'DROP_COFFEE'});
    } catch (error) {
        console.log('error with delete', error);
    }

}

// lead to post then get
function* addCoffee(action) {
    try{
        yield axios.post('api/setup/coffee', action.payload);
        
    } catch (error) {
        console.log('error with post', error);
    }
    
}

function* coffeeSaga() {
  yield takeLatest('FETCH_COFFEE', fetchCoffee);
  yield takeLatest('CHANGE_COFFEE', changeCoffee);
  yield takeLatest('DUMP_COFEE', dumpCoffee);
  yield takeLatest('ADD_COFFEE', addCoffee);
}

export default coffeeSaga;