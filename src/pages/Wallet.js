import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { walletCurrenciesAction } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      totalExpense: 0,
      // price: 0,
      // description: '',
      // selectCurrencie: '',
      // pay: '',
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

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.changeDisabled);
  }

  render() {
    const { totalExpense } = this.state;
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
          <label htmlFor="price">
            Preço:
            {' '}
            <input
              type="text"
              data-testid="value-input"
              name="price"
              id="price"
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
            />
          </label>
          <br />
          <label htmlFor="selectCurrencie">
            Moeda:
            {' '}
            <select
              name="selectCurrencie"
              id="selectCurrencie"
            >
              {
                currencies.map((currencie) => (
                  <option
                    key={ currencie }
                    value={ currencie }
                  >
                    { currencie }
                  </option>
                ))
              }
            </select>
          </label>
          <br />
          <label htmlFor="pay">
            Pagamento:
            {' '}
            <select id="pay" data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <br />
          <label htmlFor="tag">
            Categoria:
            {' '}
            <select id="tag" data-testid="tag-input">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
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
