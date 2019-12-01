import React from 'react';
import PropTypes from 'prop-types';

const RepaymentTableRow = ({
  date,
  principle,
  interest,
  totalRepayment,
  ...props
}) => (
  <tr {...props}>
    <td>{date}</td>
    <td>{principle}</td>
    <td>{interest}</td>
    <td>{totalRepayment}</td>
  </tr>
);

RepaymentTableRow.propTypes = {
  date: PropTypes.string.isRequired,
  principle: PropTypes.string.isRequired,
  interest: PropTypes.string.isRequired,
  totalRepayment: PropTypes.string.isRequired,
};

export default React.memo(RepaymentTableRow);
