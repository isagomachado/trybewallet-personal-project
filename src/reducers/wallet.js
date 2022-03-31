const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'WALLET_ACTION':
    return { currencies: [action.currencies] };
  default:
    return state;
  }
}

export default wallet;
