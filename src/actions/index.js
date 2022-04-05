import currenciesApi from '../services/api';

export const USER_ACTION = 'USER_ACTION';
export const WALLET_CURRENCIES_ACTION = 'WALLET_CURRENCIES_ACTION';
export const WALLET_REQUEST_CURRENCIES_API = 'WALLET_REQUEST_CURRENCIES_API';
export
const WALLET_RECEIVE_CURRENCIES_API_SUCCESS = 'WALLET_RECEIVE_CURRENCIES_API_SUCCESS';
export
const WALLET_RECEIVE_CURRENCIES_API_FAILURE = 'WALLET_RECEIVE_CURRENCIES_API_FAILURE';
export const WALLET_EXPENSES_SAVE_ACTION = 'WALLET_EXPENSES_SAVE_ACTION';

export const userAction = (email) => ({
  type: USER_ACTION,
  email,
});

export const walletCurrenciesAction = (currencies) => ({
  type: WALLET_CURRENCIES_ACTION,
  currencies,
});

export const walletRequestCurrenciesApi = () => ({
  type: WALLET_REQUEST_CURRENCIES_API,
});

export const walletReceiveCurrenciesApiSuccess = (currencies) => ({
  type: WALLET_RECEIVE_CURRENCIES_API_SUCCESS,
  currencies,
});

export const walletReceiveCurrenciesApiFailure = (error) => ({
  type: WALLET_RECEIVE_CURRENCIES_API_FAILURE,
  error,
});

export function fetchCurrenciesApi() {
  return async (dispatch) => {
    dispatch(walletRequestCurrenciesApi());
    try {
      // console.log('Atual state', getState());
      const response = await currenciesApi();
      dispatch(walletReceiveCurrenciesApiSuccess(response));
      // console.log('state atualizado', getState());
    } catch (error) {
      dispatch(walletReceiveCurrenciesApiFailure(error));
    }
  };
}

export const walletExpensesSaveAction = (expense) => ({
  type: WALLET_EXPENSES_SAVE_ACTION,
  expense,
});
