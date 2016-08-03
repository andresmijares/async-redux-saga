import { call, put } from 'redux-saga/effects';
import {loadUser as getUser } from './apiCalls';

export function* loadUser() {
  try {
    //Get User Info
    const user = yield call(getUser);

    //Tell the store to save the user Info also activate loadDashboardSecuenced
    yield put({type: 'FETCH_USER_SUCCESS', payload: user});

  } catch(error) {
    yield put({type: 'FETCH_FAILED', error});
  }
}
