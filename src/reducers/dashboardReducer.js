export const dashboard = (state = {}, action)  => {
  switch(action.type) {
    case 'FETCH_DASHBOARD_SUCCESS':
    return Object.assign({}, state, action.payload);
    default :
      return state;
  }
};

export const dashboard2 = (state = {}, action)  => {
  switch(action.type) {
    case 'FETCH_DASHBOARD2_SUCCESS':
    return Object.assign({}, state, action.payload);
    default :
      return state;
  }
};

export const dashboard3 = (state = {}, action)  => {
  switch(action.type) {
    case 'FETCH_DASHBOARD3_SUCCESS':
    return Object.assign({}, state, action.payload);
    default :
      return state;
  }
};
