import React, { useState } from 'react';
import RepaymentBlock from '../RepaymentBlock';

// Declare initial amount and duration.
const initial = {
  amountRequested: 10000,
  monthsDuration: 6,
};

const upfrontRatePercentage = 10;

function Repayment () {
  const [formState, setFormState] = useState({
    amountRequested: initial.amountRequested,
    monthsDuration: initial.monthsDuration,
  });

  function handleFieldChange (event) {
    const name = event.target.name;
    const value = event.target.value;

    setFormState({
      ...formState,
      [name]: value
    });
  }

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
            value={formState.amountRequested}
            onChange={handleFieldChange}
          />
          <label htmlFor="monthsDuration">Duration (in months)</label>
          <input
            id="monthsDuration"
            name="monthsDuration"
            type="number"
            pattern="[0-9]*"
            value={formState.monthsDuration}
            onChange={handleFieldChange}
          />
        </div>
      </form>
      <div>
        <RepaymentBlock
          title="Revolving Credit Facility"
          amountRequested={formState.amountRequested}
          monthsDuration={formState.monthsDuration}
        />
        <RepaymentBlock
          title="Business Loan"
          amountRequested={formState.amountRequested}
          monthsDuration={formState.monthsDuration}
          upfrontRate={upfrontRatePercentage}
        />
      </div>
    </div>
  );
}

export default Repayment;
