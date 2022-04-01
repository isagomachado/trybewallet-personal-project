import { WALLET_CURRENCIES_ACTION } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case WALLET_CURRENCIES_ACTION:
    return { ...state, currencies: [...action.currencies] };
  default:
    return state;
  }
}

export default wallet;
