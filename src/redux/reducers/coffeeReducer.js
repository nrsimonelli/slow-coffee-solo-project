const coffeeReducer = (state = [], action) => {
  switch (action.type) {
      // FETCH_COFEE
    case 'SET_COFFEE':
      return action.payload;

    case 'CLEAR_COFFEE':
      return [];

    default:
      return state;
  }
};


export default coffeeReducer;
