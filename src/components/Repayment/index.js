import React from 'react';

function Repayment () {
  function handleSubmit (event) {
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amountRequested">Amount requested (in £)</label>
          <input
            id="amountRequested"
            name="amountRequested"
            type="number"
            pattern="[0-9]*"
          />
          <label htmlFor="monthsDuration">Duration (in months)</label>
          <input
            id="monthsDuration"
            name="monthsDuration"
            type="number"
            pattern="[0-9]*"
          />
        </div>
      </form>
      <div>
        <table>
        <thead>
          <tr>
            <th scope="col">Repayment date</th>
            <th scope="col">Principle</th>
            <th scope="col">Interest</th>
            <th scope="col">Total repayment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>total</th>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Repayment;
