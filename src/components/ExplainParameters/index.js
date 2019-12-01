import React from 'react';

const title = {
  revolving_credit_facility: 'Revolving Credit Facility',
  business_loan: 'Business Loan',
};

function ExplainParameters ({ loanType, parameterDefinitions, ...props }) {
  const heading = title[loanType]
    ? `A ${title[loanType] } is not available`
    : '';

  const {amount_min, amount_max, duration_min, duration_max} = parameterDefinitions[loanType];

  return (
    <div {...props}>
      <h2>{heading}</h2>
      <p>
        To be eligible for this loan the
        minimum amount is {amount_min},
        the maximum amount is {amount_max},
        the shortest duration is {duration_min},
        and the longest duration is {duration_max}.
      </p>
    </div>
  );
}

export default ExplainParameters;
