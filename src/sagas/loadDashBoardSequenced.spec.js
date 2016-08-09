import expect from 'expect';
import {loadDashboardSequenced, getUserFromState} from './loadDashboardSequenced';
import { call, put, select , take} from 'redux-saga/effects';
import {loadDeparture, loadFlight, loadForecast } from './apiCalls';
import {flight, departure, forecast, user} from './testHelpers';


describe('Sequenced Saga', () => {
  const saga = loadDashboardSequenced();
  let output = null;

  it('should take fetch users success', () => {
      output = saga.next().value;
      let expected = take('FETCH_USER_SUCCESS');
      expect(output).toEqual(expected);
  });

  it('should select the state from store', () => {
      output = saga.next().value;
      let expected = select(getUserFromState);
      expect(output).toEqual(expected);
  });

  it('should call LoadDeparture with the user obj', (done) => {
    output = saga.next(user).value;
    let expected = call(loadDeparture, user);
    done();
    expect(output).toEqual(expected);
  });


  it('should Load the flight with the flightId', (done) => {
    let output = saga.next(departure).value;
    let expected = call(loadFlight, departure.flightID);
    done();
    expect(output).toEqual(expected);
  });

    it('should load the forecast with the departure date', (done) => {
      output = saga.next(flight).value;
      let expected = call(loadForecast, departure.date);
      done();
      expect(output).toEqual(expected);
    });

    it('should put Fetch dashboard success', (done) => {
       output = saga.next(forecast, departure, flight ).value;
       let expected = put({type: 'FETCH_DASHBOARD_SUCCESS', payload: {forecast, flight, departure}});
       const finished = saga.next().done;
       done();
       expect(finished).toEqual(true);
       expect(output).toEqual(expected);
    });
});
