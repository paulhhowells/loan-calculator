/// <reference types="Cypress" />

describe('Loan Calculator App', () => {
  before(() => {
    cy.visit('localhost:3000', {
      // Mock the call to mocky.io/v2 with an inline fixture.
      onBeforeLoad(window) {
        cy.stub(window, 'fetch', () => {
          return new Promise(resolve => resolve({
            json: () => ({
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
            }),
            status: 200,
            ok: true
          }));
        });
      }
    })
  });

  it('Sees the app view', () => {
    cy.contains('Your Loan');
  });

  it('Sees both Revolving Credit Facility and Business Loan', () => {
    cy.get('input#amountRequested').clear().type('10000');
    cy.get('input#monthsDuration').clear().type('4');

    cy.get('.repayment__blocks > .repayment__block')
      .eq(0)
      .find('h2')
      .contains('Revolving Credit Facility');
    cy.get('.repayment__blocks > .repayment__block')
      .eq(1)
      .find('h2')
      .contains('Business Loan');
  });

  it('Calculates totals for Revolving Credit Facility', () => {
    // Try 3%:
    cy.get('input#revolving-credit-facility-interest-rate').clear().type('3');
    cy.get('.repayment__blocks > .repayment__block')
      .eq(0)
      .find('.repayment-table tfoot td')
      .eq(0)
      .contains('£10,000');
    cy.get('.repayment__blocks > .repayment__block')
      .eq(0)
      .find('.repayment-table tfoot td')
      .eq(1)
      .contains('£750');
    cy.get('.repayment__blocks > .repayment__block')
      .eq(0)
      .find('.repayment-table tfoot td')
      .eq(2)
      .contains('£10,750');

    // Try 10%:
    cy.get('input#revolving-credit-facility-interest-rate').clear().type('10');
    cy.get('.repayment__blocks > .repayment__block')
      .eq(0)
      .find('.repayment-table tfoot td')
      .eq(0)
      .contains('£10,000');
    cy.get('.repayment__blocks > .repayment__block')
      .eq(0)
      .find('.repayment-table tfoot td')
      .eq(1)
      .contains('£2,500');
    cy.get('.repayment__blocks > .repayment__block')
      .eq(0)
      .find('.repayment-table tfoot td')
      .eq(2)
      .contains('£12,500');
  });

  it('Calculates totals for Business Loan', () => {
    // Try 3%:
    cy.get('input#business-loan-interest-rate').clear().type('3');
    cy.get('.repayment__blocks > .repayment__block')
      .eq(1)
      .find('.repayment-table tfoot td')
      .eq(0)
      .contains('£10,000');
    cy.get('.repayment__blocks > .repayment__block')
      .eq(1)
      .find('.repayment-table tfoot td')
      .eq(1)
      .contains('£1,750');
    cy.get('.repayment__blocks > .repayment__block')
      .eq(1)
      .find('.repayment-table tfoot td')
      .eq(2)
      .contains('£11,750');

    // Try 10%:
    cy.get('input#business-loan-interest-rate').clear().type('10');
    cy.get('.repayment__blocks > .repayment__block')
      .eq(1)
      .find('.repayment-table tfoot td')
      .eq(0)
      .contains('£10,000');
    cy.get('.repayment__blocks > .repayment__block')
      .eq(1)
      .find('.repayment-table tfoot td')
      .eq(1)
      .contains('£3,500');
    cy.get('.repayment__blocks > .repayment__block')
      .eq(1)
      .find('.repayment-table tfoot td')
      .eq(2)
      .contains('£13,500');
  });

  it('Business Loan is removed when prerequisites not met', () => {
    cy.get('input#amountRequested').clear().type('1000');
    cy.get('input#business-loan-interest-rate').should('not.exist');
  });

  it('Revolving Credit Facility is removed when prerequisites not met', () => {
    cy.get('input#amountRequested').clear().type('1000000');
    cy.get('input#revolving-credit-facility-interest-rate').should('not.exist');
  });
});
