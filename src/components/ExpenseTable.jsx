import React from 'react';
import { connect } from 'react-redux';

import './ExpenseTable.css';

class ExpenseTable extends React.Component {
  render() {
    const { expenses } = this.props;

    return (
      <div>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {
            expenses.length !== 0
              && expenses.map(({
                id,
                description,
                tag,
                method,
                value,
                currency,
                exchangeRates,
              }) => (
                <tr key={ id } role="row">
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ (parseFloat(value)).toFixed(2) }</td>
                  <td>{ exchangeRates[currency].name }</td>
                  <td>{ (parseFloat(exchangeRates[currency].ask)).toFixed(2) }</td>
                  <td>
                    {
                      (parseFloat(value) * parseFloat(exchangeRates[currency].ask))
                      .toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <td>Botões</td>
                </tr>
              ))
          }
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpenseTable.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
    length: PropTypes.func,
  }).isRequired,
}

export default connect(mapStateToProps)(ExpenseTable);
