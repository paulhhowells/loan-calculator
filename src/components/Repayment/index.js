import React, { useState } from 'react';
import { useFetchJson } from '../../hooks';
import RepaymentBlock from '../RepaymentBlock';
import ExplainParameters from '../ExplainParameters';
import './Repayment.css';

// Declare initial amount and duration.
const initial = {
  amountRequested: 10000,
  monthsDuration: 6,
};

const upfrontRatePercentage = 10;
const parameterDefinitionsURL = 'https://www.mocky.io/v2/5d4aa9e93300006f000f5ea9';

function Repayment () {
  const [formState, setFormState] = useState({
    amountRequested: initial.amountRequested,
    monthsDuration: initial.monthsDuration,
  });
  const { json:parameterDefinitions, loading } = useFetchJson(parameterDefinitionsURL);
  const [validationState, setValidationState] = useState({
    amountRequested: true,
    monthsDuration: true,
  });

  function handleFieldChange (event) {
    const name = event.target.name;
    const value = event.target.value;

    setFormState({
      ...formState,
      [name]: value
    });

    /**
{
  "revolving_credit_facility": {
    "amount_min": 1000,
    "amount_max": 150000,
    "duration_min": 1,
    "duration_max": 12
  },
  "business_loan": {
    "amount_min": 10000,
    "amount_max": 200000,
    "duration_min": 1,
    "duration_max": 60
  }
monthsDuration
amountRequested

     */
    const validate = (name, value) => {
      if (name === 'monthsDuration') {
        return value >= parameterDefinitions.business_loan.duration_min &&
          value <= parameterDefinitions.business_loan.duration_max &&
          value >= parameterDefinitions.revolving_credit_facility.duration_min &&
          value <= parameterDefinitions.revolving_credit_facility.duration_max;
      }
      else if (name === 'amountRequested') {
        return value >= parameterDefinitions.business_loan.amount_min &&
          value <= parameterDefinitions.business_loan.amount_max &&
          value >= parameterDefinitions.revolving_credit_facility.amount_min &&
          value <= parameterDefinitions.revolving_credit_facility.amount_max;
      }
    };
    const validationValue = validate(name, value);

    //showRepaymentOption(, parameterDefinitions, formState);
    setValidationState({
      ...validationState,
      [name]: validationValue,
    });

    console.log('validationState', validationState);
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
      <div className="repayment">
        <form onSubmit={handleSubmit}>
          <div className="repayment__amount-and-duration">
            <div>
              <label htmlFor="amountRequested" className="repayment__number-field repayment__number-field--wide">
                <span>Amount requested </span>
                <span>(in £) </span>
                <input
                  id="amountRequested"
                  name="amountRequested"
                  type="number"
                  pattern="[0-9]*"
                  value={formState.amountRequested}
                  onChange={handleFieldChange}
                />
              </label>
            </div>
            <div>
              <label htmlFor="monthsDuration" className="repayment__number-field">
                <span>Duration </span>
                <span>(in months) </span>
                <input
                  id="monthsDuration"
                  name="monthsDuration"
                  type="number"
                  pattern="[0-9]*"
                  value={formState.monthsDuration}
                  onChange={handleFieldChange}
                />
              </label>
            </div>
          </div>
          <div className="repayment__blocks">
            {showRevolvingCreditFacility ? (
              <RepaymentBlock
                title="Revolving Credit Facility"
                className="repayment__block"
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
                className="repayment__block"
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
        </form>
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
