import React from 'react';
import Proppes from 'prop-types';
import abc from './Balance.module.css';

const Balance = ({ balance, income, expenses }) => (
  <section className={abc.balance}>
    <span>
      <span className={abc.income}>&#8593;</span>
      {income}$
    </span>
    <span>
      <span className={abc.expenses}>&#8595;</span>
      {expenses}$
    </span>
    <span>Balance: {balance}$</span>
  </section>
);

Balance.propTypes = {
  balance: Proppes.number.isRequired,
  income: Proppes.number.isRequired,
  expenses: Proppes.number.isRequired,
}.isRequired;

export default Balance;
