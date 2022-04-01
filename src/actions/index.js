export const USER_ACTION = 'USER_ACTION';
export const WALLET_CURRENCIES_ACTION = 'WALLET_CURRENCIES_ACTION';

export const userAction = (email) => ({
  type: USER_ACTION,
  email,
});

export const walletCurrenciesAction = (currencies) => ({
  type: WALLET_CURRENCIES_ACTION,
  currencies,
});
