/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uuid from 'uuid/v1';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  componentDidMount() {
    const saved = localStorage.getItem('transactions');
    const localBalance = localStorage.getItem('balance');
    if (saved) {
      const transactions = JSON.parse(saved);
      this.setState({ transactions });
    }
    if (localBalance) {
      const balance = JSON.parse(localBalance);
      this.setState({ balance });
    }
  }

  componentDidUpdate(prevState) {
    const { transactions, balance } = this.state;
    if (prevState.tasks !== transactions) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
      localStorage.setItem('balance', JSON.stringify(balance));
    }
  }

  Deposit = money => {
    if (money === 0) {
      return toast.warn('Введите сумму для проведения операции!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    const newDeposit = {
      id: uuid(),
      type: 'deposit',
      amount: money,
      date: new Date().toLocaleString(),
    };
    this.setState(prevState => ({
      transactions: [newDeposit, ...prevState.transactions],
      balance: prevState.balance + money,
    }));
  };

  Withdraw = money => {
    if (money === 0) {
      return toast.warn('Введите сумму для проведения операции!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    if (money > this.state.balance) {
      return toast.error(
        'На счету недостаточно средств для проведения операции!',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
    }
    const newWithdraw = {
      id: uuid(),
      type: 'withdraw',
      amount: money,
      date: new Date().toLocaleString(),
    };
    this.setState(prevState => ({
      transactions: [newWithdraw, ...prevState.transactions],
      balance: prevState.balance - money,
    }));
  };

  render() {
    const { transactions, balance } = this.state;

    const income = transactions.reduce(
      (acc, item) => (item.type === 'deposit' ? acc + item.amount : acc),
      0,
    );

    const costs = transactions.reduce(
      (acc, item) => (item.type === 'withdraw' ? acc + item.amount : acc),
      0,
    );

    return (
      <>
        <Controls Deposit={this.Deposit} Withdraw={this.Withdraw} />
        <Balance balance={balance} income={income} expenses={costs} />
        <TransactionHistory items={transactions} />
        <ToastContainer />
      </>
    );
  }
}
