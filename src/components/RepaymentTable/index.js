import React from 'react';
import PropTypes from 'prop-types';
import RepaymentTableRow from './RepaymentTableRow';
import './RepaymentTable.css';

const RepaymentTable = ({ months, total, ...props }) => (
  <div className="repayment-table" {...props}>
    <table aria-live="polite">
      <thead>
        <tr>
          <th scope="col">Repayment date</th>
          <th scope="col">Principle</th>
          <th scope="col">Interest</th>
          <th scope="col">Total repayment</th>
        </tr>
      </thead>
      <tbody>
        {
          months && months.map((month) => (
            <RepaymentTableRow
              key={month.date}
              date={month.date}
              principle={month.principle}
              interest={month.interest}
              totalRepayment={month.totalRepayment}
            />
          ))
        }
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">Total</th>
          <td>{total.principle}</td>
          <td>{total.interest}</td>
          <td>{total.totalRepayment}</td>
        </tr>
      </tfoot>
    </table>
  </div>
);

RepaymentTable.propTypes = {
  months: PropTypes.array.isRequired,
  total: PropTypes.object.isRequired,
};

export default React.memo(RepaymentTable);
