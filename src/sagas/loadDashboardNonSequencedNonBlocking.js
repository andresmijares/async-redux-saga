import { call, put, select , take} from 'redux-saga/effects';
import {loadDeparture, loadFlight, loadForecast } from './apiCalls';

export const getUserFromState = (state) => state.user;

export function* loadDashboardNonSequencedNonBlocking() {
  try {
    //Wait for the user to be loaded
    yield take('FETCH_USER_SUCCESS');

    //Take the user info from the store
    const user = yield select(getUserFromState);

    //Get Departure information
    const departure = yield call(loadDeparture, user);

    //Update the UI
    yield put({type: 'FETCH_DASHBOARD3_SUCCESS', payload: {departure}});

    //trigger actions for Forecast and Flight to start...
    //We can pass and object into the put statement
    yield put({type: 'FETCH_DEPARTURE3_SUCCESS', departure});

  } catch(error) {
    yield put({type: 'FETCH_FAILED', error: error.message});
  }
}

export function* isolatedFlight() {
  try {
    /* departure will take the value of the object passed by the put*/
    const departure = yield take('FETCH_DEPARTURE3_SUCCESS');

    //Flight can be called unsequenced /* BUT NON BLOCKING VS FORECAST*/
    const flight = yield call(loadFlight, departure.flightID);
    //Tell the store we are ready to be displayed
    yield put({type: 'FETCH_DASHBOARD3_SUCCESS', payload: {flight}});

  } catch (error) {
    yield put({type: 'FETCH_FAILED', error: error.message});
  }
}

export function* isolatedForecast() {
    try {
      /* departure will take the value of the object passed by the put*/
      const departure = yield take('FETCH_DEPARTURE3_SUCCESS');

      const forecast = yield call(loadForecast, departure.date);
      yield put({type: 'FETCH_DASHBOARD3_SUCCESS', payload: { forecast }});

    } catch(error) {
      yield put({type: 'FETCH_FAILED', error: error.message});
    }
}
