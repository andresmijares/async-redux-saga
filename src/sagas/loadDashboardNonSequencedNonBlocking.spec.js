import expect from 'expect';
import {loadDashboardNonSequencedNonBlocking, getUserFromState, isolatedFlight, isolatedForecast} from './loadDashboardNonSequencedNonBlocking';
import { call, put, select , take} from 'redux-saga/effects';
import {loadDeparture, loadFlight, loadForecast } from './apiCalls';
import {flight, departure, forecast, user} from './testHelpers';


describe('NonSequencedNonBlocking Saga', () => {
    let output = null;
    const saga = loadDashboardNonSequencedNonBlocking();

    it('should take FETCH_USER_SUCCESS', () => {
        output = saga.next().value;
        let expected = take('FETCH_USER_SUCCESS');
        expect(output).toEqual(expected);
    });

    it('should select the user from store', ()=>{
      output = saga.next().value;
      let expected = select(getUserFromState);
      expect(output).toEqual(expected);
    });

    it('should call loadDeparture with user yield', (done) => {
      output = saga.next(user).value;
      let expected = call(loadDeparture, user);
      done();
      expect(output).toEqual(expected);
    });

    it('should put FETCH_DEPARTURE3_SUCCESS', ()=> {
      output = saga.next(departure).value;
      let expected = put({type: 'FETCH_DASHBOARD3_SUCCESS', payload: {departure}});
      expect(output).toEqual(expected);
    });

    it('should put FETCH_DEPARTURE3_SUCCESS', ()=> {
      output = saga.next(departure).value;
      let expected = put({type: 'FETCH_DEPARTURE3_SUCCESS', departure});
      expect(output).toEqual(expected);
    });

    describe('isolatedFlight', () => {
      const saga = isolatedFlight();
      output = null;

      it('should take FETCH_DEPARTURE3_SUCCESS', () => {
        output = saga.next().value;
        let expected = take('FETCH_DEPARTURE3_SUCCESS');
        expect(output).toEqual(expected);
      });

      it('should call loadFlight with the departure object', (done) => {
          output = saga.next(departure).value;
          let expected = call(loadFlight, departure.flightID);
          done();
          expect(output).toEqual(expected);
      });

      it('should break on error if departure is undefined', (done) => {
        const sagaError = isolatedFlight();
        let error = "Cannot read property 'flightID' of undefined";
        sagaError.next();
        output = sagaError.next().value;
        call(loadFlight, departure.flightID);
        let expected = put({type: 'FETCH_FAILED', error});
        done();
        expect(output).toEqual(expected);
      });

      it('should put FETCH_DASHBOARD3_SUCCESS', () => {
        output = saga.next(flight).value;
        let expected = put({type: 'FETCH_DASHBOARD3_SUCCESS', payload: {flight}});
        expect(output).toEqual(expected);
      });

    });

    describe('isolatedForecast', () => {
      const saga = isolatedForecast();
      output = null;

      it('shoudl take FETCH_DEPARTURE3_SUCCESS', () => {
        output = saga.next().value;
        let expected = take('FETCH_DEPARTURE3_SUCCESS');
        expect(output).toEqual(expected);
      });

      it('should call loadForecast with departure yield', (done)=>{
        output = saga.next(departure).value;
        let expected = call(loadForecast, departure.date);
        done();
        expect(output).toEqual(expected);
      });

      it('should fail to call loadForecast if departure is missing', (done)=>{
        const sagaError = isolatedForecast();
        let error = "Cannot read property 'date' of undefined";
        sagaError.next();
        call(loadForecast, departure.date);
        output = sagaError.next().value;
        let expected = put({type: 'FETCH_FAILED', error});
        done();
        expect(output).toEqual(expected);
      });

      it('should put FETCH_DASHBOARD3_SUCCESS', (done) => {
        output = saga.next(forecast).value;
        let expected = put({type: 'FETCH_DASHBOARD3_SUCCESS', payload: {forecast}});
        const finished = saga.next().done;
        done();
        expect(finished).toEqual(true);
        expect(output).toEqual(expected);
      });

    });

});
