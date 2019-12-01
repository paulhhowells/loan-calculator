import moment from 'moment';

export const amountFormat = new Intl.NumberFormat(
  'en-GB',
  {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }
);

export function repaymentTableCalculator ({
  amountRequested = 0,
  monthsDuration = 0,
  interestRate = 0,     // - a percentage from 0 to 100
  upfrontRate = null,   // - a percentage from 0 to 100 (optional attribute)
}) {
  const percent = (interestRate / 100);
  const principle = amountRequested / monthsDuration;
  let upfrontAmount = 0;

  if (upfrontRate) {
    upfrontAmount = (amountRequested * upfrontRate) / 100;
  }

  let remainingDebt = amountRequested;
  let totalRepayment = 0;
  let totalInterest = 0

  const months = [...Array(monthsDuration)].map((_, index) => {
    let monthsInterest = remainingDebt * percent;

    if (upfrontAmount && index === 0) {
      monthsInterest += upfrontAmount;
    }

    const monthsRepayment = principle + monthsInterest;

    totalRepayment = totalRepayment + monthsRepayment;
    remainingDebt = remainingDebt - principle;
    totalInterest = totalInterest + monthsInterest;

    // Add an increasing number of months onto today’s date.
    const date = moment().add(index + 1, 'months');

    return {
      date: date,
      principle: principle,
      interest: monthsInterest,
      totalRepayment: monthsRepayment,
    };
  });

  return {
    months,
    total: {
      principle: amountRequested,
      interest: totalInterest,
      totalRepayment: totalRepayment,
    }
  };
}

export function repaymentTableFormatter (repaymentTable) {
  const {
    months: repaymentTableRows,
    total: repaymentTableTotal,
    ...rest
  } = repaymentTable;

  const months = repaymentTableRows.map(month => {
    const {date, principle, interest, totalRepayment} = month;

    return {
      date: date.format('DD/MM/YYYY'),
      principle: amountFormat.format(principle),
      interest: amountFormat.format(interest),
      totalRepayment: amountFormat.format(totalRepayment),
    };
  });

  const total = {
    principle: amountFormat.format(repaymentTableTotal.principle),
    interest: amountFormat.format(repaymentTableTotal.interest),
    totalRepayment: amountFormat.format(repaymentTableTotal.totalRepayment),
  }

  return {months, total, ...rest};
}
