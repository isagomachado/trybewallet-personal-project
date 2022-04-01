import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { walletCurrenciesAction } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      totalExpense: 0,
    };
  }

  async componentDidMount() {
    const { walletCurrenciesDispatch } = this.props;

    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await request.json();
    const coinsArray = Object.keys(response);
    const requestedCoins = coinsArray.filter((coin) => coin !== 'USDT');
    walletCurrenciesDispatch(requestedCoins);
  }

  render() {
    const { totalExpense } = this.state;
    const { email } = this.props;

    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          {' '}
          <p data-testid="total-field">{ totalExpense }</p>
          {' '}
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  walletCurrenciesDispatch:
    (currencies) => dispatch(walletCurrenciesAction(currencies)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  walletCurrenciesDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
