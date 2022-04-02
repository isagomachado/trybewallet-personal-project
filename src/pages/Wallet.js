import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { walletCurrenciesAction } from '../actions';
import currenciesApi from '../services/api'

class Wallet extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      totalExpense: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag:'Alimentação',
    };
  }

  async componentDidMount() {
    const { walletCurrenciesDispatch } = this.props;

    const apiResponse = await currenciesApi();
    console.log(apiResponse)
    const coinsArray = Object.keys(apiResponse);
    const requestedCoins = coinsArray.filter((coin) => coin !== 'USDT');
    console.log(requestedCoins);
    walletCurrenciesDispatch(requestedCoins);
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.changeDisabled);
  }

  async handleClick() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const apiResponse = await currenciesApi();
    console.log(apiResponse);
    const myObject = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: apiResponse,
    }

    console.log(myObject);
  }

  render() {
    const {
      totalExpense,
      value,
      description,
    } = this.state;
    const { email, currencies } = this.props;

    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <div>
            <p data-testid="total-field">{ totalExpense }</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </header>
        <form>
          <label htmlFor="value">
            Preço:
            {' '}
            <input
              type="text"
              data-testid="value-input"
              name="value"
              id="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <label htmlFor="description">
            Descrição:
            {' '}
            <input
              type="text"
              data-testid="description-input"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <label htmlFor="currency">
            Moeda:
            {' '}
            <select
              name="currency"
              id="currency"
              onChange={ this.handleChange }
            >
              {
                currencies.map((currency) => (
                  <option
                    key={ currency }
                    value={ currency }
                  >
                    { currency }
                  </option>
                ))
              }
            </select>
          </label>
          <br />
          <label htmlFor="method">
            Pagamento:
            {' '}
            <select
              id="method"
              name="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <br />
          <label htmlFor="tag">
            Categoria:
            {' '}
            <select
              id="tag"
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  walletCurrenciesDispatch:
    (currencies) => dispatch(walletCurrenciesAction(currencies)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  walletCurrenciesDispatch: PropTypes.func.isRequired,
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
