/* eslint-disable react/prop-types */
import React from 'react';
import Proppes from 'prop-types';
import abc from './TransactionHistory.module.css';

const TransactionHistory = ({ items }) => (
  <table className={abc.historyContainer}>
    <thead>
      <tr>
        <th>Transaction</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {items.map(element => (
        <tr key={element.id}>
          <td>{element.type}</td>
          <td>{element.amount}</td>
          <td>{element.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TransactionHistory;

TransactionHistory.propTypes = {
  items: Proppes.arrayOf(
    Proppes.shape({
      id: Proppes.string.isRequired,
      type: Proppes.string.isRequired,
      amount: Proppes.number.isRequired,
      date: Proppes.string.isRequired,
    }),
  ).isRequired,
};
