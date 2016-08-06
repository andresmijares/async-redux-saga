import { call, put, select , take} from 'redux-saga/effects';
import {loadDeparture, loadFlight, loadForecast } from './apiCalls';

export const getUserFromState = (state) => state.user;

export function* loadDashboardSequenced() {

  try {
    //Wait for the user to be loaded
      yield take('FETCH_USER_SUCCESS');

      //Take the user info from the store
      const user = yield select(getUserFromState);
      //Get Departure information
      const departure = yield call(loadDeparture, user);

      //When Departure is ready, Get the Flight Info
      const flight = yield call(loadFlight, departure.flightID);

      //Finally get the forecast
      const forecast = yield call(loadForecast, departure.date);

      //Tell the store we are ready to be displayed
      yield put({type: 'FETCH_DASHBOARD_SUCCESS', payload: {forecast, flight, departure} });


  } catch(error) {
    yield put({type: 'FETCH_FAILED', error: error.message});
  }

}
