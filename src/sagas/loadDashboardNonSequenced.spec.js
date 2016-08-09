import expect from 'expect';
import {loadDashboardNonSequenced, getUserFromState} from './loadDashboardNonSequenced';
import { call, put, select , take} from 'redux-saga/effects';
import {loadDeparture, loadFlight, loadForecast } from './apiCalls';
import {flight, departure, forecast, user} from './testHelpers';

describe('NonSequenced Saga', () => {
  const saga = loadDashboardNonSequenced();
  let output = null;

 it('should take the FETCH_USER_SUCCESS action', () => {
   output = saga.next().value;
   let expected = take('FETCH_USER_SUCCESS');
   expect(output).toEqual(expected);
 });

 it('should select the user info from the store', () => {
   output = saga.next().value;
   let expected = select(getUserFromState);
   expect(output).toEqual(expected);
 });

 it('should call loadDeparture with the user object', (done) => {
   output = saga.next(user).value;
   let expected = call(loadDeparture, user);
   done();
   expect(output).toEqual(expected);
 });

 it('should call loadFlight and loadForecast at the same time', (done)=> {
   output = saga.next(departure).value;
   let expected = [call(loadFlight, departure.flightID), call(loadForecast, departure.date)];
   done();
   expect(output).toEqual(expected);
 });

 it('should put an action FETCH_DASHBOARD2_SUCCESS time', ()=> {
   output = saga.next([flight, forecast]).value;
   let expected = put({type: 'FETCH_DASHBOARD2_SUCCESS', payload: {departure, flight, forecast}});
   const finished = saga.next().done;
   expect(finished).toEqual(true);
   expect(output).toEqual(expected);
 });

it('should break on error if the departure yield is missing', (done) => {
    const sagaError = loadDashboardNonSequenced();
    let error = "Cannot read property 'flightID' of undefined";
    sagaError.next(); //take
    sagaError.next(); //salect
    sagaError.next(); //departure
    output = sagaError.next().value;
    let expected = put({type: 'FETCH_FAILED', error});
    done();
    expect(output).toEqual(expected);
});

});
