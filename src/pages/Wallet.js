import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      totalExpense: 0,
    };
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

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
