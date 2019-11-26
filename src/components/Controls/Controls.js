import React, { Component } from 'react';
import Proppes from 'prop-types';
import abc from './Controls.module.css';

export default class Controls extends Component {
  static propTypes = {
    Deposit: Proppes.func.isRequired,
    Withdraw: Proppes.func.isRequired,
  }.isRequired;

  state = {
    amount: '',
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  Deposit = () => {
    const { Deposit } = this.props;
    Deposit(Number(this.state.amount));
    this.setState({ amount: '' });
  };

  Withdraw = () => {
    const { Withdraw } = this.props;
    Withdraw(Number(this.state.amount));
    this.setState({ amount: '' });
  };

  render() {
    const { amount } = this.state;
    return (
      <section className={abc.controls}>
        <input
          className={abc.input}
          onChange={this.handleInputChange}
          type="number"
          name="amount"
          value={amount}
        />
        <button className={abc.button} onClick={this.Deposit} type="button">
          Deposit
        </button>
        <button className={abc.button} onClick={this.Withdraw} type="button">
          Withdraw
        </button>
      </section>
    );
  }
}
