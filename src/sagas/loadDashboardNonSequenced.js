import { call, put, select , take} from 'redux-saga/effects';
import {loadDeparture, loadFlight, loadForecast } from './apiCalls';

export const getUserFromState = (state) => state.user;

export function* loadDashboardNonSequenced() {
  try {
    //Wait for the user to be loaded
    yield take('FETCH_USER_SUCCESS');

    //Take the user info from the store
    const user = yield select(getUserFromState);

    //Get Departure information
    const departure = yield call(loadDeparture, user);

    //Flight and Forecast can be called non-sequenced /* BUT BLOCKING */
    const [flight, forecast] = yield [call(loadFlight, departure.flightID), call(loadForecast, departure.date)];

    //Tell the store we are ready to be displayed
    yield put({type: 'FETCH_DASHBOARD2_SUCCESS', payload: {departure, flight, forecast}});

  } catch(error) {
    yield put({type: 'FETCH_FAILED', error: error.message});
  }
}
