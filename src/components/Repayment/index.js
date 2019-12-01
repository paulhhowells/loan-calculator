import React, { useState } from 'react';
import { useFetchJson } from '../../hooks';
import RepaymentBlock from '../RepaymentBlock';
import ExplainParameters from '../ExplainParameters';

// Declare initial amount and duration.
const initial = {
  amountRequested: 10000,
  monthsDuration: 6,
};

const upfrontRatePercentage = 10;
const parameterDefinitionsURL = 'http://www.mocky.io/v2/5d4aa9e93300006f000f5ea9';

function Repayment () {
  const [formState, setFormState] = useState({
    amountRequested: initial.amountRequested,
    monthsDuration: initial.monthsDuration,
  });
  const { json:parameterDefinitions, loading } = useFetchJson(parameterDefinitionsURL);

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

  if (loading) {
    // TODO: could replace with a spinner and/or loading message.
    return null;
  } else if (parameterDefinitions) {
    const showRevolvingCreditFacility = showRepaymentOption('revolving_credit_facility', parameterDefinitions, formState);
    const showBusinessLoan = showRepaymentOption('business_loan', parameterDefinitions, formState);

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
          {showRevolvingCreditFacility ? (
            <RepaymentBlock
              title="Revolving Credit Facility"
              amountRequested={formState.amountRequested}
              monthsDuration={formState.monthsDuration}
            />
          ) : (
            <ExplainParameters
              loanType="revolving_credit_facility"
              parameterDefinitions={parameterDefinitions}
            />
          )}
          {showBusinessLoan ? (
            <RepaymentBlock
              title="Business Loan"
              amountRequested={formState.amountRequested}
              monthsDuration={formState.monthsDuration}
              upfrontRate={upfrontRatePercentage}
            />
          ) : (
            <ExplainParameters
              loanType="business_loan"
              parameterDefinitions={parameterDefinitions}
            />
          )}
        </div>
      </div>
    );
  } else {
    // TODO: test & handle errors
    return (<div><h2>Error! Cannot load from mocky.io</h2></div>);
  }
}

function showRepaymentOption (loanType, parameterDefinitions, requestedValues) {
  const { amountRequested, monthsDuration } = requestedValues;
  const { amount_min, amount_max, duration_min, duration_max } = parameterDefinitions[loanType];

  return (Number(amountRequested) >= amount_min) &&
    (Number(amountRequested) <= amount_max) &&
    (Number(monthsDuration) >= duration_min) &&
    (Number(monthsDuration) <= duration_max);
}

export default Repayment;
