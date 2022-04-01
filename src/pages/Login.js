import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeDisabled = this.changeDisabled.bind(this);

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.changeDisabled);
  }

  changeDisabled() {
    const { email, password } = this.state;

    const valid = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    const isValidEmail = valid.test(email);
    const supPassword = 6;

    if (isValidEmail && password.length >= supPassword) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  handleClick() {
    const { email } = this.state;
    const { userDispatch, history } = this.props;
    userDispatch(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="Insira seu email"
          data-testid="email-input"
          name="email"
          onChange={ this.handleChange }
          value={ email }
        />
        <input
          type="password"
          placeholder="Senha"
          data-testid="password-input"
          name="password"
          onChange={ this.handleChange }
          value={ password }
        />
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userDispatch: (email) => dispatch(userAction(email)),
});

Login.propTypes = {
  userDispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
