import { repaymentTableCalculator, repaymentTableFormatter } from './repayment';

test('repaymentTableCalculator', () => {
  const amountRequested = 1000;
  const monthsDuration = 4;
  const interestRate = 2;
  const loan = {
    amountRequested,
    monthsDuration,
    interestRate,
  };

  const result = repaymentTableCalculator(loan);

  expect(result.months.length).toBe(monthsDuration);
  expect(result.months[0].interest).toBe(20);
  expect(result.months[0].principle).toBe(250);
  expect(result.months[0].totalRepayment).toBe(270);
  expect(result.months[3].interest).toBe(5);
  expect(result.months[3].principle).toBe(250);
  expect(result.months[3].totalRepayment).toBe(255);

  expect(result.total).toEqual({
    interest: 50,
    principle: amountRequested,
    totalRepayment: 1050,
  });
});

test('repaymentTableCalculator with upfrontRate', () => {
  const amountRequested = 10000;
  const monthsDuration = 3;
  const interestRate = 5;
  const loan = {
    amountRequested,
    monthsDuration,
    interestRate,
    upfrontRate: 10,
  };

  const result = repaymentTableCalculator(loan);

  expect(result.months.length).toBe(monthsDuration);

  expect(result.months[0].interest).toBe(1500);
  expect(result.months[0].principle).toBeCloseTo(3333.3333);
  expect(result.months[0].totalRepayment).toBeCloseTo(4833.3333);

  expect(result.months[2].interest).toBeCloseTo(166.6666);
  expect(result.months[2].principle).toBeCloseTo(3333.3333);
  expect(result.months[2].totalRepayment).toBe(3500);

  expect(result.total).toEqual({
    interest: 2000,
    principle: amountRequested,
    totalRepayment: 12000,
  });
});

test('repaymentTableFormatter', () => {
  const loan = {
    amountRequested: 10000,
    monthsDuration: 4,
    interestRate: 3,
  };

  const repaymentTable = repaymentTableCalculator(loan);
  const formattedTable = repaymentTableFormatter(repaymentTable);

  expect(formattedTable.months.length).toBe(4);
  expect(formattedTable.months[0].interest).toBe('£300');
  expect(formattedTable.months[0].principle).toBe('£2,500');
  expect(formattedTable.months[0].totalRepayment).toBe('£2,800');
  expect(formattedTable.total).toEqual({
    interest: '£750',
    principle: '£10,000',
    totalRepayment: '£10,750',
  });
});
