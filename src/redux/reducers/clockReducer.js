const clockReducer = (state = [], action) => {
  switch (action.type) {
      // FETCH_COFEE
    case 'SET_TIME':
      return action.payload;

    case 'CLEAR_TIME':
      return [];

    default:
      return state;
  }
};


export default clockReducer;
