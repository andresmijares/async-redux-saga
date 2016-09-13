thomas

* Transform the responses before subsequent handlers (in the chain) are notified of the response.
* Use the response to invoke more async requests (which could generate more promises).

## Process

* The Component will fire an action ```dispatch({type: 'LOAD_DASHBOARD'})``` file: Panel.js
* 


## Create loadUser Saga

```
import { call, put };
import {loadUser as getUser } from './apiCalls';

export function* loadUser() {
  try {
    //Get User Info
    const user = yield call(getUser);

    //Tell the store to save the user Info 
    //Activate loadDashboardSecuenced
    
    yield put({type: 'FETCH_USER_SUCCESS', payload: user});

  } catch(error) {
    yield put({type: 'FETCH_FAILED', error.message});
  }
}	
	
```

## Demostrate Fork in rootSaga

```
import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';
import {loadUser} from './loadUser';
import {loadDashboard} from './loadDashboard';


yield[
	fork(loadUser)
]
```

* Explain 'take' effects, making the saga wait for an action...
* Explain takeEvery and takeLatest
	* Add the Action ```LOAD_DASHBOARD``` to the rootSaga 	


## Create loadDashboard

* import loadDashboard from './loadDashboard';

```
import {take, call, put, select} from 'redux-saga/effects';
import {loadDeparture, loadFlight, loadForecast} from './apiCalls';


export function* loadDashboard() {
  try {
    //waits for user to be loaded
    yield take('FETCH_USER_SUCCESS');

    //get user from store
    const user =  yield select((state) => state.user);

    //get departure
    const departure = yield call(loadDeparture, user);

    //get flight
    const flight = yield call(loadFlight, departure.flightID);

    //get forecast
    const forecast = yield call(loadForecast, departure.date);

    yield put({type: 'FETCH_DASHBOARD_SUCCESS', payload: {flight, departure, forecast}});

  } catch (e) {
      yield put({ type: 'FETCH_FAILED', error: e.message});
  }

}
```

## Load forecast and flight in paralel

```
  //get flight and forecast
    const [flight, forecast] = yield [call(loadFlight, departure.flightID), 										call(loadForecast, departure.date)];
```

## Isolate forecast and flight 

```
yield [
      fork(flightSaga, departure),
      fork(forecastSaga, departure),
      put({type: 'FETCH_DASHBOARD_SUCCESS', payload: {departure}})
    ];
```

## Create Flight

```
function* flightSaga(departure) {
    try {
       const flight = yield call(loadFlight, departure.flightID);

       yield put({type: 'FETCH_DASHBOARD_SUCCESS', payload: {flight}});

    } catch(e) {
      yield put({type: 'FETCH_FAILED', message: e.message});
    }
}
```

## Create Forecast

```
function* forecastSaga(departure) {
    try {
      const forecast = yield call(loadForecast, departure.date);

      yield put({type: 'FETCH_DASHBOARD_SUCCESS', payload: {forecast}});
    } catch(e) {
      yield put({type: 'FETCH_FAILED', message: e.message});
    }
}
```

Comment it's better to open a listener...


## Testing

```
import expect from 'expect';
import {loadDashboard, getUser,  flightSaga, forecastSaga} from './loadDashboard';
import {take, call, put, select, fork} from 'redux-saga/effects';
import {loadDeparture} from './apiCalls';
import {flight, departure, forecast, user} from './testHelpers';

describe('loadDashboard Saga', () => {
  let output = null;
  const saga = loadDashboard();

  it('sould take FETCH_USER_SUCCESS', () => {
      output = saga.next().value;
      let expected = take('FETCH_USER_SUCCESS');
      expect(output).toEqual(expected);
  });

  it('should select user from state', () => {
      output = saga.next().value;
      let expected = select(getUser);
      expect(output).toEqual(expected);
  });

 it('should call departure with user obj', () => {
    output = saga.next(user).value;
    let expected = call(loadDeparture, user);
    expect(output).toEqual(expected);
 });

 it('should fork and put other effects', () => {
  output = saga.next(departure).value;
  let expected = [fork(flightSaga, departure),
                            fork(forecastSaga, departure),
                            put({type: 'FETCH_DASHBOARD_SUCCESS', payload: {departure}})
                          ];
  expect(output).toEqual(expected);
  });

});

describe('flightSaga', () => {
    let output = null;
    const saga = flightSaga(departure);

    it('should call loadFlight', () => {
      output = saga.next().value;
      let expected = call(loadFlight, departure.flightID);
      expect(output).toEqual(expected);
    });

	/**TEST The Error**/
    it('should break on error is something is missing', (done) => {
      const sagaError = flightSaga();
      let message = "Cannot read property 'flightID' of undefined";
      output = sagaError.next().value;
      call(loadDeparture, user);
      let expected = put({type: 'FETCH_FAILED', message});
      done();
      expect(output).toEqual(expected);
    })

    it('should put FETCH_DASHBOARD_SUCCESS', ()=> {
      output = saga.next(flight).value;
      let expected = put({type: 'FETCH_DASHBOARD_SUCCESS', payload: {flight} });
      expect(output).toEqual(expected);
    });

});


```
