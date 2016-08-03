const user = (state = {}, action)  => {
  switch(action.type) {
    case 'FETCH_USER_SUCCESS' :
    return action.payload;
    default :
      return state;
  }
};

export default user;
