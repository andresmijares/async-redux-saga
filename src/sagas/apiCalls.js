/* eslint-disable no-console */
import TravelServiceApi from '../api/travelServiceApi';

export const loadUser = () => {
  console.log('loading user');
  return TravelServiceApi.getUser().then(res => res);
};

export const loadDeparture = (user) => {
  console.log('loading departure');
  return TravelServiceApi.getDeparture(user).then(res => res);
};

export const loadFlight = (flightID) => {
  console.log('loading flight');
  return TravelServiceApi.getFlight(flightID).then(res => res);
};

export const loadForecast = (date) => {
  console.log('loading forecast');
  return TravelServiceApi.getForecast(date).then(res => res);
};
