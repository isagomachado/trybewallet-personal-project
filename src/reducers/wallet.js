import {
  WALLET_CURRENCIES_ACTION,
  WALLET_REQUEST_CURRENCIES_API,
  WALLET_RECEIVE_CURRENCIES_API_SUCCESS,
  WALLET_RECEIVE_CURRENCIES_API_FAILURE,
  WALLET_EXPENSES_SAVE_ACTION,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  currenciesResponseApi: {},
  loading: false,
  error: '',
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case WALLET_CURRENCIES_ACTION:
    return {
      ...state,
      currencies: [...action.currencies],
    };
  case WALLET_REQUEST_CURRENCIES_API:
    return {
      ...state,
      loading: true,
    };
  case WALLET_RECEIVE_CURRENCIES_API_SUCCESS:
    return {
      ...state,
      loading: false,
      currenciesResponseApi: action.currencies,
    };
  case WALLET_RECEIVE_CURRENCIES_API_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  case WALLET_EXPENSES_SAVE_ACTION:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        ...action.expense,
      }],
    };
  default:
    return state;
  }
}

export default wallet;
