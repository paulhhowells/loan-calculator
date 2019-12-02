import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import RepaymentTable from '../RepaymentTable';
import { repaymentTableCalculator, repaymentTableFormatter } from '../Repayment/repayment';
import { kebabCase } from '../../helpers';

function RepaymentBlock ({
  title,
  amountRequested,
  monthsDuration,
  upfrontRate = null,
  ...props
}) {
  const [interestRate, setInterestRate] = useState(1);
  const inputId = `${kebabCase(title)}-interest-rate`;
  const repaymentChoices = {
    // Default to 0 if Number returns NaN:
    amountRequested: Number(amountRequested) || 0,
    monthsDuration: Math.ceil(Number(monthsDuration) || 0),
    interestRate: Number(interestRate) || 0,
  }

  if (upfrontRate) {
    repaymentChoices.upfrontRate = upfrontRate;
  }

  const repaymentTable = repaymentTableCalculator(repaymentChoices);
  const formattedTable = repaymentTableFormatter(repaymentTable);

  function interestRateChange (event) {
    setInterestRate(event.target.value);
  }

  return (
    <div {...props}>
      <h2>{title}</h2>
      <div>
        <label htmlFor={inputId} className="repayment__number-field repayment__number-field--centred">
          <span>Interest rate </span>
          <span>(in %) </span>
          <input
            id={inputId}
            name={inputId}
            type="number"
            pattern="[0-9]*"
            value={interestRate}
            onChange={interestRateChange}
          />
        </label>

        <RepaymentTable
          months={formattedTable.months}
          total={formattedTable.total}
        />
      </div>
    </div>
  );
}

RepaymentBlock.propTypes = {
  amountRequested: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
  monthsDuration: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
  title: PropTypes.string.isRequired,
  upfrontRate: PropTypes.number,
};

export default memo(RepaymentBlock);
